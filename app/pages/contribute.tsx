import { useEffect, useState } from 'react';

export default function ModerationPQs() {
  const [pendingPQs, setPendingPQs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await fetch(
        `https://eee-backend-yspo.onrender.com/api/past-questions?filters[Approved][$eq]=false&populate=*`,
      );
      const json = await res.json();
      setPendingPQs(json.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (docId: string, action: 'approve' | 'delete') => {
    const url = `https://eee-backend-yspo.onrender.com/api/past-questions/${docId}`;

    if (action === 'approve') {
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { Approved: true } }),
      });
      alert('PQ Approved!');
    } else {
      if (!window.confirm('Delete this upload?')) return;
      await fetch(url, { method: 'DELETE' });
    }
    fetchPending();
  };

  if (loading)
    return <div className="p-10 text-center font-bold">Verifying files...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-8 italic">PQ Moderation</h1>

      <div className="space-y-6">
        {pendingPQs.map((pq: any) => (
          <div
            key={pq.documentId}
            className="bg-white border rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row gap-8"
          >
            <div className="flex-1">
              <div className="flex gap-2 mb-4">
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full">
                  {pq.Course_Code}
                </span>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {pq.Level}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {pq.Course_Title}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Uploaded by: {pq.Contributor} • Year: {pq.Year}
              </p>

              {/* MAPPING THROUGH THE MEDIA ARRAY */}
              <div className="mt-6 space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Attachments ({pq.Media?.length || 0})
                </p>
                {pq.Media?.map((file: any) => (
                  <a
                    key={file.id}
                    href={file.url} // Cloudinary URLs are absolute, no need for localhost:1337
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-colors group"
                  >
                    <span className="text-lg">📄</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {(file.size / 1024).toFixed(2)} MB • {file.ext}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex md:flex-col gap-3 justify-center">
              <button
                onClick={() => handleAction(pq.documentId, 'approve')}
                className="px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-xs uppercase shadow-lg shadow-green-100"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(pq.documentId, 'delete')}
                className="px-8 py-4 bg-red-50 text-red-500 rounded-2xl font-black text-xs uppercase"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
