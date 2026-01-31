import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '~/lib/supabase';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // If no session, redirect to home/landing
        navigate('/');
      } else {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Verifying Credentials...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
