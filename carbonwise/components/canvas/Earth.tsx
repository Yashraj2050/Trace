"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

export function Earth() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const distortRef = useRef<any>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1 based on a 400vh page height
      const progress = Math.min(window.scrollY / (window.innerHeight * 3), 1);
      setScrollY(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate particles
  const particlesCount = 4000;
  const positions = useMemo(() => {
    const p = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      // Base radius + noise
      const r = 2.2 + Math.random() * 0.8;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    // Continuous passive rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.08;
      atmosphereRef.current.rotation.z += delta * 0.03;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.02;
    }

    // Dynamic Transformations based on scroll progress
    // Target calculations
    const targetScale = 1 + scrollY * 1.5; // Earth gets bigger
    const targetX = scrollY > 0.5 ? (scrollY - 0.5) * -10 : 0; // Moves left in later sections
    const targetWireframe = scrollY < 0.2; // Starts wireframe, becomes solid

    // Interpolate group scale and position
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      groupRef.current.position.lerp(new THREE.Vector3(targetX, 0, 0), 0.05);
    }

    // Interpolate Materials
    if (materialRef.current) {
      const colorProgress = scrollY;
      // Start Dark/Polluted (#050505) -> Clean/Vibrant (#022c22)
      const targetColor = new THREE.Color().lerpColors(
        new THREE.Color("#050505"),
        new THREE.Color("#022c22"),
        colorProgress
      );
      materialRef.current.color.lerp(targetColor, 0.05);
      // Ensure typescript ignores the boolean assignment error for wireframe during transition
      // We snap wireframe on/off
      materialRef.current.wireframe = targetWireframe;
    }

    if (distortRef.current) {
      // Atmosphere starts chaotic, calms down
      const targetDistort = 0.6 - (scrollY * 0.4);
      distortRef.current.distort = THREE.MathUtils.lerp(distortRef.current.distort, targetDistort, 0.05);
      
      const targetColor = new THREE.Color().lerpColors(
        new THREE.Color("#ef4444"), // Red/polluted
        new THREE.Color("#10b981"), // Emerald/clean
        scrollY
      );
      distortRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Planet */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          ref={materialRef}
          color="#050505"
          roughness={0.7}
          metalness={0.3}
          wireframeLinewidth={1}
        />
      </Sphere>

      {/* Atmospheric Glow/Distortion */}
      <Sphere ref={atmosphereRef} args={[2.08, 64, 64]}>
        <MeshDistortMaterial
          ref={distortRef}
          color="#ef4444"
          transparent
          opacity={0.15}
          roughness={0.1}
          distort={0.6}
          speed={3}
        />
      </Sphere>

      {/* Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#ffffff"
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#10b981" />
    </group>
  );
}
