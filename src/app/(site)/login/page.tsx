import { Suspense } from 'react';
import AuthShell from '@/components/portal/AuthShell';
import { LoginForm } from '@/components/portal/AuthForms';

export const metadata = { title: 'Client Login', robots: { index: false } };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to track your Golden Visa application.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
