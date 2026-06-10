"use client";

import { Car, Utensils, Home, ShoppingBag, Plane, Train, Leaf, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const getIcon = (category: string) => {
  switch (category) {
    case 'TRANSPORT': return <Car className="w-5 h-5 text-blue-500" />;
    case 'FOOD': return <Utensils className="w-5 h-5 text-orange-500" />;
    case 'ENERGY': return <Home className="w-5 h-5 text-yellow-500" />;
    case 'SHOPPING': return <ShoppingBag className="w-5 h-5 text-purple-500" />;
    case 'TRAVEL': return <Plane className="w-5 h-5 text-indigo-500" />;
    default: return <Train className="w-5 h-5 text-green-500" />;
  }
};

const getBgColor = (category: string) => {
  switch (category) {
    case 'TRANSPORT': return 'bg-blue-500/10';
    case 'FOOD': return 'bg-orange-500/10';
    case 'ENERGY': return 'bg-yellow-500/10';
    case 'SHOPPING': return 'bg-purple-500/10';
    case 'TRAVEL': return 'bg-indigo-500/10';
    default: return 'bg-green-500/10';
  }
};

export interface CarbonLog {
  id: string;
  category: string;
  carbon_kg: number;
  created_at: string;
  details?: {
    title?: string;
    subtitle?: string;
  };
}

export function TransactionFeed({ transactions = [] }: { transactions: CarbonLog[] }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-border rounded-3xl bg-muted/20">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Your trace starts here</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          Log your first meal or commute to establish your baseline and start closing your rings.
        </p>
        <Link 
          href="/log" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform shadow-sm"
        >
          Log Activity <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg tracking-tight mb-4 text-foreground">Activity Feed</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}

function TransactionItem({ tx }: { tx: CarbonLog }) {
  const [expanded, setExpanded] = useState(false);
  const [offset, setOffset] = useState(false);

  const handleOffset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOffset(true);
    toast.success("Offset Complete", {
      description: `You restored ${tx.carbon_kg} kg CO₂`
    });
  };

  const isHighCarbon = tx.carbon_kg > 10;

  return (
    <div 
      onClick={() => setExpanded(!expanded)}
      className={`bg-card border p-4 rounded-3xl shadow-sm transition-all cursor-pointer ${
        expanded ? 'border-primary/30 ring-1 ring-primary/30' : 'border-border hover:border-primary/50 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBgColor(tx.category)}`}>
          {getIcon(tx.category)}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-foreground truncate">
            {tx.details?.title || tx.category}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {tx.details?.subtitle || new Date(tx.created_at).toLocaleDateString()}
          </p>
        </div>
        
        <div className="text-right shrink-0">
          <p className={`text-base font-bold ${tx.carbon_kg > 0 ? (offset ? 'text-muted-foreground line-through' : 'text-foreground') : 'text-emerald-500'}`}>
            {tx.carbon_kg > 0 ? '+' : ''}{tx.carbon_kg} kg
          </p>
          {offset && <p className="text-xs font-semibold text-emerald-500">Offset</p>}
        </div>
      </div>

      {/* Expanded Action Area (Monzo Style) */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border flex justify-end gap-3 animate-in slide-in-from-top-2">
          {isHighCarbon && !offset && (
            <button 
              onClick={handleOffset}
              className="px-4 py-2 bg-emerald-500/10 text-emerald-600 font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-emerald-500/20 transition-colors"
            >
              <Leaf className="w-4 h-4" /> Offset Impact
            </button>
          )}
          <button className="px-4 py-2 bg-muted text-muted-foreground font-semibold text-sm rounded-full hover:bg-muted/80 transition-colors">
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
