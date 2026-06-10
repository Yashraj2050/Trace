import { createClient } from '@/lib/supabase/client';
import { z } from 'zod';

export const carbonLogSchema = z.object({
  activity_type: z.enum(['TRANSPORT', 'ENERGY', 'FOOD', 'SHOPPING', 'OTHER']),
  carbon_kg: z.number().min(0),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type CarbonLogInput = z.infer<typeof carbonLogSchema>;

export const CarbonService = {
  async getRecentLogs(userId: string, limit = 10) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('carbon_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data;
  },

  async addLog(userId: string, logData: CarbonLogInput) {
    const supabase = createClient();
    
    // Validate input
    const parsedData = carbonLogSchema.parse(logData);
    
    const { data, error } = await supabase
      .from('carbon_logs')
      .insert({
        user_id: userId,
        ...parsedData,
      } as unknown as never)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async getAggregatedStats(userId: string) {
    const supabase = createClient();
    
    // Since aggregation can be heavy, ideally this would be an RPC call or view.
    // For now, we'll fetch logs (or assume a view exists for optimization later).
    // Using sum from reports table or similar.
    const { data, error } = await supabase
      .from('reports')
      .select('total_carbon_kg, score, month_year')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // ignore no rows error
    return data;
  }
};
