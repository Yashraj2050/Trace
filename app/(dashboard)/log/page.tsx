"use client";

import { Car, Train, Utensils, Zap, ShoppingBag, Plane, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { TransactionFeed, type CarbonLog } from "@/components/dashboard/transaction-feed";

const QUICK_ACTIONS = [
  { id: 'transit', label: 'Public Transit', icon: Train, color: 'text-emerald-500', bg: 'bg-emerald-500/10', defaultKg: 0.5 },
  { id: 'car', label: 'Car Trip', icon: Car, color: 'text-blue-500', bg: 'bg-blue-500/10', defaultKg: 2.4 },
  { id: 'meal_plant', label: 'Plant Meal', icon: Utensils, color: 'text-green-500', bg: 'bg-green-500/10', defaultKg: 0.8 },
  { id: 'meal_meat', label: 'Meat Meal', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-500/10', defaultKg: 3.3 },
  { id: 'energy', label: 'Energy Use', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10', defaultKg: 1.2 },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10', defaultKg: 5.0 },
  { id: 'flight', label: 'Flight', icon: Plane, color: 'text-indigo-500', bg: 'bg-indigo-500/10', defaultKg: 150.0 },
];

export default function LogPage() {
  const [logging, setLogging] = useState<string | null>(null);
  const [recentLogs, setRecentLogs] = useState<CarbonLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const router = useRouter();

  const fetchRecentLogs = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('carbon_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (!error && data) {
        setRecentLogs(data as CarbonLog[]);
      }
    } catch (e) {
      console.error("Failed to fetch recent logs", e);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  const logAction = async (action: typeof QUICK_ACTIONS[0]) => {
    setLogging(action.id);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in");
        return;
      }

      const { error } = await supabase.from('carbon_logs').insert([{
        user_id: user.id,
        category: action.id === 'transit' || action.id === 'car' || action.id === 'flight' ? 'TRANSPORT' : 
                  action.id.includes('meal') ? 'FOOD' : 
                  action.id === 'energy' ? 'ENERGY' : 'SHOPPING',
        carbon_kg: action.defaultKg,
        source: 'quick_add',
        details: { title: action.label, subtitle: 'Quick Add' }
      }] as unknown as never[]);

      if (error) throw error;
      
      // Update streak via RPC — ignore errors silently for UX speed
      try {
        await supabase.rpc('increment_streak' as never, { user_id: user.id } as never);
      } catch {
        // non-critical; streak will self-correct on next load
      }

      // Use a clean toast instead of an over-gamified confetti burst
      toast.success(`Logged ${action.label} (+${action.defaultKg} kg)`, {
        description: "🔥 Streak extended to 13 days!"
      });

      // Refetch locally so the UI updates immediately
      await fetchRecentLogs();
      // Force Next.js router cache to invalidate so Dashboard gets fresh data
      router.refresh();
    } catch (e) {
      toast.error("Failed to log activity");
    } finally {
      setLogging(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Log Activity</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Quickly tap to log standard daily activities.</p>
      </header>

      {/* Smart Scan Banner */}
      <Link href="/upload" className="block w-full">
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex items-center justify-between group hover:bg-primary/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Smart Scan</h3>
              <p className="text-sm text-foreground/70 mt-1">Upload a bill or receipt to automatically extract carbon data.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Quick Add Grid */}
      <div>
        <h3 className="font-semibold text-lg tracking-tight mb-4 text-foreground">Quick Tap</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => logAction(action)}
                disabled={logging === action.id}
                aria-label={`Log ${action.label}, adds ${action.defaultKg} kg`}
                className="flex flex-col items-center justify-center gap-3 p-6 bg-card border border-border rounded-3xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all active:scale-95"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action.bg} ${logging === action.id ? 'animate-pulse' : ''}`} aria-hidden="true">
                  <Icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">+{action.defaultKg} kg</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Today's Log Section */}
      <div className="pt-8">
        <h3 className="font-semibold text-lg tracking-tight mb-4 text-foreground">Today&apos;s Log</h3>
        {loadingLogs ? (
          <div className="flex items-center justify-center p-12 bg-muted/20 rounded-3xl border border-dashed border-border">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : recentLogs.length > 0 ? (
          <TransactionFeed transactions={recentLogs} />
        ) : (
          <div className="text-center py-12 px-4 border border-dashed border-border rounded-3xl bg-muted/20">
            <p className="text-sm text-muted-foreground">You haven&apos;t logged any activities today.</p>
          </div>
        )}
      </div>

    </div>
  );
}
