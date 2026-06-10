"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generated once at module load — avoids Math.random() during render
const COACH_PARTICLES_COUNT = 800;
const COACH_PARTICLE_POSITIONS = (() => {
  const p = new Float32Array(COACH_PARTICLES_COUNT * 3);
  for (let i = 0; i < COACH_PARTICLES_COUNT; i++) {
    const r = 2 * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    p[i * 3 + 2] = r * Math.cos(phi);
  }
  return p;
})();

interface CoachParticlesProps {
  isThinking: boolean;
}

function ParticleSwarm({ isThinking }: { isThinking: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Base rotation
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.05;

      // Pulse effect if thinking
      if (isThinking) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.2 + 1;
        pointsRef.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);
        pointsRef.current.rotation.y += delta * 0.5; // spin faster
      } else {
        pointsRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      }
    }

    if (materialRef.current) {
      const targetColor = isThinking ? new THREE.Color("#34d399") : new THREE.Color("#404040");
      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[COACH_PARTICLE_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.05}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function CoachParticles({ isThinking }: CoachParticlesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ParticleSwarm isThinking={isThinking} />
      </Canvas>
    </div>
  );
}
