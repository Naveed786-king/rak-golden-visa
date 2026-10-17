import { getPosts } from '@/lib/data';
import { ok } from '@/lib/api';

export async function GET(req: Request) {
  const u = new URL(req.url);
  const skip = Math.max(0, Number(u.searchParams.get('skip')) || 0);
  const take = Math.min(24, Math.max(1, Number(u.searchParams.get('take')) || 6));
  const category = u.searchParams.get('category') || undefined;
  const data = await getPosts({ skip, take, category });
  return ok(data);
}
