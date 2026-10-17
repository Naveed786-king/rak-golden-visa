import { Check, Crown } from 'lucide-react';
import { Skyline } from '@/components/blocks/Hero';
import T from '@/components/ui/T';

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const perks = ['Track your visa application in real time', 'Upload documents securely', 'Chat directly with your consultant', 'Get instant status notifications'];
  return (
    <section className="relative bg-sand">
      <div className="container-x grid min-h-[calc(100vh-140px)] gap-10 py-12 lg:grid-cols-2 lg:py-20 items-center">
        <div className="relative hidden lg:block overflow-hidden rounded-[2.5rem] bg-ink p-12 text-white h-full min-h-[560px]">
          <div className="absolute inset-0 bg-pattern opacity-[0.07]" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/25 blur-3xl" />
          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-ink">
              <Crown className="h-7 w-7" />
            </span>
            <h2 className="mt-8 font-display text-5xl font-semibold leading-tight !text-white">
              <T>Your Golden Visa journey, in one place.</T>
            </h2>
            <ul className="mt-10 space-y-4">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/80">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/20 text-gold">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <T>{p}</T>
                </li>
              ))}
            </ul>
          </div>
          <Skyline className="absolute bottom-0 left-0 h-40 w-full text-gold/15" />
        </div>
        <div className="mx-auto w-full max-w-md">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink"><T>{title}</T></h1>
          {subtitle && <p className="mt-3 text-ink/60"><T>{subtitle}</T></p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
