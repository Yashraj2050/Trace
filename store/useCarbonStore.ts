import { create } from 'zustand';

// Update with actual types later
interface CarbonLog {
  id: string;
  activity_type: string;
  carbon_kg: number;
  created_at: string;
}

interface AggregatedStats {
  total_carbon_kg: number;
  score: number;
  month_year: string;
}

interface CarbonState {
  recentLogs: CarbonLog[];
  aggregatedStats: AggregatedStats | null;
  isLoading: boolean;
  setRecentLogs: (logs: CarbonLog[]) => void;
  setAggregatedStats: (stats: AggregatedStats) => void;
  setLoading: (isLoading: boolean) => void;
  addLogOptimistic: (log: CarbonLog) => void;
}

export const useCarbonStore = create<CarbonState>((set) => ({
  recentLogs: [],
  aggregatedStats: null,
  isLoading: true,
  setRecentLogs: (logs) => set({ recentLogs: logs, isLoading: false }),
  setAggregatedStats: (stats) => set({ aggregatedStats: stats }),
  setLoading: (isLoading) => set({ isLoading }),
  addLogOptimistic: (log) => set((state) => ({
    recentLogs: [log, ...state.recentLogs].slice(0, 10)
  })),
}));
