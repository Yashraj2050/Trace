"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Lock,
  Star,
  Zap,
  Crown,
  Flame,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const achievements = [
  { id: "1", slug: "first-steps", title: "First Steps", description: "Log your first carbon entry", icon: "🌱", rarity: "common", points: 10, unlocked: true, unlockedAt: "Dec 2024" },
  { id: "2", slug: "green-week", title: "Green Week", description: "Log carbon for 7 consecutive days", icon: "📅", rarity: "common", points: 25, unlocked: true, unlockedAt: "Dec 2024" },
  { id: "3", slug: "habit-hero", title: "Habit Hero", description: "Complete 10 sustainable habits", icon: "💪", rarity: "common", points: 30, unlocked: true, unlockedAt: "Jan 2025" },
  { id: "4", slug: "report-guru", title: "Report Guru", description: "Download 5 sustainability reports", icon: "📊", rarity: "common", points: 30, unlocked: false, progress: 2, total: 5 },
  { id: "5", slug: "scanner-pro", title: "Scanner Pro", description: "Scan 10 receipts or bills", icon: "📄", rarity: "rare", points: 40, unlocked: false, progress: 3, total: 10 },
  { id: "6", slug: "carbon-crusher", title: "Carbon Crusher", description: "Reduce monthly carbon by 10%", icon: "⚡", rarity: "rare", points: 50, unlocked: false, progress: 7, total: 10 },
  { id: "7", slug: "solar-champion", title: "Solar Champion", description: "Track solar energy usage", icon: "☀️", rarity: "rare", points: 40, unlocked: false, progress: 2, total: 5 },
  { id: "8", slug: "plant-power", title: "Plant Power", description: "Log 30 plant-based meals", icon: "🥗", rarity: "rare", points: 35, unlocked: false, progress: 18, total: 30 },
  { id: "9", slug: "eco-commuter", title: "Eco Commuter", description: "Use public transport 20 times", icon: "🚌", rarity: "rare", points: 45, unlocked: false, progress: 12, total: 20 },
  { id: "10", slug: "century-club", title: "Century Club", description: "Save 100kg CO2 total", icon: "💯", rarity: "epic", points: 100, unlocked: false, progress: 37, total: 100 },
  { id: "11", slug: "community-star", title: "Community Star", description: "Reach top 10 on leaderboard", icon: "⭐", rarity: "epic", points: 75, unlocked: false, progress: 0, total: 1 },
  { id: "12", slug: "streak-master", title: "Streak Master", description: "Maintain a 30-day streak", icon: "🔥", rarity: "epic", points: 150, unlocked: false, progress: 7, total: 30 },
  { id: "13", slug: "goal-setter", title: "Goal Setter", description: "Set and achieve a carbon goal", icon: "🎯", rarity: "rare", points: 60, unlocked: false, progress: 0, total: 1 },
  { id: "14", slug: "tree-friend", title: "Tree Friend", description: "Equivalent of planting 10 trees", icon: "🌳", rarity: "epic", points: 80, unlocked: false, progress: 3, total: 10 },
  { id: "15", slug: "net-zero-hero", title: "Net Zero Hero", description: "Achieve net zero for a month", icon: "🌍", rarity: "legendary", points: 200, unlocked: false, progress: 0, total: 1 },
];

const rarityConfig = {
  common: { label: "Common", color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20", glow: "" },
  rare: { label: "Rare", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", glow: "" },
  epic: { label: "Epic", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", glow: "shadow-violet-500/20 shadow-lg" },
  legendary: { label: "Legendary", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", glow: "shadow-yellow-500/30 shadow-xl" },
};

type Rarity = keyof typeof rarityConfig;
type Filter = "all" | "unlocked" | "locked";

export default function AchievementsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedRarity, setSelectedRarity] = useState<Rarity | "all">("all");

  const totalPoints = achievements.filter(a => a.unlocked).reduce((s, a) => s + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const filtered = achievements.filter(a => {
    if (filter === "unlocked" && !a.unlocked) return false;
    if (filter === "locked" && a.unlocked) return false;
    if (selectedRarity !== "all" && a.rarity !== selectedRarity) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Achievements
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unlockedCount}/{achievements.length} unlocked · {totalPoints} points earned
          </p>
        </div>

        {/* Stats mini row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 glass-dark rounded-xl border border-yellow-500/20 text-sm">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-yellow-400">{totalPoints}</span>
            <span className="text-muted-foreground text-xs">pts</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 glass-dark rounded-xl border border-emerald-500/20 text-sm">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="font-bold">7</span>
            <span className="text-muted-foreground text-xs">streak</span>
          </div>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-dark rounded-2xl p-5 border border-white/5"
      >
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Overall Progress</span>
          <span className="text-muted-foreground">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
        </div>
        <Progress value={(unlockedCount / achievements.length) * 100} className="h-2" />
        <div className="flex gap-4 mt-3">
          {(["common", "rare", "epic", "legendary"] as const).map(r => {
            const count = achievements.filter(a => a.rarity === r && a.unlocked).length;
            const total = achievements.filter(a => a.rarity === r).length;
            return (
              <div key={r} className="text-xs">
                <span className={rarityConfig[r].color}>{rarityConfig[r].label}:</span>
                <span className="text-muted-foreground ml-1">{count}/{total}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "unlocked", "locked"] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 capitalize",
              filter === f
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                : "glass-dark border border-white/5 text-muted-foreground hover:border-emerald-500/20"
            )}
          >
            {f}
          </button>
        ))}
        <div className="w-px bg-border" />
        {(["all", "common", "rare", "epic", "legendary"] as (Rarity | "all")[]).map(r => (
          <button
            key={r}
            onClick={() => setSelectedRarity(r)}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 capitalize",
              selectedRarity === r
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                : "glass-dark border border-white/5 text-muted-foreground hover:border-emerald-500/20"
            )}
          >
            {r === "all" ? "All Rarities" : r}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((achievement, i) => {
          const rarity = achievement.rarity as Rarity;
          const config = rarityConfig[rarity];
          const progress = achievement.progress !== undefined && achievement.total
            ? (achievement.progress / achievement.total) * 100
            : 0;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={achievement.unlocked ? { y: -3, scale: 1.02 } : {}}
              className={cn(
                "relative rounded-2xl p-5 border transition-all duration-300",
                achievement.unlocked
                  ? cn("glass-dark", config.bg, config.glow)
                  : "glass-dark border-white/5 opacity-75"
              )}
            >
              {/* Rarity badge */}
              <div className="absolute top-3 right-3">
                <Badge
                  className={cn(
                    "text-[10px] py-0 px-1.5 border",
                    config.bg,
                    config.color
                  )}
                >
                  {config.label}
                </Badge>
              </div>

              {/* Icon */}
              <div className={cn(
                "text-3xl mb-3 transition-all duration-300",
                !achievement.unlocked && "grayscale opacity-40"
              )}>
                {achievement.icon}
              </div>

              {/* Lock overlay */}
              {!achievement.unlocked && (
                <div className="absolute top-3 left-3">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}

              <h3 className={cn(
                "font-semibold text-sm mb-1",
                !achievement.unlocked && "text-muted-foreground"
              )}>
                {achievement.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {achievement.description}
              </p>

              {/* Progress or unlocked */}
              {achievement.unlocked ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Unlocked {achievement.unlockedAt}
                </div>
              ) : achievement.progress !== undefined && achievement.total ? (
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.total}</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Not started</p>
              )}

              <div className="flex items-center gap-1.5 mt-3 text-xs">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="font-medium text-yellow-400">{achievement.points} pts</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
