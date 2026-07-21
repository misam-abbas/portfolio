"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Code2,
  Gauge,
  Layers,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { SERVICES } from "@/constants/data";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  layers: Layers,
  "bar-chart": BarChart,
  server: Server,
  sparkles: Sparkles,
  gauge: Gauge,
};

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="From a single API to a full product, scoped to what you actually need."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Code2;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass glow-border group flex h-full flex-col rounded-2xl p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-purple)]/20 to-[var(--color-cyan)]/20">
                  <Icon className="h-5 w-5 text-[var(--color-cyan)]" />
                </div>
                <h3 className="font-display text-base font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{service.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-white/45">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
