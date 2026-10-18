'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, Phone, User, ArrowUpRight, Mail, Clock } from 'lucide-react';
import type { HeaderSettings, SiteSettings } from '@/lib/defaults';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useT, useLocalize } from './SiteProvider';
import { splitLocale } from '@/lib/i18n/config';
import SmartLink from '@/components/ui/SmartLink';
import { SocialIcon } from '@/components/ui/Icon';

type Me = { name: string; role: string } | null;

export default function Header({ site, header }: { site: SiteSettings; header: HeaderSettings }) {
  const fullPath = usePathname() || '/';
  const pathname = splitLocale(fullPath).path;
  const t = useT();
  const L = useLocalize();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<number | null>(null);
  const [me, setMe] = useState<Me>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);

  useEffect(() => {
    if (!header.showLogin) return;
    fetch('/api/auth/me', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setMe(d?.user || null))
      .catch(() => {});
  }, [header.showLogin, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
  const accountHref = me ? (me.role === 'CUSTOMER' ? '/account' : '/admin') : L('/login');

  return (
    <>
      {header.topbar.enabled && (
        <div className="site-topbar relative z-50 text-[0.78rem] border-b border-white/10">
          <div className="container-x flex h-10 items-center justify-between gap-4">
            <div className="hidden md:flex items-center gap-5">
              <a href={`mailto:${site.emailVisa}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
                <Mail className="h-3.5 w-3.5 text-gold" /> {site.emailVisa}
              </a>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold" /> {site.hours}
              </span>
            </div>
            <div className="flex-1 md:flex-none truncate text-center md:text-right">
              <span className="text-gold-light">✦</span> {header.topbar.text}{' '}
              {header.topbar.linkLabel && (
                <SmartLink href={header.topbar.linkHref} className="font-bold text-gold hover:underline underline-offset-4 ml-1">
                  {header.topbar.linkLabel} →
                </SmartLink>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              {(['facebook', 'instagram', 'youtube', 'twitter', 'linkedin', 'tiktok'] as const)
                .filter((k) => site.social[k])
                .map((k) => (
                  <a key={k} href={site.social[k]} target="_blank" rel="noopener noreferrer" aria-label={k} className="hover:text-gold transition-colors">
                    <SocialIcon name={k} className="h-3.5 w-3.5" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}

      <header className="site-header" data-scrolled={scrolled ? '' : undefined}>
        <div className="container-x">
        <div className="hdr-island flex items-center justify-between gap-4">
          <Logo src={site.logoLight || site.logo} name={site.name} />

          <nav className="site-nav hidden lg:flex items-center gap-1" onMouseLeave={() => setDrop(null)}>
            {header.menu.map((item, i) => (
              <div key={i} className="relative" onMouseEnter={() => setDrop(item.children?.length ? i : null)}>
                <SmartLink
                  href={item.href}
                  className="nav-link flex items-center gap-1 px-3 xl:px-4 py-2.5 font-semibold"
                  data-active={isActive(item.href) ? '' : undefined}
                >
                  {item.label}
                  {!!item.children?.length && <ChevronDown className={cn('h-3.5 w-3.5 opacity-70 transition-transform', drop === i && 'rotate-180')} />}
                </SmartLink>
                <AnimatePresence>
                  {drop === i && item.children?.length ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[360px]"
                    >
                      <div className="glass-menu rounded-2xl p-2">
                        {item.children.map((c, j) => (
                          <SmartLink key={j} href={c.href} className="group flex items-start gap-3 rounded-xl p-3 hover:bg-white/[0.08] transition-colors">
                            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-gold-light to-gold text-ink">
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                            </span>
                            <span>
                              <span className="block text-[0.92rem] font-bold text-white">{c.label}</span>
                              {c.description && <span className="block text-xs text-white/55 mt-0.5">{c.description}</span>}
                            </span>
                          </SmartLink>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={`tel:${site.phone}`} className="hdr-phone hidden 2xl:flex group">
              <span className="hdr-icon">
                <Phone className="h-4 w-4 text-gold" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.65rem] uppercase tracking-widest opacity-50">{t('Free consultation')}</span>
                <span className="block text-sm font-bold">{site.phoneDisplay}</span>
              </span>
            </a>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            {header.showLogin && (
              <Link href={accountHref} className="hdr-icon !hidden md:!grid" aria-label={me ? t('My account') : t('Client login')} title={me ? me.name : t('Client login')}>
                <User className="h-4 w-4" />
              </Link>
            )}
            {header.cta.label && (
              <SmartLink href={header.cta.href} className="btn btn-gold btn-sm hdr-cta hidden sm:inline-flex">
                {header.cta.label} <ArrowUpRight className="h-4 w-4" />
              </SmartLink>
            )}
            <button onClick={() => setOpen(true)} className="hdr-icon lg:!hidden" aria-label={t('Menu')}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="glass-drawer absolute right-0 top-0 h-full w-[88%] max-w-sm text-white flex flex-col overflow-y-auto"
            >
              <div className="absolute inset-0 bg-pattern opacity-[0.05] pointer-events-none" />
              <div className="relative flex items-center justify-between p-5 border-b border-white/10">
                <Logo src={site.logoLight || site.logo} name={site.name} />
                <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15" aria-label={t('Close')}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="relative p-5 flex-1">
                {header.menu.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }} className="border-b border-white/10">
                    <SmartLink href={item.href} className={cn('block py-4 font-display text-2xl', isActive(item.href) ? 'text-gold' : 'text-white')}>
                      {item.label}
                    </SmartLink>
                    {item.children?.length ? (
                      <div className="pb-3 pl-3 space-y-1">
                        {item.children.map((c, j) => (
                          <SmartLink key={j} href={c.href} className="block py-1.5 text-sm text-white/65 hover:text-gold">
                            — {c.label}
                          </SmartLink>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
                {header.showLogin && (
                  <Link href={accountHref} className="mt-5 flex items-center gap-2 text-white/80">
                    <User className="h-4 w-4 text-gold" /> {me ? `${t('My account')} (${me.name})` : t('Client login / Register')}
                  </Link>
                )}
              </nav>
              <div className="relative p-5 space-y-3 border-t border-white/10">
                <LanguageSwitcher variant="drawer" />
                <SmartLink href={header.cta.href} className="btn btn-gold w-full">
                  {header.cta.label}
                </SmartLink>
                <a href={`tel:${site.phone}`} className="btn btn-ghost-light w-full">
                  <Phone className="h-4 w-4" /> {site.phoneDisplay}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
