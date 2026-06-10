"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Activity, Terminal } from "lucide-react";
import Link from "next/link";

export default function MissionControl() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col pointer-events-auto selection:bg-white/20">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h1 className="text-xl font-medium tracking-tight">Mission Control</h1>
          </div>
          <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest">Sys_Readout // Primary Node Metrics</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/5 px-2 py-1 border border-emerald-400/20">
            <ArrowDownRight className="w-3 h-3" />
            <span>30D Trend: -12.4%</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <Activity className="w-3 h-3" />
            <span>Realtime</span>
          </div>
        </div>
      </div>

      {/* Structured Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
        
        {/* Primary Impact Metric */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-1 md:col-span-4 lg:col-span-8 p-8 bg-[#0a0a0a] flex flex-col justify-between min-h-[280px]"
        >
          <div className="flex justify-between items-start mb-12">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Atmospheric Impact [YTD]</div>
            <div className="text-[10px] font-mono text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded-sm bg-emerald-400/5">Nominal</div>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-7xl md:text-9xl font-medium tracking-tighter leading-none">265</span>
            <div className="flex flex-col text-sm font-mono text-white/40 uppercase tracking-widest pb-2">
              <span>kg_CO2</span>
              <span className="text-emerald-400 text-[10px] flex items-center gap-1 mt-1">
                <ArrowDownRight className="w-3 h-3" /> 12% vs LY
              </span>
            </div>
          </div>
        </motion.div>

        {/* Sync Rate / Quick Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-4 lg:col-span-4 bg-[#0a0a0a] flex flex-col"
        >
          <div className="p-6 border-b border-white/10 flex-1 flex flex-col justify-between">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">OS Sync Rate</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-medium tracking-tighter leading-none">72</span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">/ 100</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">Restored Mass</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-medium tracking-tighter leading-none text-emerald-400">37</span>
              <span className="text-[10px] font-mono text-emerald-400/50 uppercase tracking-widest">KG</span>
            </div>
          </div>
        </motion.div>

        {/* Dense Telemetry Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-4 lg:col-span-3 p-6 bg-[#0a0a0a]"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">Last Upload</div>
          <p className="text-lg font-medium tracking-tight">Q2 Transit Log</p>
          <p className="text-[10px] font-mono text-white/50 mt-2">-4.2 kg impact</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-4 lg:col-span-3 p-6 bg-[#0a0a0a]"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">Community Rank</div>
          <p className="text-lg font-medium tracking-tight">Top 15%</p>
          <p className="text-[10px] font-mono text-white/50 mt-2">Node_Sector: 7A</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 md:col-span-4 lg:col-span-6 p-0 bg-[#0a0a0a] group relative overflow-hidden"
        >
          <Link href="/upload" className="absolute inset-0 z-10" />
          <div className="w-full h-full p-6 flex flex-col justify-between border border-transparent group-hover:border-emerald-400/30 transition-colors bg-gradient-to-br from-transparent to-emerald-400/5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Action Required
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-mono font-medium tracking-widest uppercase text-white/90">Initialize_Scanner</p>
                <p className="text-[10px] font-mono text-white/50 mt-1 uppercase">Process new telemetry data</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Minimalist Data Sparkline Mockup */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="col-span-1 md:col-span-4 lg:col-span-12 p-6 bg-[#0a0a0a] h-48 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Emissions Array [12M]</div>
            <div className="text-[10px] font-mono text-white/30">Target: 45kg/mo</div>
          </div>
          <div className="flex-1 flex items-end gap-[1px]">
            {[40, 65, 45, 80, 55, 90, 45, 30, 60, 35, 20, 40].map((h, i) => (
              <div 
                key={i}
                className="flex-1 group relative h-full flex items-end"
              >
                <div 
                  style={{ height: `${h}%` }}
                  className="w-full bg-white/10 group-hover:bg-emerald-400/80 transition-colors"
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
