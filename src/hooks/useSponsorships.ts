import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Sponsorship = Database['public']['Tables']['sponsorships']['Row'];

export function useSponsorships() {
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSponsorships() {
      try {
        const { data, error } = await supabase
          .from('sponsorships')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSponsorships(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSponsorships();
  }, []);

  const submitSponsorship = async (sponsorship: Database['public']['Tables']['sponsorships']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('sponsorships')
        .insert([sponsorship])
        .select()
        .single();

      if (error) throw error;
      setSponsorships([data, ...sponsorships]);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { sponsorships, loading, error, submitSponsorship };
}