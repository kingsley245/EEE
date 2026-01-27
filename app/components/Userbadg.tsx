import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

export default function UserBadge() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (
      <Link
        to="/login"
        className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors"
      >
        Login
      </Link>
    );
  }

  const fullName = user.user_metadata?.full_name || 'Student';
  const level = user.user_metadata?.level || 'N/A';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 pr-4 rounded-2xl hover:shadow-md transition-all active:scale-95"
      >
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
          {fullName.charAt(0).toUpperCase()}
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
            {level}
          </p>
          <p className="text-sm font-bold text-slate-900 leading-none">
            {fullName.split(' ')[0]}
          </p>
        </div>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside to close */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20"
            >
              <div className="px-3 py-2 border-b border-slate-50 mb-1">
                <p className="text-[10px] font-bold text-slate-400 truncate">
                  {user.email}
                </p>
              </div>

              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <UserIcon size={16} /> Profile
              </button>

              <button
                onClick={() => supabase.auth.signOut()}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
