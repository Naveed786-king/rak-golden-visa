'use client';
import { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    const r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    setState(r.ok ? 'done' : 'error');
    if (r.ok) setEmail('');
  }
  return (
    <form onSubmit={submit} className="flex rounded-full border border-white/15 bg-white/5 p-1 focus-within:border-gold transition-colors">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={state === 'done' ? 'Subscribed — thank you!' : 'Your email address'}
        className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 outline-none min-w-0"
      />
      <button disabled={state === 'loading'} className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink hover:brightness-110 transition" aria-label="Subscribe">
        {state === 'done' ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
      </button>
    </form>
  );
}
