"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Hexagon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Authentication successful.");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm mx-4"
      >
        <div className="flex flex-col mb-12">
          <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-6 rounded-md">
            <Hexagon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-medium tracking-tight mb-2">Sign in.</h1>
          <p className="text-white/50 text-sm">Access your environmental telemetry.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-white/50">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                id="email"
                type="email"
                placeholder="node@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-[#111] border-white/10 text-white placeholder:text-white/20 h-12 rounded-md focus:border-white/30 focus:ring-0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-widest text-white/50">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Reset
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#111] border-white/10 text-white placeholder:text-white/20 h-12 rounded-md focus:border-white/30 focus:ring-0"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-md font-medium text-sm transition-colors"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Initialize Session"}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            Don&apos;t have a node yet?{" "}
            <Link href="/signup" className="text-white hover:underline underline-offset-4 transition-colors">
              Deploy Trace
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
