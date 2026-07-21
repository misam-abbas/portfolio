"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ORBIT_TECH } from "@/constants/data";
import type { OrbitTech } from "@/types";

function OrbitNode({
  tech,
  radius,
  angleOffset,
  speed,
  onSelect,
  selected,
}: {
  tech: OrbitTech;
  radius: number;
  angleOffset: number;
  speed: number;
  onSelect: (t: OrbitTech) => void;
  selected: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angleOffset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.6) * 0.4;
    }
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(tech)}
        scale={hovered || selected ? 1.4 : 1}
      >
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={hovered || selected ? 1.1 : 0.4}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      <Html center distanceFactor={9} occlude={false}>
        <div
          className="pointer-events-none select-none whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white transition-opacity"
          style={{ opacity: hovered || selected ? 1 : 0.7 }}
        >
          {tech.name}
        </div>
      </Html>
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  return <Line points={points} color="#ffffff" transparent opacity={0.08} />;
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={0.6}
        wireframe
      />
    </mesh>
  );
}

function Scene({ onSelect, selected }: { onSelect: (t: OrbitTech) => void; selected: OrbitTech | null }) {
  const rings = [2.2, 3.4, 4.6];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#06B6D4" />
      <pointLight position={[-5, -3, -5]} intensity={30} color="#7C3AED" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
        rotateSpeed={0.5}
      />
      <CoreSphere />
      {rings.map((r) => (
        <OrbitRing key={r} radius={r} />
      ))}
      {ORBIT_TECH.map((tech, i) => {
        const ringIndex = i % rings.length;
        const radius = rings[ringIndex] ?? 3;
        const perRing = Math.ceil(ORBIT_TECH.length / rings.length);
        const angleOffset = (i % perRing) * ((Math.PI * 2) / perRing);
        const speed = 0.12 + ringIndex * 0.05;
        return (
          <OrbitNode
            key={tech.name}
            tech={tech}
            radius={radius}
            angleOffset={angleOffset}
            speed={ringIndex % 2 === 0 ? speed : -speed}
            onSelect={onSelect}
            selected={selected?.name === tech.name}
          />
        );
      })}
    </>
  );
}

export default function TechOrbitScene({
  onSelect,
  selected,
}: {
  onSelect: (t: OrbitTech) => void;
  selected: OrbitTech | null;
}) {
  return (
    <Canvas
      camera={{ position: [0, 3, 9], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene onSelect={onSelect} selected={selected} />
    </Canvas>
  );
}
