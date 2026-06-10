"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calculator,
  MessageSquare,
  Upload,
  Trophy,
  Users,
  FileText,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Target,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/coach", label: "AI Coach", icon: MessageSquare, badge: "AI" },
  { href: "/upload", label: "Scan Bills", icon: Upload },
  { href: "/habits", label: "Habits", icon: Target },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/leaderboard", label: "Leaderboard", icon: Users },
  { href: "/report", label: "Reports", icon: FileText },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: { email?: string; user_metadata?: { full_name?: string; avatar_url?: string } };
  profile?: { full_name?: string | null; sustainability_score?: number; streak_days?: number } | null;
}

export function DashboardLayout({ children, user, profile }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fullName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const score = profile?.sustainability_score ?? 0;
  const streak = profile?.streak_days ?? 0;

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed lg:relative lg:translate-x-0 top-0 left-0 h-full z-50 lg:z-auto",
          "w-64 flex flex-col bg-sidebar border-r border-sidebar-border"
        )}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center justify-center pt-2">
            <div className="relative w-28 h-10">
              <Image src="/logo-light.png" alt="Trace Logo" fill className="object-contain block dark:hidden" priority />
              <Image src="/logo-dark.png" alt="Trace Logo" fill className="object-contain hidden dark:block" priority />
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-7 h-7"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Score card */}
        <div className="mx-3 mb-4">
          <div className="glass rounded-xl p-3 border border-emerald-500/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Sustainability Score</span>
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-emerald-400">{score}</span>
              <span className="text-xs text-muted-foreground mb-0.5">/100</span>
            </div>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              />
            </div>
            {streak > 0 && (
              <p className="text-xs text-orange-400 mt-1.5">🔥 {streak} day streak</p>
            )}
          </div>
        </div>

        <Separator className="mx-3 mb-3 opacity-30" />

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "sidebar-active"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <Icon className={cn("w-4 h-4 shrink-0", isActive && "text-emerald-400")} />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge className="ml-auto text-[10px] py-0 px-1.5 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="mx-3 mb-3 opacity-30" />

        {/* User section */}
        <div className="p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer">
            <Avatar className="w-8 h-8 ring-2 ring-emerald-500/30">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fullName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-1 mt-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex-1 h-8 rounded-lg hover:bg-sidebar-accent"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-1 h-8 rounded-lg hover:bg-sidebar-accent"
              onClick={handleSignOut}
            >
              <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-8">
              <Image src="/logo-light.png" alt="Trace Logo" fill className="object-contain block dark:hidden" priority />
              <Image src="/logo-dark.png" alt="Trace Logo" fill className="object-contain hidden dark:block" priority />
            </div>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
          {children}
        </main>
      </div>
    </div>
  );
}
