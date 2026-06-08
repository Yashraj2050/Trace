"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service (e.g. Sentry)
    console.error("Trace App Error:", error);
  }, [error]);

  // Handle specific graceful failures based on error messages
  const getErrorMessage = () => {
    const msg = error.message.toLowerCase();
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("supabase")) {
      return "We're having trouble connecting to the database. Please check your connection and try again.";
    }
    if (msg.includes("gemini") || msg.includes("coach") || msg.includes("ai")) {
      return "The AI engine is currently overloaded or unavailable. Please try your request again in a few moments.";
    }
    if (msg.includes("ocr") || msg.includes("scan")) {
      return "We couldn't process this image. Please ensure the receipt is clear, well-lit, and try again.";
    }
    return "An unexpected error disrupted your session. Our team has been notified.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-mesh grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div className="glass-dark rounded-3xl p-8 border border-red-500/20 shadow-2xl text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          
          <h1 className="text-2xl font-semibold text-white mb-3">
            System Disruption Detected
          </h1>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {getErrorMessage()}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => reset()}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-medium h-12 px-6 rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full bg-white/5 hover:bg-white/10 border-white/10 text-white font-medium h-12 px-6 rounded-xl transition-all"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
