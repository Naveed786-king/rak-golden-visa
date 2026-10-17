import AuthShell from '@/components/portal/AuthShell';
import { RegisterForm } from '@/components/portal/AuthForms';

export const metadata = { title: 'Create Account', robots: { index: false } };

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" subtitle="Apply online and follow every step of your visa in real time.">
      <RegisterForm />
    </AuthShell>
  );
}
