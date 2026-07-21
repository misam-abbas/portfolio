"use client";

import { motion } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
import type { Skill } from "@/types";

export default function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor-hover
      className="glass glow-border group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-transform duration-200 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-base font-semibold leading-snug text-white">
          {skill.name}
        </p>
        <span className="shrink-0 font-mono text-xs text-white/40">{skill.years}y</span>
      </div>

      <div className="mt-auto pt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)]"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-white/40">
          <span>{skill.level}% proficiency</span>
          <span>{skill.projects} projects</span>
        </div>
      </div>
    </motion.div>
  );
}
