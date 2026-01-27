import { Outlet } from 'react-router';
import Navbar from '~/components/nav';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';

export default function PortalLayout() {
  // Inside your Hero function
  const [user, setUser] = useState<any>(null); // Now setUser is defined!

  useEffect(() => {
    // 1. Check for the current user immediately
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getCurrentUser();

    // 2. Listen for Login/Logout events so the UI updates automatically
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Navbar />

      <div className="py-10 min-h-screen">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
