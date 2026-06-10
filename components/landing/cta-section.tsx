"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CtaSection() {
  return (
    <section
      className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden"
      aria-label="Call to action — Deploy Trace"
    >
      {/* Cinematic Background Video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/regenerative-future-poster.jpg"
          className="object-cover w-full h-full opacity-60 mix-blend-screen"
        >
          <source src="/videos/regenerative-future.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-80" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        <div className="mb-10 text-[10px] font-bold text-white/50 uppercase tracking-[0.4em]">
          Initiate Sequence
        </div>
        
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter mb-10 leading-[0.9] text-white">
          The planet doesn&apos;t <br /> need intentions. <br />
          <span className="text-white/60 italic font-serif">It needs telemetry.</span>
        </h2>

        <p className="text-xl md:text-2xl text-white/50 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
          Deploy Trace today and turn your environmental footprint into a
          measurable, manageable, and reducible system.
        </p>

        <Link
          href="/signup"
          className="group inline-flex items-center justify-center bg-white text-black px-12 py-6 rounded-full font-medium text-sm tracking-wide transition-all hover:bg-white/90 hover:scale-105 active:scale-95"
          aria-label="Sign up and deploy Trace OS"
        >
          Deploy Trace OS
          <div className="ml-4 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
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
      </motion.div>
    </section>
  );
}
