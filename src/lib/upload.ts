import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const UPLOAD_ROOT = path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads');

const PUBLIC_TYPES = /^(image\/(png|jpe?g|gif|webp|svg\+xml|avif|x-icon|vnd\.microsoft\.icon)|video\/(mp4|webm)|application\/pdf)$/;
const PRIVATE_TYPES = /^(image\/(png|jpe?g|webp|heic|heif)|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;

export const MAX_UPLOAD = 15 * 1024 * 1024; // 15 MB

function cleanName(name: string) {
  const ext = path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, '');
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) || 'file';
  return { base, ext };
}

/** Save a public media file (images for the website). Returns the public URL. */
export async function savePublicFile(file: File) {
  if (file.size > MAX_UPLOAD) throw new Error('File too large (max 15 MB)');
  if (!PUBLIC_TYPES.test(file.type)) throw new Error('File type not allowed: ' + file.type);
  const { base, ext } = cleanName(file.name);
  const now = new Date();
  const sub = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`;
  const dir = path.join(UPLOAD_ROOT, 'media', sub);
  await fs.mkdir(dir, { recursive: true });
  const fname = `${base}-${crypto.randomBytes(3).toString('hex')}${ext}`;
  await fs.writeFile(path.join(dir, fname), Buffer.from(await file.arrayBuffer()));
  return { url: `/uploads/media/${sub}/${fname}`, filename: fname, size: file.size, mime: file.type };
}

/** Save a private document (customer uploads). Returns the relative storage path. */
export async function savePrivateFile(file: File, folder: string) {
  if (file.size > MAX_UPLOAD) throw new Error('File too large (max 15 MB)');
  if (!PRIVATE_TYPES.test(file.type)) throw new Error('Only PDF, JPG, PNG, WEBP, HEIC or Word files are allowed');
  const { base, ext } = cleanName(file.name);
  const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
  const dir = path.join(UPLOAD_ROOT, 'private', safeFolder);
  await fs.mkdir(dir, { recursive: true });
  const fname = `${base}-${crypto.randomBytes(4).toString('hex')}${ext}`;
  await fs.writeFile(path.join(dir, fname), Buffer.from(await file.arrayBuffer()));
  return { path: `private/${safeFolder}/${fname}`, size: file.size, mime: file.type };
}

export async function deleteStored(rel: string) {
  try {
    const p = path.resolve(UPLOAD_ROOT, rel.replace(/^\/?uploads\//, ''));
    if (!p.startsWith(UPLOAD_ROOT)) return;
    await fs.unlink(p);
  } catch {}
}

export function resolveStored(rel: string) {
  const p = path.resolve(UPLOAD_ROOT, rel);
  if (!p.startsWith(UPLOAD_ROOT)) return null;
  return p;
}

export const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.heic': 'image/heic',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
