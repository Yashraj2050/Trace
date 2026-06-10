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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return true;
    // Also treat low-quality connections as reduced motion
    if ('connection' in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const conn = (navigator as any).connection;
      if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === '3g') {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (priority || prefersReducedMotion) return;

    const videoEl = videoRef.current;
    // Intersection Observer for lazy loading/playing
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlay(true);
            if (videoEl) {
              videoEl.play().catch(() => {
                // Ignore auto-play rejections
              });
            }
          } else {
            setShouldPlay(false);
            if (videoEl) {
              videoEl.pause();
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (videoEl) {
      observer.observe(videoEl);
    }

    return () => {
      if (videoEl) observer.unobserve(videoEl);
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
