"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Leaf, Cpu } from "lucide-react";
import { useRef } from "react";

const stats = [
  { label: "Total Footprint", val: "420 kg", sub: "CO2 equivalent" },
  { label: "Active Streak", val: "14 days", sub: "Consistent logging" },
  { label: "AI Confidence", val: "94%", sub: "Prediction model" },
] as const;

const chartBars = [40, 65, 45, 80, 55, 90, 45, 30, 60, 35, 20, 40] as const;

export function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle 3D tilt and scale effect for the dashboard
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      id="product-showcase"
      className="relative w-full py-40 px-6 md:px-12 bg-[#020202] text-white overflow-hidden perspective-[2000px]"
      aria-label="Product showcase — Mission Control dashboard"
    >
      {/* Deep atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1a1a_0%,#020202_70%)] opacity-60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-32 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 leading-[1.1]"
          >
            Command center for <br /> <span className="text-white/50 italic font-serif">environmental impact.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-xl font-light max-w-2xl leading-relaxed"
          >
            A brutally efficient interface designed to give you absolute clarity
            over your carbon footprint. No fluff, just telemetry and actionable
            intelligence.
          </motion.p>
        </header>

        {/* Dashboard Replica Container with 3D Transforms */}
        <motion.div
          style={{ rotateX, scale, opacity }}
          className="relative w-full rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          role="img"
          aria-label="Screenshot of the Trace Mission Control dashboard"
        >
          {/* Subtle top glare */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />

          {/* Mac window controls */}
          <div
            className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-[#0d0d0d]/50"
            aria-hidden="true"
          >
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>

          {/* Dashboard Layout Replica */}
          <div className="flex flex-col md:flex-row h-full relative z-10">
            {/* Sidebar Mock */}
            <div
              className="hidden md:flex flex-col w-72 border-r border-white/5 p-8 gap-8 bg-[#0a0a0a]/50"
              aria-hidden="true"
            >
              <div className="text-sm font-bold tracking-[0.3em] text-white/30 mb-8">
                TRACE OS
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 text-white text-sm font-medium border border-white/5">
                  <Activity className="w-4 h-4 text-white/50" /> Overview
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg text-white/40 text-sm hover:text-white transition-colors">
                  <Leaf className="w-4 h-4 text-white/30" /> Logs
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg text-white/40 text-sm hover:text-white transition-colors">
                  <Cpu className="w-4 h-4 text-white/30" /> Intelligence
                </div>
              </div>
            </div>

            {/* Main Content Mock */}
            <div className="flex-1 p-8 md:p-12 bg-transparent" aria-hidden="true">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h3 className="text-4xl font-medium tracking-tight mb-2">Impact Overview</h3>
                  <p className="text-sm text-white/40 font-light">Last 30 days telemetry</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/60 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/50" /> 
                  12.4% reduction
                </div>
              </div>

              {/* Stats Grid Mock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-4">
                      {stat.label}
                    </div>
                    <div className="text-4xl font-medium tracking-tighter mb-2">{stat.val}</div>
                    <div className="text-sm text-white/40 font-light">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Chart Area Mock */}
              <div className="w-full h-72 rounded-xl border border-white/5 bg-white/[0.01] p-8 flex flex-col relative overflow-hidden">
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-8">
                  Emissions Trend
                </div>
                <div className="flex-1 flex items-end gap-3 sm:gap-6 px-4">
                  {chartBars.map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-white/10 hover:bg-white/30 transition-colors rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
