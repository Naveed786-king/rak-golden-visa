'use client';
import { useEffect } from 'react';

/**
 * 3D tilt for cards (.card-lift) and the hero card (.hero-tilt): they lean towards the mouse.
 * Desktop mouse only, one listener for the whole page, at most one update per frame.
 * The CSS that uses --lx-rx / --lx-ry lives in luxe.css.
 */
export default function Tilt3D() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let card: HTMLElement | null = null;
    let raf = 0;
    let x = 0;
    let y = 0;
    const reset = (el: HTMLElement | null) => {
      el?.style.removeProperty('--lx-rx');
      el?.style.removeProperty('--lx-ry');
    };
    // hero card: the whole hero listens, the card leans towards the mouse
    let hero: HTMLElement | null = null;
    const heroMove = (e: PointerEvent) => {
      const sec = (e.target as Element | null)?.closest?.('section') as HTMLElement | null;
      const tilt = sec?.querySelector<HTMLElement>('.hero-tilt') || null;
      if (hero && hero !== tilt) {
        hero.style.removeProperty('--hx');
        hero.style.removeProperty('--hy');
      }
      hero = tilt;
      if (!tilt) return;
      const r = sec!.getBoundingClientRect();
      tilt.style.setProperty('--hy', `${(((e.clientX - r.left) / r.width - 0.5) * 12).toFixed(2)}deg`);
      tilt.style.setProperty('--hx', `${(-((e.clientY - r.top) / r.height - 0.5) * 9).toFixed(2)}deg`);
    };
    const onMove = (e: PointerEvent) => {
      heroMove(e);
      const el = (e.target as Element | null)?.closest?.('.card-lift') as HTMLElement | null;
      if (el !== card) {
        reset(card);
        card = el;
      }
      if (!card) return;
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const px = (x - r.left) / r.width - 0.5;
        const py = (y - r.top) / r.height - 0.5;
        card.style.setProperty('--lx-ry', `${(px * 9).toFixed(2)}deg`);
        card.style.setProperty('--lx-rx', `${(-py * 9).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      reset(card);
      card = null;
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      reset(card);
    };
  }, []);
  return null;
}
