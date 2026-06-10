"use client";

import { motion } from "framer-motion";
import { ScanLine, FileText, CheckCircle2 } from "lucide-react";

export function UploadSection() {
  return (
    <section className="w-full py-32 px-6 md:px-12 bg-[#050505] text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* Technical OCR interface mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 relative"
        >
          <div className="aspect-[4/5] bg-[#111] border border-white/10 rounded-lg p-6 flex flex-col relative overflow-hidden">
            {/* Scanning line animation */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10"
            />
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <ScanLine className="w-4 h-4" /> OCR.ACTIVE
              </div>
              <div className="text-xs text-white/40 font-mono">energy_bill_nov.pdf</div>
            </div>

            {/* Simulated Receipt Data Extraction */}
            <div className="flex-1 font-mono text-sm space-y-4">
              <div className="flex justify-between text-white/40">
                <span>[EXTRACTING...]</span>
                <span>confidence: 98%</span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center"
              >
                <div>
                  <div className="text-white/40 text-xs mb-1">Total Consumption</div>
                  <div>452 kWh</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center"
              >
                <div>
                  <div className="text-white/40 text-xs mb-1">Carbon Equivalent</div>
                  <div>194.3 kg CO2e</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="p-3 bg-emerald-400/10 border border-emerald-400/20 rounded text-emerald-400 text-xs flex gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 animate-pulse shrink-0" />
                Data committed to telemetry graph. Trend analysis updated.
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8">
              <FileText className="w-5 h-5 text-white" />
            </div>
            
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Frictionless data capture.
            </h3>
            
            <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
              Manual entry is a failure of design. Trace uses advanced optical character recognition (OCR) powered by Gemini to ingest structured data directly from your receipts, energy bills, and transport tickets.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong className="text-white font-medium">Energy Bills:</strong> Instantly parses kWh usage and converts to localized grid carbon equivalents.</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong className="text-white font-medium">Transit Tickets:</strong> Extracts origin, destination, and mode to calculate exact flight or rail emissions.</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong className="text-white font-medium">Grocery Receipts:</strong> Identifies high-impact dietary purchases for personalized coaching.</span>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
