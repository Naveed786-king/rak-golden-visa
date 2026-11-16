'use client';
import { useEffect } from 'react';

/**
 * 3D tilt for cards (.card-lift) and the hero card (.hero-tilt), plus the hero gold spotlight (.hx).
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
      el?.style.removeProperty('--cx');
      el?.style.removeProperty('--cy');
    };
    // magnetic buttons: a button within reach is pulled a few pixels towards the cursor
    let btn: HTMLElement | null = null;
    const magnet = (e: PointerEvent) => {
      const b = (e.target as Element | null)?.closest?.('.btn') as HTMLElement | null;
      if (btn && btn !== b) {
        btn.style.removeProperty('--bx');
        btn.style.removeProperty('--by');
      }
      btn = b;
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--bx', `${(((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(1)}px`);
      b.style.setProperty('--by', `${(((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(1)}px`);
    };
    // hero card: the whole hero listens, the card leans towards the mouse
    let hero: HTMLElement | null = null;
    const heroMove = (e: PointerEvent) => {
      const sec = (e.target as Element | null)?.closest?.('section, header') as HTMLElement | null;
      // gold spotlight follows the mouse inside any page-top hero
      const decor = sec?.querySelector<HTMLElement>(':scope > .hx');
      if (decor) {
        const b = sec!.getBoundingClientRect();
        decor.style.setProperty('--mx', `${(((e.clientX - b.left) / b.width) * 100).toFixed(1)}%`);
        decor.style.setProperty('--my', `${(((e.clientY - b.top) / b.height) * 100).toFixed(1)}%`);
      }
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
      magnet(e);
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
        card.style.setProperty('--cx', `${((px + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--cy', `${((py + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const onLeave = () => {
      reset(card);
      card = null;
      btn?.style.removeProperty('--bx');
      btn?.style.removeProperty('--by');
      btn = null;
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
