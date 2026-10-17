import { prisma } from './db';
import {
  defaultSite,
  defaultHeader,
  defaultFooter,
  defaultSmtp,
  defaultTranslation,
  TranslationSettings,
  SiteSettings,
  HeaderSettings,
  FooterSettings,
  SmtpSettings,
} from './defaults';

type Map = { site: SiteSettings; header: HeaderSettings; footer: FooterSettings; smtp: SmtpSettings; translation: TranslationSettings };
const DEFAULTS: Map = { site: defaultSite, header: defaultHeader, footer: defaultFooter, smtp: defaultSmtp, translation: defaultTranslation };

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

/** Header, footer and site settings in the visitor's language */
export async function getLocalizedBundle(locale: string) {
  const bundle = await getSiteBundle();
  if (locale === 'en') return bundle;
  const { getTranslation } = await import('./i18n/server');
  const [h, f, s] = await Promise.all([
    getTranslation<any>('settings', 'header', locale),
    getTranslation<any>('settings', 'footer', locale),
    getTranslation<any>('settings', 'site', locale),
  ]);
  const header = h ? { ...bundle.header, ...h, menu: h.menu?.length === bundle.header.menu.length ? mergeLinks(bundle.header.menu, h.menu) : bundle.header.menu, cta: { ...bundle.header.cta, label: h.cta?.label || bundle.header.cta.label } } : bundle.header;
  const footer = f
    ? {
        ...bundle.footer,
        ...f,
        ctaButton: { ...bundle.footer.ctaButton, label: f.ctaButton?.label || bundle.footer.ctaButton.label },
        columns: (bundle.footer.columns || []).map((c: any, i: number) => ({ ...c, title: f.columns?.[i]?.title || c.title, links: mergeLinks(c.links, f.columns?.[i]?.links || []) })),
        bottomLinks: mergeLinks(bundle.footer.bottomLinks, f.bottomLinks || []),
      }
    : bundle.footer;
  const site = s ? { ...bundle.site, ...s, seo: { ...bundle.site.seo, ...(s.seo || {}) } } : bundle.site;
  return { site, header, footer };
}

/** Keep the original links (href) and only take translated labels */
function mergeLinks(orig: any[], tr: any[]): any[] {
  return (orig || []).map((l, i) => ({
    ...l,
    label: tr?.[i]?.label || l.label,
    description: tr?.[i]?.description || l.description,
    children: l.children ? mergeLinks(l.children, tr?.[i]?.children || []) : l.children,
  }));
}
