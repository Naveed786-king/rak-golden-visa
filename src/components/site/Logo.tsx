import SmartLink from '@/components/ui/SmartLink';
import { cn } from '@/lib/utils';

export default function Logo({ src, name, light = true, className }: { src?: string; name: string; light?: boolean; className?: string }) {
  if (src) {
    return (
      <SmartLink href="/" className={cn('flex items-center', className)} ariaLabel={name}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} className="h-11 md:h-12 w-auto object-contain" />
      </SmartLink>
    );
  }
  const parts = name.trim().split(' ');
  const first = parts.slice(0, -2).join(' ') || parts[0];
  const rest = parts.length > 2 ? parts.slice(-2).join(' ') : parts.slice(1).join(' ');
  return (
    <SmartLink href="/" className={cn('group flex items-center gap-3', className)} ariaLabel={name}>
      <span className="relative grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-deep shadow-[0_8px_24px_-8px] shadow-gold/60">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
          <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5L3 8z" />
          <path d="M5 21h14" />
        </svg>
        <span className="absolute inset-0 rounded-xl ring-1 ring-white/40" />
      </span>
      <span className="leading-none">
        <span className={cn('block whitespace-nowrap font-display text-[1.2rem] sm:text-[1.45rem] font-bold tracking-wide', light ? 'text-white' : 'text-ink')}>
          {first} <span className="text-gold-gradient">{rest}</span>
        </span>
        <span className={cn('hidden sm:block whitespace-nowrap text-[0.6rem] font-bold tracking-[0.32em] uppercase mt-1', light ? 'text-white/50' : 'text-ink/45')}>Ras Al Khaimah · UAE</span>
      </span>
    </SmartLink>
  );
}
