import React from 'react';
import { Mail, Lock, LogIn, ArrowLeft, KeyRound } from 'lucide-react';
import { Link } from 'react-router';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-12 px-4">
      {/* Back to Home Shortcut */}
      <Link
        to="/"
        className="absolute mt-1 mb-6 top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm"
      >
        <ArrowLeft size={16} /> BACK TO HOME
      </Link>

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
          <form className="space-y-6">
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
            <button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 group">
              <span>ACCESS PORTAL</span>
              <LogIn
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
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
    </div>
  );
}
