import { ok, fail } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { sendMail } from '@/lib/mail';

export async function POST(req: Request) {
  const s = await requireAdmin();
  if (!s) return fail('Admins only', 403);
  const { to } = await req.json().catch(() => ({}));
  const sent = await sendMail({ to: to || s.email, subject: 'Test email from your website', html: '<p>✅ Your SMTP settings work. Notifications will be delivered.</p>' });
  return sent ? ok() : fail('Could not send. Check the SMTP host, port, username and password (see server logs).');
}
