import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
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
      [navName]: Math.min(prev[navName] + 1, max),
    }));
  };

  const handelPrev = (navName: string) => {
    setSliderIndices((prev) => ({
      ...prev,
      [navName]: Math.max(prev[navName] - 1, 0),
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

  useEffect(() => {
    const handleSize = () => {
      // checking if window width changes
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
      }
    };
    // setting up the event listener
    window.addEventListener('resize', handleSize);

    // cleaning up the event listener when the component unmount
    return () => window.removeEventListener('resize', handleSize);
  });
  // const navLinks = [
  //   {
  //     name: 'Home',
  //     path: '/',
  //     links: [],
  //   },
  //   {
  //     name: 'Tutorial',
  //     path: '/Tutorial',
  //     links: [],
  //   },
  //   {
  //     name: 'Electrical Wiring',
  //     path: '/electrical-wiring',
  //     featuredImage: '/final year student.jpg',
  //     featuredTitle:
  //       'How to Wire a Single-Pole GFCI Breaker in a 120/240V Panel',
  //     links: [
  //       {
  //         text: 'Home Electrical Wiring',
  //         label: 'TRENDING',
  //         labelColor: 'bg-red-600',
  //       },
  //       { text: 'UPS / Inverter Wiring Diagrams', label: '', labelColor: '' },
  //       {
  //         text: 'Solar Panels Installation',
  //         label: 'HOT',
  //         labelColor: 'bg-blue-600',
  //       },
  //       { text: 'Batteries Wiring Diagrams', label: '', labelColor: '' },
  //       { text: '1 Phase & 3 Phase Wiring', label: '', labelColor: '' },
  //       { text: 'Power & Control Wiring', label: '', labelColor: '' },
  //     ],
  //     sidePosts: [
  //       {
  //         title: 'How to Wire a 3-Phase, 3-Pole Breaker...',
  //         thumb: '/final year student.jpg',
  //       },
  //       {
  //         title: 'How to Wire a Two-Pole Circuit Breaker...',
  //         thumb: '/final year student.jpg',
  //       },
  //       {
  //         title: 'How to Wire a Single-Pole Circuit Breaker...',
  //         thumb: '/final year student.jpg',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'EE Essentials',
  //     path: '/ee-essentials',
  //     links: [
  //       { text: 'Basics', label: '', labelColor: 'bg-blue-600' },
  //       { text: 'Theory', label: '' },
  //     ],
  //   },
  //   {
  //     name: 'Basics',
  //     path: '/basics',
  //     links: [{ text: 'Graphics', label: '' }],
  //   },
  //   {
  //     name: 'Machines',
  //     path: '/machines',
  //     links: [
  //       { text: 'Power', label: '' },
  //       { text: 'Control', label: '' },
  //     ],
  //   },
  //   {
  //     name: 'Power',
  //     path: '/power',
  //     links: [{ text: 'Generation', label: '' }],
  //   },
  //   {
  //     name: 'Control',
  //     path: '/control',
  //     links: [{ text: 'Logic', label: '' }],
  //   },
  //   {
  //     name: 'Electronics',
  //     path: '/electronics',
  //     links: [{ text: 'Circuits', label: '' }],
  //   },
  // ];

  const navLinks = [
    { name: 'Home', path: '/', links: [] },
    { name: 'Tutorial', path: '/Tutorial', links: [] },
    {
      name: 'Electrical Wiring',
      path: '/electrical-wiring',
      links: [
        {
          text: 'Home Electrical Wiring',
          label: 'TRENDING',
          labelColor: 'bg-red-600',
        },
        {
          text: 'Solar Panels Installation',
          label: 'HOT',
          labelColor: 'bg-blue-600',
        },
        { text: '1 Phase & 3 Phase Wiring', label: '' },
      ],
      // Structured for slider
      content: [
        {
          image: '/final year student.jpg',
          title: 'How to Wire a Single-Pole GFCI Breaker in a 120/240V Panel',
          sidePosts: [
            {
              title: '3-Phase Breaker Wiring...',
              thumb: '/final year student.jpg',
            },
            {
              title: 'Two-Pole Circuit Breaker...',
              thumb: '/final year student.jpg',
            },
          ],
        },
        {
          image: '/solar-install.jpg',
          title: 'Advanced Solar Grid-Tie Inverter Setup Guide',
          sidePosts: [
            { title: 'Battery Bank Series Wiring', thumb: '/battery.jpg' },
            { title: 'Charge Controller Settings', thumb: '/controller.jpg' },
          ],
        },
      ],
    },
    {
      name: 'EE-Essentials',
      path: '/ee-essentials',
      links: [
        { text: 'How to', label: 'HOT', labelColor: 'bg-red-600' },
        { text: 'EE Calculators', label: '' },
        { text: 'EEE projects', label: 'NEW', labelColor: 'bg-green-600' },

        { text: 'EE Q & A', label: '' },
        { text: 'EE MCQS', label: '' },

        { text: 'EE  Notes and Article', label: '' },
        { text: 'Circuit Analysis', label: '' },
        { text: 'EE symbols', label: 'NEW', labelColor: 'bg-green-600' },
      ],
      content: [
        {
          image: '/electronics-1.jpg',
          title: 'How to wire a  GFCI Breaker in a 120/240V panel',
          sidePosts: [
            {
              title: 'Difference Between Zener & Avalanche',
              thumb: '/diode.jpg',
            },
            { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
            { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
          ],
        },
        {
          image: '/logic-gates.jpg',
          title: 'Mastering Boolean Algebra for Digital Logic Design',
          sidePosts: [
            { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
            { title: 'Combinational Circuits', thumb: '/comb.jpg' },
            { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
          ],
        },
      ],
    },
    {
      name: 'Basic',
      path: '/basics',
      links: [
        {
          text: 'Basics concept',
          label: 'MUST KNOW',
          labelColor: ' bg-purple-900',
        },
        { text: 'Electrical fundamentals', label: '' },
        { text: 'AC fundamental', label: 'NEW', labelColor: '' },
        { text: 'Alternating current', label: '' },
        { text: 'Formulas and Equations', label: '' },
        { text: 'Electrical wiring', label: '' },
        { text: 'Question and answer', label: '' },
      ],
      content: [
        {
          image: '/electronics-1.jpg',
          title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
          sidePosts: [
            {
              title: 'Difference Between Zener & Avalanche',
              thumb: '/diode.jpg',
            },
            { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
            { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
          ],
        },
        {
          image: '/logic-gates.jpg',
          title: 'Mastering Boolean Algebra for Digital Logic Design',
          sidePosts: [
            { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
            { title: 'Combinational Circuits', thumb: '/comb.jpg' },
            { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
          ],
        },
      ],
    },
    {
      name: 'Control',
      path: '/control',
      links: [
        { text: 'All', label: '' },
        { text: 'Basic Electronics', label: '' },
        { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
        { text: 'Diodes & LEDs', label: '' },
      ],
      content: [
        {
          image: '/electronics-1.jpg',
          title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
          sidePosts: [
            {
              title: 'Difference Between Zener & Avalanche',
              thumb: '/diode.jpg',
            },
            { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
            { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
          ],
        },
        {
          image: '/logic-gates.jpg',
          title: 'Mastering Boolean Algebra for Digital Logic Design',
          sidePosts: [
            { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
            { title: 'Combinational Circuits', thumb: '/comb.jpg' },
            { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
          ],
        },
      ],
    },
    {
      name: 'Machines',
      path: '/machines',
      links: [
        { text: 'All', label: '' },
        { text: 'Basic Electronics', label: '' },
        { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
        { text: 'Diodes & LEDs', label: '' },
      ],
      content: [
        {
          image: '/electronics-1.jpg',
          title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
          sidePosts: [
            {
              title: 'Difference Between Zener & Avalanche',
              thumb: '/diode.jpg',
            },
            { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
            { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
          ],
        },
        {
          image: '/logic-gates.jpg',
          title: 'Mastering Boolean Algebra for Digital Logic Design',
          sidePosts: [
            { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
            { title: 'Combinational Circuits', thumb: '/comb.jpg' },
            { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
          ],
        },
      ],
    },
    {
      name: 'Power',
      path: '/Power',
      links: [
        { text: 'All', label: '' },
        { text: 'Basic Electronics', label: '' },
        { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
        { text: 'Diodes & LEDs', label: '' },
      ],
      content: [
        {
          image: '/electronics-1.jpg',
          title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
          sidePosts: [
            {
              title: 'Difference Between Zener & Avalanche',
              thumb: '/diode.jpg',
            },
            { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
            { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
          ],
        },
        {
          image: '/logic-gates.jpg',
          title: 'Mastering Boolean Algebra for Digital Logic Design',
          sidePosts: [
            { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
            { title: 'Combinational Circuits', thumb: '/comb.jpg' },
            { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
          ],
        },
      ],
    },
    {
      name: 'Electronics',
      path: '/electronics',
      links: [
        { text: 'All', label: '' },
        { text: 'Basic Electronics', label: '' },
        { text: 'Logic Gates', label: 'NEW', labelColor: 'bg-green-600' },
        { text: 'Diodes & LEDs', label: '' },
      ],
      content: [
        {
          image: '/electronics-1.jpg',
          title: 'LED Light Bulb Circuit – 230V / 120V Mains Operated LEDs',
          sidePosts: [
            {
              title: 'Difference Between Zener & Avalanche',
              thumb: '/diode.jpg',
            },
            { title: 'Edge vs Level Triggering', thumb: '/logic.jpg' },
            { title: 'Amplifier vs Op-Amp', thumb: '/opamp.jpg' },
          ],
        },
        {
          image: '/logic-gates.jpg',
          title: 'Mastering Boolean Algebra for Digital Logic Design',
          sidePosts: [
            { title: 'Sequential Logic Circuits', thumb: '/seq.jpg' },
            { title: 'Combinational Circuits', thumb: '/comb.jpg' },
            { title: 'Signal Processing Basics', thumb: '/signal.jpg' },
          ],
        },
      ],
    },
  ];

  const message = 'Join Our  WhatsApp Channel to Get Latest Updates.';

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
          {/* The right side container */}
          <div className="flex items-center space-x-3 md:space-x-4 text-xs font-semibold text-gray-600">
            <Link
              to="/Courses"
              onClick={(e) => {
                e.preventDefault();
                alert('still in development');
              }}
              className="bg-blue-700 md:bg-linear-to-r md:from-blue-700 md:to-blue-900 text-white rounded px-2 py-1 md:p-2 text-[9px] md:text-xs shrink-0 inline-block"
            >
              View Courses
            </Link>

            {/* OTHER LINKS: Hidden on mobile (hidden), shown on tablet/desktop (md:block) */}
            <Link
              to="/advert"
              onClick={(e) => {
                e.preventDefault(); // This stops the navigation
                alert('still in development!');
              }}
              className="hidden md:block hover:text-blue-700 transition"
            >
              ADVERTISE
            </Link>
            <Link
              to="/about"
              className="hidden md:block hover:text-blue-700 transition"
            >
              ABOUT US
            </Link>
            <Link
              to="/contact"
              className="hidden md:block hover:text-blue-700 transition"
            >
              CONTACT US
            </Link>
          </div>
        </div>

        {/* 2. MAIN NAV BAR */}
        <nav className="bg-linear-to-r from-blue-800 to-blue-950 text-white px-4 flex justify-between items-center relative">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold p-3">
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
                <NavLink
                  to={item.path}
                  className={activeLink}
                  end={item.name === 'Home'}
                >
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
                      <div className="w-[75%] p-8 flex gap-8 relative bg-[#00144d]">
                        {(() => {
                          const currentIndex = sliderIndices[item.name] || 0;
                          const currentSlide = item.content[currentIndex];

                          if (!currentSlide) return null;

                          return (
                            <>
                              <div className="w-[60%] animate-in fade-in duration-500">
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
                            </>
                          );
                        })()}

                        {/* SLIDER CONTROLS */}
                        <div className="absolute bottom-6 right-8 flex gap-2">
                          <button
                            disabled={(sliderIndices[item.name] || 0) === 0}
                            onClick={() => handelPrev(item.name)} // Ensure handlePrev is defined in your state logic
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
        </nav>

        {/* 3. MOBILE SIDEBAR */}
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-60transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-70 bg-linear-to-b from-[#000a4d] to-[#001489] z-70 
          shadow-2xl transform transition-transform duration-300 ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
        >
          <div className="flex justify-center p-4 border-b border-white/10">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-white text-3xl"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col text-white px-2 py-4">
            {navLinks.map((item, index) => (
              <div key={index} className="border-b border-white/5">
                <div className="flex justify-between items-center py-3 px-4 hover:bg-white/5">
                  <NavLink
                    to={item.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex-1 font-bold text-[13px]  text-sm uppercase p-3 transition-all ${
                        isActive
                          ? 'text-yellow-400 border-l-4 border-yellow-400 bg-white/10'
                          : 'text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                  {item.links.length > 0 && (
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="p-2"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === index ? 'rotate-180' : ''}`}
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
                  <div className="bg-black/20 flex flex-col">
                    {item.links.map((sub, i) => (
                      <NavLink
                        key={i}
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(
                            `${sub.text} is still under development please bear with us!`,
                          );
                          setIsDrawerOpen(false);
                        }}
                        className="py-3 px-8 text-[11px] border-b border-white/5"
                      >
                        {sub.text}
                        {sub.label && (
                          <span
                            className={`ml-2 ${sub.labelColor || 'bg-blue-600'} text-[8px] px-1 py-0.5 rounded`}
                          >
                            {sub.label}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-auto pt-8 pb-10 px-6">
              {/* Search Input */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search ..."
                  className="w-full bg-[#000d33] border border-blue-500/30 rounded-full py-2.5 px-5 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-500"
                />
                <button className="absolute right-4 top-3 text-blue-400 group-focus-within:text-white transition-colors">
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
