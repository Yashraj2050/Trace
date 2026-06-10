import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogOut, Activity, Hexagon, Zap, Shield, FileTerminal } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: rawProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const profile = rawProfile as { full_name?: string | null; sustainability_score?: number; streak_days?: number } | null;

  const fullName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="w-full pointer-events-auto">
      
      <div className="border-b border-white/10 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-2">Node Identity</h1>
          <p className="text-sm font-mono text-white/50 uppercase tracking-widest">Operator Profile</p>
        </div>
        <form action="/auth/signout" method="post">
          <button type="submit" className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-2 hover:bg-red-400/10 transition-colors">
            <LogOut className="w-3 h-3" /> Terminate Session
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Identity Block */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="border border-white/10 bg-[#111] p-8 flex flex-col">
            <div className="w-20 h-20 mb-8 border border-white/20 bg-white/5 flex items-center justify-center">
              <span className="text-2xl font-mono text-white">{initials}</span>
            </div>
            
            <h2 className="text-2xl font-medium tracking-tight mb-1">{fullName}</h2>
            <p className="text-sm font-mono text-white/40 mb-8">{user.email}</p>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-sm font-mono uppercase tracking-widest">
                <span className="text-white/50">Status</span>
                <span className="text-emerald-400 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Node</span>
              </div>
              <div className="flex justify-between items-center text-sm font-mono uppercase tracking-widest">
                <span className="text-white/50">Auth Level</span>
                <span className="text-white">Operator</span>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-[#0d0d0d] p-6">
             <div className="flex items-center gap-2 mb-6">
               <FileTerminal className="w-4 h-4 text-white/50" />
               <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">System Logs</h3>
             </div>
             <p className="text-xs font-mono text-white/30 leading-relaxed uppercase">
               Last Login: {new Date().toISOString().split("T")[0]}<br/>
               IP Hash: A1F9.C4E2<br/>
               Telemetry Sync: OK
             </p>
          </div>
        </div>

        {/* Metrics & Milestones */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-emerald-400/20 bg-emerald-400/5 p-6 flex flex-col justify-between h-40">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-4">
                <Activity className="w-3 h-3" /> OS Score
              </div>
              <p className="text-5xl font-medium tracking-tight">{profile?.sustainability_score || 0}</p>
            </div>
            
            <div className="border border-orange-500/20 bg-orange-500/5 p-6 flex flex-col justify-between h-40">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-orange-500 mb-4">
                <Zap className="w-3 h-3" /> Streak
              </div>
              <p className="text-5xl font-medium tracking-tight text-orange-500">{profile?.streak_days || 0}</p>
            </div>
          </div>

          <div className="border border-white/10 bg-[#111] p-8 flex-1">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-4">Operational Milestones</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-mono text-sm tracking-widest uppercase text-white/90 mb-1">Baseline Established</h4>
                  <p className="text-xs text-white/40 uppercase font-mono leading-relaxed">Initial telemetry configuration completed successfully.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
                  <Hexagon className="w-4 h-4 text-white/50" />
                </div>
                <div>
                  <h4 className="font-mono text-sm tracking-widest uppercase text-white/90 mb-1">Transit Optimization</h4>
                  <p className="text-xs text-white/40 uppercase font-mono leading-relaxed">Logged 5 sequential public transit usages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
