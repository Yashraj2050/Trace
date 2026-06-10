"use client";

import { motion } from "framer-motion";

const modelComponents = [
  {
    id: "01",
    title: "Behavioral Graph",
    description:
      "Maps your daily habits into a connected node structure to identify cascading inefficiencies in your routine.",
  },
  {
    id: "02",
    title: "Anomaly Detection",
    description:
      "Flags unusual spikes in consumption instantly, allowing you to correct excessive energy or transport usage in real-time.",
  },
  {
    id: "03",
    title: "Friction Analysis",
    description:
      "Calculates the probability of habit adherence, recommending only adjustments that fall within your personal tolerance matrix.",
  },
] as const;

export function IntelligenceSection() {
  return (
    <section
      className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[#050505] text-white overflow-hidden flex items-center"
      aria-label="Intelligence engine — Predictive environmental modeling"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/ai-core-poster.jpg"
          className="object-cover w-full h-full opacity-30 mix-blend-screen"
        >
          <source src="/videos/ai-core.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-90" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column: Typography */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8">
                Intelligence Engine
              </p>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-10 leading-[1.05]">
                Predictive <br /> <span className="text-white/50 italic font-serif">environmental</span> <br /> modeling.
              </h2>

              <div className="space-y-8 text-xl text-white/50 font-light leading-relaxed max-w-lg">
                <p>
                  Trace does not just aggregate your past actions. It builds a
                  forward-looking behavioral model based on your specific
                  telemetry.
                </p>
                <p>
                  By analyzing the delta between your current trajectory and
                  optimal environmental benchmarks, the intelligence engine
                  generates micro-adjustments. These precise, low-friction
                  changes compound into massive systemic impact over an annual
                  cycle.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Text Blocks (replaces SaaS cards) */}
          <div className="flex flex-col justify-center gap-16 lg:pl-12">
            {modelComponents.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-8 border-l border-white/10"
                aria-label={`Model component ${item.id}: ${item.title}`}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">
                  {item.id}
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-3 text-white/90">{item.title}</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            ))}

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 inline-flex items-center gap-4 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md self-start"
              aria-label="System status: Gemini Core active"
            >
              <div
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
                OS.ACTIVE // Gemini Core
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
