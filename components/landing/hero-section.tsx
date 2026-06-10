"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center pt-32 pb-16 px-6 md:px-12 bg-[#050505] overflow-hidden"
      aria-label="Hero — Trace Carbon Intelligence OS"
    >
      {/* Cinematic Video Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 w-full h-full"
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/earth-orbit-poster.jpg"
          className="object-cover w-full h-full opacity-60 mix-blend-screen"
        >
          <source src="/videos/earth-orbit.mp4" type="video/mp4" />
        </video>
        
        {/* Vignette & Gradient Overlays for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </motion.div>

      <div className="z-10 flex flex-col items-center text-center max-w-5xl mx-auto mt-auto mb-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] border border-white/10 rounded-full px-5 py-2 bg-black/40 backdrop-blur-md">
            Trace Intelligence OS v2.0
          </span>
        </motion.div>

        {/* LCP element — h1 is the primary LCP candidate */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-white leading-[0.85] mb-10"
        >
          Your carbon <br />
          <span className="text-white/60 italic font-serif tracking-tight pr-2">footprint</span> is not <br />
          a number.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white/50 font-light tracking-wide max-w-2xl mb-14 leading-relaxed"
        >
          It is a behavioral system. Trace predicts, analyzes, and reshapes
          your environmental impact with absolute precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full font-medium text-sm transition-all hover:bg-white/90 hover:scale-105 active:scale-95"
            aria-label="Start tracking your carbon footprint"
          >
            Start Tracking
            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>
          <Link
            href="#product-showcase"
            className="flex items-center justify-center px-10 py-5 rounded-full font-medium text-sm text-white/80 border border-white/20 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="View the Trace platform features"
          >
            View Platform
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-4 text-white/30"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
