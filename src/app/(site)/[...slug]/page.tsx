import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage, getPost, getPosts } from '@/lib/data';
import { getLocalizedBundle } from '@/lib/settings';
import { getLocale } from '@/lib/i18n/server';
import { seoAlternates, localeInfo } from '@/lib/i18n/config';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PostView from '@/components/site/PostView';
import { stripHtml } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string[] }> };

async function resolve(slugParts: string[]) {
  const slug = slugParts.map(decodeURIComponent).join('/');
  const page = await getPage(slug);
  if (page && page.status === 'published' && slug !== 'home') return { kind: 'page' as const, page, slug };
  const post = await getPost(slug);
  if (post && post.status === 'published') return { kind: 'post' as const, post, slug };
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await resolve(slug);
  if (!r) return { title: 'Page not found' };
  const locale = await getLocale();
  const alternates = seoAlternates(`/${r.slug}`, locale);
  if (r.kind === 'page') {
    return {
      title: r.page.metaTitle ? { absolute: r.page.metaTitle } : r.page.title,
      description: r.page.metaDescription || undefined,
      alternates,
      openGraph: { title: r.page.metaTitle || r.page.title, description: r.page.metaDescription || undefined, images: r.page.ogImage ? [r.page.ogImage] : undefined },
    };
  }
  const p = r.post;
  const desc = p.metaDescription || p.excerpt || stripHtml(p.content).slice(0, 160);
  return {
    title: p.metaTitle ? { absolute: p.metaTitle } : p.title,
    description: desc,
    alternates,
    openGraph: { type: 'article', title: p.title, description: desc, images: p.cover ? [p.cover] : undefined, publishedTime: p.publishedAt.toISOString() },
  };
}

export default async function CatchAll({ params }: Props) {
  const { slug } = await params;
  const r = await resolve(slug);
  if (!r) notFound();
  const locale = await getLocale();
  const { site } = await getLocalizedBundle(locale);
  if (r.kind === 'page') return <BlockRenderer blocks={r.page.blocks} site={site} />;
  const { items } = await getPosts({ take: 4 });
  const related = items.filter((x) => x.id !== r.post.id).slice(0, 3);
  return <PostView post={JSON.parse(JSON.stringify(r.post))} related={JSON.parse(JSON.stringify(related))} site={site} lang={localeInfo(locale).htmlLang} />;
}
