import { useState, useRef } from 'react';
import { Link } from 'react-router'; // or 'react-router-dom'
import { motion } from 'framer-motion';
import { courseData } from '~/lib/courseData';

export default function CourseCurriculum() {
  const [activeLevel, setActiveLevel] = useState(0);
  const scrollRef = useRef(null);

  const currentLevelData = courseData[activeLevel].courses;

  // Scroll function for the buttons
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleLevelChange = (index) => {
    setActiveLevel(index);
    // Reset scroll position to start when  the level changes
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  return (
    <section className="py-20 px-6 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm px-1 border-l-4 border-red-600 ml-1">
              Curriculum
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
              Departmental Courses
            </h2>
          </motion.div>

          {/* LEVEL SELECTOR */}
          <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-full md:max-w-2xl">
            <div className="grid grid-cols-5 gap-1">
              {courseData.map((data, i) => (
                <button
                  key={i}
                  onClick={() => handleLevelChange(i)}
                  className={`py-2 text-[10px] xs:text-xs md:text-sm rounded-lg font-bold transition-all duration-300 text-center flex items-center justify-center ${
                    activeLevel === i
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-red-600'
                  }`}
                >
                  <span className="hidden sm:inline">{data.level}</span>
                  <span className="sm:hidden">
                    {data.level.replace(' Level', 'L')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full hover:bg-white hover:border-red-600 hover:text-red-600 transition-all shadow-sm"
            >
              <span className="text-xl">←</span>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full hover:bg-white hover:border-red-600 hover:text-red-600 transition-all shadow-sm"
            >
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {currentLevelData.map((course, index) => (
            <motion.div
              key={`${activeLevel}-${course.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="min-w-[85%] md:min-w-[calc(33.333%-1rem)] snap-start snap-always"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500 group h-full flex flex-col">
                {/* Image Container */}
                <Link
                  to={`/course/${course.id}`}
                  className="block relative h-52 overflow-hidden"
                >
                  <img
                    src={
                      course.img ||
                      'https://images.unsplash.com/photo-1581092335397-9583ee92d03b?q=80&w=800'
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={course.title}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                      Core Module
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col grow">
                  <div className="flex text-yellow-500 mb-3 text-xs">
                    ★★★★★{' '}
                    <span className="text-gray-400 ml-2 font-semibold tracking-tighter italic">
                      Verified Curriculum
                    </span>
                  </div>

                  <Link to={`/course/${course.id}`}>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-red-600 transition-colors">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {course.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt="student"
                          />
                        </div>
                      ))}
                      <span className="pl-4 text-[11px] text-slate-400 font-bold self-center">
                        +80 Students
                      </span>
                    </div>

                    <Link
                      to={`/course/${course.id}`}
                      className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 transition-all active:scale-95"
                    >
                      View Syllabus
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
