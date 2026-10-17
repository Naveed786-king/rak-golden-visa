import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { getSetting } from '@/lib/settings';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-cormorant', display: 'swap' });
const sans = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const kufi = Noto_Kufi_Arabic({ subsets: ['arabic'], weight: ['400', '600'], variable: '--font-kufi', display: 'swap' });

// Always render with live data from the database (admin changes appear instantly)
export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSetting('site');
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate || `%s | ${site.name}` },
    description: site.seo.description,
    keywords: site.seo.keywords,
    applicationName: site.name,
    icons: site.favicon ? { icon: site.favicon, apple: site.favicon } : undefined,
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: site.seo.defaultTitle,
      description: site.seo.description,
      images: site.seo.ogImage ? [site.seo.ogImage] : undefined,
      locale: 'en_AE',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export const viewport: Viewport = {
  themeColor: '#0A1222',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSetting('site');
  const c = site.colors;
  const vars = `:root{--brand-gold:${c.gold};--brand-gold-light:${c.goldLight};--brand-ink:${c.ink};--brand-sand:${c.sand};}`;
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${kufi.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: vars }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
