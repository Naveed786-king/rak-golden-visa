import AuthShell from '@/components/portal/AuthShell';
import { ForgotForm } from '@/components/portal/AuthForms';

export const metadata = { title: 'Forgot Password', robots: { index: false } };

export default function ForgotPage() {
  return (
    <AuthShell title="Forgot password?" subtitle="Enter your email and we will send you a reset link.">
      <ForgotForm />
    </AuthShell>
  );
}
