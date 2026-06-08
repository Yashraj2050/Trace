"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedVideo({ src, poster, className, priority = false }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(priority);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    
    // Check for low-end connections (Save-Data or slow connections)
    if ("connection" in navigator) {
      const conn = (navigator as any).connection;
      if (conn.saveData || conn.effectiveType === "2g" || conn.effectiveType === "3g") {
        setPrefersReducedMotion(true); // Treat as reduced motion to prevent video download/play
      }
    }

    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (priority || prefersReducedMotion) return;

    // Intersection Observer for lazy loading/playing
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlay(true);
            if (videoRef.current) {
              videoRef.current.play().catch(() => {
                // Ignore auto-play rejections
              });
            }
          } else {
            setShouldPlay(false);
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [priority, prefersReducedMotion]);

  useEffect(() => {
    // Handle playback state when shouldPlay or prefersReducedMotion changes
    if (!videoRef.current) return;

    if (shouldPlay && !prefersReducedMotion) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [shouldPlay, prefersReducedMotion]);

  return (
    <div className={cn("relative overflow-hidden w-full h-full bg-black", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-1000",
          !priority && !shouldPlay ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
