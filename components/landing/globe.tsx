"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function EarthGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]); // Parallax effect

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 3,
      baseColor: [0.05, 0.05, 0.05],
      markerColor: [1, 1, 1],
      glowColor: [0.1, 0.1, 0.1],
      markers: [
        // Major city clusters
        { location: [37.7595, -122.4367], size: 0.03 }, // SF
        { location: [40.7128, -74.0060], size: 0.04 }, // NY
        { location: [51.5074, -0.1278], size: 0.04 }, // London
        { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
        { location: [-23.5505, -46.6333], size: 0.04 }, // Sao Paulo
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
      ],
      // @ts-ignore
      onRender: (state: any) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.002;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <motion.div 
        style={{ y }}
        className="relative w-[150%] md:w-[80%] lg:w-[60%] aspect-square opacity-[0.15] translate-y-1/4"
      >
        <canvas
          ref={canvasRef}
          style={{ width: 100 + '%', height: 100 + '%', contain: 'layout paint size' }}
        />
        
        {/* Telemetry Overlays */}
        <div className="absolute top-1/4 left-[10%] text-[10px] font-mono text-white/50 flex flex-col gap-1 tracking-widest hidden md:flex">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" /> SAT-LINK_ESTABLISHED</span>
          <span>LAT: 40.7128</span>
          <span>LNG: -74.0060</span>
          <span>CO2_PPM: 419.3</span>
          <span className="mt-2 text-white/30 border-t border-white/10 pt-1">SYS_OP: NORMAL</span>
        </div>

        <div className="absolute bottom-1/3 right-[10%] text-[10px] font-mono text-white/50 flex flex-col gap-1 tracking-widest text-right hidden md:flex">
          <span className="flex items-center justify-end gap-2">GLOBAL_TEMPS <div className="w-1 h-1 bg-white" /></span>
          <span>+1.2°C YOY</span>
          <span>GRID_LOAD: 84%</span>
          <span className="mt-2 text-white/30 border-t border-white/10 pt-1">TELEMETRY_SYNC</span>
        </div>
      </motion.div>
    </div>
  );
}
