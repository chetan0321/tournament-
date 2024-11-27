export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  sport: string;
  start_date: string;
  end_date: string;
  registration_fee: number;
  max_teams: number;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  created_at: string;
  organizer_id: string;
}

export interface Team {
  id: string;
  name: string;
  tournament_id: string;
  captain_id: string;
  players: Player[];
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Player {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  team_id: string;
}

export interface Sponsor {
  id: string;
  company_name: string;
  logo_url: string;
  website: string;
  description: string;
  sponsorship_level: 'platinum' | 'gold' | 'silver' | 'bronze';
  tournament_id: string;
  status: 'active' | 'inactive';
  created_at: string;
}