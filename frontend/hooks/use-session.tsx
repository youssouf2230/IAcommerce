/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/use-session.ts
'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';


interface Session {
  isLoggedIn: boolean;
  user: User | null;
  token:string | null

}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define an async function inside the effect to fetch the data
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/auth/session');
        
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }

        const data: Session = await response.json();
        setSession(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []); // The empty dependency array means this runs once when the component mounts

  return { session, isLoading, error };
}