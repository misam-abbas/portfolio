"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] overflow-y-auto bg-black/85 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto my-8 w-[92%] max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-bg-secondary)]"
          >
            <div className="relative aspect-[16/8]">
              <Image
                src={project.image}
                alt={`${project.title} cover`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 800px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close project details"
                data-cursor-hover
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-white/40">
                    {project.timeline}
                  </p>
                </div>
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)] px-4 py-2 text-sm font-medium text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="glass flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-6 leading-relaxed text-white/70">
                {project.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--color-cyan)]">
                    Key Features
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--color-purple)]">
                    Challenges &amp; Solutions
                  </h4>
                  <ul className="mt-3 space-y-3 text-sm text-white/70">
                    {project.challenges.map((c, i) => (
                      <li key={c}>
                        <p className="text-white/50">Challenge: {c}</p>
                        <p className="mt-0.5">→ {project.solutions[i]}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {project.gallery.length > 1 && (
                <div className="mt-10">
                  <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-white/50">
                    Gallery
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.gallery.map((src, i) => (
                      <div
                        key={src + i}
                        className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                      >
                        <Image
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="240px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
