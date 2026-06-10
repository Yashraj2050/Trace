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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let profile: any = null;

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
      profile = data;
    }
  } catch (err) {
    console.error("Layout authentication error:", err);
    redirect("/login");
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#0d0d0d] flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white">
            TRACE
          </Link>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4 mt-2 px-3">Telemetry</div>
          
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <Activity className="w-4 h-4" /> Mission Control
          </Link>
          <Link href="/log" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <Leaf className="w-4 h-4" /> Log Impact
          </Link>
          <Link href="/upload" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <ScanLine className="w-4 h-4" /> Scanner
          </Link>

          <div className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4 mt-8 px-3">Intelligence</div>
          
          <Link href="/insights" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <Cpu className="w-4 h-4" /> Insights
          </Link>
          <Link href="/community" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <Trophy className="w-4 h-4" /> Global Net
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <div className="px-3 py-2 flex items-center justify-between text-sm text-white/60">
            <span>Score:</span>
            <span className="font-mono text-emerald-400">{profile?.sustainability_score || 0}</span>
          </div>
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <User className="w-4 h-4" /> Profile
          </Link>
          <form action="/auth/signout" method="POST">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative">
        <div className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
