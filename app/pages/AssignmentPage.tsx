import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Editor from '@monaco-editor/react';
import { supabase } from '~/lib/supabase';
import { ArrowLeft } from 'lucide-react';

// Move this outside the component so it's only created once
const LANGUAGE_CONFIG: any = {
  javascript: {
    monaco: 'javascript',
    piston: 'javascript',
    defaultCode: 'console.log("Hello World");',
  },
  c: {
    monaco: 'c',
    piston: 'c',
    defaultCode:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}',
  },
  python: {
    monaco: 'python',
    piston: 'python',
    defaultCode: 'print("Hello World")',
  },
};

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<any>(null);
  const [submission, setSubmission] = useState('');
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) setUserEmail(user.email || '');

        const res = await fetch(
          `http://localhost:1337//api/assignments/${id}?populate=*`,
        );
        const result = await res.json();

        if (result.data) {
          setAssignment(result.data);
          // Set initial code based on assignment language if possible
          setSubmission(LANGUAGE_CONFIG.javascript.defaultCode);
        }
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  // Protection logic
  useEffect(() => {
    const blockContext = (e: MouseEvent) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
        e.preventDefault();
        alert('❌ Document Protected: Printing and Saving are disabled.');
      }
    };
    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('keydown', blockKeys);
    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('🚀 Running...');
    try {
      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        body: JSON.stringify({
          language: LANGUAGE_CONFIG[selectedLanguage].piston,
          version: '*',
          files: [{ content: submission }],
          stdin: userInput,
        }),
      });
      const data = await res.json();
      setOutput(data.run?.output || 'Execution finished (no output).');
    } catch (err) {
      setOutput('❌ Compiler Error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const res = await fetch(`http://localhost:1337/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            Student_Name: user?.user_metadata?.full_name || 'Anonymous',
            Student_Email: user?.email,
            Content: submission,
            assignment: id,
          },
        }),
      });
      if (res.ok) alert('🚀 Work submitted successfully!');
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  const pdfUrl = assignment?.Briefing_File?.[0]?.url
    ? assignment.Briefing_File[0].url.replace('http://', 'https://')
    : null;

  if (loading)
    return (
      <div className="p-20 bg-black text-yellow-400 font-black">LOADING...</div>
    );
  if (!assignment)
    return (
      <div className="p-20 bg-black text-white">Assignment not found.</div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Portal
        </button>

        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {/* HEADER */}
          <header className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              {assignment.Title}
            </h1>
            <div className="flex justify-center md:justify-start gap-3">
              <span className="bg-yellow-400 text-black px-4 py-1.5 text-[10px] font-black uppercase rounded-full">
                {assignment.Asignmet_type}
              </span>
              <span className="border border-white/20 text-white/50 px-4 py-1.5 text-[10px] font-black uppercase rounded-full">
                {assignment.language}
              </span>
            </div>
          </header>

          {/* INSTRUCTIONS */}
          <div className="bg-white/3 border border-white/10 p-6 md:p-10 rounded-4xl">
            <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Project Briefing
            </h3>
            <div className="space-y-4 text-lg text-white/80 leading-relaxed">
              {assignment.Instructions?.map((block: any, index: number) => (
                <p key={index}>
                  {block.children?.map((child: any, cIdx: number) => (
                    <span key={cIdx}>{child.text}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* WORKSPACE SECTION */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 px-2">
              <div className="flex items-center gap-3">
                <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                  Workspace
                </h3>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    setSubmission(LANGUAGE_CONFIG[e.target.value].defaultCode);
                  }}
                  className="bg-[#0f0f0f] border border-white/10 text-yellow-400 text-[10px] font-black uppercase px-4 py-2 rounded-xl outline-none cursor-pointer hover:border-yellow-400/50 hover:bg-white/5 transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option
                    value="javascript"
                    className="bg-[#0f0f0f] text-white"
                  >
                    JavaScript
                  </option>
                  <option value="c" className="bg-[#0f0f0f] text-white">
                    C Language
                  </option>
                  <option value="python" className="bg-[#0f0f0f] text-white">
                    Python 3
                  </option>
                </select>
              </div>
              <button
                onClick={runCode}
                disabled={isRunning}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${isRunning ? 'bg-white/10 text-white/30' : 'bg-green-500 text-black hover:scale-[1.02]'}`}
              >
                {isRunning ? 'Running...' : '▶ Run Code'}
              </button>
            </div>

            {/* EDITOR */}
            <div className="h-125 md:h-150 rounded-4xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl">
              <Editor
                height="100%"
                theme="vs-dark"
                language={LANGUAGE_CONFIG[selectedLanguage].monaco}
                value={submission}
                onChange={(val) => setSubmission(val || '')}
                options={{
                  fontSize: 16,
                  minimap: { enabled: false },
                  automaticLayout: true,
                }}
              />
            </div>

            {/* INPUT & OUTPUT BOXES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
                <div className="bg-white/5 px-6 py-2 border-b border-white/10">
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                    Input (stdin)
                  </span>
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type inputs for scanf/input() here..."
                  className="w-full h-37.5 bg-transparent p-4 font-mono text-sm outline-none resize-none text-yellow-400"
                />
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
                <div className="bg-white/5 px-6 py-2 border-b border-white/10">
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                    Terminal Output
                  </span>
                </div>
                <div className="p-4 font-mono text-sm h-37.5 overflow-auto">
                  <pre
                    className={`whitespace-pre-wrap ${output.includes('❌') ? 'text-red-400' : 'text-green-400'}`}
                  >
                    {output || '> Results will appear here...'}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* PDF VIEW */}
          {pdfUrl && (
            <div className="mt-10 space-y-6">
              <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] px-2 text-center">
                Reference Document
              </h3>
              <div className="relative rounded-4xl overflow-hidden border border-white/10 h-175 bg-white/5">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title="Secure Briefing"
                />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.05] select-none z-50">
                  <p className="text-4xl font-black -rotate-45 uppercase text-white text-center">
                    {userEmail || 'STUDENT COPY'} <br /> PROPRIETARY MATERIAL
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={handleFinalSubmit}
            className="group relative w-full py-8 bg-yellow-400 text-black font-black uppercase rounded-4xl overflow-hidden transition-all hover:bg-yellow-300 active:scale-[0.98] mb-20"
          >
            <span className="relative z-10 text-lg tracking-tight">
              Finish & Submit Assignment
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
