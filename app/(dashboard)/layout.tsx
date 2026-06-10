import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Activity, Leaf, Cpu, ScanLine, Trophy, User, LogOut } from "lucide-react";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  let profile: { full_name?: string | null; sustainability_score?: number | null; streak_days?: number | null; onboarding_completed?: boolean | null } | null = null;

  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();
    
    if (!authError && authData?.user) {
      user = authData.user;
      
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, sustainability_score, streak_days, onboarding_completed")
        .eq("id", user.id)
        .single();
        
      if (profileError) {
        redirect("/login");
      }
      profile = data as { full_name?: string | null; sustainability_score?: number | null; streak_days?: number | null; onboarding_completed?: boolean | null } | null;
    }
  } catch (err) {
    console.error("Layout authentication error:", err);
    redirect("/login");
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-56 border-r border-white/10 bg-[#0a0a0a] flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-widest uppercase text-white">
            TRACE OS
          </Link>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 mt-2 px-3">Telemetry</div>
          
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
            <Activity className="w-4 h-4 group-hover:text-emerald-400 transition-colors" /> Mission Control
          </Link>
          <Link href="/log" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
            <Leaf className="w-4 h-4 group-hover:text-emerald-400 transition-colors" /> Log Impact
          </Link>
          <Link href="/upload" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
            <ScanLine className="w-4 h-4 group-hover:text-emerald-400 transition-colors" /> Scanner
          </Link>

          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 mt-8 px-3">Intelligence</div>
          
          <Link href="/insights" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
            <Cpu className="w-4 h-4 group-hover:text-emerald-400 transition-colors" /> Insights
          </Link>
          <Link href="/community" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
            <Trophy className="w-4 h-4 group-hover:text-emerald-400 transition-colors" /> Global Net
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-1">
          <div className="px-3 py-2 flex items-center justify-between text-xs font-mono text-white/50 uppercase tracking-widest">
            <span>Score</span>
            <span className="text-emerald-400">{profile?.sustainability_score || 0}</span>
          </div>
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
            <User className="w-4 h-4 group-hover:text-emerald-400 transition-colors" /> Profile
          </Link>
          <form action="/auth/signout" method="POST">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-red-400 transition-colors group">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-56 flex flex-col min-h-screen relative overflow-hidden">
        {/* Top Telemetry Bar */}
        <header className="h-14 border-b border-white/10 flex items-center px-8 justify-between bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
            <span>Node: <span className="text-white/80">{profile?.full_name?.split(' ')[0] || 'Operator'}</span></span>
            <span>{"//"}</span>
            <span>Network: <span className="text-emerald-400">Stable</span></span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
            <span>Latency: 12ms</span>
            <span>Sync: 100%</span>
          </div>
        </header>

        <div className="flex-1 p-8 max-w-[1400px] w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
