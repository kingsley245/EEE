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
import { Link } from 'react-router';
export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    level: '100',
  });

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        {/* --- LEFT SIDE: THE VIBE / INFO --- */}
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
              Power Up Your <span className="text-yellow-400">Engineering</span>{' '}
              Journey.
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

          <form className="space-y-5">
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
                  placeholder="j.doe@student.ndu.edu.ng"
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
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none appearance-none font-bold text-slate-700">
                  <option>100 Level</option>
                  <option>200 Level</option>
                  <option>300 Level</option>
                  <option>400 Level</option>
                  <option>500 Level</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group mt-4">
              SIGN UP NOW
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
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
  );
}
