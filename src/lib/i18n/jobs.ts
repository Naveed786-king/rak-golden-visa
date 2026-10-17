// Background translation queue (runs inside the website server process).
import { getSetting } from '../settings';
import { TRANSLATED_LOCALES } from './config';
import { translateEntity, allTranslatableEntities, Entity } from './content';

type Job = { entity: Entity; id: string; locale: string; force: boolean };

type QueueState = {
  queue: Job[];
  keys: Set<string>;
  running: boolean;
  done: number;
  failed: number;
  lastError: string;
  current: string;
};

const g = globalThis as unknown as { __rgvQueue?: QueueState };
const Q: QueueState = (g.__rgvQueue ??= { queue: [], keys: new Set(), running: false, done: 0, failed: 0, lastError: '', current: '' });

export async function targetLocales() {
  const cfg = await getSetting('translation');
  return TRANSLATED_LOCALES.filter((l) => cfg.enabled.includes(l));
}

export function queueStatus() {
  return { pending: Q.queue.length, running: Q.running, current: Q.current, done: Q.done, failed: Q.failed, lastError: Q.lastError };
}

/** Add translation jobs. locales defaults to all enabled languages. */
export async function enqueue(entity: Entity, id: string, opts: { locales?: string[]; force?: boolean; priority?: boolean } = {}) {
  const cfg = await getSetting('translation');
  if (cfg.provider === 'off') return;
  const locales = opts.locales || (await targetLocales());
  for (const locale of locales) {
    const key = `${entity}:${id}:${locale}`;
    if (Q.keys.has(key)) continue;
    Q.keys.add(key);
    const job = { entity, id, locale, force: !!opts.force };
    if (opts.priority) Q.queue.unshift(job);
    else Q.queue.push(job);
  }
  run();
}

/** Called after content is saved in the admin panel */
export async function onContentSaved(entity: Entity, id: string) {
  const cfg = await getSetting('translation');
  if (!cfg.autoTranslate || cfg.provider === 'off') return;
  await enqueue(entity, id, { priority: true });
}

/** Queue everything that may be missing or out of date */
export async function enqueueAll(force = false) {
  const list = await allTranslatableEntities();
  const locales = await targetLocales();
  // Language by language so that whole languages become ready one after another
  for (const locale of locales) for (const e of list) await enqueue(e.entity, e.id, { locales: [locale], force });
}

async function run() {
  if (Q.running) return;
  Q.running = true;
  try {
    while (Q.queue.length) {
      const job = Q.queue.shift()!;
      Q.keys.delete(`${job.entity}:${job.id}:${job.locale}`);
      Q.current = `${job.entity} → ${job.locale}`;
      try {
        await translateEntity(job.entity, job.id, job.locale, job.force);
        Q.done++;
      } catch (e) {
        Q.failed++;
        Q.lastError = `${job.entity} ${job.locale}: ${(e as Error).message}`;
        console.error('[translate]', Q.lastError);
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  } finally {
    Q.running = false;
    Q.current = '';
  }
}
