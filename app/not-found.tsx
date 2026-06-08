"use client";

import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-mesh grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="glass-dark rounded-3xl p-10 border border-white/10 shadow-2xl text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Search className="w-10 h-10 text-emerald-400/80" />
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">404</h1>
          <h2 className="text-xl font-medium text-white/90 mb-3">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-10 leading-relaxed max-w-sm mx-auto">
            The page you are looking for has been moved, deleted, or possibly never existed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium h-12 px-6 rounded-xl transition-all glow-green-sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
            
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border-white/10 text-white font-medium h-12 px-6 rounded-xl transition-all"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.history.back();
                }
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
