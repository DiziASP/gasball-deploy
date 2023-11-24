'use client';

import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { UserPayload } from '../../types/payload.types';
import { createClient } from '@/lib/supabase/client';

interface AuthContextValue {
  authUser: User | null | undefined;
  user: UserPayload | null | undefined;
  session: Session | null | undefined;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const supabase = createClient();

export const AuthProvider = ({ ...props }) => {
  const [session, setSession] = useState<Session | null>();
  const [authUser, setAuthUser] = useState<User | null>();
  const [user, setUser] = useState<UserPayload | null>();

  const setUserFromFetch = async (id: string | undefined | null) => {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id as string)
      .select();
    setUser(data as UserPayload);
  };

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession }
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setAuthUser(activeSession?.user ?? null);
      setUserFromFetch(activeSession?.user.id);
    }
    getActiveSession();

    const {
      data: { subscription: authListener }
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setAuthUser(currentSession?.user ?? null);
      setUserFromFetch(currentSession?.user.id);
    });

    return () => {
      authListener?.unsubscribe();
    };
  });

  const value = useMemo(() => {
    return {
      session,
      user,
      authUser
    };
  }, [session, user, authUser]);

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
