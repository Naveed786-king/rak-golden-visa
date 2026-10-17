'use client';
import SmartLink from '@/components/ui/SmartLink';
import T from '@/components/ui/T';
import { ArrowRight, Clock, CalendarDays } from 'lucide-react';
import { cn, formatDate, readingTime } from '@/lib/utils';
import { useLocale } from '@/components/site/SiteProvider';
import { localeInfo } from '@/lib/i18n/config';

export default function PostCard({ post, dark }: { post: any; dark?: boolean }) {
  const locale = useLocale();
  return (
    <SmartLink href={`/${post.slug}`} className={cn('card-lift group flex h-full flex-col overflow-hidden rounded-[2rem]', dark ? 'glass' : 'bg-white ring-1 ring-ink/5 shadow-[0_25px_50px_-40px_rgba(10,18,34,0.4)]')}>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-2 to-gold-deep" />
            <div className="absolute inset-0 bg-pattern opacity-20" />
            <p className="absolute bottom-5 left-6 right-6 font-display text-2xl font-semibold text-white/90 leading-tight line-clamp-3">{post.title}</p>
          </div>
        )}
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-ink backdrop-blur">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="flex items-center gap-4 text-xs opacity-60">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.publishedAt, undefined, localeInfo(locale).htmlLang)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {readingTime(post.content)} <T>min read</T>
          </span>
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-snug group-hover:text-gold-deep transition-colors">{post.title}</h3>
        {post.excerpt && <p className="mt-3 flex-1 text-sm leading-relaxed opacity-70 line-clamp-3">{post.excerpt}</p>}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-deep">
          <T>Read more</T> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </SmartLink>
  );
}

