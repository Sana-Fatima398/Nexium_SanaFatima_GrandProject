'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowClient } from '../../../../lib/supabase-browser';
import { useUserContext } from '@/app/context/UserContext';
import TeaLoading from '@/components/ui/teaLoading';

export default function CallbackPage() {
  const router = useRouter();
  const { setLogin, setUser } = useUserContext();

  useEffect(() => {
    const supabase = createBrowClient();

    async function handleAuthCallback() {
      // Check if a session exists after the magic link is clicked
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error.message);
        return;
      }

      if (session) {
        // Fetch user data from your API
        const res = await fetch('/api/auth/user');
        const json = await res.json();

        if (res.ok) {
          setLogin(true);
          setUser(json.message);
          router.replace('/');
        } else {
          console.error('Failed to fetch user:', json.error);
        }
      } else {
        console.error('No session found');
      }
    }

    handleAuthCallback();

    // Optionally, listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Handle signed-in state
        fetch('/api/auth/user')
          .then((res) => res.json())
          .then((json) => {
            if (json.message) {
              setLogin(true);
              setUser(json.message);
              router.replace('/');
            }
          })
          .catch((err) => console.error('Error fetching user:', err));
      }
    });

    // Cleanup listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, setLogin, setUser]);

  return (
    <div className=' flex flex-col w-full mx-auto px-auto my-16 items-center justify-center'>
        <p className="text-5xl font-shadow">Signing you in...</p>
        <div className="h-1/2 w-1/2"><TeaLoading/></div>
      </div>
    );
}