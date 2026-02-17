import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Menu, X, BookOpen } from 'lucide-react';
// import Features from '../components/Features';
import { supabase } from '~/lib/supabase';
import lab from '../Assets/lab.jpg';

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  // Effect to handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <>
      <div className="relative min-h-screen bg-white overflow-hidden">
        {/* --- NAVBAR --- */}
        <nav
          className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3'
              : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <BookOpen className="text-white" size={20} />
              </div>
              <span
                className={`font-black text-xl tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}
              >
                NDU<span className="text-blue-600">EEE</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['About Us', 'ContactUs'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '')}`}
                  className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <div className="h-6 w-px bg-slate-200 mx-2" />

              {/* <Link
                to="/login"
                className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
              >
                Register
              </Link> */}
              <div className="hidden md:flex items-center gap-8">
                {user ? (
                  // WHAT LOGGED-IN USERS SEE
                  <>
                    <Link
                      to="/login"
                      className="text-xs font-black uppercase tracking-widest text-slate-900"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  // WHAT LOGGED-OUT USERS SEE (Your current buttons)
                  <>
                    <Link
                      to="/login"
                      className="text-xs font-black uppercase tracking-widest text-slate-900"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          {/* --- MOBILE DRAWER --- */}
        </nav>

        {/* --- HERO CONTENT --- */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-20 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">
                  Official NDU EEE Portal
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
                Empowering <br />
                The Future of <br />
                <span className="text-blue-600">Energy.</span>
              </h1>

              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Access departmental resources, lecture notes, and research
                materials. Exclusively for the students and faculty of
                Electrical & Electronic Engineering.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={user ? '/portal' : '/register'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2 group"
                >
                  {user ? 'Continue to Dashboard' : 'Join the Department'}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 pt-8">
                <div>
                  <p className="text-2xl font-black text-slate-900">1.2k+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Students
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">45+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Lecturers
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">100%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Accredited
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-12 border-white">
                <img
                  src={lab}
                  alt="Engineering Lab"
                  className="w-full h-137.5 object-cover"
                />
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl max-w-60">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-blue-600 rounded-2xl text-white">
                      <Zap size={24} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">
                        Real-time Updates
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Get instant news on semester schedules.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        {/* 1. Backdrop Overlay (Closes menu when clicked) */}
        <div
          className={`fixed inset-0 h-screen w-screen bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen
              ? 'opacity-100 z-110'
              : 'opacity-0 pointer-events-none -z-10'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* 2. Side Panel */}
        <div
          className={`fixed top-0 right-0 h-screen w-72 bg-[#001489] shadow-2xl transform transition-transform duration-500 
      ease-[cubic-bezier(0.33,1,0.68,1)] ${
        mobileMenuOpen ? 'translate-x-0 z-120' : 'translate-x-full'
      }`}
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="text-white font-black tracking-tighter text-xl">
              NDU<span className="text-blue-400">EEE</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X size={28} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col p-6 gap-4">
            <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-2">
              Main Navigation
            </p>

            {['About Us', 'Contact Us'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-lg font-bold hover:text-blue-300 transition-colors py-2"
              >
                {item}
              </Link>
            ))}

            <div className="h-px bg-white/10 my-4" />

            <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-2">
              Student Portal
            </p>

            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-white font-bold py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
            >
              Login <ArrowRight size={18} className="opacity-50" />
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-blue-500 text-white font-black py-4 px-4 rounded-2xl text-center shadow-lg shadow-blue-900/50 mt-4 active:scale-95 transition-transform"
            >
              REGISTER NOW
            </Link>
          </div>

          {/* Footer Info */}
          <div className="absolute bottom-10 left-6 right-6 text-center">
            <p className="text-blue-300/40 text-[10px] font-medium tracking-tight">
              © 2026 NDU Electrical Engineering <br />
              Excellence in Innovation
            </p>
          </div>
        </div>
      </div>
      {/* <Features /> */}
    </>
  );
}
