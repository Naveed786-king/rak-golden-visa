'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calculator, Check, Pencil, Plus, X, LoaderCircle, RotateCcw, CircleCheck } from 'lucide-react';
import type { EstimateSettings, Person } from '@/lib/estimate';
import { calculate, money, personAge } from '@/lib/estimate';
import { Icon, SocialIcon } from '@/components/ui/Icon';
import { useLocale, useSite, useT } from '@/components/site/SiteProvider';
import { cn } from '@/lib/utils';

const todayUae = () => new Date(Date.now() + 4 * 3600_000).toISOString().slice(0, 10);

export default function EstimateCalculator({ cfg }: { cfg: EstimateSettings }) {
  const t = useT();
  const site = useSite();
  const locale = useLocale();
  const categories = (cfg.categories || []).filter((c) => !c.hidden);
  const types = (cfg.types || []).filter((c) => !c.hidden);
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState(todayUae());
  const [people, setPeople] = useState<Person[]>([{ kind: 'main', dob: '', age: '', location: '', medical: '' }]);
  const [error, setError] = useState('');
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const cat = categories.find((c) => c.id === category);
  const typ = types.find((c) => c.id === type);
  const noLoc = !!typ?.noLocationFees;
  const result = useMemo(() => calculate(cfg, { category, type, date, people, medicalWord: t('Medical test') }), [cfg, category, type, date, people, t]);
  const fmt = (n: number) => money(n, cfg.currency || 'AED', locale === 'ar' ? 'ar-AE' : 'en-US');
  const total = 3;
  const progress = Math.min(step, total) / total;

  const kindLabel = (p: Person, i: number) => (p.kind === 'main' ? t('Main applicant') : p.kind === 'spouse' ? t('Spouse') : `${t('Child')} ${people.slice(0, i).filter((x) => x.kind === 'child').length + 1}`);

  function update(i: number, patch: Partial<Person>) {
    setPeople((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));
    setError('');
  }

  function next() {
    if (step === 3) {
      const bad = people.some((p) => personAge(p, date) === null || (!noLoc && !p.location));
      if (bad) {
        setError(noLoc ? t('Please enter the age of every applicant') : t('Please enter the age and location of every applicant'));
        return;
      }
    }
    setError('');
    setStep((s) => s + 1);
  }

  const summary = () =>
    [
      cfg.whatsappText,
      `• ${cat?.label || ''} · ${typ?.label || ''}`,
      ...people.map((p, i) => `• ${kindLabel(p, i)}: ${personAge(p, date) ?? '?'} ${t('years')}${p.location ? ' · ' + (p.location === 'inside' ? t('Inside the UAE') : t('Outside the UAE')) : ''}`),
      ...result.lines.map((l) => `- ${l.label}${l.qty > 1 ? ` ×${l.qty}` : ''}: ${fmt(l.total)}`),
      `${t('Total')}: ${fmt(result.total)}`,
    ].join('\n');
  const waHref = `https://wa.me/${(site?.whatsapp || '').replace(/\D/g, '')}?text=${encodeURIComponent(step > 3 ? summary() : cfg.whatsappText)}`;

  async function sendLead(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, service: `${cat?.label || 'Golden Visa'} (${typ?.label || ''})`, message: summary(), source: 'Cost calculator · ' + (typeof window !== 'undefined' ? window.location.pathname : '') }),
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

  const answers = [
    cat && { label: cat.label, go: 1 },
    typ && { label: typ.label, go: 2 },
  ].filter(Boolean) as { label: string; go: number }[];

  return (
    <div className="estimate">
      <div className="estimate-card flex flex-col overflow-hidden">
        {/* header */}
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
          <motion.div className="h-full bg-gradient-to-r from-gold-light via-gold to-gold-deep rtl:bg-gradient-to-l" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5 }} />
        </div>

        <div className="flex-1 px-5 pt-4 pb-5 sm:px-6">
          {answers.length > 0 && step <= 3 && (
            <ul className="mb-4 flex flex-wrap gap-1.5" aria-label={t('Your answers')}>
              {answers.map((a) => (
                <li key={a.go}>
                  <button type="button" onClick={() => setStep(a.go)} title={t('Change this answer')} className="group inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-sand/70 py-1 pe-2 ps-2.5 text-[12.5px] font-bold text-ink transition-colors hover:border-gold hover:text-gold-deep">
                    <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                    {a.label}
                    <Pencil className="h-2.5 w-2.5 text-ink/40 group-hover:text-gold-deep" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>
              {step <= 3 && (
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
                  {t('Step')} {step} {t('of')} {total}
                </p>
              )}

              {(step === 1 || step === 2) && (
                <>
                  <h3 className="mt-1 text-[20px] font-extrabold leading-tight tracking-[-0.02em] !text-ink">{step === 1 ? cfg.step1Title : cfg.step2Title}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink/60">{step === 1 ? cfg.step1Text : cfg.step2Text}</p>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {(step === 1 ? categories : types).map((o) => {
                      const on = (step === 1 ? category : type) === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            if (step === 1) setCategory(o.id);
                            else setType(o.id);
                            setStep(step + 1);
                          }}
                          className={cn(
                            'group flex items-center gap-3 rounded-2xl border p-3.5 text-start transition-all duration-300 hover:-translate-y-0.5',
                            on ? 'border-gold bg-gold/10 shadow-[0_12px_30px_-18px] shadow-gold' : 'border-ink/10 bg-white hover:border-gold/60 hover:shadow-[0_14px_30px_-20px_rgba(10,18,34,0.45)]'
                          )}
                        >
                          <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors', on ? 'bg-gradient-to-br from-gold-light to-gold text-ink' : 'bg-sand text-gold-deep group-hover:bg-gold/15')}>
                            <Icon name={o.icon || 'star'} className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-extrabold text-ink">{o.label}</span>
                            {o.description && <span className="mt-0.5 block text-[12.5px] leading-snug text-ink/55">{o.description}</span>}
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-ink/25 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-deep rtl:rotate-180" />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="mt-1 text-[20px] font-extrabold leading-tight tracking-[-0.02em] !text-ink">{cfg.step3Title}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink/60">{cfg.step3Text}</p>
                  <label className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-sand/70 px-3.5 py-2.5">
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.06em] text-ink">{t('Application date')}</span>
                    <input className="min-h-10 rounded-xl border border-ink/10 bg-white px-2.5 text-[14px] font-bold text-ink" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <span className="w-full text-[12px] text-ink/50">{t('Ages are counted on this date, in UAE time.')}</span>
                  </label>

                  <ul className="mt-3 grid gap-3">
                    {people.map((p, i) => {
                      const age = personAge(p, date);
                      const needsMedical = age !== null && age >= cfg.medicalMinAge;
                      return (
                        <li key={i} className="rounded-2xl border border-ink/10 bg-white p-3.5">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-[15px] font-extrabold text-ink">{kindLabel(p, i)}</p>
                            {p.kind !== 'main' && (
                              <button type="button" onClick={() => setPeople((ps) => ps.filter((_, j) => j !== i))} className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-red-50 hover:text-red-600" aria-label={t('Remove')}>
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <div className="mt-2 grid grid-cols-[1fr_92px] gap-2">
                            <label className="min-w-0">
                              <span className="block text-[12px] font-extrabold uppercase tracking-[0.06em] text-ink/50">{t('Date of birth')}</span>
                              <input max={date} className="mt-1 min-h-10 w-full min-w-0 rounded-xl border border-ink/10 bg-white px-2.5 text-[14px] text-ink" type="date" value={p.dob || ''} onChange={(e) => update(i, { dob: e.target.value })} />
                            </label>
                            <label className="min-w-0">
                              <span className="block truncate text-[12px] font-extrabold uppercase tracking-[0.06em] text-ink/50">{t('or age')}</span>
                              <input
                                inputMode="numeric"
                                min={0}
                                max={120}
                                placeholder={t('Age')}
                                disabled={!!p.dob}
                                className="mt-1 min-h-10 w-full rounded-xl border border-ink/10 bg-white px-2.5 text-[14px] text-ink disabled:opacity-45"
                                type="number"
                                value={p.dob ? age ?? '' : p.age ?? ''}
                                onChange={(e) => update(i, { age: e.target.value === '' ? '' : Number(e.target.value) })}
                              />
                            </label>
                          </div>
                          {!noLoc && (
                            <div className="mt-3" role="group" aria-label={t('Where are you now?')}>
                              <p className="text-[12px] font-extrabold uppercase tracking-[0.06em] text-ink/50">{t('Where are you now?')}</p>
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {(['inside', 'outside'] as const).map((loc) => (
                                  <Pill key={loc} on={p.location === loc} onClick={() => update(i, { location: loc })}>
                                    {loc === 'inside' ? t('Inside the UAE') : t('Outside the UAE')}
                                  </Pill>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="mt-3" role="group" aria-label={t('Medical test')}>
                            <p className="text-[12px] font-extrabold uppercase tracking-[0.06em] text-ink/50">{t('Medical test')}</p>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              <Pill on={needsMedical && p.medical !== 'vip'} disabled={!needsMedical} onClick={() => update(i, { medical: 'normal' })}>
                                {cfg.medicalNormalLabel} · {fmt(Number(cfg.medicalNormal) || 0)}
                              </Pill>
                              <Pill on={needsMedical && p.medical === 'vip'} disabled={!needsMedical} onClick={() => update(i, { medical: 'vip' })}>
                                {cfg.medicalVipLabel} · {fmt(Number(cfg.medicalVip) || 0)}
                              </Pill>
                            </div>
                            <p className="mt-1 text-[12.5px] text-ink/50">{age === null ? t('Enter the age first') : needsMedical ? '' : t('Not needed for children')}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {cfg.allowDependents && people.length - 1 < (cfg.maxDependents || 8) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {!people.some((p) => p.kind === 'spouse') && (
                        <button type="button" onClick={() => setPeople((ps) => [...ps, { kind: 'spouse', location: ps[0]?.location || '', medical: '' }])} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/60 px-3.5 py-2 text-[13px] font-bold text-gold-deep hover:bg-gold/10">
                          <Plus className="h-4 w-4" /> {t('Add spouse')}
                        </button>
                      )}
                      <button type="button" onClick={() => setPeople((ps) => [...ps, { kind: 'child', location: ps[0]?.location || '', medical: '' }])} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/60 px-3.5 py-2 text-[13px] font-bold text-gold-deep hover:bg-gold/10">
                        <Plus className="h-4 w-4" /> {t('Add child')}
                      </button>
                    </div>
                  )}

                  {error && <p className="mt-3 rounded-xl bg-red-50 px-3.5 py-2.5 text-[13px] font-semibold text-red-600">{error}</p>}
                  <button type="button" onClick={next} className="btn btn-gold mt-4 w-full">
                    {t('See the estimate')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </>
              )}

              {step > 3 && (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em] !text-ink">{cfg.resultTitle}</h3>
                    <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-1 text-[12.5px] font-bold text-ink/50 hover:text-gold-deep">
                      <Pencil className="h-3 w-3" /> {t('Edit')}
                    </button>
                  </div>
                  <p className="mt-1 text-[13px] text-ink/55">
                    {cat?.label} · {typ?.label} · {result.people} {result.people === 1 ? t('applicant') : t('applicants')}
                  </p>
                  <ul className="mt-4 divide-y divide-ink/5 rounded-2xl border border-ink/10 bg-white">
                    {result.lines.map((l, i) => (
                      <motion.li key={l.label + i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="flex items-start justify-between gap-3 px-4 py-3">
                        <span className="min-w-0">
                          <span className="block text-[14px] font-bold text-ink">{l.label}</span>
                          <span className="block text-[12px] text-ink/45">
                            {l.qty > 1 ? `${l.qty} × ${fmt(l.unit)}` : l.note || ''}
                          </span>
                        </span>
                        <span className="shrink-0 text-[14px] font-extrabold text-ink tabular-nums" dir="ltr">
                          {fmt(l.total)}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-to-br from-ink-2 to-ink px-4 py-4 text-white">
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-gold-light">{t('Estimated total')}</span>
                    <span className="font-display text-3xl font-bold text-gold-gradient tabular-nums" dir="ltr">
                      {fmt(result.total)}
                    </span>
                  </div>
                  {cfg.resultText && <p className="mt-2 text-[12.5px] leading-snug text-ink/55">{cfg.resultText}</p>}

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                      <SocialIcon name="whatsapp" className="h-4 w-4" /> {cfg.whatsappLabel}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setCategory('');
                        setType('');
                        setSent(false);
                        setPeople([{ kind: 'main', dob: '', age: '', location: '', medical: '' }]);
                      }}
                      className="btn btn-outline"
                    >
                      <RotateCcw className="h-4 w-4" /> {t('Start over')}
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl bg-sand/70 p-4">
                    {sent ? (
                      <p className="flex items-center gap-2 text-[14px] font-bold text-emerald-700">
                        <CircleCheck className="h-5 w-5" /> {cfg.leadThanks}
                      </p>
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
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 border-t border-ink/5 bg-sand/40 px-5 py-3 sm:px-6">
          {step > 1 && step <= 3 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-ink/60 hover:text-gold-deep">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t('Back')}
            </button>
          ) : (
            <span />
          )}
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="group ms-auto inline-flex items-center gap-1 whitespace-nowrap text-[13.5px] font-extrabold text-gold-deep">
            {cfg.whatsappLabel} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </a>
        </div>
      </div>
      {cfg.footnote && <p className="estimate-note mt-4 text-center text-[13px] font-semibold opacity-60">{cfg.footnote}</p>}
    </div>
  );
}

function Pill({ on, disabled, onClick, children }: { on?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={!!on}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13.5px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45',
        on ? 'border-gold bg-gold/15 text-ink' : 'border-ink/10 bg-white text-ink/70 hover:border-gold/60'
      )}
    >
      {on && <Check className="h-3.5 w-3.5 text-gold-deep" strokeWidth={3} />}
      {children}
    </button>
  );
}
