import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogOut, Award, Zap, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:hidden">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile</h1>
          <p className="text-muted-foreground font-medium mt-1">Manage your account and view achievements.</p>
        </div>
      </header>

      {/* Profile Header Card */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <Avatar className="w-24 h-24 ring-4 ring-emerald-500/20">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-emerald-500/10 text-emerald-600 text-3xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold text-foreground">{fullName}</h2>
          <p className="text-muted-foreground mb-4">{user.email}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-emerald-600 text-sm">Score: {profile?.sustainability_score || 0}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full">
              <span className="font-semibold text-orange-600 text-sm">🔥 {profile?.streak_days || 0} Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Summary */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">Recent Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 border border-border bg-card rounded-3xl flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Zero-Waste Beginner</h4>
              <p className="text-xs text-muted-foreground mt-1">Logged first 5 eco-friendly meals.</p>
            </div>
          </div>
          <div className="p-5 border border-border bg-card rounded-3xl flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Transit Champion</h4>
              <p className="text-xs text-muted-foreground mt-1">Saved 50kg CO₂ using public transit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="pt-6 border-t border-border">
        <form action="/auth/signout" method="post">
          <button type="submit" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-destructive/10 text-destructive hover:bg-destructive/20 font-semibold rounded-full transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
