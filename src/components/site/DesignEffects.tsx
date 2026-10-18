'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Runs section entrance animations (Admin → section → Design → Animation). */
export default function DesignEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.blk[data-anim]'));
    if (!els.length) return;
    // sections already on screen are shown immediately (no flash)
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in');
    });
    document.documentElement.setAttribute('data-anim-ready', '');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );
    els.filter((el) => !el.classList.contains('in')).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
