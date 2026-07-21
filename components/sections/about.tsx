"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarCheck } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import AnimatedCounter from "@/components/shared/animated-counter";
import { PROJECTS, SITE, SKILLS } from "@/constants/data";

const stats = [
  { label: "Projects built", value: PROJECTS.length, suffix: "+" },
  { label: "Core technologies", value: SKILLS.length, suffix: "+" },
  { label: "Frontend & backend", value: 2, suffix: "" },
  { label: "Always learning", value: 1, suffix: "" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="About"
          title="Building products, not just interfaces"
          description="A snapshot of who I am, what I do, and how I work."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass glow-border rounded-3xl p-8 lg:col-span-3"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-purple)] to-[var(--color-cyan)] font-display text-xl font-bold text-white">
                {SITE.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  {SITE.name}
                </p>
                <p className="text-sm text-white/50">{SITE.role}</p>
              </div>
            </div>

            <p className="leading-relaxed text-white/70">
              I&apos;m a vibe coder and web developer who cares about the
              details users never consciously notice as much as the ones
              they do. I build clean, responsive interfaces with Next.js and
              Tailwind, and full stack features — auth, CRUD, databases —
              with Laravel and PHP.
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              I like recreating premium interfaces to sharpen my eye for
              detail (like {PROJECTS[0]?.title}), and building real, working
              systems end to end, like {PROJECTS[3]?.title}.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {SITE.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4 text-emerald-400" />{" "}
                {SITE.availability}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4 lg:col-span-2"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass flex flex-col justify-center rounded-2xl p-6"
              >
                <p className="font-display text-3xl font-bold text-gradient">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
