"use client";

import { Flame, Target, Share2, Hexagon, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CommunityPage() {
  return (
    <div className="w-full pointer-events-auto">
      
      <div className="border-b border-white/10 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-2">Global Net</h1>
          <p className="text-sm font-mono text-white/50 uppercase tracking-widest">Decentralized Telemetry Feed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Streaks & Quests */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="border border-white/10 bg-[#111] p-6 flex flex-col gap-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/50 flex items-center gap-2 border-b border-white/10 pb-4">
              <Terminal className="w-4 h-4 text-white/50" /> Node Status
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase text-white/50 mb-1">Uptime Streak</p>
                <p className="text-2xl font-medium tracking-tight flex items-center gap-2">
                  12 <span className="text-[10px] text-orange-500 font-mono">DAYS</span>
                </p>
              </div>
              <Flame className="w-6 h-6 text-orange-500/50" />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                <p className="text-xs font-mono uppercase text-white/50 mb-1">Efficiency Ratio</p>
                <p className="text-2xl font-medium tracking-tight flex items-center gap-2">
                  3 <span className="text-[10px] text-emerald-400 font-mono">WEEKS</span>
                </p>
              </div>
              <Target className="w-6 h-6 text-emerald-400/50" />
            </div>
          </div>

          <div className="border border-white/10 bg-[#0d0d0d] p-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/50 flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span>Active Directive</span>
              <span className="text-emerald-400">14/31</span>
            </h2>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-emerald-400/20 bg-emerald-400/5 flex items-center justify-center shrink-0">
                <Hexagon className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-widest uppercase text-white/90 mb-1">Plant-Based Subroutine</h3>
                <p className="text-xs text-white/40 uppercase font-mono leading-relaxed mb-4">
                  Eliminate meat consumption for 31 sequential days.
                </p>
                <div className="h-1 w-full bg-white/5">
                  <div className="h-1 bg-emerald-400" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-mono uppercase text-white/40">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feed */}
        <div className="lg:col-span-8">
          <div className="border border-white/10 bg-[#111]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/50">Live Network Telemetry</h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest">Syncing</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <FeedItem 
                nodeId="A1F9.C4E2"
                time="2h ago"
                action="Logged Zero-Emission Transit"
                impact="4.2 kg CO₂ bypassed"
                initialKudos={12}
              />
              <FeedItem 
                nodeId="B7D3.F8A1"
                time="5h ago"
                action="Completed Directive: Plant-Based"
                impact="18.5 kg CO₂ bypassed"
                initialKudos={45}
                highlight
              />
              <FeedItem 
                nodeId="C4E2.A1F9"
                time="24h ago"
                action="Hardware Upgraded: Solar Matrix"
                impact="1,200 kg CO₂ / yr offset"
                initialKudos={128}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeedItem({ nodeId, time, action, impact, initialKudos, highlight = false }: {
  nodeId: string;
  time: string;
  action: string;
  impact: string;
  initialKudos: number;
  highlight?: boolean;
}) {
  const [kudos, setKudos] = useState(initialKudos);
  const [given, setGiven] = useState(false);

  const handleKudos = () => {
    if (given) return;
    setKudos(prev => prev + 1);
    setGiven(true);
    toast.success(`Signal boosted for Node ${nodeId}.`);
  };

  return (
    <div className={cn(
      "p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors",
      highlight ? "bg-emerald-400/5" : "bg-[#0d0d0d] hover:bg-[#111]"
    )}>
      
      <div className="flex items-start gap-4 flex-1">
        <div className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
          <span className="text-xs font-mono text-white/50">{'</>'}</span>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm font-mono font-medium text-white">{nodeId}</span>
            <span className="text-[10px] font-mono text-white/40 uppercase">{time}</span>
          </div>
          <p className="text-sm text-white/80 font-mono uppercase mb-1">{action}</p>
          <p className={cn(
            "text-xs font-mono uppercase tracking-widest",
            highlight ? "text-emerald-400" : "text-white/50"
          )}>
            [{impact}]
          </p>
        </div>
      </div>

      <button 
        onClick={handleKudos}
        disabled={given}
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-2 border text-xs font-mono uppercase tracking-widest transition-colors w-full sm:w-auto shrink-0",
          given 
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400" 
            : "border-white/20 hover:border-white/40 text-white/60 hover:text-white"
        )}
      >
        <Share2 className="w-3 h-3" />
        {given ? `Boosted [${kudos}]` : `Boost Signal [${kudos}]`}
      </button>

    </div>
  );
}
