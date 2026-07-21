"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/section-heading";
import { ORBIT_TECH } from "@/constants/data";
import type { OrbitTech } from "@/types";

const TechOrbitScene = dynamic(
  () => import("@/components/three/tech-orbit-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
        Loading 3D scene…
      </div>
    ),
  }
);

export default function TechOrbit() {
  const [selected, setSelected] = useState<OrbitTech | null>(null);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="Tech Orbit"
          title="The stack, in orbit"
          description="Click a node to learn more. Drag to look around."
        />

        <div className="glass relative h-[480px] overflow-hidden rounded-3xl sm:h-[560px]">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Preparing scene…
              </div>
            }
          >
            <TechOrbitScene onSelect={setSelected} selected={selected} />
          </Suspense>

          <motion.div
            key={selected?.name ?? "empty"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs"
          >
            {selected ? (
              <div className="glass pointer-events-auto rounded-2xl p-4">
                <p className="font-display text-sm font-semibold text-white">
                  {selected.name}
                </p>
                <p className="mt-1 text-xs text-white/60">{selected.description}</p>
                <a
                  href={selected.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="mt-2 inline-block text-xs text-[var(--color-cyan)] hover:underline"
                >
                  Learn more →
                </a>
              </div>
            ) : (
              <div className="glass pointer-events-none rounded-2xl px-4 py-3 text-xs text-white/40">
                {ORBIT_TECH.length} technologies orbiting — click one to inspect it
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
