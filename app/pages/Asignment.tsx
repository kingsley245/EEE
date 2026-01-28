import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import AssignmentCard from '~/components/AssignmentCard';
import { useNavigate } from 'react-router';

// This tells TypeScript exactly what your Strapi data looks like
interface Assignment {
  id: number;
  attributes: {
    Title: string;
    Assignment_Type: string;
    Target_Level: string;
    Deadline: string;
  };
}

const AssignmentList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        setLoading(true);

        // 1. Get the user from Supabase and check their level
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const level = user?.user_metadata?.level || '100';
        setUserLevel(level);

        // 2. Fetch only the assignments matching that level from Strapi
        // REPLACEME: Use your actual Strapi URL here
        // 1. Make sure your field name in Strapi is EXACTLY "Target_Level"
        const levelFilter = encodeURIComponent(`filters[Target_level][$eq]`);

        const response = await fetch(
          `https://eee-backend-yspo.onrender.com/api/assignments?${levelFilter}=${level}&populate=*`,
        );

        const result = await response.json();
        setAssignments(result.data || []);
      } catch (error) {
        console.error('Portal Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
  }, []);

  // What to show while the page is thinking
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-yellow-400 font-black animate-pulse uppercase tracking-widest">
          Fetching {userLevel}L Assignments...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-white text-2xl font-bold mb-8 uppercase tracking-tighter">
        Current Tasks{' '}
        <span className="text-yellow-400">for {userLevel} Level</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.length > 0 ? (
          assignments.map((item) => (
            <AssignmentCard
              key={item.id}
              id={item.id}
              attributes={item.attributes}
              onClick={(id) => navigate(`/assignments/${id}`)}
            />
          ))
        ) : (
          <div className="col-span-full border border-dashed border-white/10 p-20 rounded-3xl text-center">
            <p className="text-white/40">
              No assignments posted for your level yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
