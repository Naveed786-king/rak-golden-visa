'use client';
import Link from 'next/link';
import { useSite } from '@/components/site/SiteProvider';
import { resolveHref, isExternalHref } from './href';

type Props = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function SmartLink({ href, className, children, onClick, ariaLabel }: Props) {
  const site = useSite();
  const h = resolveHref(href, site);
  if (isExternalHref(h) || h.startsWith('mailto:') || h.startsWith('tel:')) {
    const ext = isExternalHref(h);
    return (
      <a href={h} className={className} onClick={onClick} aria-label={ariaLabel} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={h} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
