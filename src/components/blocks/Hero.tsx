'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck, Users, Zap } from 'lucide-react';
import SmartLink from '@/components/ui/SmartLink';
import Counter from '@/components/ui/Counter';
import { SocialIcon } from '@/components/ui/Icon';
import { lines } from '@/lib/utils';
import { useT } from '@/components/site/SiteProvider';

export function Skyline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="sky-a" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Hajar mountains */}
      <path d="M0 170 L90 120 L160 150 L250 80 L330 140 L420 100 L520 160 L560 150 L560 260 L0 260Z" fill="currentColor" opacity="0.35" />
      {/* Towers */}
      <g fill="url(#sky-a)">
        <rect x="560" y="140" width="34" height="120" />
        <rect x="600" y="110" width="26" height="150" />
        <path d="M640 260 V90 L655 60 L670 90 V260Z" />
        <rect x="684" y="130" width="40" height="130" />
        <path d="M735 260 V70 Q750 20 765 70 V260Z" />
        <rect x="778" y="120" width="30" height="140" />
        <path d="M818 260 V40 L828 0 L838 40 V260Z" />
        <rect x="850" y="150" width="44" height="110" />
        <path d="M904 260 V100 Q924 80 944 100 V260Z" />
        <rect x="956" y="130" width="28" height="130" />
        <rect x="992" y="160" width="40" height="100" />
        <path d="M1040 260 V120 L1060 95 L1080 120 V260Z" />
      </g>
      {/* Dunes / sea */}
      <path d="M1080 200 Q1180 150 1280 190 T1440 170 V260 H1080Z" fill="currentColor" opacity="0.5" />
      <path d="M0 230 Q360 200 720 228 T1440 222 V260 H0Z" fill="currentColor" />
    </svg>
  );
}

function VisaCard({ title, subtitle }: { title?: string; subtitle?: string }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 150, damping: 15 });
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative mx-auto w-full max-w-[460px] [perspective:1200px]">
      {/* Back card */}
      <div className="absolute inset-0 translate-x-6 translate-y-8 rotate-6 rounded-[28px] glass" />
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative aspect-[1.586] rounded-[28px] p-7 overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3e2b3] via-gold to-[#7d5d22]" />
        <div className="absolute inset-0 bg-pattern opacity-25 mix-blend-multiply" />
        <motion.div style={{ left: glareX }} className="absolute -top-1/2 h-[200%] w-24 -translate-x-1/2 rotate-12 bg-white/35 blur-xl" />
        <div className="relative flex h-full flex-col justify-between text-ink" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.62rem] font-extrabold tracking-[0.3em] opacity-70">{t('UNITED ARAB EMIRATES')}</p>
              <p className="font-display text-2xl md:text-[1.7rem] font-bold leading-tight mt-1">{title || 'UAE Golden Residency'}</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
              <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5L3 8z" />
              <path d="M5 21h14" />
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-14 rounded-md bg-gradient-to-br from-[#fff3cf] to-[#b8913f] ring-1 ring-black/10 grid grid-cols-3 gap-px p-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="rounded-[2px] bg-black/10" />
              ))}
            </div>
            <p className="font-arabic text-xl opacity-80" dir="rtl">
              الإقامة الذهبية
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[0.6rem] font-bold tracking-[0.25em] opacity-60">{t('HOLDER')}</p>
              <p className="font-semibold tracking-wider">{t('YOUR NAME HERE')}</p>
            </div>
            <div className="text-right">
              <p className="text-[0.6rem] font-bold tracking-[0.25em] opacity-60">{t('VALIDITY')}</p>
              <p className="font-semibold tracking-wider">{subtitle || '10 YEARS'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute hidden sm:block -left-4 md:-left-12 -bottom-10 animate-float"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
            <Zap className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-ink/50">{t('Fast-track approval')}</p>
            <p className="text-sm font-extrabold text-ink">{t('In 48 working hours')}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute hidden sm:block -right-2 md:-right-8 -top-8 animate-float [animation-delay:2s]"
      >
        <div className="flex items-center gap-3 rounded-2xl glass px-4 py-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-white/60">{t('Sponsor your')}</p>
            <p className="text-sm font-bold">{t('Spouse, children & parents')}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero({ data }: { data: any }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const words = String(data.title || '').split(' ');
  const badges = lines(data.badges);
  const stats: { value: string; label: string }[] = data.stats || [];

  return (
    <section ref={ref} id={data.anchor || undefined} className="theme-dark relative overflow-hidden pt-16 pb-36 md:pt-24 md:pb-48">
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        {data.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image} alt="" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          </>
        ) : null}
        <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
        <div className="absolute -top-40 right-0 h-[620px] w-[620px] rounded-full bg-gold/20 blur-[140px]" />
        <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
      </motion.div>

      {data.arabic && (
        <p className="pointer-events-none absolute right-0 bottom-24 md:bottom-32 font-arabic text-[22vw] md:text-[13rem] leading-none text-gold/[0.05] select-none whitespace-nowrap" dir="rtl">
          {data.arabic}
        </p>
      )}

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          {data.eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold tracking-wide text-gold-light"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <ShieldCheck className="h-4 w-4" /> {data.eyebrow}
            </motion.span>
          )}

          <h1 className="mt-7 font-display text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[5.2rem] font-semibold text-white">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {w}
              </motion.span>
            ))}
            {data.highlight && (
              <motion.span
                className="inline-block italic text-gold-gradient pr-2"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2 + words.length * 0.06 }}
              >
                {data.highlight}
              </motion.span>
            )}
          </h1>

          {data.subtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-white/70">
              {data.subtitle}
            </motion.p>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="mt-9 flex flex-wrap gap-3">
            {data.primary?.label && (
              <SmartLink href={data.primary.href} className="btn btn-gold">
                {data.primary.label} <ArrowRight className="h-4 w-4" />
              </SmartLink>
            )}
            {data.secondary?.label && (
              <SmartLink href={data.secondary.href} className="btn btn-ghost-light">
                {data.secondary.href === 'whatsapp' && <SocialIcon name="whatsapp" className="h-4 w-4 text-[#25D366]" />}
                {data.secondary.label}
              </SmartLink>
            )}
          </motion.div>

          {badges.length > 0 && (
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {badges.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/75">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gold/20 text-gold">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>
          )}

          {stats.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-12 grid grid-cols-3 max-w-lg divide-x divide-white/10 border-t border-white/10 pt-8">
              {stats.slice(0, 3).map((s, i) => (
                <div key={i} className="px-4 first:pl-0">
                  <Counter value={s.value} className="block font-display text-4xl md:text-5xl font-bold text-gold-gradient" />
                  <span className="mt-1 block text-xs uppercase tracking-wider text-white/55">{s.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.2, 0.8, 0.2, 1] }} className="relative px-6 md:px-10 py-10">
          <VisaCard title={data.cardTitle} subtitle={data.cardSubtitle} />
        </motion.div>
      </div>

      <Skyline className="absolute bottom-0 left-0 w-full h-28 md:h-44 text-white/[0.04]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
