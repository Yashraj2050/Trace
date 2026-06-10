"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Car, Home, Utensils, ShoppingBag, Plane, Hexagon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const steps = [
  { id: "transport", title: "Transport Vector", icon: Car },
  { id: "energy", title: "Energy Profile", icon: Home },
  { id: "food", title: "Dietary Input", icon: Utensils },
  { id: "shopping", title: "Consumption Matrix", icon: ShoppingBag },
  { id: "travel", title: "Aviation Telemetry", icon: Plane },
];

type OnboardingData = {
  transport: string;
  energySource: string;
  diet: string;
  shoppingHabits: string;
  flightsPerYear: string;
};

const stepOptions: Record<string, { label: string; value: string; carbonKg: number; desc: string }[]> = {
  transport: [
    { label: "Internal Combustion Engine", value: "car_daily", carbonKg: 2400, desc: "Private car daily use" },
    { label: "Public Transit Network", value: "public_transit", carbonKg: 800, desc: "Bus, train, subway mostly" },
    { label: "Kinetic / Non-Motorized", value: "bike_walk", carbonKg: 50, desc: "Bike or walk primarily" },
    { label: "Mixed Transport", value: "car_occasional", carbonKg: 1200, desc: "Occasional car use" },
    { label: "Electric Vehicle", value: "ev", carbonKg: 600, desc: "Battery-powered primary" },
  ],
  energySource: [
    { label: "Fossil / Natural Gas", value: "gas", carbonKg: 1800, desc: "Gas heating & grid" },
    { label: "Direct Solar", value: "solar", carbonKg: 150, desc: "Home solar panels" },
    { label: "Standard Grid", value: "grid", carbonKg: 1200, desc: "Standard electricity mix" },
    { label: "100% Renewable Plan", value: "renewables", carbonKg: 200, desc: "Wind/solar grid provider" },
    { label: "Mixed Sources", value: "mixed", carbonKg: 900, desc: "Grid + partial renewables" },
  ],
  diet: [
    { label: "High-Impact Omnivore", value: "meat_heavy", carbonKg: 3300, desc: "Meat at every meal" },
    { label: "Moderate Omnivore", value: "meat_moderate", carbonKg: 1900, desc: "Meat a few times/week" },
    { label: "Pescatarian", value: "pescatarian", carbonKg: 1200, desc: "Fish and dairy, no meat" },
    { label: "Vegetarian", value: "vegetarian", carbonKg: 800, desc: "Dairy and eggs only" },
    { label: "Plant-Based (Vegan)", value: "vegan", carbonKg: 500, desc: "No animal products" },
  ],
  shoppingHabits: [
    { label: "High Frequency", value: "luxury", carbonKg: 2000, desc: "Frequent luxury/new items" },
    { label: "Fast Fashion", value: "fashion", carbonKg: 1200, desc: "Buy new clothes often" },
    { label: "Circular Economy", value: "secondhand", carbonKg: 400, desc: "Mostly secondhand" },
    { label: "Minimalist", value: "minimal", carbonKg: 300, desc: "Eco-conscious, rare buys" },
    { label: "Standard Consumer", value: "average", carbonKg: 800, desc: "Average consumption" },
  ],
  flightsPerYear: [
    { label: "Zero Aviation", value: "none", carbonKg: 0, desc: "No flights this year" },
    { label: "Low Frequency", value: "few_short", carbonKg: 600, desc: "1-2 short haul flights" },
    { label: "Long Haul Low", value: "few_long", carbonKg: 2000, desc: "1-2 long haul flights" },
    { label: "Medium Frequency", value: "several", carbonKg: 3000, desc: "3-5 flights total" },
    { label: "High Frequency", value: "frequent", carbonKg: 5000, desc: "6+ flights annually" },
  ],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<OnboardingData>({
    transport: "",
    energySource: "",
    diet: "",
    shoppingHabits: "",
    flightsPerYear: "",
  });
  const [loading, setLoading] = useState(false);

  const stepKeys = Object.keys(stepOptions);
  const currentKey = stepKeys[currentStep];
  const currentOptions = stepOptions[currentKey];
  const step = steps[currentStep];
  const Icon = step.icon;

  const currentValue = selections[currentKey as keyof OnboardingData];

  const canProceed = currentValue !== "";

  const handleSelect = (value: string) => {
    setSelections((prev) => ({ ...prev, [currentKey]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const totalCarbon = stepKeys.reduce((sum, key) => {
        const val = selections[key as keyof OnboardingData];
        const opts = stepOptions[key];
        const opt = opts.find((o) => o.value === val);
        return sum + (opt?.carbonKg || 0);
      }, 0);

      const updateData = {
        onboarding_completed: true,
        total_carbon_kg: totalCarbon,
        carbon_goal_kg: Math.round(totalCarbon * 0.7),
        sustainability_score: Math.max(0, 100 - Math.round(totalCarbon / 100)),
      };
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("profiles")
        .update(updateData)
        .eq("id", user.id);

      const entries = [
        { category: "transport" as const, carbon_kg: stepOptions.transport.find((o) => o.value === selections.transport)?.carbonKg || 0 },
        { category: "energy" as const, carbon_kg: stepOptions.energySource.find((o) => o.value === selections.energySource)?.carbonKg || 0 },
        { category: "food" as const, carbon_kg: stepOptions.diet.find((o) => o.value === selections.diet)?.carbonKg || 0 },
        { category: "shopping" as const, carbon_kg: stepOptions.shoppingHabits.find((o) => o.value === selections.shoppingHabits)?.carbonKg || 0 },
        { category: "travel" as const, carbon_kg: stepOptions.flightsPerYear.find((o) => o.value === selections.flightsPerYear)?.carbonKg || 0 },
      ].filter((e) => e.carbon_kg > 0);

      const insertData: { user_id: string; category: string; carbon_kg: number; date: string; source: string; description: string }[] = entries.map((e) => ({
        user_id: user.id,
        category: e.category,
        carbon_kg: e.carbon_kg / 365,
        date: new Date().toISOString().split("T")[0],
        source: "calculator" as const,
        description: "Initial baseline telemetry",
      }));

      // @ts-expect-error - carbon_logs might not be fully typed in the generated Database types yet
      await supabase.from("carbon_logs").insert(insertData);

      toast.success("Telemetry baseline established.");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to commit telemetry. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      
      <div className="w-full max-w-2xl flex flex-col md:flex-row min-h-[600px] border border-white/10 bg-[#0d0d0d] overflow-hidden">
        
        {/* Left Sidebar Info */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col bg-[#111]">
          <div className="mb-auto">
            <div className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 mb-6">
              <Hexagon className="w-4 h-4 text-emerald-400" />
            </div>
            <h1 className="text-xl font-medium tracking-tight mb-2 uppercase">Configuration</h1>
            <p className="text-xs text-white/50 font-mono">Establish initial telemetry baseline.</p>
          </div>

          <div className="mt-8">
            <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-4">Sequence Progress</div>
            <div className="flex flex-col gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    i === currentStep ? "bg-emerald-400 animate-pulse" : i < currentStep ? "bg-white/40" : "bg-white/10"
                  )} />
                  <span className={cn(
                    "text-xs font-mono uppercase transition-colors",
                    i === currentStep ? "text-emerald-400" : i < currentStep ? "text-white/60" : "text-white/30"
                  )}>
                    {s.title.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="w-full md:w-2/3 p-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <Icon className="w-5 h-5 text-white/70" />
                <h2 className="text-2xl font-medium tracking-tight">{step.title}</h2>
              </div>

              <div className="space-y-3 flex-1">
                {currentOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full text-left px-5 py-4 border transition-all duration-200 flex items-center justify-between group",
                      currentValue === option.value
                        ? "border-emerald-400/50 bg-emerald-400/5"
                        : "border-white/10 hover:border-white/30 hover:bg-white/5"
                    )}
                  >
                    <div>
                      <div className={cn(
                        "text-sm font-medium transition-colors mb-1",
                        currentValue === option.value ? "text-emerald-400" : "text-white"
                      )}>
                        {option.label}
                      </div>
                      <div className="text-xs text-white/40 font-mono">
                        {option.desc}
                      </div>
                    </div>
                    <div className={cn(
                      "w-4 h-4 border flex items-center justify-center transition-colors",
                      currentValue === option.value ? "border-emerald-400" : "border-white/20 group-hover:border-white/40"
                    )}>
                      {currentValue === option.value && <div className="w-2 h-2 bg-emerald-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            {currentStep > 0 ? (
              <Button
                variant="ghost"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white"
              >
                <ArrowLeft className="w-3 h-3 mr-2" />
                Reverse
              </Button>
            ) : <div />}
            
            <Button
              onClick={handleNext}
              disabled={!canProceed || loading}
              className="bg-white text-black hover:bg-white/90 text-xs font-mono uppercase tracking-widest h-10 px-6 disabled:opacity-50"
            >
              {currentStep === steps.length - 1
                ? loading ? "Committing..." : "Initialize OS"
                : "Proceed"}
              {currentStep < steps.length - 1 && <ArrowRight className="w-3 h-3 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
