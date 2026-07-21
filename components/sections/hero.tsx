"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Mail } from "lucide-react";
import Link from "next/link";
import { ROLES, SITE, SOCIAL_LINKS } from "@/constants/data";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length] ?? "";
    const speed = deleting ? 40 : 80;
    const pause = 1600;

    const timeout = setTimeout(
      () => {
        if (!deleting && text === current) {
          setTimeout(() => setDeleting(true), pause);
          return;
        }
        if (deleting && text === "") {
          setDeleting(false);
          setWordIndex((i) => i + 1);
          return;
        }
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      },
      text === current && !deleting ? pause : speed
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -top-1/4 left-1/4 h-[60vw] w-[60vw] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-purple), transparent 70%)",
            transform: `translate(${(mouse.x - 0.5) * 40}px, ${(mouse.y - 0.5) * 40}px)`,
          }}
        />
        <div
          className="absolute -bottom-1/4 right-1/4 h-[50vw] w-[50vw] rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--color-cyan), transparent 70%)",
            transform: `translate(${(mouse.x - 0.5) * -30}px, ${(mouse.y - 0.5) * -30}px)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="container-portfolio">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/60"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {SITE.availability}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Hi, I&apos;m{" "}
          <span className="text-gradient">{SITE.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex h-8 items-center font-mono text-lg text-white/70 sm:text-xl"
        >
          <span aria-live="polite">{typed}</span>
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-[var(--color-cyan)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {SITE.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link
            href="#projects"
            data-cursor-hover
            className="rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)] px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_-8px_var(--color-purple)] transition-transform hover:scale-105"
          >
            View Projects
          </Link>
          <a
            href="/resume/misam-abbas-resume.pdf"
            download
            data-cursor-hover
            className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <a
            href={SOCIAL_LINKS[0]?.href}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="GitHub profile"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            href="#contact"
            data-cursor-hover
            aria-label="Contact me"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
