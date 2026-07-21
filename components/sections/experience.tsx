"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/section-heading";
import { EXPERIENCE } from "@/constants/data";

export default function Experience() {
  if (EXPERIENCE.length === 0) return null;

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Six years of moving from implementation to ownership."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-[var(--color-purple)] via-[var(--color-cyan)] to-transparent sm:left-[11px]" />

          <div className="space-y-10">
            {EXPERIENCE.map((item, i) => (
              <motion.div
                key={item.role + item.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-8 sm:pl-10"
              >
                <span className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[var(--color-bg)] ring-2 ring-[var(--color-cyan)] sm:h-[23px] sm:w-[23px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                </span>

                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-white/40">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-[var(--color-cyan)]">
                    {item.company} · {item.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-white/50">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
