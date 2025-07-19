import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
     {
     cookies: {
        getAll() {
          const allCookies = cookies().getAll()
          return allCookies.map(({ name, value }) => ({ name, value }))
        },
        setAll(cookiesToSet) {
          const cookieStore = cookies()
          for (const cookie of cookiesToSet) {
            cookieStore.set(cookie)
          }
        }
    }
  }
  );
}   