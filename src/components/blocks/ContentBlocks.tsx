import { ArrowRight, Check, Clock, MapPin, Phone, Mail, Calendar, Crown, Sparkles, Star } from 'lucide-react';
import { Section, Heading } from '@/components/ui/Section';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import SmartLink from '@/components/ui/SmartLink';
import Counter from '@/components/ui/Counter';
import { Icon, SocialIcon } from '@/components/ui/Icon';
import { cn, lines } from '@/lib/utils';
import type { SiteSettings } from '@/lib/defaults';
import { Skyline } from './Hero';
import T from '@/components/ui/T';

type P = { data: any; site: SiteSettings };

function Cta({ link, className = 'btn btn-gold', icon = true }: { link?: { label?: string; href?: string }; className?: string; icon?: boolean }) {
  if (!link?.label) return null;
  return (
    <SmartLink href={link.href} className={className}>
      {link.label === 'Get offer' ? <T>Get offer</T> : link.label} {icon && <ArrowRight className="h-4 w-4" />}
    </SmartLink>
  );
}

/* ---------------- Page header ---------------- */
export function PageHeader({ data }: P) {
  return (
    <section id={data.anchor || undefined} className="theme-dark relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
      {data.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink" />
        </>
      )}
      <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-gold/15 blur-[130px]" />
      <div className="container-x relative text-center">
        <Reveal>
          {data.eyebrow && <span className="eyebrow justify-center">{data.eyebrow}</span>}
          <h1 className="mt-5 font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-white">
            {data.title}
          </h1>
          {data.subtitle && <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">{data.subtitle}</p>}
          {(data.primary?.label || data.secondary?.label) && (
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Cta link={data.primary} />
              <Cta link={data.secondary} className="btn btn-ghost-light" icon={false} />
            </div>
          )}
        </Reveal>
      </div>
      <Skyline className="absolute bottom-0 left-0 w-full h-20 md:h-28 text-white/[0.04]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}

/* ---------------- Intro + price card ---------------- */
export function IntroSplit({ data, site }: P) {
  const bullets = lines(data.bullets);
  const feats = lines(data.cardFeatures);
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className={cn('grid gap-12 lg:gap-16', data.showCard && 'lg:grid-cols-[1.35fr_1fr]')}>
        <div>
          <Heading eyebrow={data.eyebrow} title={data.title} align="left" className="!mb-8" />
          <Reveal>
            {data.content && <div className="rte" dangerouslySetInnerHTML={{ __html: data.content }} />}
            {bullets.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white/60 px-4 py-3 text-sm font-semibold">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold text-ink">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {data.note && (
              <div className="mt-8 flex gap-4 rounded-2xl border-l-4 border-gold bg-sand p-5 text-sm leading-relaxed">
                <Clock className="h-5 w-5 shrink-0 text-gold-deep mt-0.5" />
                <p>{data.note}</p>
              </div>
            )}
          </Reveal>
        </div>
        {data.showCard && (
          <Reveal delay={0.15} className="lg:sticky lg:top-28 self-start">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 md:p-10 text-white shadow-[0_40px_80px_-40px_rgba(10,18,34,0.8)]">
              <div className="absolute inset-0 bg-pattern opacity-[0.07]" />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
                  <Crown className="h-3.5 w-3.5" /> <T>VIP SERVICE</T>
                </span>
                <h3 className="mt-5 font-display text-3xl font-semibold">{data.cardTitle}</h3>
                <ul className="mt-6 space-y-3">
                  {feats.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                      <Check className="h-4 w-4 text-gold" strokeWidth={3} /> {f}
                    </li>
                  ))}
                </ul>
                <div className="my-8 h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0" />
                {data.cardPrice ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">{data.cardPriceLabel}</p>
                    <p className="font-display text-5xl font-bold text-gold-gradient mt-1">{data.cardPrice}</p>
                  </>
                ) : null}
                <div className={data.cardPrice ? 'mt-8 grid gap-3' : 'grid gap-3'}>
                  <Cta link={data.cardCta} className="btn btn-gold w-full" />
                  <a href={`tel:${site.phone}`} className="btn btn-ghost-light w-full">
                    <Phone className="h-4 w-4" /> {site.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

/* ---------------- Steps ---------------- */
export function Steps({ data }: P) {
  const items: any[] = data.items || [];
  const dark = data.theme === 'dark';
  if (data.layout === 'timeline') {
    return (
      <Section theme={data.theme} anchor={data.anchor}>
        <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0" />
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.05} x={i % 2 ? 30 : -30} y={0} className={cn('relative mb-10 md:w-1/2 pl-20 md:pl-0', i % 2 ? 'md:ml-auto md:pl-14' : 'md:pr-14 md:text-right')}>
              <span className={cn('absolute top-1 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold font-display text-xl font-bold text-ink ring-8', dark ? 'ring-ink' : 'ring-sand', 'left-0', i % 2 ? 'md:-left-6' : 'md:left-auto md:-right-6')}>
                {i + 1}
              </span>
              <h3 className="font-display text-2xl font-semibold">{it.title}</h3>
              {it.text && <p className="mt-2 text-sm leading-relaxed opacity-70">{it.text}</p>}
            </Reveal>
          ))}
        </div>
      </Section>
    );
  }
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Stagger className={cn('grid gap-6 md:grid-cols-2', items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : '')}>
        {items.map((it, i) => (
          <StaggerItem key={i} className="relative">
            <div className={cn('card-lift group relative h-full overflow-hidden rounded-3xl p-7', dark ? 'glass' : 'bg-white shadow-[0_20px_50px_-35px_rgba(10,18,34,0.4)] ring-1 ring-ink/5')}>
              <span className="absolute -right-3 -top-6 font-display text-[7rem] font-bold leading-none text-gold/10 transition-colors group-hover:text-gold/20">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-ink shadow-lg shadow-gold/30 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                <Icon name={it.icon} className="h-6 w-6" />
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-semibold leading-snug">{it.title}</h3>
              {it.text && <p className="relative mt-3 text-sm leading-relaxed opacity-70">{it.text}</p>}
            </div>
            {i < items.length - 1 && <ArrowRight className="hidden lg:block absolute -right-5 top-1/2 z-10 h-5 w-5 text-gold" />}
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------- Feature cards ---------------- */
export function Features({ data }: P) {
  const items: any[] = data.items || [];
  const cols = data.columns === '2' ? 'md:grid-cols-2' : data.columns === '3' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4';
  const style = data.style || (data.theme === 'dark' ? 'glass' : 'cards');
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Stagger className={cn('grid gap-6', cols)}>
        {items.map((it, i) => {
          const bullets = lines(it.bullets);
          return (
            <StaggerItem key={i}>
              <div
                className={cn(
                  'card-lift group relative h-full overflow-hidden rounded-3xl p-7 md:p-8',
                  style === 'glass' && 'glass text-white',
                  style === 'cards' && 'bg-white ring-1 ring-ink/5 shadow-[0_20px_50px_-35px_rgba(10,18,34,0.35)]',
                  style === 'minimal' && 'border-t-2 border-gold/60 rounded-none !p-0 !pt-7 hover:!translate-y-0 hover:!shadow-none'
                )}
              >
                {style !== 'minimal' && <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-light to-gold transition-transform duration-500 group-hover:scale-x-100" />}
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/12 text-gold-deep ring-1 ring-gold/25 transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                  <Icon name={it.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-snug">{it.title}</h3>
                {it.subtitle && <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gold-deep">{it.subtitle}</p>}
                {it.text && <p className="mt-3 text-sm leading-relaxed opacity-70 whitespace-pre-line">{it.text}</p>}
                {bullets.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-sm opacity-80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={3} /> <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
      {data.cta?.label && (
        <div className="mt-12 text-center">
          <Cta link={data.cta} />
        </div>
      )}
    </Section>
  );
}

/* ---------------- Visit office ---------------- */
export function Visit({ data, site }: P) {
  return (
    <Section theme={data.theme || 'dark'} anchor={data.anchor}>
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <Reveal>
          <span className="eyebrow"><T>Visit us</T></span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold leading-tight">{data.title}</h2>
          {data.text && <p className="mt-5 text-base opacity-70 leading-relaxed">{data.text}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${site.phone}`} className="btn btn-gold">
              <Phone className="h-4 w-4" /> <T>Call</T> <span dir="ltr">{site.phoneDisplay}</span>
            </a>
            <SmartLink href="whatsapp" className="btn btn-ghost-light">
              <SocialIcon name="whatsapp" className="h-4 w-4 text-[#25D366]" /> <T>WhatsApp</T>
            </SmartLink>
            <SmartLink href="/contact-us" className={cn('btn', data.theme === 'dark' || !data.theme ? 'btn-ghost-light' : 'btn-outline')}>
              <Calendar className="h-4 w-4" /> <T>Book an Appointment</T>
            </SmartLink>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className={cn('box rounded-[2rem] p-2', data.theme === 'dark' || !data.theme ? 'glass' : 'bg-white shadow-xl ring-1 ring-ink/5')}>
            {data.showMap && site.mapEmbed && (
              <iframe src={site.mapEmbed} className="h-64 w-full rounded-[1.6rem] grayscale-[40%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office location" />
            )}
            <div className="grid gap-px sm:grid-cols-2 overflow-hidden rounded-[1.6rem]">
              <div className="p-6">
                <MapPin className="h-6 w-6 text-gold" />
                <p className="mt-3 text-xs font-bold uppercase tracking-widest opacity-50"><T>Address</T></p>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm leading-relaxed hover:text-gold">
                  {site.address}
                </a>
              </div>
              <div className="p-6">
                <Clock className="h-6 w-6 text-gold" />
                <p className="mt-3 text-xs font-bold uppercase tracking-widest opacity-50"><T>Operating hours</T></p>
                <p className="mt-1 text-sm">{site.hours}</p>
                <p className="text-sm opacity-60">{site.hoursClosed}</p>
                <Mail className="mt-5 h-6 w-6 text-gold" />
                <a href={`mailto:${site.emailVisa}`} className="mt-2 block text-sm hover:text-gold break-all">
                  {site.emailVisa}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- About + stats ---------------- */
export function About({ data }: P) {
  const stats: any[] = data.stats || [];
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className="grid gap-14 lg:grid-cols-2 items-center">
        <Reveal x={-30} y={0} className="relative">
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden rounded-[2.5rem] bg-ink">
            {data.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.image} alt={data.title || ''} className="h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-pattern opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-gold/30 via-transparent to-transparent" />
                <Skyline className="absolute bottom-0 left-0 h-1/2 w-full text-gold/25" />
                <div className="absolute inset-0 grid place-items-center">
                  <Crown className="h-24 w-24 text-gold" strokeWidth={1} />
                </div>
              </div>
            )}
          </div>
          {stats[0] && (
            <div className="absolute -bottom-8 right-0 lg:-right-6 rounded-3xl bg-gradient-to-br from-gold-light to-gold p-6 text-ink shadow-2xl animate-float">
              <Counter value={stats[0].value} className="block font-display text-5xl font-bold" />
              <p className="text-xs font-bold uppercase tracking-wider">{stats[0].label}</p>
            </div>
          )}
        </Reveal>
        <div>
          <Heading eyebrow={data.eyebrow} title={data.title} align="left" className="!mb-6" />
          <Reveal>
            {data.content && <div className="rte" dangerouslySetInnerHTML={{ __html: data.content }} />}
            {stats.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className={cn('box rounded-2xl p-5', data.theme === 'dark' ? 'glass' : 'bg-sand')}>
                    <Counter value={s.value} className="block font-display text-4xl font-bold text-gold-deep" />
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider opacity-60">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
            {data.cta?.label && (
              <div className="mt-8">
                <Cta link={data.cta} />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Benefits checklist ---------------- */
export function Checklist({ data }: P) {
  const items = lines(data.items);
  const dark = data.theme === 'dark';
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className={cn('grid gap-12 items-center', data.image && 'lg:grid-cols-2')}>
        <div>
          <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} align={data.image ? 'left' : 'center'} />
          <Stagger className={cn('grid gap-3', data.image ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto')}>
            {items.map((b, i) => (
              <StaggerItem key={i}>
                <div className={cn('box group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors', dark ? 'glass hover:bg-white/10' : 'bg-white ring-1 ring-ink/5 hover:ring-gold/40')}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold text-ink transition-transform group-hover:scale-110">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="font-semibold text-[0.95rem]">{b}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          {data.cta?.label && (
            <div className={cn('mt-10', !data.image && 'text-center')}>
              <Cta link={data.cta} />
            </div>
          )}
        </div>
        {data.image && (
          <Reveal x={30} y={0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image} alt="" className="w-full rounded-[2rem] object-cover shadow-2xl" />
          </Reveal>
        )}
      </div>
    </Section>
  );
}

/* ---------------- Table ---------------- */
export function Table({ data }: P) {
  const headers = lines(data.headers);
  const rows = lines(data.rows).map((r) => r.split('|').map((c) => c.trim()));
  const dark = data.theme === 'dark';
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Reveal className="mx-auto max-w-5xl">
        <div className={cn('box overflow-hidden rounded-3xl', dark ? 'glass' : 'bg-white ring-1 ring-ink/10 shadow-[0_30px_60px_-40px_rgba(10,18,34,0.4)]')}>
          <div className="overflow-x-auto thin-scroll">
            <table className="w-full min-w-[560px] text-left text-sm">
              {headers.length > 0 && (
                <thead>
                  <tr className="bg-ink text-white">
                    {headers.map((h, i) => (
                      <th key={i} className={cn('px-6 py-4 text-xs font-extrabold uppercase tracking-wider', i === 0 ? 'text-gold' : 'text-white/90')}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((r, i) => {
                  const last = data.highlightLast && i === rows.length - 1;
                  return (
                    <tr
                      key={i}
                      className={cn(
                        'border-t transition-colors',
                        dark ? 'border-white/10 hover:bg-white/5' : 'border-ink/5 hover:bg-sand/70',
                        last && 'bg-gradient-to-r from-gold-light/60 to-gold/40 font-extrabold !text-ink'
                      )}
                    >
                      {r.map((c, j) => (
                        <td key={j} className={cn('px-6 py-4', j === 0 && 'font-semibold')}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {data.notes && <div className="rte mt-8 text-sm" dangerouslySetInnerHTML={{ __html: data.notes }} />}
        {data.cta?.label && (
          <div className="mt-8 text-center">
            <Cta link={data.cta} />
          </div>
        )}
      </Reveal>
    </Section>
  );
}

/* ---------------- Offer ---------------- */
export function Offer({ data }: P) {
  const lists: any[] = data.lists || [];
  return (
    <Section theme={data.theme || 'dark'} anchor={data.anchor}>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 p-8 md:p-14 bg-gradient-to-br from-white/[0.06] to-transparent">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gold/25 blur-3xl" />
        <Sparkles className="absolute right-10 top-10 h-10 w-10 text-gold/40 animate-spin-slow" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
            {data.badge && <span className="ml-3 inline-block rounded-full bg-gold px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-ink align-middle">{data.badge}</span>}
            <h2 className="mt-5 font-display text-5xl md:text-6xl font-semibold leading-[1.05]">
              <span className="text-gold-gradient">{data.title}</span>
            </h2>
            {data.tagline && <p className="mt-4 font-display text-2xl italic opacity-80">{data.tagline}</p>}
            {data.content && <div className="rte mt-6" dangerouslySetInnerHTML={{ __html: data.content }} />}
            {data.cta?.label && (
              <div className="mt-8">
                <Cta link={data.cta} />
              </div>
            )}
          </Reveal>
          <div className="grid gap-5">
            {lists.map((l, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="box rounded-3xl glass p-7">
                  <h3 className="flex items-center gap-2 font-display text-2xl font-semibold">
                    <Star className="h-5 w-5 text-gold" fill="currentColor" /> {l.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {lines(l.items).map((it, j) => (
                      <li key={j} className="flex gap-3 text-sm opacity-85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={3} /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Compare ---------------- */
export function Compare({ data }: P) {
  const columns: any[] = data.columns || [];
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <div className={cn('mx-auto grid max-w-5xl gap-6', columns.length > 1 && 'md:grid-cols-2', columns.length > 2 && 'lg:grid-cols-3')}>
        {columns.map((c, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className={cn('card-lift relative h-full overflow-hidden rounded-[2rem] p-8', c.highlight ? 'bg-ink text-white shadow-2xl' : 'bg-white ring-1 ring-ink/10')}>
              {c.highlight && <div className="absolute inset-0 bg-pattern opacity-[0.06]" />}
              {c.highlight && <span className="absolute right-6 top-6 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-ink"><T>Recommended</T></span>}
              <h3 className={cn('relative font-display text-3xl font-semibold', c.highlight && '!text-gold')}>{c.title}</h3>
              <dl className="relative mt-6 divide-y divide-current/10">
                {lines(c.items).map((row, j) => {
                  const [k, ...v] = row.split(':');
                  return (
                    <div key={j} className={cn('flex justify-between gap-4 py-3 text-sm border-t', c.highlight ? 'border-white/10' : 'border-ink/5')}>
                      <dt className="opacity-60">{v.length ? k : ''}</dt>
                      <dd className="text-right font-semibold">{v.length ? v.join(':').trim() : k}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- CTA banner ---------------- */
export function CtaBanner({ data }: P) {
  const gold = data.style !== 'dark';
  return (
    <Section theme={data.theme} anchor={data.anchor} className="!py-14 md:!py-20" pattern={false}>
      <Reveal>
        <div className={cn('relative overflow-hidden rounded-[2.5rem] px-8 py-14 md:px-16 md:py-20 text-center', gold ? 'bg-gradient-to-br from-gold-light via-gold to-gold-deep text-ink' : 'bg-ink text-white')}>
          <div className={cn('absolute inset-0 bg-pattern', gold ? 'opacity-20 mix-blend-multiply' : 'opacity-[0.07]')} />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className={cn('font-display text-4xl md:text-6xl font-semibold leading-[1.05]', gold ? '!text-ink' : '!text-white')}>{data.title}</h2>
            {data.text && <p className={cn('mt-5 text-base md:text-lg', gold ? 'text-ink/75' : 'text-white/70')}>{data.text}</p>}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Cta link={data.primary} className={gold ? 'btn btn-dark' : 'btn btn-gold'} />
              <Cta link={data.secondary} className={gold ? 'btn bg-white/80 text-ink hover:bg-white' : 'btn btn-ghost-light'} icon={false} />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- Pricing ---------------- */
export function Pricing({ data }: P) {
  const plans: any[] = data.plans || [];
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <div className={cn('grid gap-6 items-stretch', plans.length >= 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto')}>
        {plans.map((p, i) => (
          <Reveal key={i} delay={i * 0.1} className={cn(p.featured && 'lg:-my-4')}>
            <div className={cn('card-lift relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 md:p-9', p.featured ? 'bg-ink text-white shadow-[0_40px_80px_-30px_rgba(10,18,34,0.7)] ring-2 ring-gold' : 'bg-white ring-1 ring-ink/10')}>
              {p.featured && (
                <>
                  <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
                  <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-ink">
                    <Crown className="h-3 w-3" /> <T>Most popular</T>
                  </span>
                </>
              )}
              <h3 className={cn('relative font-display text-3xl font-semibold', p.featured && '!text-white')}>{p.name}</h3>
              <p className={cn('relative mt-4 font-display text-5xl font-bold', p.featured ? 'text-gold-gradient' : 'text-ink')}>{p.price}</p>
              {p.time && (
                <p className={cn('relative mt-3 inline-flex items-center gap-2 text-xs font-bold', p.featured ? 'text-gold-light' : 'text-gold-deep')}>
                  <Clock className="h-4 w-4" /> {p.time}
                </p>
              )}
              <div className={cn('relative my-7 h-px', p.featured ? 'bg-white/10' : 'bg-ink/10')} />
              <ul className="relative flex-1 space-y-3">
                {lines(p.features).map((f, j) => (
                  <li key={j} className="flex gap-3 text-sm">
                    <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full', p.featured ? 'bg-gold text-ink' : 'bg-gold/15 text-gold-deep')}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={p.featured ? 'text-white/85' : 'text-ink/75'}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-8">
                <Cta link={p.cta?.label ? p.cta : { label: 'Get offer', href: 'whatsapp' }} className={cn('btn w-full', p.featured ? 'btn-gold' : 'btn-dark')} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Stats ---------------- */
export function Stats({ data }: P) {
  const items: any[] = data.items || [];
  return (
    <Section theme={data.theme} anchor={data.anchor} className="!py-16 md:!py-20">
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <div className={cn('grid gap-6 grid-cols-2', items.length >= 4 && 'lg:grid-cols-4')}>
        {items.map((s, i) => (
          <Reveal key={i} delay={i * 0.08} className="text-center">
            <div className={cn('box rounded-3xl p-8', data.theme === 'dark' ? 'glass' : 'bg-white ring-1 ring-ink/5')}>
              <Counter value={s.value} className="block font-display text-5xl md:text-6xl font-bold text-gold-gradient" />
              <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] opacity-60">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Image + text ---------------- */
export function ImageText({ data }: P) {
  const bullets = lines(data.bullets);
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <Reveal x={data.reverse ? -30 : 30} y={0} className={cn(data.reverse ? 'lg:order-1' : 'lg:order-2')}>
          {data.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.image} alt={data.title || ''} className="w-full rounded-[2rem] object-cover shadow-2xl" />
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink">
              <div className="absolute inset-0 bg-pattern opacity-10" />
              <Skyline className="absolute bottom-0 h-2/3 w-full text-gold/25" />
            </div>
          )}
        </Reveal>
        <div className={cn(data.reverse ? 'lg:order-2' : 'lg:order-1')}>
          <Heading eyebrow={data.eyebrow} title={data.title} align="left" className="!mb-6" />
          <Reveal>
            {data.content && <div className="rte" dangerouslySetInnerHTML={{ __html: data.content }} />}
            {bullets.length > 0 && (
              <ul className="mt-6 space-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-[0.95rem]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={3} /> {b}
                  </li>
                ))}
              </ul>
            )}
            {data.cta?.label && (
              <div className="mt-8">
                <Cta link={data.cta} />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Rich text ---------------- */
export function RichText({ data }: P) {
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className={cn('mx-auto', data.width === 'wide' ? 'max-w-6xl' : 'max-w-3xl')}>
        {data.title && <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8">{data.title}</h2>}
        <Reveal>
          <div className="rte" dangerouslySetInnerHTML={{ __html: data.content || '' }} />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Custom HTML ---------------- */
export function Html({ data }: P) {
  if (!data.code) return null;
  return (
    <Section theme={data.theme} anchor={data.anchor} className="!py-12">
      <div dangerouslySetInnerHTML={{ __html: data.code }} />
    </Section>
  );
}
