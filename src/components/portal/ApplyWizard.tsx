'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Sun, Users, Briefcase, FileText, ArrowRight, ArrowLeft, Upload, X, LoaderCircle, CircleCheck, Lock, Sparkles } from 'lucide-react';
import { SERVICE_OPTIONS } from '@/lib/defaults';
import { cn } from '@/lib/utils';

const FEATURED = [
  { v: 'RAK Golden Visa – Property Investor', icon: Building2, d: '10 years · AED 2M+ property' },
  { v: 'RAK Retirement Visa', icon: Sun, d: '5 years · age 55+' },
  { v: 'Family Golden Visa', icon: Users, d: 'Spouse, children & parents' },
  { v: 'Golden Visa – Professionals / Other', icon: Briefcase, d: 'Doctors, engineers, talents' },
];

export default function ApplyWizard() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [form, setForm] = useState<Record<string, string>>({ familyMembers: '0' });
  const [files, setFiles] = useState<File[]>([]);
  const [me, setMe] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ refNo: string; id: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const s = sp.get('service');
    if (s) {
      const match = SERVICE_OPTIONS.find((o) => o.toLowerCase().includes(s.toLowerCase().split(' ')[0]) || s.toLowerCase().includes(o.toLowerCase().split(' ')[0]));
      setService(SERVICE_OPTIONS.includes(s) ? s : match || s);
    }
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setMe(d.user);
          setForm((f) => ({ ...f, fullName: f.fullName || d.user.name, email: f.email || d.user.email }));
        }
      })
      .catch(() => {});
  }, [sp]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function next() {
    setError('');
    if (step === 0 && !service) return setError('Please choose a service');
    if (step === 1) {
      if (!form.fullName || !form.phone || !form.email) return setError('Please fill in your name, phone and email');
    }
    setStep((s) => s + 1);
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.size <= 15 * 1024 * 1024);
    setFiles((f) => [...f, ...arr].slice(0, 10));
  }

  async function submit() {
    setError('');
    if (!me && (!form.password || form.password.length < 8)) return setError('Please choose a password (min 8 characters) to create your client account');
    if (!form.agree) return setError('Please accept the terms to continue');
    setLoading(true);
    const fd = new FormData();
    fd.set('service', service);
    Object.entries(form).forEach(([k, v]) => fd.set(k, v));
    files.forEach((f) => fd.append('files', f));
    try {
      const r = await fetch('/api/apply', { method: 'POST', body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Submission failed');
      setResult(d);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const steps = ['Choose service', 'Your details', 'Documents & submit'];

  if (result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-2xl rounded-[2.5rem] bg-white p-10 md:p-14 text-center shadow-2xl ring-1 ring-ink/5">
        <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.15 }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold text-ink shadow-xl shadow-gold/40">
          <CircleCheck className="h-12 w-12" />
        </motion.span>
        <h2 className="mt-8 font-display text-4xl md:text-5xl font-semibold">Application submitted!</h2>
        <p className="mt-4 text-ink/65">Your reference number is</p>
        <p className="mt-2 inline-block rounded-2xl bg-sand px-6 py-3 font-mono text-2xl font-bold tracking-wider text-ink">{result.refNo}</p>
        <p className="mt-6 text-sm text-ink/60">A consultant will review your application and contact you shortly. You can track progress, upload documents and chat with us from your account.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/account/applications/${result.id}`} className="btn btn-gold">
            Track my application <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className="btn btn-outline">Back to home</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-ink/5 overflow-hidden">
      {/* Progress */}
      <div className="border-b border-ink/5 px-6 py-6 md:px-10">
        <div className="flex items-center gap-2 md:gap-4">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2 md:gap-3">
              <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-all', i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-gold text-ink shadow-lg shadow-gold/40' : 'bg-sand text-ink/40')}>
                {i < step ? '✓' : i + 1}
              </span>
              <span className={cn('hidden sm:block text-sm font-bold', i === step ? 'text-ink' : 'text-ink/40')}>{s}</span>
              {i < steps.length - 1 && <span className={cn('h-px flex-1', i < step ? 'bg-emerald-500' : 'bg-ink/10')} />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-10 min-h-[420px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <h2 className="font-display text-3xl font-semibold">Which visa or service do you need?</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {FEATURED.map((f) => (
                  <button key={f.v} onClick={() => setService(f.v)} className={cn('group flex items-center gap-4 rounded-2xl p-5 text-left ring-1 transition-all', service === f.v ? 'bg-ink text-white ring-ink shadow-xl' : 'ring-ink/10 hover:ring-gold')}>
                    <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl', service === f.v ? 'bg-gold text-ink' : 'bg-gold/15 text-gold-deep')}>
                      <f.icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-bold">{f.v}</span>
                      <span className={cn('block text-xs mt-0.5', service === f.v ? 'text-white/60' : 'text-ink/50')}>{f.d}</span>
                    </span>
                  </button>
                ))}
              </div>
              <label className="mt-6 block text-sm font-bold text-ink/60">Or choose another service</label>
              <select value={FEATURED.some((f) => f.v === service) ? '' : service} onChange={(e) => setService(e.target.value)} className="field mt-2">
                <option value="">— Other services —</option>
                {SERVICE_OPTIONS.filter((o) => !FEATURED.some((f) => f.v === o)).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <h2 className="font-display text-3xl font-semibold">Tell us about yourself</h2>
              <p className="mt-1 text-sm text-ink/55">As written in your passport.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input value={form.fullName || ''} onChange={set('fullName')} placeholder="Full name *" className="field" />
                <input value={form.email || ''} onChange={set('email')} type="email" placeholder="Email *" className="field" disabled={!!me} />
                <input value={form.phone || ''} onChange={set('phone')} placeholder="Phone / WhatsApp *" className="field" />
                <input value={form.nationality || ''} onChange={set('nationality')} placeholder="Nationality" className="field" />
                <input value={form.passportNo || ''} onChange={set('passportNo')} placeholder="Passport number" className="field" />
                <label className="relative">
                  <span className="absolute left-4 top-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink/40">Date of birth</span>
                  <input value={form.dateOfBirth || ''} onChange={set('dateOfBirth')} type="date" className="field pt-6 pb-2" />
                </label>
                <input value={form.propertyValue || ''} onChange={set('propertyValue')} placeholder="Property / investment value (AED)" className="field" />
                <select value={form.familyMembers} onChange={set('familyMembers')} className="field">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? 'No family members to sponsor' : `${n} family member${n > 1 ? 's' : ''} to sponsor`}
                    </option>
                  ))}
                </select>
                <textarea value={form.notes || ''} onChange={set('notes')} rows={3} placeholder="Anything else we should know?" className="field sm:col-span-2 resize-none" />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <h2 className="font-display text-3xl font-semibold">Upload documents <span className="text-base font-sans font-normal text-ink/45">(optional)</span></h2>
              <p className="mt-1 text-sm text-ink/55">Passport copy, photo, title deed / Oqood, SPA, Emirates ID… You can also upload later from your account.</p>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  addFiles(e.dataTransfer.files);
                }}
                className="mt-6 cursor-pointer rounded-3xl border-2 border-dashed border-gold/40 bg-sand/60 p-8 text-center transition hover:border-gold hover:bg-sand"
              >
                <Upload className="mx-auto h-10 w-10 text-gold-deep" />
                <p className="mt-3 font-bold">Drop files here or click to browse</p>
                <p className="text-xs text-ink/50">PDF, JPG, PNG, HEIC or Word · max 15 MB each · up to 10 files</p>
                <input ref={fileRef} type="file" multiple hidden accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx" onChange={(e) => addFiles(e.target.files)} />
              </div>
              {files.length > 0 && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 rounded-xl bg-sand px-4 py-2.5 text-sm">
                      <FileText className="h-4 w-4 text-gold-deep" />
                      <span className="flex-1 truncate">{f.name}</span>
                      <button onClick={() => setFiles((x) => x.filter((_, j) => j !== i))} className="text-ink/40 hover:text-red-500" aria-label="Remove">
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {!me ? (
                <div className="mt-8 rounded-3xl bg-ink p-6 text-white">
                  <p className="flex items-center gap-2 font-bold">
                    <Lock className="h-4 w-4 text-gold" /> Create your secure client account
                  </p>
                  <p className="mt-1 text-xs text-white/55">Your login email: {form.email}. Already have an account? <Link href="/login?next=/apply" className="text-gold underline">Sign in first</Link>.</p>
                  <input value={form.password || ''} onChange={set('password')} type="password" placeholder="Choose a password (min 8 characters)" className="field mt-4 !bg-white/5 !border-white/15 !text-white" />
                </div>
              ) : (
                <p className="mt-8 flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
                  <Sparkles className="h-4 w-4" /> Signed in as {me.email}. This application will appear in your account.
                </p>
              )}

              <label className="mt-6 flex items-start gap-3 text-sm text-ink/70">
                <input type="checkbox" checked={!!form.agree} onChange={(e) => setForm((f) => ({ ...f, agree: e.target.checked ? '1' : '' }))} className="mt-1 h-4 w-4 accent-[var(--brand-gold)]" />
                I confirm the information is correct and agree to be contacted about my application. Final visa decisions rest with UAE authorities.
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex items-center justify-between border-t border-ink/5 bg-sand/40 px-6 py-5 md:px-10">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} className={cn('btn btn-outline btn-sm', step === 0 && 'invisible')}>
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < 2 ? (
          <button onClick={next} className="btn btn-gold">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={submit} disabled={loading} className="btn btn-gold">
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CircleCheck className="h-4 w-4" />} Submit application
          </button>
        )}
      </div>
    </div>
  );
}
