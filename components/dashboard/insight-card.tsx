"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { createClient } from "@/lib/supabase/client";

export function InsightCard({ title, text, actionLabel }: { title: string, text: string, actionLabel: string }) {
  const [committed, setCommitted] = useState(false);

  const handleCommit = async () => {
    setCommitted(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from("commitments").insert([{
          user_id: user.id,
          title: actionLabel,
          status: "pending"
        }] as unknown as never[]);
      }
    } catch (e) {
      console.error("Failed to save commitment", e);
    }

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#3b82f6']
    });
    toast.success("Goal locked in!", {
      description: "Log this activity later today to earn double streak points."
    });
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden shadow-sm transition-all duration-300">
      <div className="relative z-10 flex flex-col sm:flex-row gap-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            {text}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            {!committed ? (
              <button 
                onClick={handleCommit}
                className="w-full sm:w-auto px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:scale-105 transition-transform active:scale-95 shadow-md"
              >
                {actionLabel}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500 bg-emerald-500/10 px-4 py-2.5 rounded-full w-full sm:w-auto justify-center">
                <CheckCircle2 className="w-5 h-5" /> Active Goal
              </div>
            )}
            
            <Link href="/insights" className="text-sm font-semibold text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors w-full sm:w-auto justify-center">
              View all insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
