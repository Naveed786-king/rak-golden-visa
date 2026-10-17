// Seeds the database with the website content and the first admin user.
//   node prisma/seed.mjs          -> only fills an EMPTY database (safe to run on every build)
//   node prisma/seed.mjs --force  -> re-creates all pages/posts/services/FAQs (keeps users, leads & applications)
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually (no extra dependency)
const envFile = path.join(__dirname, '..', '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const prisma = new PrismaClient();
const force = process.argv.includes('--force');
const C = await import('./content.mjs');
const faqs = JSON.parse(readFileSync(path.join(__dirname, 'faqs.json'), 'utf8'));

async function main() {
  // 1) Admin user
  const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
  if (adminCount === 0) {
    const email = (process.env.ADMIN_EMAIL || 'admin@rakgoldenvisa.com').toLowerCase();
    const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
    await prisma.user.upsert({
      where: { email },
      update: { role: 'ADMIN', active: true, passwordHash: await bcrypt.hash(password, 10) },
      create: { name: 'Administrator', email, role: 'ADMIN', passwordHash: await bcrypt.hash(password, 10) },
    });
    console.log(`✔ Admin user created: ${email} / ${password}  (change it after first login!)`);
  }

  // 2) Content
  const pageCount = await prisma.page.count();
  if (pageCount > 0 && !force) {
    console.log('✔ Database already has content — skipping content seed (use "npm run seed:reset" to restore the original content).');
    return;
  }

  if (force) {
    await prisma.page.deleteMany({ where: { slug: { in: C.allPages.map((p) => p.slug) } } });
    await prisma.post.deleteMany({ where: { slug: { in: C.posts.map((p) => p.slug) } } });
    await prisma.service.deleteMany({});
    await prisma.faq.deleteMany({});
    await prisma.partner.deleteMany({});
  }

  for (const p of C.allPages) {
    await prisma.page.create({
      data: { slug: p.slug, title: p.title, metaTitle: p.metaTitle, metaDescription: p.metaDescription, blocks: JSON.stringify(p.blocks), status: 'published' },
    });
  }
  console.log(`✔ ${C.allPages.length} pages`);

  for (const p of C.posts) {
    await prisma.post.create({ data: { ...p, publishedAt: new Date(p.publishedAt), author: 'Admin', status: 'published' } });
  }
  console.log(`✔ ${C.posts.length} blog posts`);

  for (const s of [...C.serviceRecords, ...C.additionalServices]) await prisma.service.create({ data: s });
  console.log(`✔ ${C.serviceRecords.length + C.additionalServices.length} services`);

  for (const f of faqs) await prisma.faq.create({ data: { ...f, active: true } });
  console.log(`✔ ${faqs.length} FAQs`);

  for (const p of C.partnerRecords) await prisma.partner.create({ data: p });
  console.log(`✔ ${C.partnerRecords.length} partner logos (names — upload logo images in Admin → Partner logos)`);

  if ((await prisma.testimonial.count()) === 0) {
    for (const t of C.testimonialPlaceholders) await prisma.testimonial.create({ data: t });
    console.log('✔ 3 sample testimonials (hidden — replace with real reviews)');
  }
}

main()
  .then(() => console.log('Seed finished.'))
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
