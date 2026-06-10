import { createClient } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  full_name: string | null;
  sustainability_score: number;
  streak_days: number;
  onboarding_completed: boolean;
  total_carbon_kg?: number;
  carbon_goal_kg?: number;
}

export const UserService = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows
      throw error;
    }
    
    return data;
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .update(updates as unknown as never)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};
