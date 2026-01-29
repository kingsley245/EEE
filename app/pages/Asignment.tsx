import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { useNavigate } from 'react-router';
import { Clock, Code2, BookText, ArrowRight } from 'lucide-react';

// --- Types ---
interface Assignment {
  id: number;
  Title: string;
  Asignmet_type: string;
  Target_level: string;
  Deadline: string;
  documentId: number;
}

// --- Sub-Component: AssignmentCard ---
const AssignmentCard = ({
  attributes,
  id,
  onClick,
}: {
  id: number;
  attributes: {
    Title: string;
    Assignment_Type: string;
    Target_Level: string;
    Deadline: string;
  };
  onClick: (id: number) => void;
}) => {
  const { Title, Assignment_Type, Target_Level, Deadline } = attributes;
  const dueDate = new Date(Deadline);
  const isExpired = new Date() > dueDate;
  const formattedDate = dueDate.toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-yellow-400/30">
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 blur-[80px] opacity-20 ${Assignment_Type === 'coding' ? 'bg-yellow-400' : 'bg-blue-500'}`}
      />
      <div className="relative z-10 flex flex-col h-50%">
        <div className="flex justify-between items-center mb-6">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${Assignment_Type === 'coding' ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400' : 'bg-blue-400/10 border-blue-400/20 text-blue-400'}`}
          >
            {Assignment_Type === 'coding' ? (
              <Code2 size={12} />
            ) : (
              <BookText size={12} />
            )}
            {Assignment_Type}
          </div>
          <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
            {Target_Level}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-8 group-hover:text-yellow-400 transition-colors line-clamp-2">
          {Title}
        </h3>
        <div className="mt-auto flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white/40">
              <Clock size={14} />
              <span className="text-[10px] font-black uppercase">Deadline</span>
            </div>
            <p
              className={`text-sm font-bold ${isExpired ? 'text-red-400' : 'text-white'}`}
            >
              {isExpired ? 'Closed' : formattedDate}
            </p>
          </div>
          <button
            onClick={() => onClick(id)}
            disabled={isExpired}
            className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${isExpired ? 'bg-white/5 text-white/10' : 'bg-yellow-400 text-black hover:scale-110'}`}
          >
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const AssignmentList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<string>('100');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchPortalData = async () => {
      try {
        setLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const rawLevel = session?.user?.user_metadata?.level || '100';

        const cleanNumber = rawLevel.match(/\d+/)?.[0] || '100';

        setUserLevel(cleanNumber);

        const url = `https://eee-backend-yspo.onrender.com/api/assignments?populate=*&filters[Target_level][$contains]=${cleanNumber}`;

        const response = await fetch(url);
        const result = await response.json();

        if (result.data) {
          setAssignments(result.data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
    return () => {
      isMounted = false;
    };
  }, []);
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-yellow-400 font-black animate-pulse uppercase tracking-widest text-xl">
            Initializing... please wait
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-black">
      <header className="mb-12">
        <h2 className="text-white text-3xl font-black uppercase tracking-tighter">
          Current Tasks{' '}
          <span className="text-yellow-400">/ Level {userLevel}</span>
        </h2>
        <div className="h-1 w-20 bg-yellow-400 mt-2" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {assignments.length > 0 ? (
          assignments.map((item) => {
            return (
              <AssignmentCard
                key={item.id}
                id={item.id}
                attributes={{
                  Title: item.Title,
                  // BE CAREFUL: Your API has a typo "Asignmet_type" (one 'n', one 'm')
                  Assignment_Type: item.Asignmet_type || 'General',
                  Target_Level: item.Target_level || 'N/A',
                  Deadline: item.Deadline,
                }}
                onClick={() =>
                  navigate(`/Portal/assignments/${item.documentId}`)
                }
              />
            );
          })
        ) : (
          <div className="col-span-full border-2 border-dashed border-white/5 p-20 rounded-[40px] text-center bg-white/2">
            <p className="text-white/40 text-lg font-medium">
              No assignments found for{' '}
              <span className="text-white/80">"{userLevel}"</span>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 text-yellow-400 text-xs font-black uppercase border-b border-yellow-400 pb-1"
            >
              Refresh Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
