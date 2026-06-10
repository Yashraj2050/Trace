import { InsightCard } from "@/components/dashboard/insight-card";
import { ArrowLeft, TrendingDown, Leaf, Zap, Award } from "lucide-react";
import Link from "next/link";
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Insights & Trends</h1>
          <p className="text-muted-foreground font-medium mt-1">Deep dive into your environmental impact.</p>
        </div>
      </header>

      {/* Hero Insight */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <TrendingDown className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">You&apos;re trending downwards!</h2>
            <p className="text-foreground/80 leading-relaxed max-w-xl">
              Your carbon footprint this week is <span className="font-bold text-emerald-600">14% lower</span> than your historical average. 
              The biggest reduction came from your Transport category after you logged 3 public transit commutes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Breakdown Placeholder */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Weekly Breakdown</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 font-medium">
                <span>Food</span>
                <span>{(totalCarbon * 0.4).toFixed(1)} kg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 font-medium">
                <span>Transport</span>
                <span>{(totalCarbon * 0.35).toFixed(1)} kg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 font-medium">
                <span>Energy</span>
                <span>{(totalCarbon * 0.25).toFixed(1)} kg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Actions */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" /> Recommended Actions
          </h3>
          <InsightCard 
            title="Switch to Renewable" 
            text="Your energy consumption makes up 25% of your footprint. Switching to a green energy tariff can eliminate this entirely." 
            actionLabel="Commit to Green Tariff"
          />
          <InsightCard 
            title="Zero-Waste Grocery" 
            text="You logged 4 supermarket trips this week. Bring your own bags and buy bulk to save ~1.2 kg CO₂ next week." 
            actionLabel="Commit to Zero-Waste"
          />
        </div>
      </div>
    </div>
  );
}
