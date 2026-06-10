"use client";

import { motion } from "framer-motion";
import { Activity, Leaf, Cpu, ArrowUpRight } from "lucide-react";

export function ProductShowcase() {
  return (
    <section id="product-showcase" className="w-full py-32 px-6 md:px-12 bg-[#0a0a0a] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Command center for <br /> environmental impact.
          </h2>
          <p className="text-white/60 text-lg font-light max-w-2xl">
            A brutally efficient interface designed to give you absolute clarity over your carbon footprint. No fluff, just telemetry and actionable intelligence.
          </p>
        </div>

        {/* Dashboard Replica Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-xl bg-[#111111] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Mac window controls */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#151515]">
            <div className="w-3 h-3 rounded-full bg-[#333]"></div>
            <div className="w-3 h-3 rounded-full bg-[#333]"></div>
            <div className="w-3 h-3 rounded-full bg-[#333]"></div>
          </div>

          {/* Dashboard Layout Replica */}
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar Mock */}
            <div className="hidden md:flex flex-col w-64 border-r border-white/10 p-6 gap-6 bg-[#0d0d0d]">
              <div className="text-xl font-bold tracking-tighter mb-8">TRACE</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/10 text-white text-sm font-medium">
                  <Activity className="w-4 h-4" /> Overview
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-md text-white/50 text-sm hover:text-white transition-colors">
                  <Leaf className="w-4 h-4" /> Logs
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-md text-white/50 text-sm hover:text-white transition-colors">
                  <Cpu className="w-4 h-4" /> Intelligence
                </div>
              </div>
            </div>

            {/* Main Content Mock */}
            <div className="flex-1 p-6 md:p-10 bg-[#0a0a0a]">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-3xl font-medium mb-1">Impact Overview</h3>
                  <p className="text-sm text-white/50">Last 30 days telemetry</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-emerald-400 text-sm bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                  <ArrowUpRight className="w-4 h-4" /> 12.4% reduction
                </div>
              </div>

              {/* Stats Grid Mock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Total Footprint", val: "420 kg", sub: "CO2 equivalent" },
                  { label: "Active Streak", val: "14 days", sub: "Consistent logging" },
                  { label: "AI Confidence", val: "94%", sub: "Prediction model" }
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-lg border border-white/10 bg-[#111]">
                    <div className="text-white/50 text-xs uppercase tracking-widest mb-3">{stat.label}</div>
                    <div className="text-3xl font-medium mb-1">{stat.val}</div>
                    <div className="text-xs text-white/40">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Chart Area Mock */}
              <div className="w-full h-64 rounded-lg border border-white/10 bg-[#111] p-5 flex flex-col relative overflow-hidden">
                <div className="text-white/50 text-xs uppercase tracking-widest mb-6">Emissions Trend</div>
                <div className="flex-1 flex items-end gap-2 sm:gap-4 px-2">
                  {[40, 65, 45, 80, 55, 90, 45, 30, 60, 35, 20, 40].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                      className="flex-1 bg-white/20 hover:bg-emerald-400/80 transition-colors rounded-t-sm"
                    />
                  ))}
                </div>
                {/* Overlay gradient for fade effect */}
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
