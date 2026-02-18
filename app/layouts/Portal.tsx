import { Outlet } from 'react-router';
import Navbar from '~/components/nav';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { useNavigate } from 'react-router';

export default function PortalLayout() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // const checkUser = async () => {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();

    //   if (!session) {
    //     navigate('/', { replace: true });
    //   } else {
    //     setUser(session.user);
    //     setIsLoading(false);
    //   }
    // };

    // checkUser();
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate('/', { replace: true });
        return;
      }

      // 1. Check if the user is actually TRYING to go to an admin page
      const isAdminPath =
        window.location.pathname.includes('/portal/admin') ||
        window.location.pathname.includes('/portal/contribute');

      if (isAdminPath) {
        // 2. ONLY check the database if they are hitting /portal/admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role !== 'admin') {
          alert('You are not fully authorized to access this page.');
          navigate('/portal', { replace: true });
          return;
        }
      }

      // If it's a normal portal page OR they are an admin, let them in
      setUser(session.user);
      setIsLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (event === 'SIGNED_OUT') {
        navigate('/', { replace: true });
      }

      if (event === 'PASSWORD_RECOVERY') {
        navigate('/reset-password');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // --- GATEKEEPER ---
  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
          please wait. environment protected
        </p>
      </div>
    );
  }

  // --- AUTHORIZED VIEW ---
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Navbar />
      <div className="py-10 min-h-screen">
        <Outlet context={{ user }} />
      </div>
      <Footer />
    </div>
  );
}
