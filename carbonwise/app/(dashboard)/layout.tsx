import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Scene } from "@/components/canvas/Scene";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
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
    // In production, strictly enforce authentication. No demo fallback.
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen w-full bg-transparent text-white pt-24 pb-12 px-6 lg:px-12 pointer-events-auto">
      <div className="fixed inset-0 z-[-10] pointer-events-none opacity-40">
        <Scene />
      </div>
      {/* HUD Navigation overlay */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hud-glass px-6 py-3 rounded-full flex items-center gap-6 text-sm font-medium shadow-[0_0_20px_rgba(255,255,255,0.05)]">
        <a href="/dashboard" className="text-white/60 hover:text-white transition-colors">Mission Control</a>
        <a href="/calculator" className="text-white/60 hover:text-white transition-colors">Log Impact</a>
        <a href="/upload" className="text-white/60 hover:text-white transition-colors">Scanner</a>
        <a href="/coach" className="text-white/60 hover:text-white transition-colors">AI Core</a>
        <a href="/leaderboard" className="text-white/60 hover:text-white transition-colors">Global Net</a>
        
        <div className="w-[1px] h-4 bg-white/20 mx-2" />
        
        <div className="flex items-center gap-2 text-emerald-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{profile?.sustainability_score || 0} OS</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
