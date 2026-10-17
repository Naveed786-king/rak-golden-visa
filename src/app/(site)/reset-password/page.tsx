import { Suspense } from 'react';
import AuthShell from '@/components/portal/AuthShell';
import { ResetForm } from '@/components/portal/AuthForms';

export const metadata = { title: 'Reset Password', robots: { index: false } };

export default function ResetPage() {
  return (
    <AuthShell title="Set a new password">
      <Suspense>
        <ResetForm />
      </Suspense>
    </AuthShell>
  );
}
