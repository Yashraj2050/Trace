import dynamic from "next/dynamic";
import { LandingNav } from "@/components/landing/landing-nav";
import { LoadingScreen } from "@/components/landing/loading-screen";
import { HeroSection } from "@/components/landing/hero-section";
import type { Metadata } from "next";

// Lazy-load below-fold sections to reduce initial JS bundle
const ProofSection = dynamic(
  () =>
    import("@/components/landing/proof-section").then((m) => m.ProofSection),
  { ssr: true }
);
const ProductShowcase = dynamic(
  () =>
    import("@/components/landing/product-showcase").then(
      (m) => m.ProductShowcase
    ),
  { ssr: true }
);
const IntelligenceSection = dynamic(
  () =>
    import("@/components/landing/intelligence-section").then(
      (m) => m.IntelligenceSection
    ),
  { ssr: true }
);
const UploadSection = dynamic(
  () =>
    import("@/components/landing/upload-section").then((m) => m.UploadSection),
  { ssr: true }
);
const CtaSection = dynamic(
  () => import("@/components/landing/cta-section").then((m) => m.CtaSection),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Trace — Every choice leaves a trace.",
  description:
    "Every choice leaves a trace. An interactive, story-driven cinematic experience to track and reduce your carbon footprint using AI.",
  alternates: {
    canonical: "/",
  },
};

export default function PremiumLandingPage() {
  return (
    <main
      id="main-content"
      className="relative w-full bg-[#0a0a0a] text-white selection:bg-white/20 min-h-screen"
    >
      <LoadingScreen />
      <LandingNav />
      <HeroSection />
      <ProofSection />
      <ProductShowcase />
      <IntelligenceSection />
      <UploadSection />
      <CtaSection />

      <footer
        className="w-full py-8 border-t border-white/10 text-center text-white/40 text-sm"
        role="contentinfo"
      >
        <p>&copy; {new Date().getFullYear()} Trace. All rights reserved.</p>
      </footer>
    </main>
  );
}
