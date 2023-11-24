'use client';

import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { UserPayload } from '../../types/payload.types';
import { createClient } from '@/lib/supabase/client';

interface AuthContextValue {
  authUser: User | null | undefined;
  user: UserPayload | null | undefined;
  session: Session | null | undefined;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const supabase = createClient();

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [session, setSession] = useState<Session | null>();
  const [authUser, setAuthUser] = useState<User | null>();
  const [user, setUser] = useState<UserPayload | null>();

  const setUserFromFetch = async (id: string | undefined | null) => {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id as string)
      .select();
    // console.log(id);
    // setUser(data as UserPayload);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setAuthUser(session?.user);
        console.log(authUser);
        setUserFromFetch(authUser?.id);
      }
    );
    const setData = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      setSession(session);
      setAuthUser(session?.user);
      console.log(authUser);

      setUserFromFetch(authUser?.id);
    };
    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    authUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
