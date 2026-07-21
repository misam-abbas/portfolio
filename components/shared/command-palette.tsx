"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/constants/data";

interface Command {
  label: string;
  hint?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onStandard = pathname.startsWith("/standard");

  const commands: Command[] = [
    { label: "Switch to Chat Mode", action: () => router.push("/") },
    { label: "Switch to Standard Mode", action: () => router.push("/standard") },
    ...NAV_LINKS.map((link) => ({
      label: `Go to ${link.label}`,
      action: () => {
        if (link.href.startsWith("/")) {
          router.push(link.href);
          return;
        }
        if (onStandard) {
          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(`/standard${link.href}`);
        }
      },
    })),
    ...SOCIAL_LINKS.map((s) => ({
      label: `Open ${s.label}`,
      hint: s.href,
      action: () => window.open(s.href, "_blank"),
    })),
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-start justify-center bg-black/70 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="glass w-full max-w-lg rounded-2xl p-2 shadow-2xl"
            initial={{ scale: 0.96, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-3">
              <Search className="h-4 w-4 text-white/50" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/40 sm:text-sm"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/40">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-white/40">
                  No matching commands.
                </li>
              )}
              {filtered.map((c) => (
                <li key={c.label}>
                  <button
                    onClick={() => {
                      c.action();
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    <span>{c.label}</span>
                    {c.hint && <span className="text-xs text-white/30">{c.hint}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
