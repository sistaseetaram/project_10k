import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

// Fetches the current user's profile row; upserts one as a safety net if the
// signup trigger missed it. Exposes updateProfile.
export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!isSupabaseConfigured || !user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: err } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    if (err) setError(err);

    if (!data) {
      // Safety net: trigger may not have fired (e.g. pre-existing user).
      const { data: created } = await supabase
        .from('profiles')
        .upsert({ id: user.id, display_name: user.user_metadata?.display_name || '' })
        .select()
        .single();
      setProfile(created || null);
    } else {
      setProfile(data);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (fields) => {
    const { data, error: err } = await supabase
      .from('profiles')
      .update(fields)
      .eq('id', user.id)
      .select()
      .single();
    if (err) throw err;
    setProfile(data);
    return data;
  };

  return { profile, loading, error, refetch: fetchProfile, updateProfile };
}
