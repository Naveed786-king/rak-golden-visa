'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Award, Check, Clock, Globe2, Lock, ShieldCheck, Users, FileCheck2, Headset } from 'lucide-react';
import SmartLink from '@/components/ui/SmartLink';
import Counter from '@/components/ui/Counter';
import { SocialIcon } from '@/components/ui/Icon';
import { lines } from '@/lib/utils';
import { useT, useLocalize } from '@/components/site/SiteProvider';
import { SERVICE_OPTIONS } from '@/lib/defaults';
import { COUNTRIES } from '@/lib/countries';

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

/** Quick-apply card (portal style): pick nationality + visa type, then continue to the application form */
function QuickApply({ title, subtitle }: { title?: string; subtitle?: string }) {
  const t = useT();
  const L = useLocalize();
  const router = useRouter();
  const [nat, setNat] = useState('');
  const [svc, setSvc] = useState(SERVICE_OPTIONS[0]);
  function go(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ service: svc });
    if (nat) q.set('nationality', nat);
    router.push(L('/apply') + '?' + q.toString());
  }
  return (
    <form onSubmit={go} className="qa-card fx-pop" style={{ '--d': '0.35s' } as any}>
      <div className="qa-head">
        <span className="qa-badge">
          <FileCheck2 className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="qa-title">{title || t('Apply for your visa')}</p>
          <p className="qa-sub">{subtitle || t('Start online in 2 minutes')}</p>
        </div>
      </div>
      <label className="qa-label">
        <Globe2 className="h-4 w-4" /> {t('I am a citizen of')}
      </label>
      <select value={nat} onChange={(e) => setNat(e.target.value)} className="qa-field" aria-label={t('I am a citizen of')}>
        <option value="">{t('Select your country')}</option>
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <label className="qa-label">
        <ShieldCheck className="h-4 w-4" /> {t('Visa type')}
      </label>
      <select value={svc} onChange={(e) => setSvc(e.target.value)} className="qa-field" aria-label={t('Visa type')}>
        {SERVICE_OPTIONS.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-gold qa-go">
        {t('Apply now')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </button>
      <div className="qa-foot">
        <span>
          <Lock className="h-3.5 w-3.5" /> {t('Secure & confidential')}
        </span>
        <SmartLink href="whatsapp" className="qa-wa">
          <SocialIcon name="whatsapp" className="h-3.5 w-3.5" /> {t('Ask on WhatsApp')}
        </SmartLink>
      </div>
    </form>
  );
}

const STAT_ICONS = [Award, Clock, Users, Headset];

export default function Hero({ data }: { data: any }) {
  const words = String(data.title || '').split(' ');
  const badges = lines(data.badges);
  const stats: { value: string; label: string }[] = data.stats || [];

  return (
    <section id={data.anchor || undefined} className="theme-dark hero-portal relative overflow-hidden">
      <div className="hp-bg absolute inset-0" aria-hidden>
        {data.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.image} alt="" className="hp-photo" fetchPriority="high" />
        ) : (
          <Skyline className="hp-sky" />
        )}
        <div className="hp-shade" />
      </div>

      <div className="container-x relative grid items-center gap-10 lg:gap-14 pt-12 pb-10 md:pt-16 lg:grid-cols-[1.2fr_minmax(0,430px)] lg:pt-20 lg:pb-16">
        <div className="hero-copy">
          {data.eyebrow && (
            <span className="fx-up hp-eyebrow">
              <ShieldCheck className="h-4 w-4" /> {data.eyebrow}
            </span>
          )}

          <h1 className="hp-title font-display">
            {words.map((w, i) => (
              <span key={i} className="fx-word inline-block me-[0.25em]" style={{ '--d': `${0.1 + i * 0.05}s` } as any}>
                {w}
              </span>
            ))}
            {data.highlight && (
              <span className="fx-word inline-block text-gold-gradient" style={{ '--d': `${0.15 + words.length * 0.05}s` } as any}>
                {data.highlight}
              </span>
            )}
          </h1>

          {data.subtitle && (
            <p style={{ '--d': '0.45s' } as any} className="fx-up hp-sub">
              {data.subtitle}
            </p>
          )}

          {badges.length > 0 && (
            <ul style={{ '--d': '0.6s' } as any} className="fx-up hp-badges">
              {badges.map((b, i) => (
                <li key={i}>
                  <span className="hp-tick">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          <div style={{ '--d': '0.7s' } as any} className="fx-up mt-8 flex flex-wrap gap-3">
            {data.primary?.label && (
              <SmartLink href={data.primary.href} className="btn btn-gold">
                {data.primary.label} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </SmartLink>
            )}
            {data.secondary?.label && (
              <SmartLink href={data.secondary.href} className={data.secondary.href === 'whatsapp' ? 'btn hp-wa' : 'btn btn-ghost-light'}>
                {data.secondary.href === 'whatsapp' && <SocialIcon name="whatsapp" className="h-4 w-4" />}
                {data.secondary.label}
              </SmartLink>
            )}
          </div>
        </div>

        <QuickApply title={data.cardTitle} subtitle={data.cardSubtitle} />
      </div>

      {stats.length > 0 && (
        <div className="container-x relative pb-10 lg:pb-14">
          <div className="hp-stats fx-up" style={{ '--d': '0.9s' } as any}>
            {stats.slice(0, 4).map((s, i) => {
              const I = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <div key={i} className="hp-stat">
                  <span className="hp-stat-ic">
                    <I className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <Counter value={s.value} className="hp-stat-v" />
                    <span className="hp-stat-l">{s.label}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
