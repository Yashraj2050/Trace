"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf, Cpu, Activity, TrendingDown } from "lucide-react";
import Link from "next/link";

export default function MissionControl() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col pointer-events-auto">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-medium tracking-tight mb-1">Mission Control</h1>
          <p className="text-sm text-white/50 font-mono uppercase tracking-widest">Global Node Status</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest bg-emerald-400/10 px-3 py-1.5 border border-emerald-400/20">
          <ArrowUpRight className="w-3 h-3 rotate-180" />
          <span>12.4% Reduction</span>
        </div>
      </div>

      {/* Top Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 p-8 border border-white/10 bg-[#111] flex flex-col justify-between"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-12">Atmospheric Impact</div>
          <div className="flex items-end gap-3">
            <span className="text-7xl font-bold tracking-tighter leading-none">265</span>
            <span className="text-sm font-mono text-emerald-400 uppercase tracking-widest pb-1">kg_CO2</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 border border-white/10 bg-[#111] flex flex-col justify-between"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-12 flex items-center gap-2">
            <Activity className="w-3 h-3" /> Sync_Rate
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold tracking-tighter leading-none">72</span>
            <span className="text-sm font-mono text-white/40 uppercase tracking-widest pb-1">OS</span>
          </div>
        </motion.div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 border border-white/10 bg-[#111]"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
            <Leaf className="w-3 h-3" /> Restored
          </div>
          <p className="text-3xl font-medium tracking-tight">37<span className="text-xs font-mono text-white/30 ml-2">KG</span></p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 border border-white/10 bg-[#111]"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
            <TrendingDown className="w-3 h-3" /> Trend
          </div>
          <p className="text-3xl font-medium tracking-tight">-1.2<span className="text-xs font-mono text-white/30 ml-2">KG/DAY</span></p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group border border-emerald-400/20 bg-emerald-400/5 hover:bg-emerald-400/10 transition-colors p-6 flex flex-col justify-center relative overflow-hidden"
        >
          <Link href="/upload" className="absolute inset-0 z-10" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-emerald-400/30 flex items-center justify-center bg-emerald-400/10">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-mono font-medium tracking-widest uppercase text-white/90">Initialize_Scan</p>
              <p className="text-[10px] font-mono text-white/50 mt-1 uppercase">Drop data to array</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Minimalist Chart Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full h-64 border border-white/10 bg-[#111] p-6 flex flex-col relative"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">Emissions Trend Array</div>
        <div className="flex-1 flex items-end gap-2 px-1 pb-2 border-b border-white/10">
          {[40, 65, 45, 80, 55, 90, 45, 30, 60, 35, 20, 40].map((h, i) => (
            <div 
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 bg-white/10 hover:bg-emerald-400/80 transition-colors rounded-t-sm"
            />
          ))}
        </div>
      </motion.div>

    </div>
  );
}
