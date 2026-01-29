import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import { supabase } from '~/lib/supabase';

const SubmissionPage = () => {
  const { id } = useParams(); // Get Assignment ID from URL
  const [assignment, setAssignment] = useState(null);
  const [studentCode, setStudentCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch the specific assignment from Strapi
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://eee-backend-yspo.onrender.com/api/assignments/${id}?populate=*`,
      );
      const result = await res.json();
      setAssignment(result.data.attributes);
    };
    fetchDetails();
  }, [id]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const user = (await supabase.auth.getUser()).data.user;

    // 2. Post the submission to your Strapi 'Submissions' collection
    const response = await fetch(
      `https://eee-backend-yspo.onrender.com/api/submissions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            Student_Name: user.user_metadata.full_name,
            Student_Email: user.email,
            Content: studentCode,
            assignment: id, // Linking the relation
            Submitted_At: new Date().toISOString(),
          },
        }),
      },
    );

    if (response.ok) alert('Assignment Submitted Successfully!');
    setIsSubmitting(false);
  };

  if (!assignment) return <div className="p-20 text-white">Loading...</div>;

  const isExpired = new Date() > new Date(assignment.Deadline);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Instructions & Video */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <h1 className="text-2xl font-black uppercase tracking-tight mb-2">
              {assignment.Title}
            </h1>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {assignment.Instructions}
            </p>

            {/* Show Tutorial Video if it exists in Strapi */}
            {assignment.Video_Link && (
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video mt-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={assignment.Video_Link.replace('watch?v=', 'embed/')}
                  title="Tutorial"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: The Dynamic Editor (The "Smart" part) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {assignment.Assignment_Type === 'coding' ? (
              <Editor
                height="100%"
                theme="vs-dark"
                defaultLanguage={assignment.Language || 'javascript'}
                defaultValue="// Start coding your solution here..."
                onChange={(value) => setStudentCode(value || '')}
                options={{ fontSize: 14, minimap: { enabled: false } }}
              />
            ) : (
              <textarea
                className="w-full h-full bg-[#1e1e1e] p-8 text-lg font-medium outline-none resize-none"
                placeholder="Type your theory answer here..."
                onChange={(e) => setStudentCode(e.target.value)}
              />
            )}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              {isExpired ? 'Status: Closed' : 'Status: Open'}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isExpired || isSubmitting}
              className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all 
                ${isExpired ? 'bg-red-500/20 text-red-500' : 'bg-yellow-400 text-black hover:scale-105 shadow-lg shadow-yellow-400/20'}`}
            >
              {isSubmitting
                ? 'Uploading...'
                : isExpired
                  ? 'Deadline Passed'
                  : 'Submit Work'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;
