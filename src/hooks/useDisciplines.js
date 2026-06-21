import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

// Fetches the current user's disciplines and exposes create/archive mutators.
export function useDisciplines({ includeArchived = false } = {}) {
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
      .from('disciplines')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    if (!includeArchived) q = q.eq('archived', false);
    const { data: rows, error: err } = await q;
    if (err) setError(err);
    setData(rows || []);
    setLoading(false);
  }, [user, includeArchived]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addDiscipline = async (fields) => {
    const { data: row, error: err } = await supabase
      .from('disciplines')
      .insert({ ...fields, user_id: user.id })
      .select()
      .single();
    if (err) throw err;
    await fetchAll();
    return row;
  };

  const setArchived = async (id, archived) => {
    const { error: err } = await supabase
      .from('disciplines')
      .update({ archived })
      .eq('id', id);
    if (err) throw err;
    await fetchAll();
  };

  return { disciplines: data, loading, error, refetch: fetchAll, addDiscipline, setArchived };
}
