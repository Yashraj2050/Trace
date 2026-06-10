"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EarthGlobe } from "@/components/landing/globe";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden">
      {/* Background Grid Pattern - subtle */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Radial Gradient overlay to fade edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)] pointer-events-none"></div>

      <EarthGlobe />

      <div className="z-10 flex flex-col items-center text-center max-w-5xl mx-auto mt-auto mb-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 border border-white/10 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur-md"
        >
          <span className="text-xs font-medium text-white/70 uppercase tracking-widest">Trace Intelligence OS v2.0</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white leading-[0.9] mb-8"
        >
          Your carbon footprint <br className="hidden md:block"/> is not a number.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl text-white/60 font-light tracking-tight max-w-2xl mb-12"
        >
          It&apos;s a behavior system. Trace predicts, analyzes, and reshapes your environmental impact with machine precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/login" className="group flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium text-sm transition-transform hover:scale-105 active:scale-95">
            Start Tracking
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link href="#product-showcase" className="flex items-center justify-center px-8 py-4 rounded-full font-medium text-sm text-white border border-white/20 transition-colors hover:bg-white/10">
            View Platform
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-auto mb-8 z-10 flex flex-col items-center gap-4 text-white/40"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
}
