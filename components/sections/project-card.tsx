"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useTilt } from "@/hooks/use-tilt";
import type { Project } from "@/types";

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group glass glow-border relative flex h-full flex-col overflow-hidden rounded-3xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      <button
        onClick={() => onOpen(project)}
        data-cursor-hover
        className="flex h-full w-full flex-col text-left"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-white">
              {project.title}
            </h3>
            <div className="flex shrink-0 gap-2">
              {project.liveUrl && (
                <span className="rounded-full bg-white/10 p-1.5">
                  <ExternalLink className="h-3.5 w-3.5 text-white/70" />
                </span>
              )}
              {project.githubUrl && (
                <span className="rounded-full bg-white/10 p-1.5">
                  <Github className="h-3.5 w-3.5 text-white/70" />
                </span>
              )}
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-white/60">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
}
