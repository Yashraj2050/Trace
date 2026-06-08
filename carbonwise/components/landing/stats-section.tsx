"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50000, label: "kg CO₂ Saved", suffix: "+", prefix: "" },
  { value: 12000, label: "Active Users", suffix: "+", prefix: "" },
  { value: 94, label: "Reduction Achieved", suffix: "%", prefix: "avg " },
  { value: 15, label: "Achievements Unlocked Daily", suffix: "k+", prefix: "" },
];

function CountUp({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress === 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="py-16 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/30 via-transparent to-teal-950/20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
