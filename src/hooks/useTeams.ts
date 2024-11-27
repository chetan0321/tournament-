import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Team = Database['public']['Tables']['teams']['Row'];

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTeams(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  const registerTeam = async (team: Database['public']['Tables']['teams']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([team])
        .select()
        .single();

      if (error) throw error;
      setTeams([data, ...teams]);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { teams, loading, error, registerTeam };
}