"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-bold text-xl tracking-tighter text-white">
              TRACE
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#product-showcase" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Platform
              </Link>
              <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 px-6">
          <div className="flex flex-col gap-6 text-2xl font-medium">
            <Link href="#product-showcase" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white">Platform</Link>
            <Link href="/login" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white">Sign In</Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)} className="text-emerald-400">Get Started</Link>
          </div>
        </div>
      )}
    </>
  );
}
