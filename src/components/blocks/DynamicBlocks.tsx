import { ArrowRight, ArrowUpRight, Clock, MapPin, Mail, Phone, CalendarDays } from 'lucide-react';
import { Section, Heading } from '@/components/ui/Section';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import SmartLink from '@/components/ui/SmartLink';
import { Icon, SocialIcon } from '@/components/ui/Icon';
import { cn, formatDate, readingTime } from '@/lib/utils';
import { getFaqs, getPartners, getPosts, getServices, getTestimonials } from '@/lib/data';
import type { SiteSettings } from '@/lib/defaults';
import { TabsView, RejectionsView, AccordionView, TestimonialsView, Calculator } from './InteractiveBlocks';
import LeadForm from './LeadForm';
import LoadMorePosts from './LoadMorePosts';
import PostCard from './PostCard';
import T from '@/components/ui/T';
import EstimateCalculator from './EstimateCalculator';
import { getLocalizedEstimate } from '@/lib/settings';
import { getLocale } from '@/lib/i18n/server';

type P = { data: any; site: SiteSettings };

export function Tabs({ data }: P) {
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Reveal>
        <TabsView items={data.items || []} dark={data.theme === 'dark'} cta={data.cta} />
      </Reveal>
    </Section>
  );
}

export function Rejections({ data }: P) {
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Reveal>
        <RejectionsView items={data.items || []} dark={data.theme === 'dark'} />
      </Reveal>
    </Section>
  );
}

export function Accordion({ data }: P) {
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Reveal className="mx-auto max-w-4xl">
        <AccordionView items={(data.items || []).map((i: any) => ({ title: i.title, content: i.content || '' }))} dark={data.theme === 'dark'} html />
      </Reveal>
    </Section>
  );
}

export async function Faq({ data }: P) {
  const faqs = await getFaqs(data.group);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]+>/g, ' ') } })),
  };
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 self-start">
          <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} align="left" className="!mb-8" />
          <Reveal className={cn('box rounded-3xl p-7', data.theme === 'dark' ? 'glass' : 'bg-ink text-white')}>
            <h3 className="font-display text-2xl font-semibold !text-white"><T>Still have questions?</T></h3>
            <p className="mt-2 text-sm text-white/65"><T>Our Golden Visa specialists are one message away.</T></p>
            <div className="mt-5 flex flex-wrap gap-2">
              <SmartLink href="whatsapp" className="btn btn-gold btn-sm">
                <SocialIcon name="whatsapp" className="h-4 w-4" /> <T>WhatsApp</T>
              </SmartLink>
              <SmartLink href="/contact-us" className="btn btn-ghost-light btn-sm">
                <T>Contact us</T>
              </SmartLink>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <AccordionView items={faqs.map((f) => ({ title: f.question, content: f.answer }))} dark={data.theme === 'dark'} limit={data.limit === 0 || data.limit === '0' ? 0 : Number(data.limit) || 5} />
        </Reveal>
      </div>
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </Section>
  );
}

export async function Testimonials({ data }: P) {
  const items = await getTestimonials();
  if (!items.length) return null;
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <TestimonialsView items={JSON.parse(JSON.stringify(items))} dark={data.theme === 'dark'} limit={Number(data.limit) > 0 ? Number(data.limit) : 5} />
    </Section>
  );
}

