"use client";

import { motion } from "framer-motion";
import { BarChart3, Globe2, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    title: "Scope 1, 2, & 3",
    description: "Comprehensive tracking across your entire value chain.",
    icon: Globe2,
    className: "col-span-1 md:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative",
  },
  {
    title: "Real-time API",
    description: "Connect to your existing ERP and procurement tools instantly.",
    icon: Zap,
    className: "col-span-1 bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative",
  },
  {
    title: "Verified Offsets",
    description: "Purchase premium, high-quality carbon removal credits.",
    icon: ShieldCheck,
    className: "col-span-1 bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative",
  },
  {
    title: "Audit-Ready Reports",
    description: "Generate compliant reports for CSRD, SEC, and investors.",
    icon: BarChart3,
    className: "col-span-1 md:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative",
  }
];

export function BentoGrid() {
  return (
    <section className="py-32 relative bg-[#050505]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-4">
            Everything you need. <br />
            <span className="text-white/50">Nothing you don&apos;t.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={feature.className}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-[1rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-white/50 font-light text-lg leading-relaxed max-w-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
