import { useEffect, useState } from 'react';

export default function PQLibrary() {
  const [pqs, setPqs] = useState([]);
  const [filteredPqs, setFilteredPqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        // Only approved past questions will be live
        const res = await fetch(
          `https://eee-backend-yspo.onrender.com/api/past-questions?filters[Approved][$eq]=true&populate=*`,
        );
        const json = await res.json();
        setPqs(json.data || []);
        setFilteredPqs(json.data || []);
      } catch (err) {
        console.error('Library fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = pqs;

    if (selectedLevel !== 'All') {
      result = result.filter((pq: any) => pq.Level === selectedLevel);
    }

    if (searchTerm) {
      result = result.filter(
        (pq: any) =>
          pq.Course_Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pq.Course_Title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredPqs(result);
  }, [searchTerm, selectedLevel, pqs]);

  if (loading)
    return (
      <div className="p-20 text-center font-black animate-pulse">
        OPENING THE VAULT...
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER & SEARCH */}
        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter mb-6 italic">
            EEE ARCHIVES
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search Course Code (e.g. EEE 311)..."
              className="flex-1 p-5 bg-slate-100 rounded-3xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="p-5 bg-slate-900 text-white rounded-3xl font-bold outline-none cursor-pointer"
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="All">All Levels</option>
              {['L100', 'L200', 'L300', 'L400', 'L500'].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* RESULTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPqs.map((pq: any) => (
            <div
              key={pq.documentId}
              className="group p-6 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase">
                  {pq.Level} • {pq.Semester}
                </span>
                <span className="text-slate-300 font-black text-[10px]">
                  {pq.Year}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">
                {pq.Course_Code}
              </h3>
              <p className="text-slate-500 font-medium mb-6 truncate">
                {pq.Course_Title}
              </p>

              <div className="space-y-2">
                {pq.Media?.map((file: any) => (
                  <a
                    key={file.id}
                    href={file.url}
                    target="_blank"
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all"
                  >
                    <span className="text-sm font-bold truncate pr-2">
                      {file.name}
                    </span>
                    <span className="text-[18px]">📥</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredPqs.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">
              No past questions found for this search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
