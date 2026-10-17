import { cache } from 'react';
import { headers } from 'next/headers';
import { prisma } from '../db';
import { safeJson } from '../utils';
import { DEFAULT_LOCALE, isLocale, localeInfo, Locale } from './config';
import type { Entity } from './content';

/** Current language of this request (set by middleware from the URL prefix) */
export const getLocale = cache(async (): Promise<Locale> => {
  try {
    const h = await headers();
    const l = h.get('x-locale');
    return isLocale(l) ? l : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
});

/** Asks the background worker to translate something that is missing */
function requestTranslation(entity: Entity, id: string, locale: string) {
  import('./jobs')
    .then(async (m) => {
      const { getSetting } = await import('../settings');
      const cfg = await getSetting('translation');
      if (cfg.autoTranslate && cfg.provider !== 'off') m.enqueue(entity, id, { locales: [locale], priority: true });
    })
    .catch(() => {});
}

export async function getTranslation<T = any>(entity: Entity, id: string, locale: string): Promise<T | null> {
  if (locale === DEFAULT_LOCALE) return null;
  try {
    const row = await prisma.translation.findUnique({ where: { entity_entityId_locale: { entity, entityId: id, locale } } });
    if (!row) {
      requestTranslation(entity, id, locale);
      return null;
    }
    return safeJson<T | null>(row.data, null);
  } catch {
    return null;
  }
}

export async function getTranslationsFor(entity: Entity, ids: string[], locale: string): Promise<Map<string, any>> {
  const map = new Map<string, any>();
  if (locale === DEFAULT_LOCALE || !ids.length) return map;
  try {
    const rows = await prisma.translation.findMany({ where: { entity, locale, entityId: { in: ids } } });
    rows.forEach((r) => map.set(r.entityId, safeJson(r.data, null)));
    const missing = ids.filter((id) => !map.has(id));
    missing.slice(0, 50).forEach((id) => requestTranslation(entity, id, locale));
  } catch {}
  return map;
}

/** UI words (buttons, labels) for the current language */
export const getDictionary = cache(async (locale: string): Promise<Record<string, string>> => {
  if (locale === DEFAULT_LOCALE) return {};
  return (await getTranslation<Record<string, string>>('ui', 'strings', locale)) || {};
});

export type TFunc = (s: string) => string;

export function makeT(dict: Record<string, string>): TFunc {
  return (s: string) => dict[s] || s;
}

/** Everything a server component needs: locale, direction and translate function */
export const getI18n = cache(async () => {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return { locale, dir: localeInfo(locale).dir, dict, t: makeT(dict) };
});
