"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/section-heading";
import SkillCard from "@/components/sections/skill-card";
import { SKILLS } from "@/constants/data";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  cloud: "Cloud",
  ai: "AI",
  tools: "Tools",
};

const CATEGORIES: { label: string; value: SkillCategory | "all" }[] = [
  { label: "All", value: "all" },
  ...Array.from(new Set(SKILLS.map((s) => s.category))).map((cat) => ({
    label: CATEGORY_LABELS[cat],
    value: cat,
  })),
];

export default function Skills() {
  const [active, setActive] = useState<SkillCategory | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? SKILLS : SKILLS.filter((s) => s.category === active)),
    [active]
  );

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for"
          description="Proficiency reflects hands-on production use, not just familiarity."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              data-cursor-hover
              className={cn(
                "relative rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white",
                active === c.value && "text-white"
              )}
            >
              {active === c.value && (
                <motion.span
                  layoutId="skill-cat-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)]"
                  transition={{ duration: 0.25 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
