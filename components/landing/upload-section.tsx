"use client";

import { motion } from "framer-motion";
import { ScanLine, CheckCircle2 } from "lucide-react";

const ocrFeatures = [
  {
    title: "Energy Bills",
    description:
      "Instantly parses kWh usage and converts to localized grid carbon equivalents.",
  },
  {
    title: "Transit Tickets",
    description:
      "Extracts origin, destination, and mode to calculate exact flight or rail emissions.",
  },
  {
    title: "Grocery Receipts",
    description:
      "Identifies high-impact dietary purchases for personalized coaching.",
  },
] as const;

const extractedData = [
  { label: "Total Consumption", value: "452 kWh", delay: 0.5 },
  { label: "Carbon Equivalent", value: "194.3 kg CO2e", delay: 1.0 },
] as const;

export function UploadSection() {
  return (
    <section
      className="relative w-full py-40 px-6 md:px-12 bg-[#020202] text-white overflow-hidden"
      aria-label="OCR document scanner — Frictionless data capture"
    >
      {/* Background depth elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
        {/* Copy / Typography */}
        <div className="w-full lg:w-1/2 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-8">
              Data Ingestion
            </div>

            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-10 leading-[1.05]">
              Frictionless <br /> <span className="text-white/50 italic font-serif">data capture.</span>
            </h2>

            <p className="text-xl text-white/50 font-light leading-relaxed mb-16 max-w-lg">
              Manual entry is a failure of design. Trace uses advanced optical
              character recognition powered by Gemini to ingest structured
              data directly from your physical world.
            </p>

            <ul className="space-y-10" aria-label="Supported document types">
              {ocrFeatures.map((feature, i) => (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="flex flex-col gap-2"
                >
                  <strong className="text-white/90 font-medium tracking-tight text-xl">
                    {feature.title}
                  </strong>
                  <span className="text-white/40 font-light text-lg">
                    {feature.description}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Technical OCR interface mockup - Immersive full bleed style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 relative"
          role="img"
          aria-label="OCR scanner interface processing an energy bill"
        >
          <div className="aspect-[4/5] bg-[#050505] border border-white/5 shadow-2xl flex flex-col relative overflow-hidden">
            {/* Dark glassmorphic overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            {/* Scanning line animation */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute left-0 w-full h-px bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)] z-20"
              aria-hidden="true"
            />

            <div className="flex justify-between items-center border-b border-white/5 px-8 py-6 z-10 bg-[#0a0a0a]/80 backdrop-blur-md">
              <div
                className="flex items-center gap-3 text-xs font-mono text-emerald-500/80 tracking-widest uppercase"
                aria-live="polite"
              >
                <ScanLine className="w-4 h-4" aria-hidden="true" /> OCR Active
              </div>
              <div className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
                energy_bill_nov.pdf
              </div>
            </div>

            {/* Simulated Receipt Data Extraction */}
            <div className="flex-1 font-mono text-sm p-8 space-y-6 relative z-10">
              <div className="flex justify-between text-white/30 text-xs tracking-widest uppercase">
                <span>[EXTRACTING...]</span>
                <span>conf: 98%</span>
              </div>

              {extractedData.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item.delay }}
                  className="py-4 border-b border-white/5 flex justify-between items-center"
                >
                  <div>
                    <div className="text-white/30 text-[10px] tracking-widest uppercase mb-2">
                      {item.label}
                    </div>
                    <div className="text-lg text-white/80">{item.value}</div>
                  </div>
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-500/60"
                    aria-label="Extracted successfully"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.5 }}
                className="pt-8 text-emerald-500/60 text-xs flex gap-3 leading-relaxed"
                aria-live="polite"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 animate-pulse shrink-0"
                  aria-hidden="true"
                />
                Telemetry graph updated. Behavioral model adjusted.
              </motion.div>
            </div>
            
            {/* Grid pattern background for the scanner */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
