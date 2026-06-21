import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

// Fetches the current user's logged sessions (newest first) and exposes addSession.
// Sessions are the single source of truth — all hours/streaks derive from here.
export function useSessions({ disciplineId = null, limit = null } = {}) {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    if (!isSupabaseConfigured || !user) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    let q = supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('session_date', { ascending: false })
      .order('created_at', { ascending: false });
    if (disciplineId) q = q.eq('discipline_id', disciplineId);
    if (limit) q = q.limit(limit);
    const { data: rows, error: err } = await q;
    if (err) setError(err);
    setData(rows || []);
    setLoading(false);
  }, [user, disciplineId, limit]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addSession = async (fields) => {
    const { data: row, error: err } = await supabase
      .from('sessions')
      .insert({ ...fields, user_id: user.id })
      .select()
      .single();
    if (err) throw err;
    await fetchAll();
    return row;
  };

  return { sessions: data, loading, error, refetch: fetchAll, addSession };
}
