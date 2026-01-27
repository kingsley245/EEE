import React, { useState, useMemo } from 'react';
import { Search, Zap, ArrowRight, BookOpen, X } from 'lucide-react';
import { tutorialCategories } from './TutorialLinks';
export default function EngineeringSearch() {
  const [query, setQuery] = useState('');
  const quickTags = [
    'Circuit Breaker',
    'Electric Motors',
    'Resistors',
    'Logic Gates',
  ];

  // 1. Flatten Data for searching
  const flattenedLinks = useMemo(() => {
    return tutorialCategories.flatMap((cat) =>
      cat.subLinks.map((link) => ({ ...link, categoryName: cat.id })),
    );
  }, []);

  // 2. Filter Logic
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    return flattenedLinks
      .filter((link) => link.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10); // Limits to top 10 results for clean UI
  }, [query, flattenedLinks]);

  // 3. Highlighting Logic
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark
              key={i}
              className="bg-blue-600 text-white rounded-sm px-0.5 no-underline"
            >
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 shadow-inner">
        {/* --- SEARCH HEADER --- */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> Topic Explorer
          </h2>
          <p className="text-slate-500 text-sm">
            Quickly find formulas, theorems, and guides.
          </p>
        </div>

        {/* --- SEARCH INPUT --- */}
        <div className="relative mb-6">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={22}
          />
          <input
            type="text"
            className="w-full pl-14 pr-12 py-5 bg-white border-none rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-500/10 transition-all text-lg outline-none placeholder:text-slate-300"
            placeholder="Search for topics (e.g. AC Fundamentals, Motors...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} className="text-slate-400" />
            </button>
          )}
        </div>

        {/* --- QUICK TAGS --- */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">
            Suggestions:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all"
            >
              ⊕ {tag}
            </button>
          ))}
        </div>

        {query && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <a
                    key={result.id}
                    href={`/topic/${result.id}`}
                    className="flex items-center justify-between p-4 hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Zap size={20} />
                      </div>
                      <div>
                        <div className="text-slate-700 font-semibold group-hover:text-blue-700">
                          {highlightText(result.title, query)}
                        </div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          {result.categoryName}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                      size={20}
                    />
                  </a>
                ))
              ) : (
                <div className="p-10 text-center text-slate-400 italic">
                  No matching electrical topics found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
