import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router';
import { supabase } from '~/lib/supabase';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      alert('logged in successfully');
      navigate('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-10 border border-slate-100"
      >
        <div className="max-w-md w-full">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2">
              Enter your credentials to access your department
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100">
            <form onSubmit={handleLogin} className="space-y-6 text-black">
              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                  Student Email
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="j.doe@student.ndu.edu.ng"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-slate-700 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    FORGOT?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"
                    size={20}
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-slate-700 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 px-1">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <label
                  htmlFor="remember"
                  className="text-xs font-bold text-slate-500 cursor-pointer"
                >
                  Keep me logged in
                </label>
              </div>

              {/* Login Button */}
              <button
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 group"
              >
                <AnimatePresence mode="wait">
                  {!loading ? (
                    <motion.div
                      key="text"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      SIGN IN
                      <ArrowRight size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-1.5"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2.5 h-2.5 bg-white rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>

          {/* Bottom Call to Action */}
          <p className="mt-8 text-center text-slate-500 text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
