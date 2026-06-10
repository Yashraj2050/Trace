"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="relative w-full py-32 px-6 md:px-12 bg-[#0a0a0a] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              The impact of <br /> precision data.
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:w-1/3 text-white/60 text-lg font-light leading-relaxed"
          >
            <p>
              Vague goals yield vague results. Trace captures high-fidelity telemetry from your daily operations to establish an immutable baseline of your environmental footprint.
            </p>
          </motion.div>
        </div>

        {/* Editorial Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
          
          <div className="bg-[#0a0a0a] p-10 flex flex-col justify-between aspect-square md:aspect-auto">
            <motion.div style={{ y: y1 }} className="flex flex-col h-full justify-between">
              <span className="text-sm font-medium uppercase tracking-widest text-emerald-400 mb-8 block">Average Reduction</span>
              <div>
                <div className="text-7xl md:text-8xl font-bold tracking-tighter mb-2">24<span className="text-4xl">%</span></div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Active Trace users decrease their monthly carbon emissions by nearly a quarter within the first 90 days of telemetry integration.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="bg-[#0a0a0a] p-10 flex flex-col justify-between aspect-square md:aspect-auto">
            <motion.div style={{ y: y2 }} className="flex flex-col h-full justify-between">
              <span className="text-sm font-medium uppercase tracking-widest text-emerald-400 mb-8 block">Data Points Analyzed</span>
              <div>
                <div className="text-7xl md:text-8xl font-bold tracking-tighter mb-2">1.2<span className="text-4xl">M+</span></div>
                <p className="text-white/50 text-sm leading-relaxed">
                  From energy bills to daily commutes, our intelligence engine processes millions of behavioral signals to identify optimization vectors.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="bg-[#0a0a0a] p-10 flex flex-col justify-between aspect-square md:aspect-auto">
            <motion.div style={{ y: y1 }} className="flex flex-col h-full justify-between">
              <span className="text-sm font-medium uppercase tracking-widest text-emerald-400 mb-8 block">Prediction Accuracy</span>
              <div>
                <div className="text-7xl md:text-8xl font-bold tracking-tighter mb-2">94<span className="text-4xl">%</span></div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Our machine learning forecasting model accurately projects your end-of-year footprint based on current consumption velocity.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
