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
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-500 font-bold uppercase tracking-tighter text-sm mb-3"
            >
              Academic Leadership
            </motion.h4>
            <h2 className="text-4xl md:text-5xl font-black text-blue-950">
              Meet Our Expert <span className="text-blue-600">Lecturers</span>
            </h2>
          </div>

          {/* Controls */}
          <div className="flex gap-4 self-center md:self-end">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-200 text-blue-900 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-200 text-blue-900 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <motion.div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto no-scrollbar pb-12 pt-4 snap-x snap-mandatory   cursor-grab active:cursor-grabbing"
        >
          {lecturers.map((lecturer, index) => (
            <motion.div
              key={lecturer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 snap-start group"
            >
              {/* Image Container */}
              <div className="h-96 relative overflow-hidden">
                <img
                  src={lecturer.img}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  alt={lecturer.name}
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Multi-Role Content Area */}
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {lecturer.name}
                </h3>

                {/* Mapping through multiple roles */}
                <div className="flex flex-wrap gap-2">
                  {lecturer.roles.map((role, rIdx) => (
                    <span
                      key={rIdx}
                      className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border border-blue-100"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <button className="text-sm font-black text-slate-800 hover:text-red-500 transition-colors flex items-center gap-1">
                    VIEW PROFILE <span>→</span>
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
