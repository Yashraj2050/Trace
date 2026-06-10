"use client";

import { useEffect, useState } from "react";

export function ImpactRings({ budgetPct = 75, actionPct = 40, offsetPct = 15 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const size = 280;
  const strokeWidth = 24;
  const center = size / 2;
  
  const budgetRadius = center - strokeWidth;
  const actionRadius = budgetRadius - strokeWidth - 4;
  const offsetRadius = actionRadius - strokeWidth - 4;

  const getStrokeDasharray = (radius: number) => 2 * Math.PI * radius;
  const getStrokeDashoffset = (radius: number, pct: number) => {
    const c = getStrokeDasharray(radius);
    return c - (pct / 100) * c;
  };

  return (
    <div className="relative flex items-center justify-center bg-card rounded-[2.5rem] p-8 shadow-sm border border-border">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track - Budget */}
        <circle cx={center} cy={center} r={budgetRadius} stroke="var(--primary)" strokeWidth={strokeWidth} fill="none" opacity={0.15} />
        {/* Track - Action */}
        <circle cx={center} cy={center} r={actionRadius} stroke="#10b981" strokeWidth={strokeWidth} fill="none" opacity={0.15} />
        {/* Track - Offset */}
        <circle cx={center} cy={center} r={offsetRadius} stroke="#3b82f6" strokeWidth={strokeWidth} fill="none" opacity={0.15} />

        {/* Value - Budget */}
        <circle 
          cx={center} cy={center} r={budgetRadius} 
          stroke="var(--primary)" strokeWidth={strokeWidth} fill="none" 
          strokeLinecap="round"
          strokeDasharray={getStrokeDasharray(budgetRadius)}
          strokeDashoffset={mounted ? getStrokeDashoffset(budgetRadius, budgetPct) : getStrokeDasharray(budgetRadius)}
          className="transition-all duration-1000 ease-out"
        />
        {/* Value - Action */}
        <circle 
          cx={center} cy={center} r={actionRadius} 
          stroke="#10b981" strokeWidth={strokeWidth} fill="none" 
          strokeLinecap="round"
          strokeDasharray={getStrokeDasharray(actionRadius)}
          strokeDashoffset={mounted ? getStrokeDashoffset(actionRadius, actionPct) : getStrokeDasharray(actionRadius)}
          className="transition-all duration-1000 ease-out delay-150"
        />
        {/* Value - Offset */}
        <circle 
          cx={center} cy={center} r={offsetRadius} 
          stroke="#3b82f6" strokeWidth={strokeWidth} fill="none" 
          strokeLinecap="round"
          strokeDasharray={getStrokeDasharray(offsetRadius)}
          strokeDashoffset={mounted ? getStrokeDashoffset(offsetRadius, offsetPct) : getStrokeDasharray(offsetRadius)}
          className="transition-all duration-1000 ease-out delay-300"
        />
      </svg>
      
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-4xl font-semibold tracking-tight text-foreground">84</span>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">Impact</span>
      </div>
    </div>
  );
}
