'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus, TriangleAlert, CircleCheck, Quote, Star, ArrowRight, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import SmartLink from '@/components/ui/SmartLink';
import { cn } from '@/lib/utils';
import { useT } from '@/components/site/SiteProvider';

/* ---------------- Vertical tabs ---------------- */
export function TabsView({ items, dark, cta }: { items: any[]; dark?: boolean; cta?: any }) {
  const t = useT();
  const [active, setActive] = useState(0);
  const cur = items[active];
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="flex lg:flex-col gap-2 overflow-x-auto thin-scroll pb-2 lg:pb-0 -mx-1 px-1">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'group relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-bold transition-all',
              active === i ? 'bg-ink text-white shadow-xl' : dark ? 'text-white/70 hover:bg-white/5' : 'text-ink/70 hover:bg-white'
            )}
          >
            <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors', active === i ? 'bg-gold text-ink' : 'bg-gold/15 text-gold-deep')}>
              <Icon name={it.icon} className="h-4.5 w-4.5" />
            </span>
            <span className="whitespace-nowrap lg:whitespace-normal">{it.title}</span>
            {active === i && <motion.span layoutId="tab-dot" className="absolute right-4 hidden lg:block h-2 w-2 rounded-full bg-gold" />}
          </button>
        ))}
      </div>
      <div className={cn('box relative min-h-[320px] overflow-hidden rounded-[2rem] p-8 md:p-12', dark ? 'glass' : 'bg-white ring-1 ring-ink/5 shadow-[0_30px_60px_-40px_rgba(10,18,34,0.45)]')}>
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        <AnimatePresence mode="wait">
          {cur && (
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="relative">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-ink shadow-lg shadow-gold/30">
                <Icon name={cur.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-6 font-display text-3xl md:text-4xl font-semibold">{cur.title}</h3>
              <p className="mt-5 text-[0.98rem] leading-relaxed opacity-75 whitespace-pre-line">{cur.content}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <SmartLink href={cta?.href || '/apply'} className="btn btn-gold btn-sm">
                  {cta?.label || t('Check my eligibility')} <ArrowRight className="h-4 w-4" />
                </SmartLink>
                <SmartLink href="whatsapp" className={cn('btn btn-sm', dark ? 'btn-ghost-light' : 'btn-outline')}>
                  {t('Ask a consultant')}
                </SmartLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Problems & solutions ---------------- */
export function RejectionsView({ items, dark }: { items: any[]; dark?: boolean }) {
  const t = useT();
  const [active, setActive] = useState(0);
  const cur = items[active];
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn('rounded-full px-5 py-2.5 text-sm font-bold transition-all', active === i ? 'bg-ink text-gold shadow-lg' : dark ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-white text-ink/70 ring-1 ring-ink/10 hover:ring-gold')}
          >
            {it.tab || it.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {cur && (
          <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="mx-auto mt-10 max-w-4xl">
            <h3 className="text-center font-display text-3xl md:text-4xl font-semibold">{cur.title}</h3>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-7">
                <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-red-500">
                  <TriangleAlert className="h-5 w-5" /> {t('The issue')}
                </p>
                <p className="mt-3 leading-relaxed opacity-80">{cur.issue}</p>
              </div>
              <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.07] p-7">
                <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-emerald-600">
                  <CircleCheck className="h-5 w-5" /> {t('How to avoid')}
                </p>
                <p className="mt-3 leading-relaxed opacity-80">{cur.solution}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Accordion ---------------- */
export function AccordionView({ items, dark, html = false, limit = 0 }: { items: { title: string; content: string }[]; dark?: boolean; html?: boolean; limit?: number }) {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  // limit > 0: show the first `limit` questions, "Load more" reveals the next batch
  const step = limit > 0 ? limit : items.length;
  const [shown, setShown] = useState(step);
  const visible = items.slice(0, Math.max(shown, step));
  const left = items.length - visible.length;
  return (
    <div>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {visible.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={i >= step ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i >= step ? ((i - step) % step) * 0.05 : 0 }}
                className={cn('box overflow-hidden rounded-2xl transition-all', dark ? 'glass' : 'bg-white ring-1', !dark && (isOpen ? 'ring-gold/50 shadow-[0_20px_50px_-30px_rgba(10,18,34,0.35)]' : 'ring-ink/8'))}
              >
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-start" aria-expanded={isOpen}>
                  <span className={cn('font-bold text-[1.02rem]', isOpen && 'text-gold-deep')}>{it.title}</span>
                  <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all', isOpen ? 'bg-gold text-ink rotate-180' : 'bg-gold/15 text-gold-deep')}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      {html ? (
                        <div className="rte px-5 sm:px-6 pb-6 text-[0.95rem]" dangerouslySetInnerHTML={{ __html: it.content }} />
                      ) : (
                        <div className="rte px-5 sm:px-6 pb-6 text-[0.95rem]" dangerouslySetInnerHTML={{ __html: it.content.includes('<') ? it.content : it.content.replace(/\n/g, '<br/>') }} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {items.length > step && (
        <div className="mt-6 flex justify-center">
          {left > 0 ? (
            <button type="button" onClick={() => setShown(visible.length + step)} className={cn('btn btn-sm', dark ? 'btn-ghost-light' : 'btn-dark')}>
              {t('Load more questions')} <span className="opacity-60">({left})</span> <ChevronDown className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={() => { setShown(step); setOpen((o) => (o !== null && o >= step ? null : o)); }} className={cn('btn btn-sm', dark ? 'btn-ghost-light' : 'btn-dark')}>
              {t('Show fewer questions')} <ChevronUp className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Testimonials ---------------- */
/* Shows the first few reviews; "Show more" reveals the next batch, "Show fewer" folds them back. */
export function TestimonialsView({ items, dark, limit = 5 }: { items: any[]; dark?: boolean; limit?: number }) {
  const t = useT();
  const step = Math.max(1, Number(limit) || 5);
  const [shown, setShown] = useState(step);
  if (!items.length) return <p className="text-center opacity-60">{t('No testimonials yet.')}</p>;
  const visible = items.slice(0, shown);
  const more = items.length - shown;
  // Large screens: each group of 5 = two wide cards, then three narrow ones; a partial last group still fills its rows
  const span = (k: number) => {
    const g = Math.min(5, visible.length - Math.floor(k / 5) * 5);
    const j = k % 5;
    if (g === 1) return 'lg:col-span-6';
    if (g === 2 || g === 4) return 'lg:col-span-3';
    if (g === 3) return 'lg:col-span-2';
    return j < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
  };
  const less = () => {
    setShown(step);
    document.getElementById('reviews-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div id="reviews-top" className="scroll-mt-28">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <AnimatePresence initial={false}>
          {visible.map((r, k) => (
            <motion.figure
              key={r.id ?? k}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: k >= shown - step ? (k % step) * 0.06 : 0 }}
              className={cn(
                'card-lift relative flex h-full flex-col rounded-[2rem] p-8',
                span(k),
                visible.length % 2 === 1 && k === visible.length - 1 && 'md:col-span-2',
                dark ? 'glass' : 'bg-white ring-1 ring-ink/5 shadow-[0_25px_50px_-35px_rgba(10,18,34,0.35)]',
              )}
            >
              <Quote className="absolute right-7 top-7 h-10 w-10 text-gold/25" />
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4" fill={j < (r.rating || 5) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-[0.97rem] leading-relaxed opacity-80">“{r.text}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-current/10 pt-5">
                {r.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.avatar} alt={r.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/40" />
                ) : (
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold font-display text-xl font-bold text-ink">{(r.name || '?').charAt(0)}</span>
                )}
                <span>
                  <span className="block font-bold">{r.name}</span>
                  <span className="block text-xs opacity-60">{[r.role, r.country].filter(Boolean).join(' · ')}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
      {(more > 0 || shown > step) && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {more > 0 && (
            <button onClick={() => setShown((n) => n + step)} className="btn btn-gold">
              {t('Show more reviews')} <span className="opacity-70">(+{Math.min(more, step)})</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
          {shown > step && (
            <button onClick={less} className={cn('btn', dark ? 'btn-ghost-light' : 'btn-outline')}>
              {t('Show fewer reviews')} <ChevronUp className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Eligibility calculator ---------------- */
export function Calculator({ dark }: { dark?: boolean }) {
  const t = useT();
  const [path, setPath] = useState<'property' | 'deposit' | 'income' | 'professional'>('property');
  const [value, setValue] = useState(2000000);
  const [age, setAge] = useState(40);
  const [salary, setSalary] = useState(30000);
  const [years, setYears] = useState(15);

  const result = useMemo(() => {
    const out: { title: string; ok: boolean; text: string }[] = [];
    if (path === 'property' || path === 'deposit') {
      const label = path === 'property' ? t('Property in Ras Al Khaimah') : t('Fixed deposit in a UAE bank');
      out.push({
        title: t('10-Year Golden Visa (Investor)'),
        ok: value >= 2000000,
        text: value >= 2000000 ? `${label}: AED ${value.toLocaleString()} — ${t('meets the AED 2M threshold.')}` : `${t('You need more to reach AED 2M:')} AED ${(2000000 - value).toLocaleString()}`,
      });
      out.push({
        title: t('5-Year Retirement Visa'),
        ok: value >= 1000000 && age >= 55,
        text: age < 55 ? t('Available from age 55.') : value >= 1000000 ? t('Meets the AED 1M requirement for retirees aged 55+.') : t('Requires AED 1M or more.'),
      });
    } else if (path === 'income') {
      out.push({
        title: t('5-Year Retirement Visa (income route)'),
        ok: age >= 55 && salary * 12 >= 180000 && years >= 15,
        text: `${t('Requires age 55+, 15+ years of work and AED 180,000+ yearly income (AED 15,000/month).')} ${t('Your yearly income:')} AED ${(salary * 12).toLocaleString()}`,
      });
    } else {
      out.push({
        title: t('10-Year Golden Visa (Skilled professional)'),
        ok: salary >= 30000,
        text: salary >= 30000 ? t('Monthly salary meets the AED 30,000 requirement (degree + MOHRE level 1/2 also needed).') : t('Requires a monthly salary of AED 30,000 or more.'),
      });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, value, age, salary, years, t]);

  const anyOk = result.some((r) => r.ok);
  const tabs = [
    { k: 'property', l: t('Property') },
    { k: 'deposit', l: t('Bank deposit') },
    { k: 'income', l: t('Retirement income') },
    { k: 'professional', l: t('Professional') },
  ] as const;

  return (
    <div className={cn('grid gap-8 lg:grid-cols-2 rounded-[2.5rem] p-6 md:p-10', dark ? 'glass' : 'bg-white ring-1 ring-ink/10 shadow-2xl')}>
      <div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {tabs.map((t) => (
            <button key={t.k} onClick={() => setPath(t.k)} className={cn('rounded-xl px-3 py-2.5 text-xs font-bold transition', path === t.k ? 'bg-gold text-ink' : dark ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-sand text-ink/70')}>
              {t.l}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-7">
          {(path === 'property' || path === 'deposit') && (
            <Range label={path === 'property' ? t('Property value') : t('Deposit amount')} value={value} min={500000} max={5000000} step={50000} onChange={setValue} fmt={(v) => `AED ${v.toLocaleString()}`} />
          )}
          {path !== 'professional' && <Range label={t('Your age')} value={age} min={18} max={85} step={1} onChange={setAge} fmt={(v) => `${v} ${t('years')}`} />}
          {(path === 'income' || path === 'professional') && (
            <Range label={path === 'income' ? t('Monthly income / pension') : t('Monthly salary')} value={salary} min={5000} max={100000} step={1000} onChange={setSalary} fmt={(v) => `AED ${v.toLocaleString()}`} />
          )}
          {path === 'income' && <Range label={t('Years of employment')} value={years} min={0} max={45} step={1} onChange={setYears} fmt={(v) => `${v} ${t('years')}`} />}
        </div>
      </div>

      <div className={cn('relative overflow-hidden rounded-[2rem] p-7', anyOk ? 'bg-gradient-to-br from-gold-light via-gold to-gold-deep text-ink' : 'bg-ink text-white')}>
        <div className="absolute inset-0 bg-pattern opacity-15 mix-blend-overlay" />
        <div className="relative">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] opacity-70">{t('Your result')}</p>
          <AnimatePresence mode="wait">
            <motion.h3 key={String(anyOk)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={cn('mt-2 font-display text-4xl font-bold', anyOk ? '!text-ink' : '!text-white')}>
              {anyOk ? t('Good news — you may qualify!') : t('Not yet — but we can help')}
            </motion.h3>
          </AnimatePresence>
          <ul className="mt-6 space-y-4">
            {result.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className={cn('mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full', r.ok ? 'bg-emerald-600 text-white' : 'bg-white/20')}>
                  {r.ok ? <Check className="h-4 w-4" strokeWidth={3} /> : <X className="h-4 w-4" />}
                </span>
                <span>
                  <span className="block font-bold">{r.title}</span>
                  <span className="block text-sm opacity-75">{r.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <SmartLink href="/apply" className={cn('btn btn-sm', anyOk ? 'btn-dark' : 'btn-gold')}>
              {t('Start my application')} <ArrowRight className="h-4 w-4" />
            </SmartLink>
            <SmartLink href="whatsapp" className={cn('btn btn-sm', anyOk ? 'bg-white/80 text-ink' : 'btn-ghost-light')}>
              {t('Talk to an expert')}
            </SmartLink>
          </div>
          <p className="mt-5 text-[0.7rem] opacity-60">{t('Indicative only. Final eligibility is decided by UAE authorities.')}</p>
        </div>
      </div>
    </div>
  );
}

function Range({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; fmt: (n: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-end justify-between">
        <span className="text-sm font-bold opacity-70">{label}</span>
        <span className="font-display text-2xl font-bold text-gold">{fmt(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full h-2 rounded-full appearance-none cursor-pointer accent-[var(--brand-gold)]"
        style={{ background: `linear-gradient(90deg, var(--brand-gold) ${pct}%, rgba(127,127,127,.25) ${pct}%)` }}
      />
    </label>
  );
}
