import { Link } from 'react-router';
import { tutorialCategories } from '~/components/TutorialLinks';
import EngineeringSearch from '~/components/Search';

const tags = ['Circuit Breaker', 'Electric Motors', 'Resistors', 'Logic Gates'];

export default function TutorialDirectory() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Electrical and Electronics Engineering Tutorials
          </h1>
          <p className="text-gray-600">
            Comprehensive guides for engineering students and professionals.
          </p>
        </div>

        {/* Search / Discover Tags (As seen in your screenshot) */}

        <EngineeringSearch />
        {/* Table of Contents Box */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <span className="text-xl">📋</span>
            <h2 className="text-xl font-bold text-slate-800">
              Table of Contents
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {tutorialCategories.map((cat) => (
              <a
                href={`#${cat.id}`}
                key={cat.id}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections for Detailed Topic*/}
        {tutorialCategories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            className="mb-16 scroll-mt-10"
          >
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-red-600 rounded"></span>
              {category.title.split('. ')[1]}{' '}
              {/* Removes the number for the heading */}
            </h2>

            <ul className="space-y-4 ml-4">
              {category.subLinks.map((sub, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <span className="text-red-600 mt-1.5 text-[10px]">●</span>
                  <Link
                    to={`/tutorials/${category.id}/${sub.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline leading-relaxed transition-colors"
                  >
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
