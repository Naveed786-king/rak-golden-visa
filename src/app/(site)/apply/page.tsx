import { Suspense } from 'react';
import ApplyWizard from '@/components/portal/ApplyWizard';
import { Skyline } from '@/components/blocks/Hero';

export const metadata = {
  title: 'Apply Online for RAK Golden Visa',
  description: 'Start your RAK Golden Visa or Retirement Visa application online in 3 simple steps. Upload documents securely and track your progress in real time.',
};

export default function ApplyPage() {
  return (
    <>
      <section className="theme-dark relative overflow-hidden pt-16 pb-40 md:pt-20">
        <div className="absolute inset-0 bg-pattern opacity-[0.06]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-gold/15 blur-[130px]" />
        <div className="container-x relative text-center">
          <span className="eyebrow justify-center">Online application</span>
          <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold text-white">
            Apply for your <span className="text-gold-gradient italic">Golden Visa</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/65">Three simple steps. A dedicated consultant reviews your application within one working day.</p>
        </div>
        <Skyline className="absolute bottom-0 left-0 w-full h-24 text-white/[0.04]" />
      </section>
      <section className="theme-sand pb-24">
        <div className="container-x -mt-28 relative">
          <Suspense>
            <ApplyWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
