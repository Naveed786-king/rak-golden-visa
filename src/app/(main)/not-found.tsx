import Link from 'next/link';
import { getI18n } from '@/lib/i18n/server';
import { localizePath } from '@/lib/i18n/config';

export default async function NotFound() {
  const { t, locale } = await getI18n();
  return (
    <main className="theme-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-[0.07]" />
      <div className="relative text-center px-6">
        <p className="font-display text-[9rem] leading-none text-gold-gradient font-bold">404</p>
        <h1 className="font-display text-3xl md:text-4xl text-white mt-2">{t('This page took a different route')}</h1>
        <p className="text-white/60 mt-4 max-w-md mx-auto">{t('The page you are looking for may have moved. Let’s get you back on track to your Golden Visa.')}</p>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <Link href={localizePath('/', locale)} className="btn btn-gold">{t('Back to home')}</Link>
          <Link href={localizePath('/contact-us', locale)} className="btn btn-ghost-light">{t('Contact us')}</Link>
        </div>
      </div>
    </main>
  );
}
