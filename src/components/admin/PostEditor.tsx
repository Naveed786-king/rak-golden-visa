'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, ExternalLink, Trash2 } from 'lucide-react';
import RichEditor from './RichEditor';
import { ImageInput } from './MediaPicker';
import { Btn, Card, api, toast } from './ui';
import { slugify } from '@/lib/utils';

export default function PostEditor({ initial }: { initial: any }) {
  const router = useRouter();
  const [p, setP] = useState<any>({ ...initial, publishedAt: (initial.publishedAt || new Date().toISOString()).slice(0, 16) });
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!initial.id);
  const set = (k: string, v: any) => setP((x: any) => ({ ...x, [k]: v }));

  async function save() {
    if (!p.title) return toast('Title is required', 'error');
    setSaving(true);
    try {
      const body = { ...p, slug: p.slug || slugify(p.title), publishedAt: new Date(p.publishedAt).toISOString() };
      if (p.id) {
        await api(`/api/admin/posts/${p.id}`, 'PUT', body);
        toast('Post saved');
        router.refresh();
      } else {
        const d = await api<{ item: any }>('/api/admin/posts', 'POST', body);
        toast('Post published');
        router.replace(`/admin/posts/${d.item.id}`);
      }
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm('Delete this post?')) return;
    await api(`/api/admin/posts/${p.id}`, 'DELETE');
    toast('Deleted');
    router.push('/admin/posts');
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link href="/admin/posts" className="rounded-lg p-2 text-gray-500 hover:bg-white" aria-label="Back">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="flex-1 text-2xl font-extrabold">{p.id ? 'Edit post' : 'New post'}</h1>
        {p.id && (
          <>
            <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-bold text-gray-600 ring-1 ring-gray-300">
              <ExternalLink className="h-4 w-4" /> View
            </a>
            <Btn variant="danger" onClick={remove}>
              <Trash2 className="h-4 w-4" />
            </Btn>
          </>
        )}
        <Btn onClick={save} loading={saving}>
          <Save className="h-4 w-4" /> {p.id ? 'Save' : 'Publish'}
        </Btn>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5 min-w-0">
          <Card className="p-5 space-y-4">
            <input
              value={p.title}
              onChange={(e) => {
                set('title', e.target.value);
                if (autoSlug) set('slug', slugify(e.target.value));
              }}
              placeholder="Post title"
              className="w-full border-0 bg-transparent text-2xl md:text-3xl font-extrabold outline-none placeholder:text-gray-300"
            />
            <div className="flex items-center rounded-[10px] ring-1 ring-gray-200 bg-gray-50">
              <span className="pl-3 text-xs text-gray-400">yoursite.com/</span>
              <input
                value={p.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  set('slug', e.target.value);
                }}
                className="w-full bg-transparent px-1 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="admin-label">Excerpt (shown on blog cards)</label>
              <textarea value={p.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} className="admin-input min-h-[70px]" />
            </div>
          </Card>
          <RichEditor value={p.content} onChange={(v) => set('content', v)} minHeight={520} />
        </div>
        <div className="space-y-5">
          <Card title="Publish" className="p-0">
            <div className="space-y-4 p-5">
              <div>
                <label className="admin-label">Status</label>
                <select className="admin-input" value={p.status} onChange={(e) => set('status', e.target.value)}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Publish date</label>
                <input type="datetime-local" className="admin-input" value={p.publishedAt} onChange={(e) => set('publishedAt', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Author</label>
                <input className="admin-input" value={p.author || ''} onChange={(e) => set('author', e.target.value)} />
              </div>
            </div>
          </Card>
          <Card title="Cover image" className="p-0">
            <div className="p-5">
              <ImageInput value={p.cover} onChange={(v) => set('cover', v)} />
            </div>
          </Card>
          <Card title="Organise" className="p-0">
            <div className="space-y-4 p-5">
              <div>
                <label className="admin-label">Category</label>
                <input className="admin-input" value={p.category || ''} onChange={(e) => set('category', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Tags (comma separated)</label>
                <input className="admin-input" value={p.tags || ''} onChange={(e) => set('tags', e.target.value)} />
              </div>
            </div>
          </Card>
          <Card title="SEO" className="p-0">
            <div className="space-y-4 p-5">
              <div>
                <label className="admin-label">Meta title ({(p.metaTitle || '').length}/60)</label>
                <input className="admin-input" value={p.metaTitle || ''} onChange={(e) => set('metaTitle', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Meta description ({(p.metaDescription || '').length}/160)</label>
                <textarea className="admin-input min-h-[80px]" value={p.metaDescription || ''} onChange={(e) => set('metaDescription', e.target.value)} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
