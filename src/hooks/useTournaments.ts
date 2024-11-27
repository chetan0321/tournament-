import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Tournament = Database['public']['Tables']['tournaments']['Row'];

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const { data, error } = await supabase
          .from('tournaments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTournaments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTournaments();
  }, []);

  const createTournament = async (tournament: Database['public']['Tables']['tournaments']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .insert([tournament])
        .select()
        .single();

      if (error) throw error;
      setTournaments([data, ...tournaments]);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { tournaments, loading, error, createTournament };
}