'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calculator, Check, ChevronLeft, ChevronRight, Info, LoaderCircle, Minus, Plus, RotateCcw, Share2, X, CircleCheck, Mail, MapPin, Plane, User, Users, Baby, Stethoscope, Crown, FolderCheck, FolderPlus, FolderOpen } from 'lucide-react';
import type { EstimateOption, EstimateSettings } from '@/lib/estimate';
import { calculate, locationNeeded, money } from '@/lib/estimate';
import { Icon, SocialIcon } from '@/components/ui/Icon';
import { useLocale, useSite, useT } from '@/components/site/SiteProvider';
import { cn } from '@/lib/utils';
import { Dirham, withDirham } from '@/components/ui/Dirham';

type Step = 'category' | 'type' | 'location' | 'familyAsk' | 'sponsor' | 'family' | 'medical' | 'result';

/** Links to these anchors open the calculator pop-up (e.g. the menu's "Visa Calculator" button) */
const OPEN_HASHES = ['#calculator', '#cost-calculator', '#estimate'];

/**
 * Golden Visa cost calculator.
 * Step 1 (what describes you) sits on the page; choosing an answer opens a pop-up with
 * new/renewal → where are you now → family members → medical test → the estimate.
 */
export default function EstimateCalculator({ cfg }: { cfg: EstimateSettings }) {
  const t = useT();
  const categories = (cfg.categories || []).filter((c) => !c.hidden);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');

  // open automatically for /#calculator links — on arrival and on clicks while already on this page
  useEffect(() => {
    const fromHash = () => {
      if (OPEN_HASHES.includes(window.location.hash.toLowerCase())) {
        setCategory('');
        setOpen(true);
      }
    };
    fromHash();
    const late = window.setTimeout(fromHash, 120); // client-side navigation sets the hash a moment later
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank') return;
      let u: URL;
      try {
        u = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (u.origin !== window.location.origin || u.pathname !== window.location.pathname || !OPEN_HASHES.includes(u.hash.toLowerCase())) return;
      e.preventDefault();
      setCategory('');
      setOpen(true);
    };
    window.addEventListener('hashchange', fromHash);
    document.addEventListener('click', onClick, true);
    return () => {
      window.clearTimeout(late);
      window.removeEventListener('hashchange', fromHash);
      document.removeEventListener('click', onClick, true);
    };
  }, []);
  const close = () => {
    setOpen(false);
    if (OPEN_HASHES.includes(window.location.hash.toLowerCase())) history.replaceState(history.state, '', window.location.pathname + window.location.search);
  };

  return (
    <div className="estimate">
      <div className="estimate-card flex flex-col overflow-hidden">
        <CardHeader cfg={cfg} progress={1 / 8} />
        <div className="flex-1 px-5 pt-4 pb-5 sm:px-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
            {t('Step')} 1 {t('of')} 8
          </p>
          <h3 className="mt-1 text-[20px] font-extrabold leading-tight tracking-[-0.02em] !text-ink">{cfg.step1Title}</h3>
          <p className="mt-1 text-[14px] leading-snug text-ink/60">{cfg.step1Text}</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {categories.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setCategory(o.id);
                  setOpen(true);
                }}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl border p-3.5 text-start transition-all duration-300 hover:-translate-y-0.5',
                  category === o.id ? 'border-gold bg-gold/10 shadow-[0_12px_30px_-18px] shadow-gold' : 'border-ink/10 bg-white hover:border-gold/60 hover:shadow-[0_14px_30px_-20px_rgba(10,18,34,0.45)]'
                )}
              >
                <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors', category === o.id ? 'bg-gradient-to-br from-gold-light to-gold text-ink' : 'bg-sand text-gold-deep group-hover:bg-gold/15')}>
                  <Icon name={o.icon || 'star'} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-extrabold text-ink">{o.label}</span>
                  {o.description && <span className="mt-0.5 block text-[12.5px] leading-snug text-ink/55">{withDirham(o.description)}</span>}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink/25 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-deep rtl:rotate-180" />
              </button>
            ))}
          </div>
        </div>
        <CardFooter cfg={cfg} />
      </div>
      {cfg.footnote && <p className="estimate-note mt-4 text-center text-[13px] font-semibold opacity-60">{cfg.footnote}</p>}
      {open && <Wizard cfg={cfg} initialCategory={category} onClose={close} />}
    </div>
  );
}

