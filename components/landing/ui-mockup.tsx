"use client";

import { motion } from "framer-motion";
import { Sparkles, Utensils, Car } from "lucide-react";
import { ImpactRings } from "@/components/dashboard/impact-rings";

export function UIMockup() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-[340px] mx-auto lg:ml-auto"
    >
      {/* The UI Device Frame - Premium Mobile Phone frame */}
      <div className="relative bg-[#0a0a0a] border-[8px] border-[#1a1a1a] rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col h-[740px]">
        
        {/* Notch Area */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
          <div className="w-32 h-6 bg-[#1a1a1a] rounded-b-3xl"></div>
        </div>

        {/* App Header */}
        <div className="flex flex-col px-8 pt-16 pb-2">
          <p className="text-2xl font-semibold tracking-tight text-white">Trace.</p>
        </div>

        {/* UI Body */}
        <div className="flex-1 overflow-hidden flex flex-col bg-[#0a0a0a]">
          
          {/* Rings Section */}
          <div className="p-4 flex justify-center scale-90 origin-top mt-4">
            <ImpactRings budgetPct={65} actionPct={45} offsetPct={20} />
          </div>

          {/* Morning Briefing (Solid background, no glassmorphism) */}
          <div className="px-6 mb-8 -mt-6 relative z-10">
            <div className="bg-[#1a1a1a] border-none rounded-3xl p-5 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[13px] text-[#e0e0e0] leading-relaxed font-medium">
                  Taking the bus today will keep you under your weekly budget.
                </p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="flex-1 bg-white rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-1.5 bg-[#e0e0e0] rounded-full mx-auto mb-8"></div>
            <h3 className="font-semibold text-lg tracking-tight mb-6 text-black">Today</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#fff0e6] flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[15px] text-black">Steak Dinner</p>
                  <p className="text-[13px] text-[#666666] font-medium">Hawksmoor</p>
                </div>
                <p className="font-bold text-[15px] text-black">12 kg</p>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#e6fcf5] flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[15px] text-black">Uber Electric</p>
                  <p className="text-[13px] text-[#666666] font-medium">Saved 4 kg CO₂</p>
                </div>
                <p className="font-bold text-[15px] text-emerald-600">0 kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
