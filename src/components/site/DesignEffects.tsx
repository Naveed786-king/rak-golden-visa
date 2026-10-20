'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Entrance animations for sections (Admin → section → Design → Animation) and for the
 * smaller ".reveal" parts inside them.
 * - Everything is visible in the HTML; only parts BELOW the screen are hidden once the page is ready.
 * - Parts are shown as soon as they touch the screen; a scroll check also catches parts that were
 *   skipped by a fast swipe on a phone, so nothing stays blank.
 */
export default function DesignEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    // phones/tablets: no scroll-in effects at all — content is simply there while swiping (no blank areas)
    const off =
      !!document.querySelector('.anim-off') ||
      window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 1023px), (hover: none)').matches;
    const blocks = Array.from(document.querySelectorAll<HTMLElement>('.blk[data-anim]'));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal')).filter((el) => !el.dataset.rv);
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const onScreen = (el: HTMLElement, f = 0.98) => {
      const r = el.getBoundingClientRect();
      return r.top < vh() * f; // above the bottom edge (also counts parts already scrolled past)
    };

    const pending = new Set<HTMLElement>();
    const show = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      pending.delete(el);
      io.unobserve(el);
      if (el.classList.contains('blk')) el.classList.add('in');
      else {
        const box = el.parentElement;
        if (box?.hasAttribute('data-rv-stagger')) {
          const i = Array.prototype.indexOf.call(box.children, el);
          el.style.setProperty('--rv-d', `${Math.min(i, 6) * 0.07}s`);
        }
        el.dataset.rv = 'in';
      }
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && show(e.target as HTMLElement)),
      { rootMargin: '0px 0px -4% 0px', threshold: 0 }
    );

    for (const el of blocks) {
      if (off || onScreen(el)) el.classList.add('in');
      else pending.add(el);
    }
    for (const el of reveals) {
      if (off || onScreen(el)) el.dataset.rv = 'in';
      else {
        el.dataset.rv = 'wait';
        pending.add(el);
      }
    }
    root.setAttribute('data-anim-ready', '');
    pending.forEach((el) => io.observe(el));

    // fast swipes: show anything that has reached (or passed) the screen
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pending.forEach((el) => onScreen(el, 1.02) && show(el));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      // after client navigation, leave nothing hidden
      pending.forEach((el) => (el.classList.contains('blk') ? el.classList.add('in') : (el.dataset.rv = 'in')));
    };
  }, [pathname]);
  return null;
}
