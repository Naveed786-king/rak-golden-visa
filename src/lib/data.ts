import { prisma } from './db';
import { safeJson } from './utils';
import type { Block } from '@/components/blocks/types';

export async function getPage(slug: string) {
  try {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) return null;
    return { ...page, blocks: safeJson<Block[]>(page.blocks, []) };
  } catch {
    return null;
  }
}

export async function getPost(slug: string) {
  try {
    return await prisma.post.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function getPosts(opts: { take?: number; skip?: number; category?: string } = {}) {
  try {
    const where: any = { status: 'published' };
    if (opts.category) where.category = opts.category;
    const [items, total] = await Promise.all([
      prisma.post.findMany({ where, orderBy: { publishedAt: 'desc' }, take: opts.take ?? 9, skip: opts.skip ?? 0 }),
      prisma.post.count({ where }),
    ]);
    return { items, total };
  } catch {
    return { items: [], total: 0 };
  }
}

export async function getServices(category?: string) {
  try {
    return await prisma.service.findMany({
      where: { active: true, ...(category && category !== 'all' ? { category } : {}) },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  } catch {
    return [];
  }
}

export async function getFaqs(group?: string) {
  try {
    return await prisma.faq.findMany({
      where: { active: true, ...(group && group !== 'all' ? { group } : {}) },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  } catch {
    return [];
  }
}

export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });
  } catch {
    return [];
  }
}

export async function getPartners() {
  try {
    return await prisma.partner.findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });
  } catch {
    return [];
  }
}
