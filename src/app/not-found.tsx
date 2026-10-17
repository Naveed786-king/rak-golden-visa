import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="theme-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-[0.07]" />
      <div className="relative text-center px-6">
        <p className="font-display text-[9rem] leading-none text-gold-gradient font-bold">404</p>
        <h1 className="font-display text-3xl md:text-4xl text-white mt-2">This page took a different route</h1>
        <p className="text-white/60 mt-4 max-w-md mx-auto">The page you are looking for may have moved. Let&apos;s get you back on track to your Golden Visa.</p>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn btn-gold">Back to home</Link>
          <Link href="/contact-us" className="btn btn-ghost-light">Contact us</Link>
        </div>
      </div>
    </main>
  );
}
