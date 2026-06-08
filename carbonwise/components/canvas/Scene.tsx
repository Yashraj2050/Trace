"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Preload } from "@react-three/drei";
import { Earth } from "./Earth";
import { Suspense } from "react";

export function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Earth />
          </Float>
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
