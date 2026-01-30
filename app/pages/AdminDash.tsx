import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);

  const fetchPending = async () => {
    const res = await fetch(
      `https://eee-backend-yspo.onrender.com/api/Posts?filters[Approved][$eq]=false`,
    );
    const json = await res.json();
    setPending(json.data);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id: number, action: 'approve' | 'delete') => {
    const url = `https://eee-backend-yspo.onrender.com/api/Posts/${id}`;

    if (action === 'approve') {
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { Approved: true } }),
      });
    } else {
      await fetch(url, { method: 'DELETE' });
    }
    fetchPending();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-6">God-Mode: Moderation Queue</h1>
      <div className="space-y-4">
        {pending.map((post: any) => (
          <div
            key={post.id}
            className="p-5 bg-white border border-slate-200 rounded-2xl flex justify-between items-center"
          >
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">
                {/* REMOVED .attributes HERE */}
                User {post.Author_Level}
              </span>
              {/* REMOVED .attributes HERE */}
              <p className="text-slate-800 mt-1">{post.Content}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(post.id, 'approve')}
                className="p-2 bg-green-100 text-green-700 rounded-lg cursor-pointer"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleAction(post.id, 'delete')}
                className="p-2 bg-red-100 text-red-700 rounded-lg cursor-pointer"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
        {pending.length === 0 && (
          <p className="text-slate-400">
            Everything is cleared! No pending posts.
          </p>
        )}
      </div>
    </div>
  );
}
