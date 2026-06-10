"use client";

import { useState } from "react";
import { LandingNav } from "@/components/landing/landing-nav";
import { LoadingScreen } from "@/components/landing/loading-screen";
import { HeroSection } from "@/components/landing/hero-section";
import { ProofSection } from "@/components/landing/proof-section";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { IntelligenceSection } from "@/components/landing/intelligence-section";
import { UploadSection } from "@/components/landing/upload-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function PremiumLandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-full bg-[#0a0a0a] text-white selection:bg-white/20 min-h-screen">
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      
      {/* We keep the rest of the page in the DOM to avoid layout shifts, but hide it if we want strict blocking, or just let it be underneath the fixed loading screen. The LoadingScreen covers everything due to z-[100] and fixed inset-0. */}
      
      <LandingNav />
      <HeroSection />
      <ProofSection />
      <ProductShowcase />
      <IntelligenceSection />
      <UploadSection />
      <CtaSection />
      
      <footer className="w-full py-8 border-t border-white/10 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Trace. All rights reserved.</p>
      </footer>
    </main>
  );
}
