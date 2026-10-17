'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, ArrowUp, X } from 'lucide-react';
import type { SiteSettings } from '@/lib/defaults';
import { SocialIcon } from '@/components/ui/Icon';
import { resolveHref } from '@/components/ui/href';

export default function Floating({ site }: { site: SiteSettings }) {
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => {
      try {
        if (!sessionStorage.getItem('wa-bubble')) setBubble(true);
      } catch {
        setBubble(true);
      }
    }, 6000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  const closeBubble = () => {
    setBubble(false);
    try {
      sessionStorage.setItem('wa-bubble', '1');
    } catch {}
  };
  const wa = resolveHref('whatsapp', site);

  return (
    <>
      {site.showWhatsappButton && (
        <div className="fixed z-50 right-4 md:right-6 bottom-24 md:bottom-6 flex flex-col items-end gap-3">
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="relative w-64 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5"
              >
                <button onClick={closeBubble} className="absolute right-2 top-2 text-ink/40 hover:text-ink" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
                <p className="text-sm font-bold text-ink">Marhaba! 👋</p>
                <p className="mt-1 text-xs text-ink/60">Questions about your Golden Visa? Our consultants reply on WhatsApp within minutes.</p>
                <a href={wa} target="_blank" rel="noopener noreferrer" onClick={closeBubble} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white">
                  <SocialIcon name="whatsapp" className="h-4 w-4" /> Start chat
                </a>
              </motion.div>
            )}
          </AnimatePresence>
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="pulse-ring relative isolate grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] hover:scale-110 transition-transform">
            <SocialIcon name="whatsapp" className="h-7 w-7" />
          </a>
        </div>
      )}

      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed z-40 left-4 md:left-6 bottom-24 md:bottom-6 grid h-11 w-11 place-items-center rounded-full bg-ink text-gold ring-1 ring-gold/40 shadow-xl hover:bg-gold hover:text-ink transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {site.showMobileBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-2 gap-2">
            <a href={`tel:${site.phone}`} className="btn btn-ghost-light btn-sm">
              <Phone className="h-4 w-4 text-gold" /> Call now
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[#25D366] text-white">
              <SocialIcon name="whatsapp" className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
