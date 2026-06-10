"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

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
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-xl tracking-tighter text-white"
              aria-label="Trace — Home"
            >
              TRACE
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8" role="list">
              <Link
                href="#product-showcase"
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                role="listitem"
              >
                Platform
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                role="listitem"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform"
                role="listitem"
                aria-label="Get started with Trace"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <nav className="flex flex-col gap-6 text-2xl font-medium">
            <Link
              href="#product-showcase"
              onClick={closeMobile}
              className="text-white/70 hover:text-white transition-colors"
            >
              Platform
            </Link>
            <Link
              href="/login"
              onClick={closeMobile}
              className="text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={closeMobile}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
