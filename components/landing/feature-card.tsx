"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  delay: number;
}

export function FeatureCard({ icon: Icon, title, description, color, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-dark rounded-2xl p-6 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 group"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <div className="w-full h-full bg-background/80 rounded-[10px] flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
