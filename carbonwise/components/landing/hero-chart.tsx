"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", footprint: 520, target: 450, industry: 800 },
  { month: "Feb", footprint: 490, target: 430, industry: 800 },
  { month: "Mar", footprint: 460, target: 410, industry: 790 },
  { month: "Apr", footprint: 420, target: 390, industry: 785 },
  { month: "May", footprint: 380, target: 370, industry: 780 },
  { month: "Jun", footprint: 340, target: 350, industry: 775 },
  { month: "Jul", footprint: 310, target: 330, industry: 770 },
  { month: "Aug", footprint: 280, target: 310, industry: 765 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-xl p-3 border border-emerald-500/20 text-sm">
        <p className="text-emerald-400 font-semibold mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="text-foreground font-medium">
              {entry.value} kg CO₂
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function HeroChart() {
  return (
    <div className="glass-dark rounded-2xl p-6 border border-emerald-500/15 glow-green">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Carbon Footprint Trend</p>
          <p className="text-2xl font-bold text-emerald-400">-46% reduced</p>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-emerald-500 rounded" />
            <span>You</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-cyan-500/60 rounded" />
            <span>Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-red-500/40 rounded" />
            <span>Industry avg</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="footprintGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="industryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="industry" name="Industry avg" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#industryGrad)" strokeOpacity={0.5} />
          <Area type="monotone" dataKey="target" name="Target" stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#targetGrad)" strokeOpacity={0.7} />
          <Area type="monotone" dataKey="footprint" name="Your footprint" stroke="#10b981" strokeWidth={2.5} fill="url(#footprintGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
