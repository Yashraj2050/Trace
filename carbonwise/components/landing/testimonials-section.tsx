"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Environmental Scientist",
    avatar: "SC",
    rating: 5,
    text: "Trace transformed how I track my sustainability. The AI coach gives incredibly personalized advice that actually works.",
    reduction: "42%",
  },
  {
    name: "Marcus Johnson",
    role: "Sustainability Manager",
    avatar: "MJ",
    rating: 5,
    text: "The receipt scanner is a game-changer. I just photograph my electricity bill and instantly know my carbon impact. Brilliant!",
    reduction: "38%",
  },
  {
    name: "Priya Sharma",
    role: "Climate Activist",
    avatar: "PS",
    rating: 5,
    text: "I love the achievement system. Gamifying sustainability makes it fun and keeps me motivated to maintain my green habits.",
    reduction: "55%",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Loved by <span className="text-gradient">sustainability leaders</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of users already reducing their carbon footprint
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="glass-dark rounded-2xl p-6 border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-400">{t.reduction}</p>
                  <p className="text-xs text-muted-foreground">reduced</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
