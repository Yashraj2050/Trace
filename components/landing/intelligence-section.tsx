"use client";

import { motion } from "framer-motion";

export function IntelligenceSection() {
  return (
    <section className="w-full py-32 px-6 md:px-12 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Typography heavy */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black/40 mb-6">Intelligence Engine</h2>
              <h3 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 leading-[1.1]">
                Predictive <br /> environmental <br /> modeling.
              </h3>
              
              <div className="space-y-6 text-lg text-black/70 font-light leading-relaxed">
                <p>
                  Trace does not just aggregate your past actions. It builds a forward-looking behavioral model based on your specific telemetry.
                </p>
                <p>
                  By analyzing the delta between your current trajectory and optimal environmental benchmarks, the intelligence engine generates micro-adjustments. These precise, low-friction changes compound into massive systemic impact over an annual cycle.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual editorial breakdown */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/10 border border-black/10">
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white p-8 aspect-square flex flex-col"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-black/30 mb-auto">Model Component 01</div>
                <h4 className="text-2xl font-medium mb-3">Behavioral Graph</h4>
                <p className="text-black/60 text-sm leading-relaxed">
                  Maps your daily habits into a connected node structure to identify cascading inefficiencies in your routine.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white p-8 aspect-square flex flex-col"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-black/30 mb-auto">Model Component 02</div>
                <h4 className="text-2xl font-medium mb-3">Anomaly Detection</h4>
                <p className="text-black/60 text-sm leading-relaxed">
                  Flags unusual spikes in consumption instantly, allowing you to correct excessive energy or transport usage in real-time.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white p-8 aspect-square flex flex-col"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-black/30 mb-auto">Model Component 03</div>
                <h4 className="text-2xl font-medium mb-3">Friction Analysis</h4>
                <p className="text-black/60 text-sm leading-relaxed">
                  Calculates the probability of habit adherence, recommending only adjustments that fall within your personal tolerance matrix.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white p-8 aspect-square flex flex-col justify-between bg-[#0a0a0a] text-white"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-white/30">System Status</div>
                <div>
                  <div className="text-emerald-400 mb-2 font-mono text-sm">OS.ACTIVE</div>
                  <h4 className="text-2xl font-medium">Gemini Core</h4>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
