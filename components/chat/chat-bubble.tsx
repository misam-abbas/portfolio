"use client";

import Link from "next/link";
import { ExternalLink, Github, Mail, Linkedin } from "lucide-react";
import { PROJECTS, SITE, SKILLS, SOCIAL_LINKS } from "@/constants/data";
import type { ChatMessage } from "@/types";

function ProjectsBlock() {
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {PROJECTS.map((p) => (
        <a
          key={p.slug}
          href={p.liveUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
          className="glass rounded-xl p-4 transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="font-serif text-sm font-semibold text-white">{p.title}</p>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/40" />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white/55">
            {p.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/45"
              >
                {t}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}

function SkillsBlock() {
  const grouped = SKILLS.reduce<Record<string, string[]>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] ?? []), s.name];
    return acc;
  }, {});

  return (
    <div className="mt-3 space-y-3">
      {Object.entries(grouped).map(([category, names]) => (
        <div key={category}>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-cyan)]">
            {category}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {names.map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AboutBlock() {
  return (
    <p className="mt-2 font-serif text-sm leading-relaxed text-white/75">
      I&apos;m a {SITE.role.toLowerCase()} based in {SITE.location}. I build
      clean, responsive interfaces with Next.js and Tailwind, and full stack
      features — auth, CRUD, databases — with Laravel and PHP. Ask me
      anything, or try <span className="text-[var(--color-cyan)]">/projects</span> or{" "}
      <span className="text-[var(--color-cyan)]">/skills</span> to see specifics.
    </p>
  );
}

function ContactBlock() {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <a
        href={`mailto:${SITE.email}`}
        data-cursor-hover
        className="glass flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs text-white/80 hover:text-white"
      >
        <Mail className="h-3.5 w-3.5" /> {SITE.email}
      </a>
      {SOCIAL_LINKS.filter((s) => s.icon !== "mail").map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
          className="glass flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs text-white/80 hover:text-white"
        >
          {s.icon === "github" ? (
            <Github className="h-3.5 w-3.5" />
          ) : (
            <Linkedin className="h-3.5 w-3.5" />
          )}
          {s.label}
        </a>
      ))}
      <Link
        href="/standard#contact"
        data-cursor-hover
        className="rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)] px-3.5 py-2 text-xs font-medium text-white"
      >
        Open contact form →
      </Link>
    </div>
  );
}

export default function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-sm text-white">
        {message.content}
      </div>
    );
  }

  return (
    <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-white/10 bg-black/30 px-4 py-3 sm:max-w-[75%]">
      <p className="text-sm leading-relaxed text-white/80">{message.content}</p>
      {message.kind === "projects" && <ProjectsBlock />}
      {message.kind === "skills" && <SkillsBlock />}
      {message.kind === "about" && <AboutBlock />}
      {message.kind === "contact" && <ContactBlock />}
    </div>
  );
}
