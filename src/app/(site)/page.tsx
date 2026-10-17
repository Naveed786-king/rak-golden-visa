import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/data';
import { getSetting } from '@/lib/settings';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home');
  const site = await getSetting('site');
  return {
    title: { absolute: page?.metaTitle || site.seo.defaultTitle },
    description: page?.metaDescription || site.seo.description,
    alternates: { canonical: '/' },
    openGraph: page?.ogImage ? { images: [page.ogImage] } : undefined,
  };
}

export default async function HomePage() {
  const [page, site] = await Promise.all([getPage('home'), getSetting('site')]);
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
