import { ok, fail, refreshSite } from '@/lib/api';
import { requireStaff } from '@/lib/auth';
import { getSetting, saveSetting } from '@/lib/settings';

const KEYS = ['site', 'header', 'footer', 'smtp'] as const;
type Key = (typeof KEYS)[number];

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const s = await requireStaff();
  if (!s) return fail('Unauthorized', 401);
  const { key } = await params;
  if (!KEYS.includes(key as Key)) return fail('Unknown setting', 404);
  if (key === 'smtp' && s.role !== 'ADMIN') return fail('Admins only', 403);
  const value: any = await getSetting(key as Key);
  if (key === 'smtp' && value.pass) value.pass = '••••••••';
  return ok({ value });
}

export async function PUT(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const s = await requireStaff();
  if (!s) return fail('Unauthorized', 401);
  const { key } = await params;
  if (!KEYS.includes(key as Key)) return fail('Unknown setting', 404);
  if ((key === 'smtp' || key === 'site') && s.role !== 'ADMIN') return fail('Only admins can change these settings', 403);
  const { value } = await req.json().catch(() => ({}));
  if (!value || typeof value !== 'object') return fail('Invalid data');
  if (key === 'smtp') {
    const current: any = await getSetting('smtp');
    if (value.pass === '••••••••') value.pass = current.pass;
  }
  if (key === 'site' && value.colors) {
    for (const c of Object.keys(value.colors)) value.colors[c] = String(value.colors[c]).replace(/[^#a-zA-Z0-9(),.% ]/g, '');
  }
  await saveSetting(key as Key, value);
  refreshSite();
  return ok();
}
