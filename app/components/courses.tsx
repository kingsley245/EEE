import { useState } from 'react';
import { Link } from 'react-router';

const courseData = [
  {
    level: '100 Level',
    courses: [
      {
        id: 'gen-math',
        title: 'General Mathematics I & II',
        desc: 'Foundational calculus and algebra for engineering applications.',
        img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800',
      },
      {
        id: 'gen-phys',
        title: 'General Physics I & II',
        desc: 'Mechanics, waves, and thermal physics essentials.',
        img: '',
      },
      {
        id: 'gen-chem',
        title: 'General CHM I & II',
        desc: 'Covers atomic structure, chemical bonding, states of matter, stoichiometry, and basic thermodynamics.',
        img: '',
      },
      {
        id: 'eng-draw',
        title: 'Engineering Drawing I',
        desc: 'Technical sketching and introduction to CAD standards.',
        img: '',
      },
      {
        id: 'Us-eng',
        title: 'Use of english',
        des: 'Focuses on developing communication skills, including grammar, essay writing, reading comprehension, and effective study techniques.',
      },
    ],
  },
  {
    level: '200 Level',
    courses: [
      {
        id: 'app-elec',
        title: 'Applied Electricity I & II',
        desc: 'Fundamental principles of electrical circuits and components.',
        img: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800',
      },
      {
        id: 'thermo',
        title: 'Thermodynamics',
        desc: 'Energy conversion, heat transfer, and system laws.',
        img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800',
      },
      {
        id: 'mat-sci',
        title: 'Materials Science',
        desc: 'Properties and applications of engineering materials.',
        img: 'https://images.unsplash.com/photo-1532187875605-1ef6c237a1e1?q=80&w=800',
      },
    ],
  },
  {
    level: '300 Level',
    courses: [
      {
        id: 'circ-theory',
        title: 'Circuit Theory I & II',
        desc: 'Advanced network analysis and frequency response.',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
      },
      {
        id: 'elec-mach',
        title: 'Electrical Machines I & II',
        desc: 'Operational principles of Transformers, DC, and AC motors.',
        img: '',
      },
      {
        id: 'dig-elec',
        title: 'Digital Electronics',
        desc: 'Logic gates, flip-flops, and combinational circuit design.',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
      },
    ],
  },
  {
    level: '400 Level',
    courses: [
      {
        id: 'circ-theory',
        title: 'Circuit Theory I & II',
        desc: 'Advanced network analysis and frequency response.',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
      },
      {
        id: 'elec-mach',
        title: 'Electrical Machines I & II',
        desc: 'Operational principles of Transformers, DC, and AC motors.',
        img: '',
      },
      {
        id: 'dig-elec',
        title: 'Digital Electronics',
        desc: 'Logic gates, flip-flops, and combinational circuit design.',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
      },
    ],
  },
  {
    level: '500 Level',
    courses: [
      {
        id: 'circ-theory',
        title: 'Circuit Theory I & II',
        desc: 'Advanced network analysis and frequency response.',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
      },
      {
        id: 'elec-mach',
        title: 'Electrical Machines I & II',
        desc: 'Operational principles of Transformers, DC, and AC motors.',
        img: '',
      },
      {
        id: 'dig-elec',
        title: 'Digital Electronics',
        desc: 'Logic gates, flip-flops, and combinational circuit design.',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
      },
    ],
  },
  // Add 400L and 500L following the same pattern...
];

export default function CourseCurriculum() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLevelData = courseData[activeLevel].courses;
  const itemsPerPage = 3;
  const maxIndex = currentLevelData.length - itemsPerPage;

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleLevelChange = (index) => {
    setActiveLevel(index);
    setCurrentIndex(0); // Reset slider when changing levels
  };

  return (
    <section className="py-20 px-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        {/* Header and Level Selector */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm">
              Curriculum
            </span>
            <h2 className="text-4xl font-black text-slate-900 mt-2">
              Departmental Courses
            </h2>
          </div>

          <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            {courseData.map((data, i) => (
              <button
                key={i}
                onClick={() => handleLevelChange(i)}
                className={`px-4 py-2 rounded-md text-sm cursor-pointer font-bold transition-all ${
                  activeLevel === i
                    ? 'bg-red-600 text-white'
                    : 'text-gray-500 hover:text-red-600'
                }`}
              >
                {data.level}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full hover:border-red-600 hover:text-red-600 disabled:opacity-20 transition-all"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full hover:border-red-600 hover:text-red-600 disabled:opacity-20 transition-all"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Sliding Grid */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {currentLevelData.map((course) => (
              <div key={course.id} className="w-full md:w-1/3 shrink-0 px-4">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-transparent hover:border-red-100 transition-all group">
                  <Link
                    to={`/course/${course.id}`}
                    className="block relative h-52 overflow-hidden"
                  >
                    <img
                      src={course.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={course.title}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  <div className="p-8">
                    <div className="flex text-yellow-500 mb-4 text-xs font-bold">
                      ★★★★★{' '}
                      <span className="text-gray-400 ml-2">(15+ Reviews)</span>
                    </div>

                    <Link to={`/course/${course.id}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm leading-relaxed mb-8 h-12 overflow-hidden">
                      {course.desc}
                    </p>

                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-gray-400 text-sm">
                      <div className="flex gap-4">
                        <span>👥 45 Students</span>
                        <span>❤️ 12</span>
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="font-bold text-red-600 hover:underline"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
