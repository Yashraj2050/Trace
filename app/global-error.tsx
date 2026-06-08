"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import "@/app/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service (e.g. Sentry)
    console.error("Trace Global Fatal Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased font-sans">
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Fallback styling without depending on external components that might have crashed */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 w-full max-w-md mx-4">
            <div className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl p-8 border border-red-500/20 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              
              <h1 className="text-2xl font-bold mb-3">Fatal System Error</h1>
              
              <p className="text-zinc-400 mb-8 leading-relaxed">
                A critical framework error prevented this page from loading. Our engineering team has been notified.
              </p>

              <button
                onClick={() => reset()}
                className="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium h-12 px-6 rounded-xl transition-all"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reload Application
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
