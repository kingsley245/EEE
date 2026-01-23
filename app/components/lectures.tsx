import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { lecturers } from '~/lib/lecturerData';

export default function FeaturedLecturers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollTo =
        direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      containerRef.current.scrollBy({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      {' '}
      {/* Reduced vertical padding */}
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section - More compact margins */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-500 font-bold uppercase tracking-tighter text-xs mb-2"
            >
              Academic Leadership
            </motion.h4>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950">
              Meet Our Expert <span className="text-blue-600">Lecturers</span>
            </h2>
          </div>

          {/* Controls - Smaller buttons */}
          <div className="flex gap-2 self-center md:self-end">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-200 text-blue-900 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-200 text-blue-900 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <motion.div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-8 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        >
          {lecturers.map((lecturer, index) => (
            <motion.div
              key={lecturer.id}
              className="min-w-65 md:min-w-70 bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 snap-start group"
            >
              {/* Image Container - Height reduced from h-96 to h-64 */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src={lecturer.img}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  alt={lecturer.name}
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Area - Reduced padding from p-6 to p-5 */}
              <div className="p-5 relative">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {lecturer.name}
                </h3>

                {/* Roles - Smaller text */}
                <div className="flex flex-wrap gap-1.5">
                  {lecturer.roles.map((role, rIdx) => (
                    <span
                      key={rIdx}
                      className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide border border-blue-100"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                  <button className="text-[11px] font-black text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-widest">
                    View Profile <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
