'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import PostCard from './PostCard';

export default function LoadMorePosts({ start, total, category, dark }: { start: number; total: number; category?: string; dark?: boolean }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const shown = start + posts.length;

  async function more() {
    setLoading(true);
    const q = new URLSearchParams({ skip: String(shown), take: '6' });
    if (category) q.set('category', category);
    const r = await fetch(`/api/posts?${q}`);
    const d = await r.json();
    setPosts((p) => [...p, ...(d.items || [])]);
    setLoading(false);
  }

  return (
    <>
      {posts.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 6) * 0.06 }}>
              <PostCard post={p} dark={dark} />
            </motion.div>
          ))}
        </div>
      )}
      {shown < total && (
        <div className="mt-12 text-center">
          <button onClick={more} disabled={loading} className="btn btn-dark">
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />} Load more articles
          </button>
        </div>
      )}
    </>
  );
}