export async function Partners({ data }: P) {
  const items = await getPartners();
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <Section theme={data.theme} anchor={data.anchor} className="!py-16 md:!py-20">
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} className="!mb-10" />
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <a key={i} href={p.url || '#'} target={p.url ? '_blank' : undefined} rel="noopener noreferrer" className={cn('group flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl px-6 transition', data.theme === 'dark' ? 'glass' : 'bg-white ring-1 ring-ink/5')}>
              {p.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo} alt={p.name} className="max-h-14 w-auto object-contain grayscale opacity-70 transition group-hover:grayscale-0 group-hover:opacity-100" />
              ) : (
                <span className="text-center text-sm font-bold opacity-70 group-hover:text-gold-deep">{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

export async function Services({ data }: P) {
  let items = await getServices(data.category || 'main');
  if (Number(data.limit) > 0) items = items.slice(0, Number(data.limit));
  const additional = data.category === 'additional';
  const dark = data.theme === 'dark';
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Stagger className={cn('grid gap-6 md:grid-cols-2', additional ? 'lg:grid-cols-3' : 'lg:grid-cols-3')}>
        {items.map((s) => (
          <StaggerItem key={s.id}>
            <div className={cn('card-lift group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7', dark ? 'glass' : 'bg-white ring-1 ring-ink/5 shadow-[0_20px_50px_-35px_rgba(10,18,34,0.35)]', s.featured && !dark && 'ring-2 ring-gold/60')}>
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/0 blur-2xl transition-all duration-700 group-hover:bg-gold/20" />
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt={s.title} className="-mx-7 -mt-7 mb-6 h-44 w-[calc(100%+3.5rem)] max-w-none object-cover" />
              ) : (
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink group-hover:rotate-6">
                  <Icon name={s.icon || 'badge'} className="h-6 w-6" />
                </span>
              )}
              {s.featured && <span className="absolute right-6 top-6 rounded-full bg-gold px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-wider text-ink"><T>Popular</T></span>}
              <h3 className="relative mt-5 font-display text-2xl font-semibold leading-snug">{s.title}</h3>
              {s.subtitle && <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gold-deep">{s.subtitle}</p>}
              {s.description && <p className="mt-3 flex-1 text-sm leading-relaxed opacity-70">{s.description}</p>}
              {!additional && (
                <div className={cn('mt-6 flex items-end justify-between gap-3 border-t pt-5', dark ? 'border-white/10' : 'border-ink/5')}>
                  <div>
                    {s.price && (
                      <>
                        <p className="text-[0.65rem] font-bold uppercase tracking-widest opacity-50"><T>From</T></p>
                        <p className="font-display text-2xl font-bold text-gold-deep">{s.price.replace(/^From\s*/i, '')}</p>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {s.link && (
                      <SmartLink href={s.link} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-current/15 hover:bg-ink hover:text-gold transition" ariaLabel={s.title}>
                        <ArrowUpRight className="h-4 w-4" />
                      </SmartLink>
                    )}
                    <SmartLink href={`/apply?service=${encodeURIComponent((s as any).sourceTitle || s.title)}`} className="btn btn-gold btn-sm">
                      <T>Apply</T>
                    </SmartLink>
                  </div>
                </div>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export async function Blog({ data }: P) {
  const count = Number(data.count) || 3;
  const { items, total } = await getPosts({ take: count, category: data.category || undefined });
  const posts = JSON.parse(JSON.stringify(items));
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} align="left" className="!mb-0" />
        {!data.paginate && (
          <SmartLink href="/latest-news-blogs" className="btn btn-outline shrink-0">
            <T>View all articles</T> <ArrowRight className="h-4 w-4" />
          </SmartLink>
        )}
      </div>
      {posts.length === 0 ? (
        <p className="text-center opacity-60 py-10"><T>No articles published yet.</T></p>
      ) : (
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p: any) => (
            <StaggerItem key={p.id}>
              <PostCard post={p} dark={data.theme === 'dark'} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
      {data.paginate && total > posts.length && <LoadMorePosts start={posts.length} total={total} category={data.category} dark={data.theme === 'dark'} />}
    </Section>
  );
}

export function CalculatorBlock({ data }: P) {
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
      <Reveal>
        <Calculator dark={data.theme === 'dark'} />
      </Reveal>
    </Section>
  );
}

export function Contact({ data, site }: P) {
  const dark = data.theme === 'dark';
  const cards = [
    { icon: <MapPin className="h-5 w-5" />, label: 'Our address', value: `${site.address}${site.poBox ? ', ' + site.poBox : ''}`, href: site.mapUrl },
    { icon: <Mail className="h-5 w-5" />, label: 'General enquiries', value: site.emailGeneral, href: `mailto:${site.emailGeneral}` },
    { icon: <Mail className="h-5 w-5" />, label: 'Golden Visa enquiries', value: site.emailVisa, href: `mailto:${site.emailVisa}` },
    { icon: <Clock className="h-5 w-5" />, label: 'Opening hours', value: `${site.hours} · ${site.hoursClosed}` },
    { icon: <Phone className="h-5 w-5" />, label: 'Free consultation', value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: <SocialIcon name="whatsapp" className="h-5 w-5" />, label: 'WhatsApp now', value: site.phoneDisplay, href: 'whatsapp' },
  ];
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Heading eyebrow={data.eyebrow} title={data.title} align="left" className="!mb-6" />
          {data.content && (
            <Reveal>
              <div className="rte" dangerouslySetInnerHTML={{ __html: data.content }} />
            </Reveal>
          )}
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <StaggerItem key={i}>
                {c.href ? (
                  <SmartLink href={c.href} className={cn('card-lift group flex h-full gap-4 rounded-2xl p-5', dark ? 'glass' : 'bg-sand hover:bg-white hover:ring-1 hover:ring-gold/40')}>
                    <ContactCardInner {...c} />
                  </SmartLink>
                ) : (
                  <div className={cn('box flex h-full gap-4 rounded-2xl p-5', dark ? 'glass' : 'bg-sand')}>
                    <ContactCardInner {...c} />
                  </div>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal delay={0.1}>
          <div className={cn('relative overflow-hidden rounded-[2.5rem] p-7 md:p-10', dark ? 'glass' : 'bg-white ring-1 ring-ink/10 shadow-[0_40px_80px_-50px_rgba(10,18,34,0.6)]')}>
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl" />
            <h3 className="relative font-display text-3xl md:text-4xl font-semibold">{data.formTitle}</h3>
            {data.formText && <p className="relative mt-3 mb-8 text-sm leading-relaxed opacity-70">{data.formText}</p>}
            <div className="relative">
              <LeadForm dark={dark} />
            </div>
          </div>
        </Reveal>
      </div>
      {data.showMap && site.mapEmbed && (
        <Reveal className="mt-16">
          <iframe src={site.mapEmbed} className="h-[420px] w-full rounded-[2rem] ring-1 ring-ink/10" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map" />
        </Reveal>
      )}
    </Section>
  );
}

function ContactCardInner({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-light to-gold text-ink">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[0.68rem] font-extrabold uppercase tracking-widest opacity-50"><T>{label}</T></span>
        <span className="mt-1 block text-sm font-semibold leading-snug break-words" dir="auto">{value}</span>
      </span>
    </>
  );
}

export function LeadFormBlock({ data }: P) {
  const dark = data.theme === 'dark';
  return (
    <Section theme={data.theme} anchor={data.anchor}>
      <div className="mx-auto max-w-4xl">
        <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
        <Reveal>
          <div className={cn('rounded-[2.5rem] p-7 md:p-10', dark ? 'glass' : 'bg-white ring-1 ring-ink/10 shadow-2xl')}>
            <LeadForm defaultService={data.service} dark={dark} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Cost estimate calculator ---------------- */
export async function EstimateBlock({ data }: P) {
  const cfg = await getLocalizedEstimate(await getLocale());
  const bullets = String(data.bullets || '')
    .split('\n')
    .map((s: string) => s.trim())
    .filter(Boolean);
  const split = data.layout !== 'center';
  return (
    <Section theme={data.theme || 'dark'} anchor={data.anchor || 'calculator'}>
      <div className={cn('grid items-center gap-10 lg:gap-16', split ? 'lg:grid-cols-[1fr_35rem]' : 'mx-auto max-w-2xl')}>
        {split ? (
          <Reveal>
            {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
            {data.title && <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-ink md:text-5xl lg:text-[3.4rem]">{data.title}</h2>}
            {data.subtitle && <p className="mt-5 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">{data.subtitle}</p>}
            {bullets.length > 0 && (
              <ul className="mt-8 grid gap-3">
                {bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-semibold">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold text-ink">
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ) : (
          <Heading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} className="!mb-2" />
        )}
        <Reveal delay={0.15} className="animate-pop">
          <EstimateCalculator cfg={cfg} />
        </Reveal>
      </div>
    </Section>
  );
}
