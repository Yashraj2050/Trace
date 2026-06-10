"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Lock, ArrowLeft, Hexagon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

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
          <h1 className="text-4xl font-medium tracking-tight mb-2">Create node.</h1>
          <p className="text-white/50 text-sm">Deploy Trace for your personal telemetry.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-white/50">
              Identifier (Full Name)
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                id="name"
                type="text"
                placeholder="Jane Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 bg-[#111] border-white/10 text-white placeholder:text-white/20 h-12 rounded-md focus:border-white/30 focus:ring-0"
                required
              />
            </div>
          </div>

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
            <Label htmlFor="password" className="text-xs font-medium uppercase tracking-widest text-white/50">
              Secure Passkey
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-[#111] border-white/10 text-white placeholder:text-white/20 h-12 rounded-md focus:border-white/30 focus:ring-0"
                required
                minLength={8}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-md font-medium text-sm transition-colors mt-2"
            disabled={loading || password.length < 8}
          >
            {loading ? "Deploying..." : "Deploy Node"}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            Node already deployed?{" "}
            <Link href="/login" className="text-white hover:underline underline-offset-4 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
