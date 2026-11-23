import { getI18n } from '@/lib/i18n/server';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import AccountNav from '@/components/portal/AccountNav';

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  const { t } = await getI18n();
  return { title: t('My Account'), robots: { index: false } };
}

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login?next=/account');
  return (
    <section className="bg-sand min-h-[70vh]">
      <div className="bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
        <div className="container-x relative py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold font-display text-2xl font-bold text-ink">{user.name.charAt(0).toUpperCase()}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Client portal</p>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-white">Marhaba, {user.name.split(' ')[0]}</h1>
            </div>
          </div>
          <AccountNav isStaff={user.role !== 'CUSTOMER'} />
        </div>
      </div>
      <div className="container-x py-10 md:py-14">{children}</div>
    </section>
  );
}
