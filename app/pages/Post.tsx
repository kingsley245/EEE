import { useState } from 'react';
import { supabase } from '~/lib/supabase';

export default function DropWisdom() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Auto-detect identity from metadata
    const userLevel = user?.user_metadata?.level || 'Unknown';
    const userId = user?.id;

    const res = await fetch(`https://eee-backend-yspo.onrender.com/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          Content: text,
          Author_Level: userLevel,
          Author_ID: userId,
          Approved: false,
        },
      }),
    });

    if (res.ok) {
      alert('Submitted! It will appear once the Admin approves it.');
      setText('');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <textarea
        className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Share a regret or advice anonymously..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handlePost}
        disabled={loading}
        className="mt-3 w-full bg-[#001489] text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors"
      >
        {loading ? 'SENDING...' : 'POST ANONYMOUSLY'}
      </button>
    </div>
  );
}
