"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    label: "Average Reduction",
    value: "24",
    unit: "%",
    description:
      "Active Trace users decrease their monthly carbon emissions by nearly a quarter within the first 90 days of telemetry integration.",
    parallelDir: 1,
  },
  {
    label: "Data Points Analyzed",
    value: "1.2",
    unit: "M+",
    description:
      "From energy bills to daily commutes, our intelligence engine processes millions of behavioral signals to identify optimization vectors.",
    parallelDir: -1,
  },
  {
    label: "Prediction Accuracy",
    value: "94",
    unit: "%",
    description:
      "Our machine learning forecasting model accurately projects your end-of-year footprint based on current consumption velocity.",
    parallelDir: 1,
  },
] as const;

export function ProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={ref}
      className="relative w-full py-32 px-6 md:px-12 bg-[#0a0a0a] text-white border-t border-white/10 overflow-hidden"
      aria-label="Impact statistics"
    >
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
              Vague goals yield vague results. Trace captures high-fidelity
              telemetry from your daily operations to establish an immutable
              baseline of your environmental footprint.
            </p>
          </motion.div>
        </div>

        {/* Editorial Data Grid */}
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
          {stats.map((stat, i) => {
            const yVal = stat.parallelDir === 1 ? y1 : y2;
            return (
              <div
                key={stat.label}
                className="bg-[#0a0a0a] p-10 flex flex-col justify-between aspect-square md:aspect-auto"
              >
                <motion.div
                  style={{ y: yVal }}
                  className="flex flex-col h-full justify-between"
                  // Stagger each card slightly
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <dt className="text-sm font-medium uppercase tracking-widest text-emerald-400 mb-8 block">
                    {stat.label}
                  </dt>
                  <div>
                    <div
                      className="text-7xl md:text-8xl font-bold tracking-tighter mb-2"
                      aria-label={`${stat.value}${stat.unit}`}
                    >
                      {stat.value}
                      <span className="text-4xl">{stat.unit}</span>
                    </div>
                    <dd className="text-white/50 text-sm leading-relaxed">
                      {stat.description}
                    </dd>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
