import { prisma } from './db';
import {
  defaultSite,
  defaultHeader,
  defaultFooter,
  defaultSmtp,
  SiteSettings,
  HeaderSettings,
  FooterSettings,
  SmtpSettings,
} from './defaults';

type Map = { site: SiteSettings; header: HeaderSettings; footer: FooterSettings; smtp: SmtpSettings };
const DEFAULTS: Map = { site: defaultSite, header: defaultHeader, footer: defaultFooter, smtp: defaultSmtp };

function deepMerge<T>(base: T, over: any): T {
  if (Array.isArray(base)) return (Array.isArray(over) ? over : base) as T;
  if (base && typeof base === 'object') {
    const out: any = { ...base };
    if (over && typeof over === 'object') {
      for (const k of Object.keys(over)) {
        const b = (base as any)[k];
        out[k] = b !== undefined && b !== null && typeof b === 'object' && !Array.isArray(b) ? deepMerge(b, over[k]) : over[k];
      }
    }
    return out;
  }
  return (over === undefined ? base : over) as T;
}

export async function getSetting<K extends keyof Map>(key: K): Promise<Map[K]> {
  try {
    const row = await prisma.setting.findUnique({ where: { key } });
    if (!row) return DEFAULTS[key];
    return deepMerge(DEFAULTS[key], JSON.parse(row.value));
  } catch {
    return DEFAULTS[key];
  }
}

export async function saveSetting<K extends keyof Map>(key: K, value: Map[K]) {
  const json = JSON.stringify(value);
  await prisma.setting.upsert({ where: { key }, update: { value: json }, create: { key, value: json } });
}

export async function getSiteBundle() {
  const [site, header, footer] = await Promise.all([getSetting('site'), getSetting('header'), getSetting('footer')]);
  return { site, header, footer };
}
