'use client';
import { createContext, useContext } from 'react';
import type { SiteSettings } from '@/lib/defaults';
import { localizePath } from '@/lib/i18n/config';

type Ctx = { site: SiteSettings; locale: string; dict: Record<string, string>; languages: string[] };
const Ctx = createContext<Ctx | null>(null);

export function SiteProvider({ site, locale = 'en', dict = {}, languages = ['en'], children }: { site: SiteSettings; locale?: string; dict?: Record<string, string>; languages?: string[]; children: React.ReactNode }) {
  return <Ctx.Provider value={{ site, locale, dict, languages }}>{children}</Ctx.Provider>;
}

export function useSite() {
  return useContext(Ctx)?.site || null;
}

export function useLocale() {
  return useContext(Ctx)?.locale || 'en';
}

export function useLanguages() {
  return useContext(Ctx)?.languages || ['en'];
}

/** Translate a UI word: t('Read more') */
export function useT() {
  const dict = useContext(Ctx)?.dict || {};
  return (s: string) => dict[s] || s;
}

/** Add the language prefix to internal links */
export function useLocalize() {
  const locale = useLocale();
  return (href: string) => localizePath(href, locale);
}
