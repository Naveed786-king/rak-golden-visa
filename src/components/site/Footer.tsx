import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import type { FooterSettings, SiteSettings } from '@/lib/defaults';
import Logo from './Logo';
import SmartLink from '@/components/ui/SmartLink';
import { SocialIcon } from '@/components/ui/Icon';
import NewsletterForm from './NewsletterForm';
import Reveal from '@/components/ui/Reveal';

export default function Footer({ site, footer }: { site: SiteSettings; footer: FooterSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-pattern opacity-[0.05]" />
      <div className="pointer-events-none absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gold/10 blur-[140px]" />

      {/* CTA strip */}
      <div className="container-x relative pt-20">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-light via-gold to-gold-deep p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="absolute inset-0 bg-pattern opacity-20 mix-blend-multiply" />
          <h2 className="relative font-display text-4xl md:text-5xl font-bold !text-ink leading-tight">
            {footer.ctaTitle} <span className="italic">{footer.ctaHighlight}</span>
          </h2>
          <div className="relative flex flex-wrap gap-3">
            <SmartLink href={footer.ctaButton.href} className="btn btn-dark">
              {footer.ctaButton.label} <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
            <SmartLink href="whatsapp" className="btn bg-white/90 text-ink hover:bg-white">
              <SocialIcon name="whatsapp" className="h-4 w-4 text-[#25D366]" /> WhatsApp
            </SmartLink>
          </div>
        </Reveal>
      </div>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo src={site.logoLight || site.logo} name={site.name} />
          <p className="mt-6 text-sm leading-relaxed text-white/60">{footer.about}</p>
          <div className="mt-6 flex gap-2.5">
            {(['facebook', 'instagram', 'youtube', 'twitter', 'linkedin', 'tiktok'] as const)
              .filter((k) => site.social[k])
              .map((k) => (
                <a key={k} href={site.social[k]} target="_blank" rel="noopener noreferrer" aria-label={k} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-gold hover:text-ink hover:border-gold transition-all">
                  <SocialIcon name={k} />
                </a>
              ))}
          </div>
        </div>

        {footer.columns.map((col, i) => (
          <div key={i} className="lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold">{col.title}</h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((l, j) => (
                <li key={j}>
                  <SmartLink href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors">
                    <span className="h-px w-0 bg-gold transition-all group-hover:w-3" />
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Get in touch</h4>
          <a href={site.mapUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm text-white/65 hover:text-white">
            <MapPin className="h-5 w-5 shrink-0 text-gold" />
            <span>
              {site.address}
              {site.poBox ? `, ${site.poBox}` : ''}
            </span>
          </a>
          <a href={`tel:${site.phone}`} className="flex gap-3 text-sm text-white/65 hover:text-white">
            <Phone className="h-5 w-5 shrink-0 text-gold" /> {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.emailVisa}`} className="flex gap-3 text-sm text-white/65 hover:text-white">
            <Mail className="h-5 w-5 shrink-0 text-gold" /> {site.emailVisa}
          </a>
          {footer.newsletter.enabled && (
            <div className="pt-4">
              <p className="text-sm font-bold text-white">{footer.newsletter.title}</p>
              <p className="text-xs text-white/50 mt-1 mb-3">{footer.newsletter.text}</p>
              <NewsletterForm />
            </div>
          )}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <p>{footer.copyright.replace('{year}', String(year))}</p>
          <div className="flex gap-5">
            {footer.bottomLinks.map((l, i) => (
              <SmartLink key={i} href={l.href} className="hover:text-gold">
                {l.label}
              </SmartLink>
            ))}
          </div>
        </div>
        {footer.disclaimer && (
          <div className="container-x pb-8">
            <p className="text-[0.7rem] leading-relaxed text-white/35">
              <strong className="text-white/55">Disclaimer:</strong> {footer.disclaimer}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
