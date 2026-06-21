import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext(null);

// Redirect target for OAuth + email confirmation. Must match a Redirect URL
// configured in Supabase Auth settings. import.meta.env.BASE_URL is "/project_10k/"
// in prod and "/" in dev, so this resolves correctly in both.
const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}`;

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signUp = (email, password, displayName) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName || '' }, emailRedirectTo: redirectTo },
    });

  const signInWithPassword = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });

  const signOut = () => supabase.auth.signOut();

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    configured: isSupabaseConfigured,
    signUp,
    signInWithPassword,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
