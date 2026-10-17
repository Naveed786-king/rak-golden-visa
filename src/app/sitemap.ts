import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    const [pages, posts] = await Promise.all([
      prisma.page.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
    ]);
    return [
      ...pages.map((p) => ({ url: p.slug === 'home' ? base : `${base}/${p.slug}`, lastModified: p.updatedAt, priority: p.slug === 'home' ? 1 : 0.8 })),
      ...posts.map((p) => ({ url: `${base}/${p.slug}`, lastModified: p.updatedAt, priority: 0.6 })),
    ];
  } catch {
    return [{ url: base }];
  }
}
