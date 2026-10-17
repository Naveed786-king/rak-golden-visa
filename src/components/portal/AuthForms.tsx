'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoaderCircle, Eye, EyeOff, CircleCheck } from 'lucide-react';

async function post(url: string, body: any) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'Something went wrong');
  return d;
}

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={show ? 'text' : 'password'} className="field pr-12" />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink" aria-label="Toggle password">
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}

export function LoginForm({ admin = false }: { admin?: boolean }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const d = await post('/api/auth/login', { email: fd.get('email'), password: fd.get('password'), admin });
      const next = sp.get('next');
      window.location.href = next && next.startsWith('/') ? next : d.redirect;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="email" type="email" required placeholder="Email address" className="field" autoComplete="email" />
      <PasswordInput name="password" required placeholder="Password" autoComplete="current-password" />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="btn btn-gold w-full">
        {loading && <LoaderCircle className="h-4 w-4 animate-spin" />} Sign in
      </button>
      {!admin && (
        <div className="flex justify-between text-sm">
          <Link href="/forgot-password" className="text-ink/60 hover:text-gold-deep">Forgot password?</Link>
          <Link href="/register" className="font-bold text-gold-deep">Create account</Link>
        </div>
      )}
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const d = await post('/api/auth/register', Object.fromEntries(fd.entries()));
      window.location.href = d.redirect;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="name" required placeholder="Full name" className="field" autoComplete="name" />
      <input name="email" type="email" required placeholder="Email address" className="field" autoComplete="email" />
      <div className="grid grid-cols-2 gap-3">
        <input name="phone" placeholder="Phone / WhatsApp" className="field" autoComplete="tel" />
        <input name="nationality" placeholder="Nationality" className="field" />
      </div>
      <PasswordInput name="password" required minLength={8} placeholder="Password (min 8 characters)" autoComplete="new-password" />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="btn btn-gold w-full">
        {loading && <LoaderCircle className="h-4 w-4 animate-spin" />} Create my account
      </button>
      <p className="text-center text-sm text-ink/60">
        Already have an account? <Link href="/login" className="font-bold text-gold-deep">Sign in</Link>
      </p>
    </form>
  );
}

export function ForgotForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await post('/api/auth/forgot', { email: fd.get('email') }).catch(() => {});
    setDone(true);
    setLoading(false);
  }
  if (done)
    return (
      <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-ink/5">
        <CircleCheck className="mx-auto h-10 w-10 text-emerald-500" />
        <p className="mt-3 text-ink/70">If an account exists for that email, we have sent a password reset link. Please check your inbox.</p>
        <Link href="/login" className="mt-4 inline-block font-bold text-gold-deep">Back to login</Link>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="email" type="email" required placeholder="Email address" className="field" />
      <button disabled={loading} className="btn btn-gold w-full">
        {loading && <LoaderCircle className="h-4 w-4 animate-spin" />} Send reset link
      </button>
      <p className="text-center text-sm"><Link href="/login" className="text-ink/60 hover:text-gold-deep">Back to login</Link></p>
    </form>
  );
}

export function ResetForm() {
  const sp = useSearchParams();
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      await post('/api/auth/reset', { token: sp.get('token'), password: fd.get('password') });
      setState('done');
    } catch (err: any) {
      setError(err.message);
      setState('idle');
    }
  }
  if (state === 'done')
    return (
      <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-ink/5">
        <CircleCheck className="mx-auto h-10 w-10 text-emerald-500" />
        <p className="mt-3 text-ink/70">Your password has been updated.</p>
        <Link href="/login" className="btn btn-gold mt-5">Sign in</Link>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-4">
      <PasswordInput name="password" required minLength={8} placeholder="New password (min 8 characters)" />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      <button disabled={state === 'loading'} className="btn btn-gold w-full">Set new password</button>
    </form>
  );
}
