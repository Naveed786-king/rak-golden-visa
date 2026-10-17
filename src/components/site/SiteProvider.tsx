'use client';
import { createContext, useContext } from 'react';
import type { SiteSettings } from '@/lib/defaults';

const Ctx = createContext<SiteSettings | null>(null);

export function SiteProvider({ site, children }: { site: SiteSettings; children: React.ReactNode }) {
  return <Ctx.Provider value={site}>{children}</Ctx.Provider>;
}

export function useSite() {
  return useContext(Ctx);
}
