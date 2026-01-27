import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { navLinks } from '~/lib/Navlinks';
import { AnimatePresence } from 'framer-motion';
import UserBadge from './Userbadg';
import { supabase } from '~/lib/supabase';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // checking for slider
  const [sliderIndices, setSliderIndices] = useState<{ [key: string]: number }>(
    {
      'Electrical Wiring': 0,
      Electronics: 0,
      Basics: 0,
    },
  );
  const handleNext = (navName: string, max: number) => {
    setSliderIndices((prev) => ({
      ...prev,

      [navName]: Math.min((prev[navName] || 0) + 1, max),
    }));
  };

  const handelPrev = (navName: string) => {
    setSliderIndices((prev) => ({
      ...prev,

      [navName]: Math.max((prev[navName] || 0) - 1, 0),
    }));
  };
  // Helper function with proper spacing
  const activeLink = ({ isActive }: { isActive: boolean }) => {
    const baseClasses =
      'px-4 py-5 flex items-center text-[10px] font-bold uppercase tracking-wider transition-all';

    const activeClasses = 'text-yellow-400 border-b-2 border-yellow-400';
    const inactiveClasses = 'text-white hover:text-blue-300 hover:bg-blue-900';

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  // function to handle logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      localStorage.clear();

      window.location.replace('/');
    } catch (error) {
      console.error('Logout failed:', error.message);

      window.location.replace('/');
    }
  };
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  useEffect(() => {
    const handleSize = () => {
      // checking if window width changes
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
      }
    };
    // event listener
    window.addEventListener('resize', handleSize);

    // when unmount
    return () => window.removeEventListener('resize', handleSize);
  });

  const message = 'I love Electrical $ electronics';
  const location = useLocation();
  return (
    <>
      <header>
        <div className="flex bg-white text-black text-[10px] md:text-1xl py-2 md:py-1 px-4 md:px-6 justify-between items-center border-b">
          <div className="flex items-center">
            <span className="bg-red-500 text-white px-2 py-0.5 font-bold mr-2 md:mr-3 rounded animate-pulse shrink-0">
              Breaking News
            </span>

            <motion.span
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 4,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 3,
              }}
              className="inline-block overflow-hidden border-r-2 border-blue-600 whitespace-nowrap"
            >
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                {message}
              </span>
            </motion.span>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4 text-xs font-semibold text-gray-600">
            {/* Inside the Mobile Panel div */}
            <div className="p-6 border-b border-white/10">
              {user ? (
                <div className="flex items-center justify-between w-full bg-blue-900/40 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    {/* Avatar Circle */}
                    <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-blue-900 shadow-lg shadow-yellow-400/20">
                      <span className="text-lg font-black uppercase">
                        {user.user_metadata?.full_name?.charAt(0) ||
                          user.email?.charAt(0)}
                      </span>
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col">
                      <h2 className="text-white text-xs font-medium opacity-70 uppercase tracking-tighter">
                        Welcome back,
                      </h2>
                      <p className="text-white font-bold text-base leading-tight">
                        {user.user_metadata?.full_name || 'EEE Student'}
                      </p>
                      <span className="text-yellow-400 text-[10px] uppercase font-black tracking-widest mt-1">
                        Level: {user.user_metadata?.level || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/70 text-xs font-bold uppercase tracking-widest rounded-lg border border-white/5 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full bg-black/10 p-4 rounded-xl">
                  <p className="text-black/60 text-sm font-bold uppercase tracking-widest italic">
                    Guest Mode
                  </p>
                  <a
                    href="/login"
                    className="text-blue-600 font-bold text-sm underline"
                  >
                    Login
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. MAIN NAV BAR */}
        <motion.nav
          className="bg-linear-to-r from-blue-800 to-blue-950 text-white px-4 flex justify-between items-center relative top-0 left-0 right-0 z-50"
          variants={{
            visible: { y: 0 },
            hidden: { y: '-100%' },
          }}
          animate={hidden ? 'hidden' : 'visible'}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="flex items-center">
            <Link to="/home" className="text-white text-2xl font-bold p-3">
              NDU EEE
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center h-full">
            {navLinks.map((item, index) => (
              <div
                key={index}
                className="group h-full flex items-center static"
              >
                <NavLink to={item.path} className={activeLink} end>
                  {item.name}
                  {/* DROPDOWN ARROW: Only shows if the item has sub-links */}
                  {item.links && item.links.length > 0 && (
                    <svg
                      className="w-3 h-3 ml-1.5 fill-current opacity-70 group-hover:rotate-180 transition-transform duration-300"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  )}
                </NavLink>

                {/* Mega Menu Dropdown */}
                {item.links && item.links.length > 0 && item.content && (
                  <div className="hidden group-hover:flex absolute left-0 right-0 top-full w-full bg-[#001a66] shadow-2xl z-50 border-t-2 border-blue-500 animate-in fade-in slide-in-from-top-2">
                    <div className="max-w-7xl mx-auto flex w-full h-95">
                      {/* Sidebar Links */}
                      <div className="w-[25%] bg-black/40 p-6 space-y-3 overflow-y-auto">
                        {item.links.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <Link
                              to="#"
                              className="text-sm font-semibold hover:text-blue-400 transition-colors"
                            >
                              {sub.text}
                            </Link>
                            {sub.label && (
                              <span
                                className={`${sub.labelColor || 'bg-blue-600'} text-[9px] px-1 py-0.5 rounded font-bold`}
                              >
                                {sub.label}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Featured Content Area (SLIDER) */}
                      <div className="w-[75%] p-8 flex gap-8 relative bg-[#00144d] overflow-hidden">
                        <AnimatePresence mode="wait">
                          {(() => {
                            const currentIndex = sliderIndices[item.name] || 0;
                            const currentSlide = item.content[currentIndex];

                            if (!currentSlide) return null;

                            return (
                              /* 2. Wrap the inner content in a motion.div */
                              <motion.div
                                key={`${item.name}-${currentIndex}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{
                                  duration: 0.4,
                                  ease: 'easeInOut',
                                }}
                                className="flex w-full gap-8"
                              >
                                {/* Main Slide Content */}
                                <div className="w-[60%]">
                                  <div className="w-full aspect-video bg-gray-900 border border-blue-400/20 mb-4 overflow-hidden rounded">
                                    <img
                                      src={currentSlide.image}
                                      className="w-full h-full object-cover"
                                      alt="Featured"
                                    />
                                  </div>
                                  <h3 className="text-xl font-bold leading-tight hover:text-blue-400 cursor-pointer">
                                    {currentSlide.title}
                                  </h3>
                                </div>

                                {/* Side Posts */}
                                <div className="w-[40%] flex flex-col gap-4">
                                  {currentSlide.sidePosts.map((post, pIdx) => (
                                    <div
                                      key={pIdx}
                                      className="flex gap-3 group/post cursor-pointer border-b border-blue-900 pb-2"
                                    >
                                      <img
                                        src={post.thumb}
                                        className="w-20 h-14 object-cover rounded border border-blue-400/20"
                                        alt="thumb"
                                      />
                                      <p className="text-xs font-bold group-hover/post:text-blue-400">
                                        {post.title}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            );
                          })()}
                        </AnimatePresence>

                        {/* SLIDER CONTROLS */}
                        <div className="absolute bottom-6 right-8 flex gap-2">
                          <button
                            disabled={(sliderIndices[item.name] || 0) === 0}
                            onClick={() => handelPrev(item.name)}
                            className="w-10 h-10 border border-blue-500 flex items-center justify-center rounded hover:bg-blue-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                          >
                            &larr;
                          </button>
                          <button
                            disabled={
                              (sliderIndices[item.name] || 0) ===
                              item.content.length - 1
                            }
                            onClick={() =>
                              handleNext(item.name, item.content.length - 1)
                            }
                            className="w-10 h-10 border border-blue-500 flex items-center justify-center rounded hover:bg-blue-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                          >
                            &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden p-2 text-white"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </motion.nav>

        {/* 3. MOBILE SIDEBAR */}
        {/* Overlay: Handles click-anywhere-outside to close */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsDrawerOpen(false)} // Closes when clicking outside
        />

        {/* Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-linear-to-b from-[#000a4d] to-[#001489] z-70 
             shadow-2xl transform transition-transform duration-300 ease-in-out ${
               isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
             } overflow-y-auto flex flex-col`}
        >
          {/* Header with Close Button & Static Links */}
          {/* 2. PROFILE SECTION AT TOP OF SIDEBAR */}
          <div className="p-6 border-b border-white/10 bg-black/30">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Circle with first letter of name */}
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-blue-900 font-black text-xl">
                  {user.user_metadata?.full_name?.charAt(0) ||
                    user.email?.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-tight">
                    Welcome back!
                  </p>
                  <p className="text-yellow-400 text-[10px] uppercase font-black tracking-widest mt-1">
                    {user.user_metadata?.level || 'Student'}
                  </p>
                </div>
              </div>
            ) : (
              /* SHARP GUEST MODE TAG */
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 w-fit px-3 py-1 bg-white/10 border border-white/20 rounded-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                  </span>
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    Guest Mode
                  </p>
                </div>
                <p className="text-blue-300/60 text-[9px] font-bold pl-1 uppercase">
                  Login for full access
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col border-b border-white/10 bg-black/10">
            {/* <div className="flex justify-end p-4">
              <button
                onClick={() => setIsDrawerOpen(false)} // X button closes sidebar
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div> */}
            <div className="flex justify-between items-center p-4 px-6">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                Navigation
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Static Top Links: About & Contact */}
            <div className="flex flex-col px-4 pb-4 gap-2">
              <NavLink
                to="/about"
                onClick={() => setIsDrawerOpen(false)}
                className="text-white/80 hover:text-yellow-400 font-bold text-xs uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsDrawerOpen(false)}
                className="text-white/80 hover:text-yellow-400 font-bold text-xs uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
              >
                Contact Us
              </NavLink>
            </div>
          </div>

          {/* Main NavLinks Array */}
          <div className="flex flex-col text-white px-2 py-4">
            {navLinks.map((item, index) => (
              <div
                key={index}
                className="border-b border-white/5 last:border-0"
              >
                <div className="flex justify-between items-center hover:bg-white/5 rounded-lg transition-all">
                  <NavLink
                    to={item.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className={() => {
                      const isStrictActive = location.pathname === item.path;

                      return `flex-1 font-bold text-[13px] uppercase p-4 transition-all ${
                        isStrictActive
                          ? 'text-yellow-400 border-l-4 border-yellow-400 bg-white/10'
                          : 'text-white'
                      }`;
                    }}
                  >
                    {item.name}
                  </NavLink>

                  {item.links.length > 0 && (
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="p-4 text-white/40 hover:text-white"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${openDropdown === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Accordion Content */}
                {item.links.length > 0 && openDropdown === index && (
                  <div className="bg-black/20 flex flex-col my-1 rounded-lg">
                    {item.links.map((sub, i) => (
                      <NavLink
                        key={i}
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`${sub.text} is still under development!`);
                          setIsDrawerOpen(false);
                        }}
                        className="py-3 px-8 text-[11px] text-white/70 hover:text-white hover:bg-white/5 border-b border-white/5 last:border-0"
                      >
                        • {sub.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Search Section */}
          <div className="mt-auto p-6 bg-black/20">
            <div className="relative">
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full bg-[#000d33] border border-blue-500/30 rounded-full py-2.5 px-5 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-500"
              />
              <div className="absolute right-4 top-3 text-blue-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
