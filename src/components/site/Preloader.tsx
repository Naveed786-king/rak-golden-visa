/* CSS-only preloader: fades out by itself after ~1s, even before JavaScript loads (no layout blocking). */
export default function Preloader() {
  return (
    <div aria-hidden className="preloader fixed inset-0 z-[100] grid place-items-center bg-ink">
      <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
      <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 24 24" className="preloader-crown h-16 w-16 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
          <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5L3 8z" pathLength={1} />
          <path d="M5 21h14" pathLength={1} />
        </svg>
        <div className="preloader-line mt-5 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  );
}
