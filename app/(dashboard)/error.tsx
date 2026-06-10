"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We encountered an error loading your dashboard data. Please try again or check your connection.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform"
      >
        <RefreshCw className="w-4 h-4" /> Try again
      </button>
    </div>
  );
}
