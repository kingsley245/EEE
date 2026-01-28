import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Editor from '@monaco-editor/react';
import { supabase } from '~/lib/supabase';

const AssignmentDetail = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  const [assignment, setAssignment] = useState<any>(null);
  const [submission, setSubmission] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      // Fetch the specific assignment details from Strapi
      const res = await fetch(
        `https://your-strapi-url.render.com/api/assignments/${id}?populate=*`,
      );
      const result = await res.json();
      setAssignment(result.data.attributes);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const handleFinalSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Send the student's work to the 'Submissions' collection in Strapi
    const res = await fetch(
      `https://eee-backend-yspo.onrender.com/api/submissions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            Student_Name: user?.user_metadata?.full_name,
            Student_Email: user?.email,
            Content: submission,
            assignment: id, // This links the submission to the assignment
            Submitted_At: new Date().toISOString(),
          },
        }),
      },
    );

    if (res.ok) alert('Work submitted successfully!');
  };

  if (loading)
    return <div className="p-20 text-white">Loading Assignment...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE: Instructions & Video */}
        <div className="space-y-6">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            {assignment.Title}
          </h1>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-white/70">
            <p>{assignment.Instructions}</p>
          </div>

          {assignment.Video_Link && (
            <div className="rounded-3xl overflow-hidden border border-white/10 aspect-video">
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

        {/* RIGHT SIDE: The Dynamic Input */}
        <div className="flex flex-col gap-4">
          <div className="h-125 rounded-3xl overflow-hidden border border-white/10">
            {assignment.Assignment_Type === 'coding' ? (
              <Editor
                height="100%"
                theme="vs-dark"
                defaultLanguage={assignment.Language || 'javascript'}
                onChange={(value) => setSubmission(value || '')}
              />
            ) : (
              <textarea
                className="w-full h-full bg-[#1e1e1e] p-8 outline-none resize-none font-sans"
                placeholder="Type your answer here..."
                onChange={(e) => setSubmission(e.target.value)}
              />
            )}
          </div>

          <button
            onClick={handleFinalSubmit}
            className="w-full py-4 bg-yellow-400 text-black font-black uppercase rounded-2xl hover:scale-[1.02] transition-transform"
          >
            Submit Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
