import { useState } from 'react';
import { supabase } from '~/lib/supabase';

export default function ContributePQ() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // For the visual bar
  const [showSuccess, setShowSuccess] = useState(false); // For the animation

  // Form Fields
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [level, setLevel] = useState('L100');
  const [semester, setSemester] = useState('First');
  const [year, setYear] = useState('2026');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setProgress(20); // Start progress

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const contributorName =
        user?.user_metadata?.full_name || user?.email || 'Anonymous';

      // --- STEP 1: UPLOAD ---
      setProgress(40);
      const fileData = new FormData();
      fileData.append('files', selectedFile);

      const uploadRes = await fetch(
        'https://eee-backend-yspo.onrender.com/api/upload',
        {
          method: 'POST',
          body: fileData,
        },
      );

      if (!uploadRes.ok) throw new Error('Upload failed');
      const uploadedFiles = await uploadRes.json();
      const fileId = uploadedFiles[0].id;

      setProgress(70); // File is up, now creating entry

      // --- STEP 2: CREATE ENTRY ---
      const entryRes = await fetch(
        'https://eee-backend-yspo.onrender.com/api/past-questions',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              Course_Code: courseCode,
              Course_Title: courseTitle,
              Level: level,
              Semester: semester,
              Year: Number(year),
              Contributor: contributorName,
              Approved: false,
              Media: [fileId],
            },
          }),
        },
      );

      if (entryRes.ok) {
        setProgress(100);
        setTimeout(() => {
          setShowSuccess(true);
          setLoading(false);
          // Reset form after 3 seconds
          setTimeout(() => {
            setShowSuccess(false);
            setSelectedFile(null);
            setCourseCode('');
            setCourseTitle('');
            setProgress(0);
          }, 3000);
        }, 500);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 bg-blue-600 flex flex-col items-center justify-center text-white animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 animate-bounce">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-4xl font-black italic">RECEIVED!</h2>
          <p className="mt-2 font-bold opacity-80 uppercase tracking-widest text-xs">
            Waiting for Moderator Approval
          </p>
        </div>
      )}

      <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative">
        <h1 className="text-3xl font-black mb-8 italic tracking-tighter">
          CONTRIBUTE PQ
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="EEE 311"
              className="p-4 bg-slate-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-500"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
            />
            <select
              className="p-4 bg-slate-50 rounded-2xl outline-none font-bold"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {['L100', 'L200', 'L300', 'L400', 'L500'].map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <input
            required
            placeholder="Course Title"
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-500"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />

          <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:bg-slate-50 transition-all">
            <input
              type="file"
              required
              accept="image/*,.pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <p className="text-slate-400 font-bold">
              {selectedFile ? selectedFile.name : 'Tap to select PDF/Image'}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black tracking-widest transition-all ${loading ? 'bg-slate-200 text-slate-400' : 'bg-[#001489] text-white shadow-xl shadow-blue-100 hover:-translate-y-1'}`}
          >
            {loading ? 'UPLOADING...' : 'SUBMIT MATERIAL'}
          </button>
        </form>
      </div>
    </div>
  );
}
