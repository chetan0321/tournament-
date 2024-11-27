export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tournaments: {
        Row: {
          id: string
          name: string
          description: string
          start_date: string
          end_date: string
          registration_fee: number
          max_teams: number
          sport: string
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          start_date: string
          end_date: string
          registration_fee: number
          max_teams: number
          sport: string
          created_at?: string
          created_by: string
        }
      }
      teams: {
        Row: {
          id: string
          team_name: string
          captain_name: string
          email: string
          phone: string
          tournament_id: string
          players: string[]
          created_at: string
        }
        Insert: {
          id?: string
          team_name: string
          captain_name: string
          email: string
          phone: string
          tournament_id: string
          players: string[]
          created_at?: string
        }
      }
      sponsorships: {
        Row: {
          id: string
          company_name: string
          email: string
          website: string
          level: string
          message: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          company_name: string
          email: string
          website: string
          level: string
          message: string
          status?: 'pending'
          created_at?: string
        }
      }
    }
  }
}