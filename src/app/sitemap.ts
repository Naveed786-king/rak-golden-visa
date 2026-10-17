import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { getSetting } from '@/lib/settings';
import { localizePath } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    const [pages, posts] = await Promise.all([
      prisma.page.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
    ]);
    const tr = await getSetting('translation');
    const langs = tr.enabled.length ? tr.enabled : ['en'];
    const out: MetadataRoute.Sitemap = [];
    for (const lang of langs) {
      for (const p of pages) out.push({ url: base + localizePath(p.slug === 'home' ? '/' : `/${p.slug}`, lang), lastModified: p.updatedAt, priority: p.slug === 'home' ? 1 : 0.8 });
      for (const p of posts) out.push({ url: base + localizePath(`/${p.slug}`, lang), lastModified: p.updatedAt, priority: 0.6 });
    }
    return out;
  } catch {
    return [{ url: base }];
  }
}
