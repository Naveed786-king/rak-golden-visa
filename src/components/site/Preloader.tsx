/* CSS-only preloader with the site emblem: fades out by itself after ~1s, even before JavaScript loads. */
export default function Preloader({ icon }: { icon?: string }) {
  return (
    <div aria-hidden className="preloader fixed inset-0 z-[100] grid place-items-center bg-ink">
      <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
      <div className="relative flex flex-col items-center">
        <div className="pl-emblem">
          <span className="pl-ring" />
          <span className="pl-ring pl-ring-2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon || '/brand/emblem-192.png'} alt="" className="pl-img" />
        </div>
        <div className="preloader-line mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  );
}
