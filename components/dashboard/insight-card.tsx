"use client";

import { useState } from "react";
import { CheckCircle2, Terminal } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function InsightCard({ title, text, actionLabel }: { title: string, text: string, actionLabel: string }) {
  const [committed, setCommitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCommit = async () => {
    setLoading(true);

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
      
      setCommitted(true);
      toast.success("Goal locked in. Telemetry updated.");
    } catch (e) {
      console.error("Failed to save commitment", e);
      toast.error("Network error. Could not commit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(
      "border transition-colors duration-300 p-6 flex flex-col justify-between",
      committed ? "border-emerald-400/30 bg-emerald-400/5" : "border-white/10 bg-[#111] hover:border-white/30"
    )}>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-mono text-sm uppercase tracking-widest text-white/70">{title}</h3>
        </div>
        <p className="text-sm text-white/60 leading-relaxed font-light">
          {text}
        </p>
      </div>
      
      <div>
        {!committed ? (
          <button 
            onClick={handleCommit}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 border border-white/20 hover:bg-white text-white hover:text-black transition-colors font-mono text-xs uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Committing..." : actionLabel}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Vector Active
          </div>
        )}
      </div>
    </div>
  );
}
