"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

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
        // Handle specific supabase errors if it didn't throw
        if (error.message.includes("Failed to fetch")) {
          toast.error("Database unavailable. Let's set up your offline demo profile 🌱");
          router.push("/onboarding");
          return;
        }
        toast.error(error.message);
        return;
      }

      toast.success("Account created! Let's set up your profile 🌱");
      router.push("/onboarding");
      router.refresh();
    } catch {
      toast.error("Database unavailable. Let's set up your offline demo profile 🌱");
      router.push("/onboarding");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = passwordRequirements.filter((r) => r.test(password)).length;

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background">
      <div className="absolute inset-0 bg-mesh grid-pattern" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-teal-500/6 rounded-full blur-3xl" />

      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-dark rounded-3xl p-8 border border-emerald-500/15 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-sm text-muted-foreground">
              Start your sustainability journey today
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-emerald-500/50 rounded-xl h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-emerald-500/50 rounded-xl h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowRequirements(true)}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-emerald-500/50 rounded-xl h-11"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {showRequirements && password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-1.5"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          passwordStrength >= level
                            ? level === 1
                              ? "bg-red-500"
                              : level === 2
                              ? "bg-yellow-500"
                              : "bg-emerald-500"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                          req.test(password) ? "bg-emerald-500" : "bg-muted"
                        }`}
                      >
                        {req.test(password) && <Check className="w-2 h-2 text-white" />}
                      </div>
                      <span className={req.test(password) ? "text-emerald-400" : "text-muted-foreground"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || passwordStrength < 2}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-11 rounded-xl glow-green-sm mt-2 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By signing up, you agree to our{" "}
            <Link href="#" className="text-emerald-400 hover:underline">Terms</Link>{" "}
            and{" "}
            <Link href="#" className="text-emerald-400 hover:underline">Privacy Policy</Link>
          </p>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
