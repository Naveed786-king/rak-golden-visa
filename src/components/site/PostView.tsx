import { CalendarDays, Clock, ChevronRight, User, Phone } from 'lucide-react';
import type { SiteSettings } from '@/lib/defaults';
import { formatDate, readingTime } from '@/lib/utils';
import PostCard from '@/components/blocks/PostCard';
import Reveal from '@/components/ui/Reveal';
import { Skyline } from '@/components/blocks/Hero';
import SmartLink from '@/components/ui/SmartLink';
import { SocialIcon } from '@/components/ui/Icon';
import ShareButtons from './ShareButtons';
import ViewPing from './ViewPing';
import LeadForm from '@/components/blocks/LeadForm';
import T from '@/components/ui/T';

export default function PostView({ post, related, site, lang = 'en-GB' }: { post: any; related: any[]; site: SiteSettings; lang?: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: site.name },
    image: post.cover || undefined,
    description: post.excerpt,
  };
  return (
    <article>
      <ViewPing id={post.id} />
      <header className="theme-dark relative overflow-hidden pt-16 pb-28 md:pt-24 md:pb-36">
        {post.cover && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink" />
          </>
        )}
        <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
        <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-gold/15 blur-[130px]" />
        <div className="container-x relative max-w-4xl text-center">
          <nav className="flex items-center justify-center gap-1.5 text-xs text-white/50">
            <SmartLink href="/" className="hover:text-gold"><T>Home</T></SmartLink>
            <ChevronRight className="h-3 w-3" />
            <SmartLink href="/latest-news-blogs" className="hover:text-gold"><T>Blog</T></SmartLink>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold truncate max-w-[200px]">{post.category}</span>
          </nav>
          <Reveal>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.08] text-white">{post.title}</h1>
            <p className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm text-white/60">
              <span className="flex items-center gap-2"><User className="h-4 w-4 text-gold" /> {post.author}</span>
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold" /> {formatDate(post.publishedAt, { day: 'numeric', month: 'long', year: 'numeric' }, lang)}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> {readingTime(post.content)} <T>min read</T></span>
            </p>
          </Reveal>
        </div>
        <Skyline className="absolute bottom-0 left-0 w-full h-20 md:h-28 text-white/[0.04]" />
      </header>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          {post.excerpt && <p className="font-display text-2xl leading-relaxed text-ink/80 border-l-4 border-gold pl-6 mb-10 italic">{post.excerpt}</p>}
          <div className="rte" dangerouslySetInnerHTML={{ __html: post.content }} />
          {post.tags && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.split(',').map((t: string) => t.trim()).filter(Boolean).map((t: string) => (
                <span key={t} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink/70">#{t}</span>
              ))}
            </div>
          )}
          <div className="mt-10 border-t border-ink/10 pt-6">
            <ShareButtons title={post.title} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 self-start">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white">
            <div className="absolute inset-0 bg-pattern opacity-[0.07]" />
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gold/30 blur-3xl" />
            <div className="relative">
              <p className="eyebrow"><T>Free assessment</T></p>
              <h3 className="mt-3 font-display text-3xl font-semibold !text-white"><T>Check your Golden Visa eligibility</T></h3>
              <p className="mt-3 text-sm text-white/65"><T>Get expert advice from our RAK Golden Visa specialists today.</T></p>
              <div className="mt-6 grid gap-2.5">
                <SmartLink href="whatsapp" className="btn btn-gold btn-sm"><SocialIcon name="whatsapp" className="h-4 w-4" /> <T>WhatsApp us</T></SmartLink>
                <a href={`tel:${site.phone}`} className="btn btn-ghost-light btn-sm"><Phone className="h-4 w-4" /> {site.phoneDisplay}</a>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-sand p-7">
            <h3 className="font-display text-2xl font-semibold"><T>Quick enquiry</T></h3>
            <div className="mt-5"><LeadForm compact /></div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="theme-sand section">
          <div className="container-x">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-center mb-12"><T>Keep reading</T></h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}
