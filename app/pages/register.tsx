import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  BookOpen,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '~/lib/supabase';
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [level, setLevel] = useState('100 level');
  const [matNo, setMatNo] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          level: level,
          mat_no: matNo,
          role: 'student',
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert(
        'Registration Successful! Check your email for a confirmation Link',
      );
      navigate('/login');
    }
    setLoading(false);
  };
  return (
    <>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          <div className="md:w-5/12 bg-linear-to-br from-[#001489] to-[#000a4d] p-10 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-yellow-400 rounded-lg shadow-lg">
                  <BookOpen className="text-blue-900" size={24} />
                </div>
                <span className="font-black tracking-tighter text-2xl">
                  NDU<span className="text-yellow-400">EEE</span>
                </span>
              </div>

              <h2 className="text-3xl font-black mb-6 leading-tight">
                Power Up Your{' '}
                <span className="text-yellow-400">Engineering</span> Journey.
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg">
                    <Zap size={18} className="text-yellow-400" />
                  </div>
                  <p className="text-white/70 text-sm">
                    Access exclusive course materials and solved past questions.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg">
                    <ShieldCheck size={18} className="text-yellow-400" />
                  </div>
                  <p className="text-white/70 text-sm">
                    Official department updates sent directly to your student
                    dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs text-white/40 italic">
                "Engineering is not just about logic; it's about building the
                future."
              </p>
            </div>
          </div>

          {/* --- RIGHT SIDE: THE FORM --- */}
          <div className="md:w-7/12 p-8 md:p-14">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                Create Account
              </h2>
              <p className="text-slate-500 text-sm">
                Join the community of future-ready engineers.
              </p>
            </div>

            <form className="space-y-5 text-black" onSubmit={handleRegister}>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                  />
                </div>
              </div>
              {/* Matric Number */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Matric Number
                </label>
                <div className="relative group">
                  <Zap
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="NDU/2021/045"
                    value={matNo}
                    onChange={(e) => setMatNo(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Student Email
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="j.doe@student.ndu.edu.ng"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                      size={18}
                    />
                    <input
                      type="password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Level Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Academic Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none appearance-none font-bold text-slate-700"
                  >
                    <option>100 Level</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                    <option>500 Level</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group mt-4"
              >
                <AnimatePresence mode="wait">
                  {!loading ? (
                    <motion.div
                      key="text"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      REGISTER NOW
                      <ArrowRight size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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

            <p className="mt-8 text-center text-slate-500 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
