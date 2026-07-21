"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { matchSlashCommands, SLASH_COMMANDS } from "@/lib/chat-commands";

export default function ChatInput({
  onSubmit,
  disabled,
}: {
  onSubmit: (value: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = matchSlashCommands(value);
  const showDropdown = value.startsWith("/") && suggestions.length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [value]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
  }

  function selectSuggestion(command: string) {
    submit(command);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (showDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % suggestions.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        const chosen = suggestions[activeIndex];
        if (chosen) selectSuggestion(chosen.command);
        return;
      }
    }
    if (e.key === "Enter" && !showDropdown) {
      e.preventDefault();
      submit(value);
    }
  }

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full z-20 mb-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-bg-secondary)] shadow-2xl"
            role="listbox"
          >
            {suggestions.map((s, i) => (
              <button
                key={s.command}
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => selectSuggestion(s.command)}
                data-cursor-hover
                className={`flex w-full items-center gap-4 px-4 py-3 text-left transition-colors ${
                  i === activeIndex ? "bg-white/10" : ""
                }`}
              >
                <span className="font-mono text-sm text-[var(--color-purple)]">
                  {s.command}
                </span>
                <span className="font-serif text-sm text-white/60">
                  {s.description}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="glass relative z-10 flex items-center gap-3 rounded-full px-5 py-4"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="What technologies do you use?"
          disabled={disabled}
          autoComplete="off"
          className="w-full bg-transparent font-serif text-base text-white outline-none placeholder:text-white/35 disabled:opacity-50"
          aria-label="Ask a question or type a slash command"
          aria-autocomplete="list"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          data-cursor-hover
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-2 text-center font-mono text-[10px] text-white/25">
        Slash commands: {SLASH_COMMANDS.map((c) => c.command).join(" · ")}
      </p>
    </div>
  );
}
