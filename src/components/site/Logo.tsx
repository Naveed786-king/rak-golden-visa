import SmartLink from '@/components/ui/SmartLink';
import { cn } from '@/lib/utils';

/** Brand logo. Uses the logo uploaded in Admin → Site settings, or the built-in Golden Visa logo. */
export const DEFAULT_LOGO = '/brand/logo-sm.webp';

export default function Logo({ src, name, className }: { src?: string; name: string; light?: boolean; className?: string }) {
  return (
    <SmartLink href="/" className={cn('site-logo group flex shrink-0 items-center', className)} ariaLabel={name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || DEFAULT_LOGO} alt={name} className="w-auto max-w-[62vw] object-contain transition-[height,transform] duration-500 group-hover:scale-[1.02]" />
    </SmartLink>
  );
}
