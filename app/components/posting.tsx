import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';

export default function WisdomWall() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Comment Modal States
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Load User and Posts
  const fetchData = async () => {
    try {
      // Get current user from Supabase
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);

      // Get approved posts from Strapi
      const res = await fetch(
        `http://localhost:1337/api/Posts?filters[Approved][$eq]=true`,
      );
      const json = await res.json();
      setPosts(json.data || []);
    } catch (err) {
      console.error('Error loading wall:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Delete Logic (Only for Owner)
  const handleDelete = async (docId: string) => {
    if (!window.confirm('Delete this post permanently?')) return;
    const res = await fetch(
      `https://eee-backend-yspo.onrender.com/api/Posts/${docId}`,
      {
        method: 'DELETE',
      },
    );
    if (res.ok) {
      setPosts(posts.filter((p: any) => p.documentId !== docId));
    }
  };

  // 3. Comment Logic (Only for non-100L others)
  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    setIsSubmitting(true);

    const res = await fetch(
      `https://eee-backend-yspo.onrender.com/api/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            Content: commentText,
            Author_Level: currentUser?.user_metadata?.level || 'Guest',
            Post_ID: selectedPost.documentId,
          },
        }),
      },
    );

    if (res.ok) {
      setCommentText('');
      setSelectedPost(null);
      alert('Comment added!');
    }
    setIsSubmitting(false);
  };

  if (loading)
    return (
      <div className="text-center py-20 font-black text-slate-400 animate-pulse">
        LOADING WISDOM...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-2 italic tracking-tighter">
            THE WISDOM WALL
          </h1>
          <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">
            NDU EEE Engineering Community
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => {
            const isOwner = post.Author_ID === currentUser?.id;
            const is100L = currentUser?.user_metadata?.level === '100 Level';

            return (
              <div
                key={post.documentId}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                      {post.Author_Level}
                    </span>
                    {isOwner && (
                      <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-slate-800 text-lg leading-relaxed font-medium italic">
                    "{post.Content}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex gap-5">
                    {/* Reaction Component */}
                    <button className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">
                      🔥 0
                    </button>

                    {/* Logic: Don't show reply if it's YOUR post or if you are 100L */}
                    {!isOwner && !is100L && (
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-sm font-bold text-blue-500 hover:text-blue-700 underline underline-offset-4"
                      >
                        Reply
                      </button>
                    )}
                  </div>

                  {/* Logic: Only show delete if it's YOUR post */}
                  {isOwner && (
                    <button
                      onClick={() => handleDelete(post.documentId)}
                      className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">
              The wall is empty. Start the conversation.
            </p>
          </div>
        )}
      </div>

      {/* --- COMMENT MODAL OVERLAY --- */}
      {selectedPost && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-black text-slate-900">
                Reply to {selectedPost.Author_Level}
              </h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-300 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6 p-4 bg-slate-50 rounded-2xl border-l-4 border-blue-500">
              <p className="text-slate-500 text-sm italic">
                "{selectedPost.Content}"
              </p>
            </div>

            <textarea
              autoFocus
              className="w-full h-40 p-5 bg-slate-100 rounded-[1.5rem] border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800"
              placeholder="Give them some advice or ask a question..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex-1 py-4 font-bold text-slate-400 hover:bg-slate-50 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handlePostComment}
                disabled={isSubmitting || !commentText.trim()}
                className="flex-1 py-4 font-bold bg-[#001489] text-white rounded-2xl shadow-xl shadow-blue-200 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:shadow-none"
              >
                {isSubmitting ? 'POSTING...' : 'REPLY'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
