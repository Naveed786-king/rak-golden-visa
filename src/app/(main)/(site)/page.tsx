import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/data';
import { getLocalizedBundle } from '@/lib/settings';
import { getLocale } from '@/lib/i18n/server';
import { localizePath } from '@/lib/i18n/config';
import { alternatesFor, enabledLocales, absUrl, ogLocale } from '@/lib/seo';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = await getPage('home');
  const { site } = await getLocalizedBundle(locale);
  return {
    title: { absolute: page?.metaTitle || site.seo.defaultTitle },
    description: page?.metaDescription || site.seo.description,
    alternates: alternatesFor('/', locale, await enabledLocales()),
    openGraph: { type: 'website', url: absUrl(localizePath('/', locale)), locale: ogLocale(locale), images: page?.ogImage ? [absUrl(page.ogImage)!] : undefined },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const [page, { site }] = await Promise.all([getPage('home'), getLocalizedBundle(locale)]);
  if (!page) notFound();
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    telephone: site.phone,
    email: site.emailVisa,
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Dubai', addressCountry: 'AE' },
    url: process.env.NEXT_PUBLIC_SITE_URL,
    openingHours: 'Mo-Sa 09:00-18:00',
  };
  return (
    <>
      <BlockRenderer blocks={page.blocks} site={site} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
    </>
  );
}
