"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Hexagon, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const EarthGlobe = dynamic(() => import("@/components/landing/globe").then((mod) => mod.EarthGlobe), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <div className="relative w-[150%] md:w-[80%] lg:w-[60%] aspect-square opacity-[0.05] translate-y-1/4 rounded-full border border-white/10" />
    </div>
  ),
});

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        if (error.message.includes("Failed to fetch")) {
          toast.error("Database offline. Initializing local demo node.");
          router.push("/onboarding");
          return;
        }
        toast.error(error.message);
        return;
      }

      toast.success("Node initialized. Proceeding to configuration.");
      router.push("/onboarding");
      router.refresh();
    } catch {
      toast.error("Database offline. Initializing local demo node.");
      router.push("/onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white selection:bg-white/20 font-sans">
      
      {/* Left Side: Brand Narrative & Telemetry */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 border-r border-white/10 relative overflow-hidden bg-[#050505]">
        {/* Background Globe/Telemetry */}
        <div className="absolute inset-0 opacity-40 translate-x-[-20%] translate-y-[20%] pointer-events-none mix-blend-screen">
          <EarthGlobe />
        </div>
        
        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <Hexagon className="w-6 h-6 text-white" />
          <span className="font-semibold tracking-widest uppercase text-sm">Trace OS</span>
        </div>

        {/* Narrative & Typography */}
        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter leading-[1.1] mb-6">
              Global environmental intelligence infrastructure.
            </h2>
            <p className="text-white/50 text-lg font-light tracking-tight leading-relaxed">
              Initialize a new node on the Trace network. Join a decentralized system for tracking, analyzing, and reshaping environmental impact.
            </p>
          </motion.div>
        </div>

        {/* System Status Footer */}
        <div className="relative z-10 flex flex-col gap-1 text-xs font-mono text-white/40 tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Node Registration Active
          </span>
          <span>v2.0.4 // SECURE CONNECTION</span>
        </div>
      </div>

      {/* Right Side: Authentication Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 relative">
        <Link
          href="/"
          className="absolute top-8 left-8 lg:left-12 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Return
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full max-w-sm"
        >
          <div className="flex flex-col mb-12">
            <div className="w-10 h-10 bg-white border border-white flex items-center justify-center mb-8 lg:hidden rounded-sm">
              <Hexagon className="w-5 h-5 text-black" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-medium tracking-tight mb-2">Request Access</h1>
            <p className="text-white/50 text-sm">Deploy Trace for your personal telemetry.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-white/50">
                Identifier (Full Name)
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-3 bg-transparent border-white/20 text-white placeholder:text-white/20 h-12 rounded-none focus:border-white focus:ring-0 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-white/50">
                Email / Node ID
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="operator@trace.network"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-3 bg-transparent border-white/20 text-white placeholder:text-white/20 h-12 rounded-none focus:border-white focus:ring-0 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-widest text-white/50">
                Secure Passkey
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-white/20 text-white placeholder:text-white/20 h-12 rounded-none focus:border-white focus:ring-0 transition-colors tracking-widest"
                required
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || password.length < 8}
              className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-none font-medium text-sm tracking-wide transition-colors mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deploy Node"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-white/40">
            Node already deployed?{" "}
            <Link href="/login" className="text-white hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
