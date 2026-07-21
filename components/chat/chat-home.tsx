"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import ChatInput from "@/components/chat/chat-input";
import ChatBubble from "@/components/chat/chat-bubble";
import { findExactSlashCommand } from "@/lib/chat-commands";
import { PROJECTS, SITE, SKILLS } from "@/constants/data";
import type { ChatMessage } from "@/types";

const SUGGESTION_CHIPS = [
  { label: "Show me your projects", value: "/projects" },
  { label: "Tell me about your skills", value: "/skills" },
  { label: "Who are you?", value: "/about" },
  { label: "How can I contact you?", value: "/contact" },
];

export default function ChatHome() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);
  const started = messages.length > 0;

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(raw: string) {
    setError("");
    const slash = findExactSlashCommand(raw);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: raw }];
    setMessages(nextMessages);
    setLoading(true);

    let placeholderAdded = false;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "The assistant is unavailable right now.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "", kind: slash?.kind }]);
      placeholderAdded = true;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc, kind: slash?.kind };
          return copy;
        });
      }
    } catch (err) {
      // If this was a slash command, always fall back to the reliable static
      // summary + structured block rather than surfacing an error — the
      // AI-generated intro is a nice-to-have, not a requirement, for these.
      if (slash) {
        const fallback: ChatMessage = {
          role: "assistant",
          content: slash.summary,
          kind: slash.kind,
        };
        setMessages((prev) =>
          placeholderAdded ? [...prev.slice(0, -1), fallback] : [...prev, fallback]
        );
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="main-content" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="prism-glow" aria-hidden="true" />

      <header className="relative z-10 flex items-center justify-between px-6 pt-8 sm:px-10">
        <p className="font-serif text-lg font-semibold text-[var(--color-purple)]">
          {SITE.name}
        </p>
        <Link
          href="/standard"
          data-cursor-hover
          className="flex items-center gap-1 font-mono text-xs text-white/50 hover:text-white"
        >
          Standard Mode <ArrowUpRight className="h-3 w-3" />
        </Link>
      </header>

      {!started ? (
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-16 sm:px-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            I&apos;m a {SITE.role.toLowerCase()} based in {SITE.location}. I
            build clean, responsive interfaces with Next.js and Tailwind, and
            full stack features — authentication, CRUD, databases — with
            Laravel and PHP. I like recreating premium interfaces to sharpen
            my eye for detail, like {PROJECTS[0]?.title}, and shipping real,
            working systems end to end, like {PROJECTS[3]?.title}. I know{" "}
            {SKILLS.length}+ tools across the stack, and I&apos;m always
            looking for the next thing to build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-serif text-sm text-white/60"
          >
            <span className="font-semibold text-white">
              Try typing slash commands like:
            </span>{" "}
            <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-white/70">
              /about
            </span>
            ,{" "}
            <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-white/70">
              /projects
            </span>
            ,{" "}
            <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-white/70">
              /skills
            </span>
            ,{" "}
            <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-white/70">
              /contact
            </span>
            .
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40"
          >
            <span>
              Contact me via{" "}
              <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-white">
                {SITE.email}
              </a>
            </span>
            <span className="flex items-center gap-1">
              Scroll <ChevronDown className="h-3 w-3" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <ChatInput onSubmit={handleSubmit} disabled={loading} />

            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => handleSubmit(chip.value)}
                  data-cursor-hover
                  className="glass rounded-full px-4 py-2 text-xs text-white/70 transition-colors hover:text-white"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-[11px] text-white/30">
              This portfolio uses AI to respond to your queries and may
              occasionally make mistakes.
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pb-6 sm:px-0">
          <div ref={threadRef} className="flex-1 space-y-4 overflow-y-auto py-8">
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} />
            ))}
            {loading && messages[messages.length - 1]?.content === "" && (
              <div className="max-w-[75%] rounded-2xl rounded-tl-sm border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/40">
                …
              </div>
            )}
            {error && (
              <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}
          </div>
          <div className="sticky bottom-6">
            <ChatInput onSubmit={handleSubmit} disabled={loading} />
          </div>
        </div>
      )}
    </div>
  );
}
