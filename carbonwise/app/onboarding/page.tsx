"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Leaf, ArrowRight, ArrowLeft, Check, Car, Home, Utensils, ShoppingBag, Plane } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const steps = [
  { id: "transport", title: "How do you get around?", icon: Car, color: "from-blue-500 to-cyan-500" },
  { id: "energy", title: "Your home energy use", icon: Home, color: "from-emerald-500 to-teal-500" },
  { id: "food", title: "Your diet & food choices", icon: Utensils, color: "from-orange-500 to-amber-500" },
  { id: "shopping", title: "Shopping & consumption", icon: ShoppingBag, color: "from-violet-500 to-purple-500" },
  { id: "travel", title: "Travel & flights", icon: Plane, color: "from-pink-500 to-rose-500" },
];

type OnboardingData = {
  transport: string;
  energySource: string;
  diet: string;
  shoppingHabits: string;
  flightsPerYear: string;
};

const stepOptions: Record<string, { label: string; value: string; carbonKg: number }[]> = {
  transport: [
    { label: "🚗 Private car daily", value: "car_daily", carbonKg: 2400 },
    { label: "🚌 Public transit mostly", value: "public_transit", carbonKg: 800 },
    { label: "🚲 Bike / walk", value: "bike_walk", carbonKg: 50 },
    { label: "🚗 Car occasionally", value: "car_occasional", carbonKg: 1200 },
    { label: "⚡ Electric vehicle", value: "ev", carbonKg: 600 },
  ],
  energySource: [
    { label: "🔥 Natural gas", value: "gas", carbonKg: 1800 },
    { label: "☀️ Solar panels", value: "solar", carbonKg: 150 },
    { label: "⚡ Grid electricity", value: "grid", carbonKg: 1200 },
    { label: "💨 Wind / renewables", value: "renewables", carbonKg: 200 },
    { label: "🏠 Mixed sources", value: "mixed", carbonKg: 900 },
  ],
  diet: [
    { label: "🥩 Meat at every meal", value: "meat_heavy", carbonKg: 3300 },
    { label: "🍗 Meat a few times/week", value: "meat_moderate", carbonKg: 1900 },
    { label: "🐟 Pescatarian", value: "pescatarian", carbonKg: 1200 },
    { label: "🥗 Vegetarian", value: "vegetarian", carbonKg: 800 },
    { label: "🌱 Vegan", value: "vegan", carbonKg: 500 },
  ],
  shoppingHabits: [
    { label: "🛍️ Shop frequently (luxury)", value: "luxury", carbonKg: 2000 },
    { label: "👔 Buy new clothes often", value: "fashion", carbonKg: 1200 },
    { label: "♻️ Mostly secondhand", value: "secondhand", carbonKg: 400 },
    { label: "🌿 Minimal, eco-conscious", value: "minimal", carbonKg: 300 },
    { label: "📦 Average consumer", value: "average", carbonKg: 800 },
  ],
  flightsPerYear: [
    { label: "✈️ 0 flights", value: "none", carbonKg: 0 },
    { label: "✈️ 1-2 short flights", value: "few_short", carbonKg: 600 },
    { label: "✈️ 1-2 long-haul flights", value: "few_long", carbonKg: 2000 },
    { label: "✈️ 3-5 flights", value: "several", carbonKg: 3000 },
    { label: "✈️ 6+ flights (frequent flyer)", value: "frequent", carbonKg: 5000 },
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

      // Calculate total carbon footprint
      const totalCarbon = stepKeys.reduce((sum, key) => {
        const val = selections[key as keyof OnboardingData];
        const opts = stepOptions[key];
        const opt = opts.find((o) => o.value === val);
        return sum + (opt?.carbonKg || 0);
      }, 0);

      // Update profile
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

      // Store carbon entries for each category
      const entries = [
        { category: "transport" as const, carbon_kg: stepOptions.transport.find((o) => o.value === selections.transport)?.carbonKg || 0 },
        { category: "energy" as const, carbon_kg: stepOptions.energySource.find((o) => o.value === selections.energySource)?.carbonKg || 0 },
        { category: "food" as const, carbon_kg: stepOptions.diet.find((o) => o.value === selections.diet)?.carbonKg || 0 },
        { category: "shopping" as const, carbon_kg: stepOptions.shoppingHabits.find((o) => o.value === selections.shoppingHabits)?.carbonKg || 0 },
        { category: "travel" as const, carbon_kg: stepOptions.flightsPerYear.find((o) => o.value === selections.flightsPerYear)?.carbonKg || 0 },
      ].filter((e) => e.carbon_kg > 0);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const insertData: any = entries.map((e) => ({
        user_id: user.id,
        category: e.category,
        carbon_kg: e.carbon_kg / 365, // daily average
        date: new Date().toISOString().split("T")[0],
        source: "calculator" as const,
        description: "Initial onboarding baseline",
      }));

      await supabase.from("carbon_logs").insert(insertData);

      toast.success("Profile set up! Welcome to Trace 🌿");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="absolute inset-0 bg-mesh grid-pattern" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/6 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="relative w-32 h-12">
              <Image src="/logo-light.png" alt="Trace Logo" fill className="object-contain block dark:hidden" priority />
              <Image src="/logo-dark.png" alt="Trace Logo" fill className="object-contain hidden dark:block" priority />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">Set up your profile</h1>
          <p className="text-sm text-muted-foreground">
            Help us understand your lifestyle to give you personalized insights
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</span>
          </div>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className="h-2 bg-muted"
          />
        </div>

        {/* Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="glass-dark rounded-3xl p-8 border border-emerald-500/15 shadow-2xl"
          >
            {/* Step Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-0.5`}>
                <div className="w-full h-full bg-background/80 rounded-[10px] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold">{step.title}</h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm font-medium",
                    currentValue === option.value
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                      : "border-border/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {currentValue === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="flex-1 rounded-xl border-border/50 h-11"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed || loading}
                className={cn(
                  "flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-11 rounded-xl glow-green-sm transition-all duration-300",
                  !canProceed && "opacity-50 cursor-not-allowed"
                )}
              >
                {currentStep === steps.length - 1
                  ? loading ? "Saving..." : "Complete Setup"
                  : "Next Step"}
                {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentStep
                  ? "w-8 bg-emerald-500"
                  : i < currentStep
                  ? "w-4 bg-emerald-500/50"
                  : "w-4 bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
