import { prisma } from '@/lib/db';
import { ok, fail, refreshSite } from '@/lib/api';
import { requireStaff } from '@/lib/auth';
import { LOCALES, TRANSLATED_LOCALES, isLocale } from '@/lib/i18n/config';
import { allTranslatableEntities, translateEntity, Entity } from '@/lib/i18n/content';
import { enqueue, enqueueAll, queueStatus, keepAlive, targetLocales } from '@/lib/i18n/jobs';
import { getSetting } from '@/lib/settings';
import { testTranslation } from '@/lib/i18n/translate';
import { safeJson } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const ENTITIES: Entity[] = ['page', 'post', 'faq', 'service', 'testimonial', 'settings', 'ui'];

/** GET: status per language, or one translation (?entity=post&id=..&locale=ar) */
export async function GET(req: Request) {
  const s = await requireStaff();
  if (!s) return fail('Unauthorized', 401);
  const u = new URL(req.url);
  const entity = u.searchParams.get('entity');
  const id = u.searchParams.get('id');
  const locale = u.searchParams.get('locale');
  if (entity && id && locale) {
    const row = await prisma.translation.findUnique({ where: { entity_entityId_locale: { entity, entityId: id, locale } } });
    return ok({ translation: row ? { ...row, data: safeJson(row.data, {}) } : null });
  }
  if (entity && id) {
    const rows = await prisma.translation.findMany({ where: { entity, entityId: id }, select: { locale: true, status: true, updatedAt: true } });
    return ok({ rows });
  }
  const all = await allTranslatableEntities();
  const total = all.length;
  const keys = new Set(all.map((e) => `${e.entity}:${e.id}`));
  const rows = await prisma.translation.findMany({ select: { entity: true, entityId: true, locale: true, status: true } });
  const stats = TRANSLATED_LOCALES.map((l) => {
    const mine = rows.filter((r) => r.locale === l && keys.has(`${r.entity}:${r.entityId}`));
    return {
      locale: l,
      name: LOCALES.find((x) => x.code === l)!.name,
      native: LOCALES.find((x) => x.code === l)!.native,
      flag: LOCALES.find((x) => x.code === l)!.flag,
      done: mine.length,
      edited: mine.filter((r) => r.status === 'edited').length,
      outdated: mine.filter((r) => r.status === 'outdated').length,
      total,
    };
  });
  // Serverless (Vercel): while the Languages page is open, keep translating whatever is missing
  if (process.env.VERCEL) {
    const q = queueStatus();
    if (!q.running && !q.pending) {
      const cfg = await getSetting('translation');
      const enabled = await targetLocales();
      const missing = stats.some((x) => enabled.includes(x.locale) && x.done < x.total);
      if (cfg.autoTranslate && cfg.provider !== 'off' && missing) await enqueueAll(false);
    }
    keepAlive();
  }
  return ok({ stats, queue: queueStatus() });
}

/** POST: { action: 'all' | 'entity' | 'test', entity, id, locale, force } */
export async function POST(req: Request) {
  const s = await requireStaff();
  if (!s) return fail('Unauthorized', 401);
  const b = await req.json().catch(() => ({}));
  try {
    if (b.action === 'test') {
      const out = await testTranslation(isLocale(b.locale) ? b.locale : 'ar');
      return ok({ result: out });
    }
    if (b.action === 'all') {
      await enqueueAll(!!b.force);
      return ok({ queue: queueStatus() });
    }
    if (b.action === 'entity' && ENTITIES.includes(b.entity) && b.id) {
      if (b.locale && isLocale(b.locale)) {
        // translate right now (used by "Re-translate" in the editor)
        const r = await translateEntity(b.entity, b.id, b.locale, true);
        refreshSite();
        return ok({ result: r });
      }
      await enqueue(b.entity, b.id, { force: !!b.force, priority: true });
      return ok({ queue: queueStatus() });
    }
    return fail('Unknown action');
  } catch (e: any) {
    return fail(e.message || 'Translation failed', 500);
  }
}

/** PUT: save a manually edited translation */
export async function PUT(req: Request) {
  const s = await requireStaff();
  if (!s) return fail('Unauthorized', 401);
  const b = await req.json().catch(() => ({}));
  if (!ENTITIES.includes(b.entity) || !b.id || !isLocale(b.locale) || typeof b.data !== 'object') return fail('Invalid data');
  const existing = await prisma.translation.findUnique({ where: { entity_entityId_locale: { entity: b.entity, entityId: b.id, locale: b.locale } } });
  const data = JSON.stringify({ ...(existing ? safeJson(existing.data, {}) : {}), ...b.data });
  await prisma.translation.upsert({
    where: { entity_entityId_locale: { entity: b.entity, entityId: b.id, locale: b.locale } },
    update: { data, status: 'edited' },
    create: { entity: b.entity, entityId: b.id, locale: b.locale, data, status: 'edited' },
  });
  refreshSite();
  return ok();
}
