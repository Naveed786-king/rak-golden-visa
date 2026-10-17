import type { Metadata, Viewport } from 'next';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource-variable/manrope';
import '@fontsource/noto-kufi-arabic/400.css';
import '@fontsource/noto-kufi-arabic/600.css';
import './globals.css';
import { getSetting } from '@/lib/settings';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: vars }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
