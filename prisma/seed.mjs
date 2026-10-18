// Seeds the database with the website content and the first admin user.
//   node prisma/seed.mjs          -> only fills an EMPTY database (safe to run on every build)
//   node prisma/seed.mjs --force  -> re-creates all pages/posts/services/FAQs (keeps users, leads & applications)
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { readdirSync } from 'fs';
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

if (!process.env.DATABASE_URL) process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || '';
const prisma = new PrismaClient();
const force = process.argv.includes('--force');
const C = await import('./content.mjs');
const faqs = JSON.parse(readFileSync(path.join(__dirname, 'faqs.json'), 'utf8'));

async function main() {
  // 1) Admin user
  const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
  if (adminCount === 0 && !process.env.ADMIN_PASSWORD && (process.env.VERCEL || process.env.ADMIN_SETUP === 'web')) {
    // No default password on public hosting: the first visitor of /admin/login creates the admin account.
    console.log('ℹ No admin yet - open /admin/login on your website to create the admin account.');
  } else if (adminCount === 0) {
    const email = (process.env.ADMIN_EMAIL || 'admin@rakgoldenvisa.com').toLowerCase();
    const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
    await prisma.user.upsert({
      where: { email },
      update: { role: 'ADMIN', active: true, passwordHash: await bcrypt.hash(password, 10) },
      create: { name: 'Administrator', email, role: 'ADMIN', passwordHash: await bcrypt.hash(password, 10) },
    });
    console.log(`✔ Admin user created: ${email} / ${password}  (change it after first login!)`);
  }

  // 1b) One-time upgrades for websites created with an older version
  await upgrades();
  // 1c) Built-in professional translations of the original website texts
  await loadTranslationPacks();

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

/* prisma/translations/<lang>.json = { "plain": { english: translation }, "html": { englishHtml: translationHtml } }
   Loaded into the translation memory once per file version. */
async function loadTranslationPacks() {
  const dir = path.join(__dirname, 'translations');
  if (!existsSync(dir)) return;
  const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const locale = file.replace('.json', '');
    const raw = readFileSync(path.join(dir, file), 'utf8');
    const version = sha1(raw);
    const flag = await prisma.setting.findUnique({ where: { key: 'pack:' + locale } });
    if (flag?.value === version) continue;
    let pack;
    try { pack = JSON.parse(raw); } catch (e) { console.error('Bad translation file', file, e.message); continue; }
    const rows = [];
    for (const part of ['plain', 'html']) {
      for (const [en, tr] of Object.entries(pack[part] || {})) if (en && typeof tr === 'string' && tr.trim()) rows.push({ key: `pack:${locale}:${sha1(en)}`, text: tr });
    }
    await prisma.translationMemory.deleteMany({ where: { key: { startsWith: `pack:${locale}:` } } });
    const seen = new Set();
    const unique = rows.filter((r) => (seen.has(r.key) ? false : seen.add(r.key)));
    for (let i = 0; i < unique.length; i += 400) await prisma.translationMemory.createMany({ data: unique.slice(i, i + 400) });
    await prisma.setting.upsert({ where: { key: 'pack:' + locale }, update: { value: version }, create: { key: 'pack:' + locale, value: version } });
    console.log(`✔ Built-in ${locale.toUpperCase()} translations: ${unique.length} texts`);
  }
}

async function upgrades() {
  const done = async (key) => !!(await prisma.setting.findUnique({ where: { key: 'upgrade:' + key } }));
  const mark = (key) => prisma.setting.upsert({ where: { key: 'upgrade:' + key }, update: { value: '1' }, create: { key: 'upgrade:' + key, value: '1' } });
  // v2: add the cost calculator section to the home page (right after the hero)
  if (!(await done('estimate-v1'))) {
    const home = await prisma.page.findUnique({ where: { slug: 'home' } });
    if (home) {
      let blocks = [];
      try { blocks = JSON.parse(home.blocks || '[]'); } catch {}
      if (!blocks.some((x) => x.type === 'estimate')) {
        blocks.splice(Math.min(1, blocks.length), 0, C.estimateBlock());
        await prisma.page.update({ where: { id: home.id }, data: { blocks: JSON.stringify(blocks) } });
        console.log('✔ Added the cost calculator to the home page');
      }
    }
    await mark('estimate-v1');
  }
}

main()
  .then(() => console.log('Seed finished.'))
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
