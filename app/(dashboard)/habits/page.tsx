"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Plus,
  Check,
  Flame,
  Leaf,
  Car,
  Home,
  Utensils,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const defaultHabits = [
  { id: "1", title: "Took public transit today", category: "transport", carbonSaved: 3.2, completed: false, streak: 12, icon: "🚌" },
  { id: "2", title: "Ate a plant-based meal", category: "food", carbonSaved: 2.1, completed: true, streak: 7, icon: "🥗" },
  { id: "3", title: "Used reusable bag", category: "shopping", carbonSaved: 0.1, completed: true, streak: 21, icon: "🛍️" },
  { id: "4", title: "Turned off unused lights", category: "energy", carbonSaved: 0.3, completed: false, streak: 5, icon: "💡" },
  { id: "5", title: "Worked from home", category: "transport", carbonSaved: 4.8, completed: false, streak: 3, icon: "🏠" },
  { id: "6", title: "Skipped single-use plastic", category: "shopping", carbonSaved: 0.2, completed: true, streak: 14, icon: "♻️" },
  { id: "7", title: "Short shower (< 5 min)", category: "energy", carbonSaved: 0.5, completed: false, streak: 0, icon: "🚿" },
  { id: "8", title: "Bought local produce", category: "food", carbonSaved: 1.5, completed: false, streak: 2, icon: "🌽" },
];

type Habit = typeof defaultHabits[0];

const categoryColors: Record<string, string> = {
  transport: "text-blue-400",
  food: "text-orange-400",
  energy: "text-yellow-400",
  shopping: "text-violet-400",
};

const categoryBg: Record<string, string> = {
  transport: "bg-blue-500/10",
  food: "bg-orange-500/10",
  energy: "bg-yellow-500/10",
  shopping: "bg-violet-500/10",
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("transport");

  const completedCount = habits.filter((h) => h.completed).length;
  const totalSaved = habits.filter((h) => h.completed).reduce((s, h) => s + h.carbonSaved, 0);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completed: !h.completed,
              streak: !h.completed ? h.streak + 1 : Math.max(0, h.streak - 1),
            }
          : h
      )
    );
  };

  const addHabit = () => {
    if (!newTitle.trim()) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      carbonSaved: 1.0,
      completed: false,
      streak: 0,
      icon: "🌱",
    };
    setHabits((prev) => [...prev, newHabit]);
    setNewTitle("");
    setShowAdd(false);
    toast.success("Habit added! 🌱");
  };

  const removeHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-400" />
            Daily Habits
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {completedCount}/{habits.length} completed today · {totalSaved.toFixed(1)} kg CO₂ saved
          </p>
        </div>
        <Button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </Button>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-dark rounded-2xl p-5 border border-white/5"
      >
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Today&apos;s Progress</span>
          <span className="text-emerald-400 font-semibold">
            {Math.round((completedCount / habits.length) * 100)}%
          </span>
        </div>
        <Progress value={(completedCount / habits.length) * 100} className="h-3" />
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>{totalSaved.toFixed(1)} kg CO₂ saved today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Best streak: 21 days</span>
          </div>
        </div>
      </motion.div>

      {/* Add Habit Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-dark rounded-2xl p-5 border border-emerald-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">New Habit</h3>
              <button onClick={() => setShowAdd(false)}>
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="e.g. Cycled to work"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addHabit()}
                className="flex-1 bg-background/50 border-border/50 focus:border-emerald-500/50 rounded-xl h-10"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-background/50 border border-border/50 rounded-xl px-3 text-sm"
              >
                <option value="transport">Transport</option>
                <option value="food">Food</option>
                <option value="energy">Energy</option>
                <option value="shopping">Shopping</option>
              </select>
              <Button
                onClick={addHabit}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4"
              >
                Add
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {habits.map((habit, i) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className={cn(
              "glass-dark rounded-2xl p-5 border transition-all duration-300",
              habit.completed
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-white/5 hover:border-emerald-500/20"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                {/* Checkbox */}
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200",
                    habit.completed
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-border hover:border-emerald-500"
                  )}
                >
                  {habit.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{habit.icon}</span>
                    <span
                      className={cn(
                        "text-sm font-medium transition-all duration-200",
                        habit.completed && "line-through text-muted-foreground"
                      )}
                    >
                      {habit.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <Badge
                      className={cn(
                        "text-[10px] py-0 px-1.5 capitalize",
                        categoryBg[habit.category],
                        categoryColors[habit.category],
                        "border-transparent"
                      )}
                    >
                      {habit.category}
                    </Badge>
                    <span className="text-emerald-400">
                      -{habit.carbonSaved} kg CO₂
                    </span>
                    {habit.streak > 0 && (
                      <span className="text-orange-400 flex items-center gap-0.5">
                        <Flame className="w-3 h-3" />
                        {habit.streak}d
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeHabit(habit.id)}
                className="text-muted-foreground/40 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
