import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(input: string) {
  return (input || '')
    .toString()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(d: Date | string, opts?: Intl.DateTimeFormatOptions, lang = 'en-GB') {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString(lang, opts || { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function waLink(number: string, text?: string) {
  const n = (number || '').replace(/[^0-9]/g, '');
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export function telLink(number: string) {
  return `tel:${(number || '').replace(/[^0-9+]/g, '')}`;
}

export function safeJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Split a multi-line textarea into clean lines */
export function lines(v?: string | null): string[] {
  return (v || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function readingTime(html: string) {
  const words = (html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function stripHtml(html: string) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function makeRef() {
  const d = new Date();
  const y = d.getFullYear().toString().slice(2);
  const rnd = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `RGV-${y}${String(d.getMonth() + 1).padStart(2, '0')}-${rnd}`;
}

export function isExternal(href?: string) {
  return !!href && /^(https?:|mailto:|tel:|\/\/)/.test(href);
}