function CardHeader({ cfg, progress }: { cfg: EstimateSettings; progress: number }) {
  const t = useT();
  return (
    <>
      <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-br from-ink-2 to-ink px-5 py-4 text-white sm:px-6">
        <span aria-hidden className="absolute -top-10 -end-6 h-32 w-32 rounded-full bg-gold/30 blur-2xl" />
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-light to-gold text-ink shadow-[0_8px_18px_-8px] shadow-gold">
          <Calculator className="h-5 w-5" />
        </span>
        <p className="relative min-w-0 flex-1 text-[17px] font-extrabold leading-tight">{cfg.title}</p>
        {cfg.badge && (
          <span className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-emerald-300 ring-1 ring-emerald-300/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
            <span className="hidden min-[400px]:inline">{cfg.badge}</span>
            <span className="min-[400px]:hidden">{t('Live')}</span>
          </span>
        )}
      </div>
      <div className="h-1 bg-ink/5">
        <div className="h-full bg-gradient-to-r from-gold-light via-gold to-gold-deep rtl:bg-gradient-to-l" style={{ width: `${progress * 100}%` }} />
      </div>
    </>
  );
}

function CardFooter({ cfg }: { cfg: EstimateSettings }) {
  const t = useT();
  const site = useSite();
  const wa = `https://wa.me/${(site?.whatsapp || '').replace(/\D/g, '')}?text=${encodeURIComponent(cfg.whatsappText)}`;
  return (
    <div className="flex items-center gap-3 border-t border-ink/5 bg-sand/40 px-5 py-3 sm:px-6">
      <span className="text-[12.5px] font-semibold text-ink/50">{t('Takes less than a minute')}</span>
      <a href={wa} target="_blank" rel="noopener noreferrer" className="group ms-auto inline-flex items-center gap-1 whitespace-nowrap text-[13.5px] font-extrabold text-gold-deep">
        {t('Get a free check')} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ pop-up */
function Wizard({ cfg, initialCategory, onClose }: { cfg: EstimateSettings; initialCategory: string; onClose: () => void }) {
  const t = useT();
  const site = useSite();
  const locale = useLocale();
  const types = (cfg.types || []).filter((c) => !c.hidden);
  const categories = (cfg.categories || []).filter((c) => !c.hidden);
  // opened from a menu link → the first question (what describes you) is asked inside the pop-up
  const askCategory = !initialCategory;
  const [category, setCategory] = useState(initialCategory);
  const cat = cfg.categories.find((c) => c.id === category);
  const [type, setType] = useState('');
  const [location, setLocation] = useState<'inside' | 'outside' | ''>('');
  // the applicant is always counted; the counters are the family members on top (start at 0)
  const [withFamily, setWithFamily] = useState<boolean | null>(null);
  const [famAdults, setFamAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const adults = 1 + (withFamily ? famAdults : 0);
  const kids = withFamily ? children : 0;
  const [medical, setMedical] = useState<'normal' | 'vip' | ''>('');
  const [sponsor, setSponsor] = useState<'open' | 'needs' | ''>('');
  const sponsorStep = !!cfg.allowDependents && !cfg.hideSponsorStep;
  const [step, setStep] = useState<Step>(askCategory ? 'category' : 'type');
  const [dir, setDir] = useState(1);
  const [mounted, setMounted] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const needLocation = locationNeeded(cfg, type);
  const steps: Step[] = [
    ...(askCategory ? (['category'] as Step[]) : []),
    'type',
    ...(needLocation ? (['location'] as Step[]) : []),
    ...(cfg.allowDependents ? (['familyAsk'] as Step[]) : []),
    ...(sponsorStep && withFamily ? (['sponsor'] as Step[]) : []),
    ...(cfg.allowDependents && withFamily ? (['family'] as Step[]) : []),
    'medical',
    'result',
  ];
  const idx = steps.indexOf(step);
  const typ = types.find((x) => x.id === type);
  const result = useMemo(() => calculate(cfg, { category, type, location, adults, children: kids, medical, sponsor: withFamily ? sponsor : '' }), [cfg, category, type, location, adults, kids, medical, withFamily, sponsor]);
  const fmtLocale = locale === 'ar' ? 'ar-AE' : locale === 'hi' ? 'en-IN' : 'en-US';
  const cur = cfg.currency || 'AED';
  const fmtN = (n: number) => n.toLocaleString(fmtLocale, { maximumFractionDigits: 2 });
  const fmt = (n: number) => money(n, cur, fmtLocale);
  const waNumber = (site?.whatsapp || '').replace(/\D/g, '');

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const go = (s: Step, d = 1) => {
    setDir(d);
    setStep(s);
  };
  const next = () => go(steps[Math.min(idx + 1, steps.length - 1)]);
  const back = () => (idx <= 0 ? onClose() : go(steps[idx - 1], -1));

  const summary = () =>
    [
      cfg.whatsappText,
      `• ${cat?.label || ''} · ${typ?.label || ''}${needLocation && location ? ' · ' + (location === 'inside' ? cfg.insideLabel : cfg.outsideLabel) : ''}`,
      `• ${cfg.adultLabel}: ${adults} · ${cfg.childLabel}: ${kids} · ${medical === 'vip' ? cfg.medicalVipLabel : cfg.medicalNormalLabel}`,
      ...result.groups.map((g) => `- ${g.label}${g.count > 1 ? ` ×${g.count}` : ''}: ${fmt(g.total)}`),
      `${cfg.totalLabel}: ${fmt(result.total)}`,
    ].join('\n');
  const waHref = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  const restart = () => {
    setType('');
    setLocation('');
    setWithFamily(null);
    setFamAdults(0);
    setChildren(0);
    setMedical('');
    setSponsor('');
    if (askCategory) setCategory('');
    go(askCategory ? 'category' : 'type', -1);
  };

  async function share() {
    const text = summary();
    const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] + '#calculator' : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: cfg.title, text, url });
        return;
      }
    } catch {
      return; // the visitor closed the share sheet
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }
  const [copied, setCopied] = useState(false);

  // sticky bottom button for steps that need one
  const cta =
    step === 'family'
      ? { label: t('Continue'), disabled: false, onClick: next }
      : step === 'medical'
        ? { label: t('Calculate'), disabled: !medical, onClick: next }
        : null;

  const logo = cfg.logo || site?.logo || '';

  const content = (
    <div className="rgv-wizard fixed inset-0 z-[1000] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={cfg.title}>
      <motion.div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#f7f5f0] text-ink shadow-2xl sm:h-auto sm:max-h-[min(92dvh,820px)] sm:max-w-[580px] sm:rounded-[28px]"
      >
        {/* header */}
        <div className="flex items-center gap-3 bg-white px-3.5 pt-3.5 pb-3 sm:px-5">
          <button type="button" onClick={back} className="inline-flex h-11 items-center gap-1 rounded-full bg-ink/[0.06] pe-4 ps-3 text-[14px] font-bold text-ink transition hover:bg-ink/10">
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> {t('Back')}
          </button>
          <div className="flex min-w-0 flex-1 justify-center">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={site?.name || ''} className="h-9 w-auto max-w-[170px] object-contain" />
            ) : (
              <span className="truncate text-[17px] font-extrabold tracking-tight">
                {(site?.name || 'RAK Golden Visa').replace(/Visa.*/, '')}
                <span className="text-gold-deep">Visa</span>
              </span>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label={t('Close')} className="grid h-11 w-11 place-items-center rounded-full bg-ink/[0.06] text-ink transition hover:bg-ink/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* progress */}
        {step !== 'result' && (
          <div className="flex gap-1.5 bg-white px-3.5 pb-3 sm:px-5">
            {[0, ...steps.map((_, i) => i + 1)].map((i) => (
              <span key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors duration-500', i < idx + 1 ? 'bg-gold-light' : i === idx + 1 ? 'bg-gold' : 'bg-ink/10')} />
            ))}
          </div>
        )}

        {/* body */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-4 pt-5 pb-6 sm:px-6">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div key={step} custom={dir} initial={{ opacity: 0, x: 28 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 * dir }} transition={{ duration: 0.22 }}>
              {step === 'category' && (
                <>
                  <StepTitle title={cfg.step1Title} text={cfg.step1Text} />
                  <div className="grid gap-3">
                    {categories.map((o) => (
                      <Choice
                        key={o.id}
                        on={category === o.id}
                        title={o.label}
                        text={o.description}
                        media={<Media image={o.image} icon={<Icon name={o.icon || 'star'} className="h-7 w-7" />} />}
                        onClick={() => {
                          setCategory(o.id);
                          go('type');
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 'type' && (
                <>
                  <StepTitle title={cfg.step2Title} text={cfg.step2Text} />
                  <div className="grid gap-3">
                    {types.map((o) => (
                      <Choice
                        key={o.id}
                        on={type === o.id}
                        title={o.label}
                        text={o.description}
                        media={<Media image={o.image} icon={<Icon name={o.icon || 'star'} className="h-7 w-7" />} />}
                        onClick={() => {
                          setType(o.id);
                          setDir(1);
                          setStep(locationNeeded(cfg, o.id) ? 'location' : cfg.allowDependents ? 'familyAsk' : 'medical');
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 'location' && (
                <>
                  <StepTitle title={cfg.locationTitle} text={cfg.locationText} />
                  <div className="grid gap-3">
                    {(['inside', 'outside'] as const).map((loc) => (
                      <Choice
                        key={loc}
                        on={location === loc}
                        title={loc === 'inside' ? cfg.insideLabel : cfg.outsideLabel}
                        text={loc === 'inside' ? cfg.insideText : cfg.outsideText}
                        media={<Media image={loc === 'inside' ? cfg.insideImage : cfg.outsideImage} icon={loc === 'inside' ? <MapPin className="h-7 w-7" /> : <Plane className="h-7 w-7" />} />}
                        onClick={() => {
                          setLocation(loc);
                          go(cfg.allowDependents ? 'familyAsk' : 'medical');
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 'familyAsk' && (
                <>
                  <StepTitle title={cfg.familyAskTitle} text={cfg.familyAskText} />
                  <div className="grid gap-3">
                    <Choice
                      on={withFamily === false}
                      title={cfg.justMeLabel}
                      text={cfg.justMeText}
                      media={<Media image={cfg.justMeImage} icon={<User className="h-7 w-7" />} />}
                      onClick={() => {
                        setWithFamily(false);
                        go('medical');
                      }}
                    />
                    <Choice
                      on={withFamily === true}
                      title={cfg.withFamilyLabel}
                      text={cfg.withFamilyText}
                      media={<Media image={cfg.withFamilyImage} icon={<Users className="h-7 w-7" />} />}
                      onClick={() => {
                        setWithFamily(true);
                        go(sponsorStep ? 'sponsor' : 'family');
                      }}
                    />
                  </div>
                  {cfg.familyAskNote && <Note>{cfg.familyAskNote}</Note>}
                </>
              )}

              {step === 'sponsor' && (
                <>
                  <StepTitle title={cfg.sponsorTitle} text={cfg.sponsorText} />
                  <div className="grid gap-3">
                    <Choice
                      on={sponsor === 'open'}
                      title={cfg.sponsorOpenLabel}
                      text={cfg.sponsorOpenText}
                      media={<Media image={cfg.sponsorOpenImage} icon={<FolderCheck className="h-7 w-7" />} />}
                      onClick={() => {
                        setSponsor('open');
                        go('family');
                      }}
                    />
                    <Choice
                      on={sponsor === 'needs'}
                      title={cfg.sponsorNeedsLabel}
                      text={[`${cur} ${fmtN(Number(cfg.sponsorFee) || 0)}`, cfg.sponsorNeedsText].filter(Boolean).join(' · ')}
                      media={<Media image={cfg.sponsorNeedsImage} icon={<FolderPlus className="h-7 w-7" />} gold />}
                      onClick={() => {
                        setSponsor('needs');
                        go('family');
                      }}
                    />
                  </div>
                </>
              )}

              {step === 'family' && (
                <>
                  <StepTitle title={cfg.familyTitle} text={cfg.familyText} />
                  <div className="grid gap-3">
                    <Counter
                      title={cfg.adultLabel}
                      text={cfg.adultText}
                      media={<Media image={cfg.adultImage} icon={<User className="h-7 w-7" />} badge={`${cfg.medicalMinAge}+`} />}
                      value={famAdults}
                      min={0}
                      max={Math.max(0, (Number(cfg.maxAdults) || 10) - 1)}
                      onChange={setFamAdults}
                    />
                    {(
                      <Counter
                        title={cfg.childLabel}
                        text={cfg.childText}
                        media={<Media image={cfg.childImage} icon={<Baby className="h-7 w-7" />} badge={`<${cfg.medicalMinAge}`} pink />}
                        value={children}
                        min={0}
                        max={Number(cfg.maxChildren) || 10}
                        onChange={setChildren}
                      />
                    )}
                  </div>
                  {cfg.familyNote && <Note>{cfg.familyNote}</Note>}
                </>
              )}

              {step === 'medical' && (
                <>
                  <StepTitle title={cfg.medicalTitle} text={cfg.medicalText} />
                  <div className="grid gap-3">
                    {(['normal', 'vip'] as const).map((m) => (
                      <Choice
                        key={m}
                        on={medical === m}
                        title={m === 'vip' ? cfg.medicalVipLabel : cfg.medicalNormalLabel}
                        text={m === 'vip' ? cfg.medicalVipNote : cfg.medicalNormalNote}
                        price={`${cur} ${fmtN(Number(m === 'vip' ? cfg.medicalVip : cfg.medicalNormal) || 0)}`}
                        media={<Media image={m === 'vip' ? cfg.medicalVipImage : cfg.medicalNormalImage} icon={m === 'vip' ? <Crown className="h-7 w-7" /> : <Stethoscope className="h-7 w-7" />} gold={m === 'vip'} />}
                        onClick={() => setMedical(m)}
                      />
                    ))}
                  </div>
                  {cfg.medicalNote && <Note>{cfg.medicalNote}</Note>}
                </>
              )}

              {step === 'result' && (
                <Result
                  cfg={cfg}
                  result={result}
                  cur={cur}
                  fmtN={fmtN}
                  subtitle={[cat?.label, typ?.label, needLocation && location ? (location === 'inside' ? cfg.insideLabel : cfg.outsideLabel) : '', medical === 'vip' ? cfg.medicalVipLabel : cfg.medicalNormalLabel].filter(Boolean).join(' · ')}
                  waHref={waHref(summary())}
                  summary={summary}
                  service={`${cat?.label || 'Golden Visa'} (${typ?.label || ''})`}
                />
              )}

              {step !== 'result' && waNumber && (
                <p className="mt-6 text-center">
                  <a href={waHref(cfg.whatsappText)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[14px] font-bold text-ink/70 underline decoration-ink/25 underline-offset-4 hover:text-gold-deep">
                    <SocialIcon name="whatsapp" className="h-4 w-4 text-[#25D366]" /> {t('Not sure? Ask us on WhatsApp')}
                  </a>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* sticky bottom */}
        {cta && (
          <div className="border-t border-ink/5 bg-white px-4 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:px-6">
            <button type="button" disabled={cta.disabled} onClick={cta.onClick} className="btn btn-gold w-full !py-4 text-[16px] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0">
              {cta.label}
            </button>
          </div>
        )}
        {step === 'result' && (
          <div className="border-t border-ink/5 bg-white px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <div className="grid grid-cols-3">
              <BarButton onClick={restart} icon={<RotateCcw className="h-5 w-5" />} label={t('Recalculate')} />
              <BarLink href={waHref(summary())} icon={<SocialIcon name="whatsapp" className="h-5 w-5 text-[#25D366]" />} label={t('WhatsApp')} />
              <BarButton onClick={share} icon={copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Share2 className="h-5 w-5" />} label={copied ? t('Copied') : t('Share')} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
  return mounted ? createPortal(content, document.body) : null;
}

function StepTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-[24px] font-extrabold leading-tight tracking-[-0.02em] !text-ink sm:text-[26px]">{title}</h3>
      {text && <p className="mt-1.5 text-[14px] leading-snug text-ink/60">{text}</p>}
    </div>
  );
}

/** Round picture (uploaded in the admin) or a gold icon medallion */
function Media({ image, icon, badge, gold, pink }: { image?: string; icon: React.ReactNode; badge?: string; gold?: boolean; pink?: boolean }) {
  return (
    <span className={cn('relative grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full p-[3px] sm:h-[72px] sm:w-[72px]', pink ? 'bg-gradient-to-br from-rose-300 to-gold' : 'bg-gradient-to-br from-gold-light via-gold to-gold-deep')}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-full w-full rounded-full bg-white object-cover" />
      ) : (
        <span className={cn('grid h-full w-full place-items-center rounded-full', gold ? 'bg-gradient-to-br from-ink-2 to-ink text-gold-light' : 'bg-gradient-to-br from-white to-sand text-gold-deep')}>{icon}</span>
      )}
      {badge && <span className="absolute -bottom-1 -end-1 rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-extrabold text-gold-light ring-2 ring-white">{badge}</span>}
    </span>
  );
}

function Choice({ on, title, text, price, media, onClick }: { on: boolean; title: string; text?: string; price?: string; media: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'group flex w-full items-center gap-4 rounded-[22px] border bg-white p-3.5 text-start transition-all duration-200 sm:p-4',
        on ? 'border-gold bg-gold/[0.07] shadow-[0_14px_30px_-20px] shadow-gold ring-1 ring-gold' : 'border-ink/8 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_14px_30px_-22px_rgba(10,18,34,0.5)]'
      )}
    >
      {media}
      <span className="min-w-0 flex-1">
        <span className="block text-[17px] font-extrabold leading-tight text-ink">{title}</span>
        {text && <span className="mt-1 block text-[13.5px] leading-snug text-ink/60">{withDirham(text)}</span>}
      </span>
      {price && (
        <span className="shrink-0 text-[16px] font-extrabold tabular-nums text-ink" dir="ltr">
          {withDirham(price)}
        </span>
      )}
      {on ? (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold text-ink">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      ) : (
        <ChevronRight className="h-5 w-5 shrink-0 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-gold-deep rtl:rotate-180" />
      )}
    </button>
  );
}

function Counter({ title, text, media, value, min, max, onChange }: { title: string; text?: string; media: React.ReactNode; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const t = useT();
  return (
    <div className="flex items-center gap-3.5 rounded-[22px] border border-ink/8 bg-white p-3.5 sm:gap-4 sm:p-4">
      {media}
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-extrabold leading-tight text-ink">{title}</p>
        {text && <p className="mt-1 text-[13px] leading-snug text-ink/60">{text}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-1 rounded-full bg-ink/[0.05] p-1" dir="ltr">
        <button type="button" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} aria-label={`${t('Remove')} ${title}`} className="grid h-10 w-10 place-items-center rounded-full bg-white text-gold-deep shadow-sm transition hover:bg-gold/10 disabled:bg-transparent disabled:text-gold-deep/30 disabled:shadow-none sm:h-11 sm:w-11">
          <Minus className="h-4 w-4" strokeWidth={3} />
        </button>
        <span className="w-7 text-center text-[19px] font-extrabold tabular-nums text-ink" aria-live="polite">
          {value}
        </span>
        <button type="button" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} aria-label={`${t('Add')} ${title}`} className="grid h-10 w-10 place-items-center rounded-full bg-white text-gold-deep shadow-sm transition hover:bg-gold/10 disabled:bg-transparent disabled:text-gold-deep/30 disabled:shadow-none sm:h-11 sm:w-11">
          <Plus className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 flex items-start gap-2.5 rounded-2xl border border-ink/8 bg-white px-4 py-3 text-[13.5px] leading-snug text-ink/70">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" /> <span>{children}</span>
    </p>
  );
}

function BarButton({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1 rounded-xl py-2 text-[12.5px] font-bold text-ink transition hover:bg-ink/[0.04]">
      {icon}
      {label}
    </button>
  );
}
function BarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-xl py-2 text-[12.5px] font-bold text-ink transition hover:bg-ink/[0.04]">
      {icon}
      {label}
    </a>
  );
}

/* ------------------------------------------------------------------ result */
function Result({
  cfg,
  result,
  cur,
  fmtN,
  subtitle,
  waHref,
  summary,
  service,
}: {
  cfg: EstimateSettings;
  result: ReturnType<typeof calculate>;
  cur: string;
  fmtN: (n: number) => string;
  subtitle: string;
  waHref: string;
  summary: () => string;
  service: string;
}) {
  const t = useT();
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [showLead, setShowLead] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const amt = (n: number) => (
    <span className="whitespace-nowrap tabular-nums" dir="ltr">
      {cur === 'AED' ? <Dirham className="opacity-80" /> : <span className="me-1 text-[0.8em] font-bold opacity-70">{cur}</span>}
      {fmtN(n)}
    </span>
  );
  const icon = (k: string) =>
    k === 'child' ? <Baby className="h-5 w-5" /> : k === 'application' ? <Icon name="file-check" className="h-5 w-5" /> : k === 'sponsor' ? <FolderOpen className="h-5 w-5" /> : <User className="h-5 w-5" />;

  async function sendLead(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, service, message: summary(), source: 'Cost calculator · ' + window.location.pathname }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Error');
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink/70">{cfg.resultTitle}</p>
      {subtitle && <p className="mt-1 text-[13px] text-ink/55">{subtitle}</p>}

      <div className="mt-4 grid gap-3">
        {result.groups.map((g, gi) => (
          <motion.div key={g.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * gi }} className="overflow-hidden rounded-[22px] border border-ink/8 bg-white">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-full ring-2', g.key === 'child' ? 'bg-rose-50 text-rose-500 ring-rose-200' : 'bg-gold/10 text-gold-deep ring-gold/40')}>{icon(g.key)}</span>
              <p className="min-w-0 flex-1 text-[16.5px] font-extrabold text-ink">{g.label}</p>
              <p className="text-[16.5px] font-extrabold text-ink">{amt(g.each)}</p>
            </div>
            <ul className="border-t border-ink/8 px-4 py-2.5">
              {g.lines.map((l, i) => (
                <li key={i} className="flex items-baseline gap-2 py-1.5 text-[14px]">
                  <span className="min-w-0 text-ink/70">{l.label}</span>
                  <span aria-hidden className="mx-1 min-w-4 flex-1 border-b border-dotted border-ink/25" />
                  <span className="shrink-0 font-bold text-ink">{amt(l.amount)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* summary + total */}
      <div className="mt-3 overflow-hidden rounded-[22px] border border-ink/8 bg-white">
        <ul className="px-4 py-1.5">
          {result.groups.map((g) => (
            <li key={g.key} className="flex items-center justify-between gap-3 border-b border-ink/5 py-2.5 text-[15px] last:border-0">
              <span className="font-bold text-ink">
                {g.count > 1 ? `${g.count} ${g.key === 'child' ? cfg.childLabel : g.key === 'adult' ? cfg.adultLabel : g.label}` : g.label}
                {g.count > 1 && <span className="ms-1.5 text-[12.5px] font-semibold text-ink/40">× {amt(g.each)}</span>}
              </span>
              <span className="font-extrabold text-ink">{amt(g.total)}</span>
            </li>
          ))}
        </ul>
        <div className="relative bg-gradient-to-br from-ink-2 to-ink px-4 py-5 text-center text-white">
          <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-light via-gold to-gold-deep" />
          <p className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-gold-light">{cfg.totalLabel}</p>
          <p className="mt-1 font-display text-[40px] font-bold leading-none text-gold-gradient">{amt(result.total)}</p>
        </div>
      </div>
      {cfg.resultText && <p className="mt-2.5 text-center text-[12.5px] leading-snug text-ink/55">{cfg.resultText}</p>}

      <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-[16px] font-extrabold text-white shadow-[0_14px_30px_-14px_#25D366] transition hover:-translate-y-0.5 hover:bg-[#1fbd59]">
        <SocialIcon name="whatsapp" className="h-5 w-5" /> {cfg.whatsappLabel}
      </a>

      <div className="mt-3 rounded-2xl border border-ink/8 bg-white p-4">
        {sent ? (
          <p className="flex items-center gap-2 text-[14px] font-bold text-emerald-700">
            <CircleCheck className="h-5 w-5" /> {cfg.leadThanks}
          </p>
        ) : !showLead ? (
          <button type="button" onClick={() => setShowLead(true)} className="flex w-full items-center gap-2 text-start text-[14px] font-bold text-ink">
            <Mail className="h-4 w-4 text-gold-deep" /> <span className="flex-1">{cfg.leadTitle}</span> <ChevronRight className="h-4 w-4 text-ink/40 rtl:rotate-180" />
          </button>
        ) : (
          <form onSubmit={sendLead} className="grid gap-2">
            <p className="text-[13.5px] font-extrabold text-ink">{cfg.leadTitle}</p>
            <input required className="field !py-2.5" placeholder={t('Your name')} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
            <div className="grid gap-2 sm:grid-cols-2">
              <input required className="field !py-2.5" type="tel" placeholder={t('Phone / WhatsApp')} value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
              <input className="field !py-2.5" type="email" placeholder={t('Email (optional)')} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
            </div>
            {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-[13px] text-red-600">{error}</p>}
            <button disabled={sending} className="btn btn-dark">
              {sending && <LoaderCircle className="h-4 w-4 animate-spin" />} {cfg.leadButton}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
