"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf, Cpu, Globe2, Activity } from "lucide-react";

export default function MissionControl() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-end pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-black/80 backdrop-blur-2xl border-l border-t border-white/10 p-8 pointer-events-auto shadow-2xl relative overflow-hidden"
      >
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/50" />
        
        <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-4">
          <Globe2 className="w-5 h-5 text-emerald-400" />
          <h1 className="text-sm font-mono tracking-widest uppercase text-white/90">Global Node Status</h1>
        </div>

        {/* Primary Stat */}
        <div className="mb-12 relative z-10">
          <p className="text-xs text-white/40 mb-2 font-mono tracking-[0.2em] uppercase">Atmospheric Impact</p>
          <div className="flex items-end gap-2">
            <span className="text-7xl font-bold tracking-tighter text-white">265</span>
            <span className="text-sm font-mono text-emerald-400 mb-2 uppercase tracking-widest">kg_CO2</span>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <ArrowUpRight className="w-3 h-3 rotate-180" />
            <span>12.4% Reduction</span>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 gap-px bg-white/10 mb-12 border border-white/10">
          <div className="bg-black p-6">
            <div className="flex items-center gap-2 mb-3 text-white/40">
              <Activity className="w-3 h-3" />
              <span className="text-[10px] font-mono tracking-widest uppercase">Sync_Rate</span>
            </div>
            <p className="text-3xl font-medium tracking-tight">72<span className="text-xs font-mono text-white/30 ml-2">OS</span></p>
          </div>
          
          <div className="bg-black p-6">
            <div className="flex items-center gap-2 mb-3 text-white/40">
              <Leaf className="w-3 h-3" />
              <span className="text-[10px] font-mono tracking-widest uppercase">Restored</span>
            </div>
            <p className="text-3xl font-medium tracking-tight">37<span className="text-xs font-mono text-white/30 ml-2">KG</span></p>
          </div>
        </div>

        {/* AI Action Box - Industrial Style */}
        <div className="group cursor-pointer border border-white/10 bg-black hover:bg-white/5 transition-colors p-5 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-matrix opacity-20" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-8 h-8 border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 group-hover:bg-emerald-500/20 transition-colors">
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-mono font-medium tracking-widest uppercase text-white/90">Initialize_Scan</p>
              <p className="text-[10px] font-mono text-white/40 mt-1 uppercase">Drop data to array</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 transition-colors relative z-10" />
        </div>

      </motion.div>
    </div>
  );
}
