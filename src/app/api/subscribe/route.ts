import { prisma } from '@/lib/db';
import { ok, fail, isEmail, rateLimit, clientIp } from '@/lib/api';

export async function POST(req: Request) {
  if (!rateLimit('sub:' + clientIp(req), 5)) return fail('Too many requests', 429);
  const { email } = await req.json().catch(() => ({}));
  if (!isEmail(email)) return fail('Please enter a valid email');
  await prisma.subscriber.upsert({ where: { email: email.toLowerCase() }, update: {}, create: { email: email.toLowerCase() } });
  return ok();
}
