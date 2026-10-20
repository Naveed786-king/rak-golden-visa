'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Check, ShieldCheck } from 'lucide-react';
import type { MegaMenu as Mega } from '@/lib/defaults';
import SmartLink from '@/components/ui/SmartLink';
import { Icon, SocialIcon } from '@/components/ui/Icon';
import { useT } from './SiteProvider';

/** Big "Services" panel under the header (desktop). Everything is editable in Admin → Header & menu. */
export default function MegaMenu({ mega, ctaLabel, ctaHref }: { mega: Mega; ctaLabel?: string; ctaHref?: string }) {
  const t = useT();
  const groups = (mega.groups || []).filter((g) => g.links?.length);
  const count = groups.reduce((n, g) => n + g.links.filter((l) => !/^\/(#|services$)/.test(l.href)).length, 0);
  const bullets = String(mega.bullets || '')
    .split('\n')
    .map((b) => b.trim())
    .filter(Boolean);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="mega-wrap absolute inset-x-0 top-full z-50 pt-3"
    >
      <div className="mega glass-menu overflow-hidden rounded-[26px] text-white">
        <div className="grid grid-cols-[minmax(250px,300px)_1fr]">
          {/* intro */}
          <div className="mega-intro relative flex flex-col p-7">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-ink shadow-[0_14px_30px_-14px] shadow-gold">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-light">{count ? `${count} · ${mega.eyebrow}` : mega.eyebrow}</p>
            <p className="mt-2 font-display text-[1.85rem] font-semibold leading-[1.1] text-white">{mega.title}</p>
            {mega.text && <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{mega.text}</p>}
            {bullets.length > 0 && (
              <ul className="mt-5 space-y-2.5">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-white/80">
                    <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} /> {b}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* groups */}
          <div className="grid gap-x-6 gap-y-6 p-7" style={{ gridTemplateColumns: `repeat(${Math.min(4, Math.max(1, groups.length))}, minmax(0, 1fr))` }}>
            {groups.map((g, i) => (
              <div key={i} className="min-w-0">
                <p className="flex items-center gap-2 border-b border-white/10 pb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {g.title}
                </p>
                <ul className="mt-3 space-y-1">
                  {g.links.map((l, j) => (
                    <li key={j}>
                      <SmartLink href={l.href} className="group/l -mx-2 flex items-start gap-3 rounded-xl px-2 py-2 text-[14px] font-semibold leading-snug text-white/85 transition-colors hover:bg-white/[0.06] hover:text-gold-light">
                        <Icon name={l.icon || 'check'} className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold/80 transition-colors group-hover/l:text-gold" />
                        <span>{l.label}</span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 bg-white/[0.035] px-7 py-4">
          {mega.calculatorLabel && (
            <SmartLink href={mega.calculatorHref || '/#calculator'} className="btn btn-gold btn-sm">
              <Calculator className="h-4 w-4" /> {mega.calculatorLabel}
            </SmartLink>
          )}
          <SmartLink href="whatsapp" className="btn btn-sm bg-[#25D366] text-white hover:-translate-y-0.5 hover:bg-[#1fbd59]">
            <SocialIcon name="whatsapp" className="h-4 w-4" /> {t('WhatsApp')}
          </SmartLink>
          {ctaLabel && ctaHref && (
            <SmartLink href={ctaHref} className="btn btn-ghost-light btn-sm">
              {ctaLabel}
            </SmartLink>
          )}
          {mega.allLabel && (
            <SmartLink href={mega.allHref || '/services'} className="group/a ms-auto inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white/75 hover:text-gold">
              {mega.allLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover/a:translate-x-0.5 rtl:rotate-180" />
            </SmartLink>
          )}
        </div>
      </div>
    </motion.div>
  );
}
