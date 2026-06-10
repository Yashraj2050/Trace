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
  },
  {
    label: "Data Points Analyzed",
    value: "1.2",
    unit: "M+",
    description:
      "From energy bills to daily commutes, our intelligence engine processes millions of behavioral signals to identify optimization vectors.",
  },
  {
    label: "Prediction Accuracy",
    value: "94",
    unit: "%",
    description:
      "Our machine learning forecasting model accurately projects your end-of-year footprint based on current consumption velocity.",
  },
] as const;

export function ProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#050505] text-white"
      aria-label="Impact statistics"
    >
      {/* Sticky Cinematic Background */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/invisible-impact-poster.jpg"
            className="object-cover w-full h-full opacity-40 mix-blend-lighten"
          >
            <source src="/videos/invisible-impact.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent opacity-80" />
        </motion.div>

        {/* Content Container */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col h-full justify-center">
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-auto pt-40 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="md:w-1/2"
              >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-[1.1] mb-6">
                  The impact of <br /> <span className="text-white/50 italic font-serif">precision data.</span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="md:w-1/3 text-white/50 text-lg font-light leading-relaxed"
              >
                <p>
                  Vague goals yield vague results. Trace captures high-fidelity
                  telemetry from your daily operations to establish an immutable
                  baseline of your environmental footprint.
                </p>
              </motion.div>
            </div>

            {/* Scrolling Stats Display */}
            <dl className="w-full flex justify-between pb-32">
              {stats.map((stat, i) => {
                // Each stat fades in and out based on scroll progress
                // 3 stats, so they appear sequentially
                const start = i * 0.3;
                const peak = start + 0.15;
                const end = start + 0.3;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [start, peak, end], [100, 0, -100]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0]);

                return (
                  <motion.div
                    key={stat.label}
                    style={{ y, opacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center mt-32"
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-10">
                      {stat.label}
                    </dt>
                    <div>
                      <div
                        className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-medium tracking-tighter mb-6 leading-none"
                        aria-label={`${stat.value}${stat.unit}`}
                      >
                        {stat.value}
                        <span className="text-4xl md:text-6xl lg:text-8xl text-white/30 tracking-normal align-top ml-4">{stat.unit}</span>
                      </div>
                      <dd className="text-white/60 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                        {stat.description}
                      </dd>
                    </div>
                  </motion.div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
