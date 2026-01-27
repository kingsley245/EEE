import { useState } from 'react';
import { supabase } from '~/lib/supabase';
import { Link } from 'react-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Supabase sends the reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      alert(error.message);
    } else {
      setMessage('Check your email for the reset link!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          Reset Password
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Enter your email and we'll send you a link to get back into your
          portal.
        </p>

        {message ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm font-bold border border-green-100">
            {message}
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="student@ndu.edu.ng"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
