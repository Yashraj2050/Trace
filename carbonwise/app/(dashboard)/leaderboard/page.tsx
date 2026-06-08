"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Medal,
  TrendingDown,
  Crown,
  Zap,
  Globe,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", avatar: null, initials: "SC", score: 94, carbonKg: 185, reduction: 58, country: "🇬🇧", trend: "stable", achievements: 12, streak: 45 },
  { rank: 2, name: "Marcus J.", avatar: null, initials: "MJ", score: 91, carbonKg: 198, reduction: 52, country: "🇺🇸", trend: "up", achievements: 10, streak: 31 },
  { rank: 3, name: "Priya S.", avatar: null, initials: "PS", score: 89, carbonKg: 212, reduction: 48, country: "🇮🇳", trend: "up", achievements: 9, streak: 28 },
  { rank: 4, name: "You", avatar: null, initials: "YO", score: 72, carbonKg: 265, reduction: 38, country: "🌍", trend: "up", achievements: 3, streak: 7, isUser: true },
  { rank: 5, name: "Alex Kim", avatar: null, initials: "AK", score: 68, carbonKg: 290, reduction: 32, country: "🇰🇷", trend: "down", achievements: 5, streak: 12 },
  { rank: 6, name: "Elena R.", avatar: null, initials: "ER", score: 65, carbonKg: 310, reduction: 28, country: "🇩🇪", trend: "stable", achievements: 4, streak: 8 },
  { rank: 7, name: "James T.", avatar: null, initials: "JT", score: 61, carbonKg: 335, reduction: 25, country: "🇦🇺", trend: "up", achievements: 3, streak: 5 },
  { rank: 8, name: "Yuki M.", avatar: null, initials: "YM", score: 58, carbonKg: 355, reduction: 22, country: "🇯🇵", trend: "down", achievements: 4, streak: 3 },
  { rank: 9, name: "Nina B.", avatar: null, initials: "NB", score: 55, carbonKg: 380, reduction: 18, country: "🇫🇷", trend: "stable", achievements: 2, streak: 2 },
  { rank: 10, name: "Carlos M.", avatar: null, initials: "CM", score: 52, carbonKg: 405, reduction: 15, country: "🇧🇷", trend: "up", achievements: 2, streak: 4 },
];

const stats = [
  { label: "Community Size", value: "12,847", icon: Users, color: "text-blue-400" },
  { label: "Total CO₂ Saved", value: "48.2t", icon: TrendingDown, color: "text-emerald-400" },
  { label: "Avg Score", value: "64", icon: Zap, color: "text-yellow-400" },
  { label: "Countries", value: "87", icon: Globe, color: "text-violet-400" },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />;
  if (trend === "down") return <ArrowDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

type Period = "weekly" | "monthly" | "alltime";

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("weekly");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Sustainability Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Compete with the global Trace community
        </p>
      </motion.div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark rounded-xl p-4 border border-white/5 text-center"
            >
              <Icon className={cn("w-5 h-5 mx-auto mb-1.5", stat.color)} />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Period Filter */}
      <div className="flex gap-2">
        {(["weekly", "monthly", "alltime"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 capitalize",
              period === p
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                : "glass-dark border border-white/5 text-muted-foreground hover:border-emerald-500/20"
            )}
          >
            {p === "alltime" ? "All Time" : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        {leaderboardData.slice(0, 3).map((user, i) => (
          <div
            key={user.rank}
            className={cn(
              "glass-dark rounded-2xl p-4 border text-center",
              i === 0 ? "border-yellow-500/30 bg-yellow-500/5" :
              i === 1 ? "border-slate-500/30 bg-slate-500/5" :
              "border-amber-600/30 bg-amber-600/5"
            )}
          >
            <div className="text-2xl mb-2">
              {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
            </div>
            <Avatar className="w-10 h-10 mx-auto mb-2">
              <AvatarFallback
                className={cn(
                  "text-xs font-bold",
                  i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                  i === 1 ? "bg-slate-500/20 text-slate-400" :
                  "bg-amber-600/20 text-amber-500"
                )}
              >
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.country}</p>
            <p className={cn(
              "text-lg font-bold mt-1",
              i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : "text-amber-500"
            )}>{user.score}</p>
            <p className="text-xs text-muted-foreground">score</p>
          </div>
        ))}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-dark rounded-2xl border border-white/5 overflow-hidden"
      >
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <span className="text-sm font-semibold">Full Rankings</span>
          <Badge className="text-[10px] bg-muted border-none text-muted-foreground">Top 100 shown</Badge>
        </div>

        <div className="divide-y divide-border/30">
          {leaderboardData.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={cn(
                "flex items-center gap-4 p-4 hover:bg-white/3 transition-colors",
                user.isUser && "bg-emerald-500/5 border-l-2 border-emerald-500"
              )}
            >
              {/* Rank */}
              <div className="w-8 flex justify-center shrink-0">
                <RankBadge rank={user.rank} />
              </div>

              {/* Avatar */}
              <Avatar className="w-9 h-9 shrink-0">
                <AvatarFallback className={cn(
                  "text-xs font-bold",
                  user.isUser ? "bg-emerald-500/20 text-emerald-400" : "bg-muted"
                )}>
                  {user.initials}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn("font-medium text-sm", user.isUser && "text-emerald-400")}>
                    {user.name}
                    {user.isUser && " (You)"}
                  </span>
                  <span className="text-sm">{user.country}</span>
                  <TrendIcon trend={user.trend} />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span>{user.carbonKg} kg CO₂</span>
                  <span>·</span>
                  <span className="text-emerald-400">-{user.reduction}%</span>
                  <span>·</span>
                  <span>🔥 {user.streak}d</span>
                </div>
              </div>

              {/* Score */}
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-emerald-400">{user.score}</p>
                <p className="text-xs text-muted-foreground">score</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
