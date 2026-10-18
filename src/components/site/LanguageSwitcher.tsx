'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LOCALES, splitLocale, localizePath } from '@/lib/i18n/config';
import { useLocale, useLanguages } from './SiteProvider';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ variant = 'header' }: { variant?: 'header' | 'drawer' }) {
  const pathname = usePathname() || '/';
  const locale = useLocale();
  const enabled = useLanguages();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { path } = splitLocale(pathname);
  const langs = LOCALES.filter((l) => enabled.includes(l.code));
  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  useEffect(() => {
    const close = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const go = (code: string) => {
    try {
      document.cookie = `rgv_lang=${code};path=/;max-age=31536000`;
    } catch {}
    // full page load so the whole page (incl. direction) switches language
    window.location.href = localizePath(path, code) + window.location.search;
  };

  if (langs.length < 2) return null;

  if (variant === 'drawer') {
    return (
      <div className="grid grid-cols-2 gap-2">
        {langs.map((l) => (
          <button key={l.code} onClick={() => go(l.code)} className={cn('flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm', l.code === locale ? 'bg-gold text-ink font-bold' : 'bg-white/5 text-white/80')}>
            <span>{l.flag}</span> {l.native}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex h-[42px] items-center gap-1.5 rounded-[14px] bg-white/[0.05] px-3 text-sm font-semibold ring-1 ring-inset ring-white/10 transition hover:ring-gold/60" aria-label="Change language">
        <Globe className="h-4 w-4 text-gold" />
        <span className="uppercase">{current.code}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="glass-menu absolute end-0 top-full mt-4 w-60 rounded-2xl p-1.5 z-50"
          >
            {langs.map((l) => (
              <button key={l.code} onClick={() => go(l.code)} className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-start text-sm transition-colors', l.code === locale ? 'bg-gold/15 font-bold text-gold-light ring-1 ring-inset ring-gold/30' : 'text-white/80 hover:bg-white/[0.08] hover:text-white')}>
                <span className="text-lg leading-none">{l.flag}</span>
                <span className="flex-1">{l.native}</span>
                {l.code === locale && <Check className="h-4 w-4 text-gold" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
