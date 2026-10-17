'use client';
import { useEffect, useState } from 'react';
import { RefreshCw, Save, ExternalLink } from 'lucide-react';
import { LOCALES, localizePath } from '@/lib/i18n/config';
import RichEditor from './RichEditor';
import { Btn, Card, Spinner, api, toast } from './ui';
import { cn } from '@/lib/utils';

/** Language tabs for a blog post: view / edit / re-translate each language */
export function LanguageTabs({ entityId, value, onChange }: { entityId?: string; value: string; onChange: (l: string) => void }) {
  const [rows, setRows] = useState<{ locale: string; status: string }[]>([]);
  useEffect(() => {
    if (!entityId) return;
    const load = () => api<{ rows: any[] }>(`/api/admin/translations?entity=post&id=${entityId}`).then((d) => setRows(d.rows)).catch(() => {});
    load();
    const t = setInterval(load, 6000);
    return () => clearInterval(t);
  }, [entityId]);
  return (
    <div className="flex flex-wrap gap-1.5 rounded-2xl bg-white p-1.5 ring-1 ring-gray-200">
      {LOCALES.map((l) => {
        const r = rows.find((x) => x.locale === l.code);
        const dot = l.code === 'en' ? '' : !r ? 'bg-gray-300' : r.status === 'outdated' ? 'bg-amber-500' : r.status === 'edited' ? 'bg-blue-500' : 'bg-emerald-500';
        return (
          <button
            key={l.code}
            type="button"
            disabled={!entityId && l.code !== 'en'}
            onClick={() => onChange(l.code)}
            title={l.code === 'en' ? 'Original' : !r ? 'Not translated yet' : r.status}
            className={cn('flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition disabled:opacity-40', value === l.code ? 'bg-ink text-white' : 'text-gray-600 hover:bg-gray-100')}
          >
            <span>{l.flag}</span> {l.code.toUpperCase()}
            {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dot)} />}
          </button>
        );
      })}
    </div>
  );
}

export function PostTranslation({ id, slug, locale }: { id: string; slug: string; locale: string }) {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const info = LOCALES.find((l) => l.code === locale)!;

  const load = async () => {
    setData(null);
    const d = await api<{ translation: any }>(`/api/admin/translations?entity=post&id=${id}&locale=${locale}`);
    setData(d.translation?.data || {});
    setStatus(d.translation?.status || 'missing');
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, locale]);

  async function save() {
    setSaving(true);
    try {
      await api('/api/admin/translations', 'PUT', { entity: 'post', id, locale, data });
      setStatus('edited');
      toast(`${info.name} version saved`);
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  }
  async function retranslate() {
    if (status === 'edited' && !confirm('Replace your manual edits with a fresh automatic translation?')) return;
    setBusy(true);
    try {
      await api('/api/admin/translations', 'POST', { action: 'entity', entity: 'post', id, locale });
      toast(`Translated to ${info.name}`);
      await load();
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  if (!data) return <Spinner />;
  const set = (k: string, v: string) => setData((d: any) => ({ ...d, [k]: v }));
  const label: Record<string, string> = { missing: 'Not translated yet', auto: 'Translated automatically', edited: 'Edited by hand', outdated: 'English changed — update needed' };

  return (
    <div className="space-y-5" dir={info.dir}>
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-gold/10 p-4" dir="ltr">
        <span className="text-2xl">{info.flag}</span>
        <div className="flex-1">
          <p className="font-bold">{info.name} version</p>
          <p className="text-xs text-gray-600">{label[status] || status}. Change anything below and click “Save {info.name}”.</p>
        </div>
        <a href={localizePath(`/${slug}`, locale)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold ring-1 ring-gray-200">
          <ExternalLink className="h-3.5 w-3.5" /> View
        </a>
        <Btn variant="outline" size="sm" onClick={retranslate} loading={busy}>
          <RefreshCw className="h-3.5 w-3.5" /> {status === 'missing' ? 'Translate now' : 'Re-translate'}
        </Btn>
        <Btn size="sm" onClick={save} loading={saving}>
          <Save className="h-3.5 w-3.5" /> Save {info.name}
        </Btn>
      </div>
      <Card className="space-y-4 p-5">
        <input value={data.title || ''} onChange={(e) => set('title', e.target.value)} placeholder="Title" className="w-full border-0 bg-transparent text-2xl font-extrabold outline-none" />
        <div>
          <label className="admin-label">Excerpt</label>
          <textarea value={data.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} className="admin-input min-h-[70px]" />
        </div>
      </Card>
      <RichEditor value={data.content || ''} onChange={(v) => set('content', v)} minHeight={460} />
      <Card className="grid gap-4 p-5 md:grid-cols-2">
        <div>
          <label className="admin-label">Category</label>
          <input value={data.category || ''} onChange={(e) => set('category', e.target.value)} className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Meta title</label>
          <input value={data.metaTitle || ''} onChange={(e) => set('metaTitle', e.target.value)} className="admin-input" />
        </div>
        <div className="md:col-span-2">
          <label className="admin-label">Meta description</label>
          <textarea value={data.metaDescription || ''} onChange={(e) => set('metaDescription', e.target.value)} className="admin-input min-h-[60px]" />
        </div>
      </Card>
    </div>
  );
}
