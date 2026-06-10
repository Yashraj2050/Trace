"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="w-full py-32 px-6 md:px-12 bg-white text-black flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 leading-[0.9]">
          The planet doesn&apos;t need intentions. It needs telemetry.
        </h2>
        
        <p className="text-xl md:text-2xl text-black/60 font-light mb-12 max-w-2xl mx-auto">
          Deploy Trace today and turn your environmental footprint into a measurable, manageable, and reducible system.
        </p>

        <Link href="/signup" className="inline-flex items-center justify-center bg-black text-white px-10 py-5 rounded-full font-medium text-lg transition-transform hover:scale-105 active:scale-95">
          Deploy Trace OS
        </Link>
      </motion.div>
    </section>
  );
}
