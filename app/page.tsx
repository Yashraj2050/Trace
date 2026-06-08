"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LandingNav } from "@/components/landing/landing-nav";
import { OptimizedVideo } from "@/components/ui/optimized-video";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade up for text elements
      const elements = gsap.utils.toArray('.reveal-text');
      elements.forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white selection:bg-white/20">
      <LandingNav />

      {/* SECTION 1: HERO */}
      <section className="relative h-[100vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedVideo 
            src="/videos/earth-orbit.mp4" 
            poster="/images/earth-orbit-poster.jpg"
            priority={true} 
            className="opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center mt-20 max-w-5xl mx-auto reveal-text">
          <h1 className="text-fluid-hero font-medium mb-6 tracking-tighter leading-[0.9]">
            Measure <br />
            <span className="text-white/60">the unseen.</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-white/50 mb-12 font-light tracking-tight leading-relaxed">
            Trace translates your daily actions into precise environmental telemetry. 
            No complex dashboards. Just pure, actionable intelligence.
          </p>

          <Link 
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            Start Tracking
            <ArrowRight className="ml-3 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 2: EXTRACTION */}
      <section className="relative h-[100vh] w-full flex items-center px-6 md:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedVideo 
            src="/videos/invisible-impact.mp4" 
            poster="/images/invisible-impact-poster.jpg"
            className="opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-2xl reveal-text">
          <h2 className="text-fluid-h2 font-medium tracking-tighter mb-6 leading-tight">
            Intelligence <br />
            <span className="text-white/50">extraction.</span>
          </h2>
          <p className="text-xl text-white/50 leading-relaxed font-light">
            Upload a receipt or an energy bill. Our proprietary Gemini pipelines extract consumption metrics instantly. Zero manual entry. Perfect precision.
          </p>
        </div>
      </section>

      {/* SECTION 3: AI CORE */}
      <section className="relative h-[100vh] w-full flex items-center justify-end px-6 md:px-24 text-right overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedVideo 
            src="/videos/ai-core.mp4" 
            poster="/images/ai-core-poster.jpg"
            className="opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-2xl reveal-text">
          <h2 className="text-fluid-h2 font-medium tracking-tighter mb-6 leading-tight">
            Predictive <br />
            <span className="text-white/50">modeling.</span>
          </h2>
          <p className="text-xl text-white/50 leading-relaxed font-light text-right">
            See the future. Trace projects your environmental trajectory months in advance. Adjust your habits today, and watch the atmospheric outcome shift tomorrow.
          </p>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="relative h-[100vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedVideo 
            src="/videos/regenerative-future.mp4" 
            poster="/images/regenerative-future-poster.jpg"
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-3xl reveal-text">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
            The era of guesswork is over.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-medium text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors"
            >
              Create Account
            </Link>
            
            <Link 
              href="/login"
              className="inline-flex items-center justify-center px-10 py-5 border border-white/20 bg-transparent text-white font-medium text-sm tracking-widest uppercase hover:bg-white/5 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
