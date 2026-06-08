"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Home, Utensils, ShoppingBag, ArrowRight, ArrowLeft, Check, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "transport",
    label: "Transport",
    icon: Car,
    fields: [
      { id: "car_km", label: "Car distance (km)", factor: 0.21, placeholder: "0" },
      { id: "public_transit_km", label: "Public transit (km)", factor: 0.089, placeholder: "0" },
      { id: "flights_km", label: "Flight distance (km)", factor: 0.255, placeholder: "0" },
    ],
  },
  {
    id: "energy",
    label: "Energy",
    icon: Home,
    fields: [
      { id: "electricity_kwh", label: "Electricity (kWh)", factor: 0.233, placeholder: "0" },
      { id: "gas_cubic_m", label: "Natural gas (m³)", factor: 2.04, placeholder: "0" },
    ],
  },
  {
    id: "food",
    label: "Food",
    icon: Utensils,
    fields: [
      { id: "meat_meals", label: "Meat meals", factor: 3.3, placeholder: "0" },
      { id: "dairy_servings", label: "Dairy servings", factor: 0.5, placeholder: "0" },
      { id: "plant_meals", label: "Plant-based meals", factor: 0.8, placeholder: "0" },
    ],
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
    fields: [
      { id: "clothing_items", label: "New clothing", factor: 10.0, placeholder: "0" },
      { id: "electronics_items", label: "Electronics", factor: 70.0, placeholder: "0" },
      { id: "online_orders", label: "Deliveries", factor: 1.5, placeholder: "0" },
    ],
  },
];

type Values = Record<string, Record<string, string>>;

export default function CalculatorPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (catId: string, fieldId: string, val: string) => {
    setValues((prev) => ({
      ...prev,
      [catId]: { ...(prev[catId] || {}), [fieldId]: val },
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    categories.forEach((cat) => {
      const catValues = values[cat.id] || {};
      cat.fields.forEach((field) => {
        const v = parseFloat(catValues[field.id] || "0") || 0;
        total += v * field.factor;
      });
    });
    return total;
  };

  const saveEntry = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Please sign in"); return; }

      const breakdown = categories.map((cat) => {
        const catValues = values[cat.id] || {};
        const carbon = cat.fields.reduce((sum, field) => {
          const v = parseFloat(catValues[field.id] || "0") || 0;
          return sum + v * field.factor;
        }, 0);
        return { category: cat.id, carbon: parseFloat(carbon.toFixed(2)) };
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entries: any[] = breakdown
        .filter((b) => b.carbon > 0)
        .map((b) => ({
          user_id: user.id,
          category: b.category,
          carbon_kg: b.carbon,
          date: new Date().toISOString().split("T")[0],
          source: "calculator" as const,
          description: `Logged impact`,
        }));

      if (entries.length === 0) {
        toast("No impact recorded.");
        return;
      }

      const { error } = await supabase.from("carbon_logs").insert(entries as any);
      if (error) throw error;

      toast.success("Impact integrated into Earth model.");
      setValues({});
      setActiveCategory(0);
    } catch {
      toast.error("Failed to sync data");
    } finally {
      setSaving(false);
    }
  };

  const cat = categories[activeCategory];
  const Icon = cat.icon;
  const currentTotal = calculateTotal();

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-black border border-white/10 p-8 pointer-events-auto"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-white/50" />
            <h1 className="text-xs font-mono tracking-widest text-white/90 uppercase">Data Entry</h1>
          </div>
          <div className="text-right flex items-baseline gap-1">
            <span className="text-3xl font-light tracking-tighter">{currentTotal.toFixed(1)}</span>
            <span className="text-xs font-mono text-white/50 uppercase">kg</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-1 mb-12">
          {categories.map((c, i) => (
            <div 
              key={c.id} 
              className={cn(
                "h-[2px] flex-1 transition-colors duration-500",
                i <= activeCategory ? "bg-white" : "bg-white/10"
              )}
            />
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-8 text-white/80">
              <Icon className="w-4 h-4 text-white/50" />
              <h2 className="text-[10px] font-mono tracking-widest uppercase">{cat.label}</h2>
            </div>

            <div className="space-y-8">
              {cat.fields.map((field) => (
                <div key={field.id} className="relative group">
                  <Input
                    id={field.id}
                    type="number"
                    min="0"
                    placeholder={field.placeholder}
                    value={values[cat.id]?.[field.id] || ""}
                    onChange={(e) => handleChange(cat.id, field.id, e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 text-2xl font-light text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-white transition-colors"
                  />
                  <label 
                    htmlFor={field.id} 
                    className="absolute -top-5 left-0 text-[10px] font-mono text-white/40 tracking-wider transition-colors group-focus-within:text-white/80"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between mt-16 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={() => setActiveCategory((p) => Math.max(0, p - 1))}
            disabled={activeCategory === 0}
            className="text-xs font-mono tracking-widest uppercase text-white/50 hover:text-white hover:bg-transparent px-0 rounded-none disabled:opacity-30"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            Prev
          </Button>
          
          {activeCategory < categories.length - 1 ? (
            <Button
              onClick={() => setActiveCategory((p) => p + 1)}
              className="bg-white text-black hover:bg-neutral-200 rounded-none px-6 text-xs font-mono tracking-widest uppercase"
            >
              Next
              <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={saveEntry}
              disabled={saving}
              className="bg-white text-black hover:bg-neutral-200 rounded-none px-6 text-xs font-mono tracking-widest uppercase"
            >
              {saving ? "Syncing..." : (
                <>
                  <Check className="w-3 h-3 mr-2" />
                  Commit
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
