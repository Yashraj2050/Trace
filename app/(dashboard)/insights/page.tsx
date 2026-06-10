import { InsightCard } from "@/components/dashboard/insight-card";
import { TrendingDown, Activity, Zap, ShieldAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function InsightsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: rawLogs } = await supabase
    .from("carbon_logs")
    .select("carbon_kg, category")
    .eq("user_id", user?.id || "")
    .order("created_at", { ascending: false });

  const logs = rawLogs as { carbon_kg: number; category: string }[] | null;
  const totalCarbon = (logs || []).reduce((acc, log) => acc + log.carbon_kg, 0);

  return (
    <div className="w-full pointer-events-auto">
      
      <div className="border-b border-white/10 pb-6 mb-8">
        <h1 className="text-4xl font-medium tracking-tight mb-2">Behavioral Intelligence</h1>
        <p className="text-sm font-mono text-white/50 uppercase tracking-widest">Report _0x1A</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Narrative/Editorial */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-[#111] border border-emerald-400/20 p-8 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 border-b border-emerald-400/20 pb-4">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-400">Trajectory: Optimal</h2>
            </div>
            
            <p className="text-lg text-white/80 leading-relaxed font-light mb-6">
              Your carbon footprint this week demonstrates a structural shift in consumption. 
              Telemetry indicates a <span className="font-medium text-emerald-400">14% reduction</span> compared to your historical baseline.
            </p>
            
            <div className="pl-4 border-l-2 border-emerald-400/50 text-white/60 text-sm font-mono leading-relaxed">
              &quot;The most significant variance was detected in the Transport vector following 3 consecutive public transit logs.&quot;
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-white/50" />
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/50">Calculated Vectors</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InsightCard 
                title="Grid Optimization" 
                text="Energy consumption constitutes 25% of current footprint. Shifting to a renewable tariff eliminates this vector entirely." 
                actionLabel="Commit"
              />
              <InsightCard 
                title="Supply Chain" 
                text="4 retail anomalies detected. Deploying reusable transport items (bags) reduces plastic telemetry by 1.2kg." 
                actionLabel="Commit"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Hard Data */}
        <div className="lg:col-span-5">
          <div className="border border-white/10 bg-[#0d0d0d] p-6 h-full">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <Activity className="w-4 h-4 text-white/50" />
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/50">Vector Breakdown</h3>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs font-mono uppercase tracking-widest mb-2">
                  <span className="text-white/70">Food</span>
                  <span className="text-white">{(totalCarbon * 0.4).toFixed(1)} kg</span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="bg-white/80 h-1" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-mono uppercase tracking-widest mb-2">
                  <span className="text-white/70">Transport</span>
                  <span className="text-white">{(totalCarbon * 0.35).toFixed(1)} kg</span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="bg-white/60 h-1" style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-mono uppercase tracking-widest mb-2">
                  <span className="text-white/70">Energy</span>
                  <span className="text-white">{(totalCarbon * 0.25).toFixed(1)} kg</span>
                </div>
                <div className="w-full bg-white/5 h-1">
                  <div className="bg-white/40 h-1" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-white/5 border border-white/10 flex items-center gap-3 text-xs font-mono text-white/50">
              <Zap className="w-3 h-3 text-yellow-500" />
              System automatically aggregates external telemetry.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
