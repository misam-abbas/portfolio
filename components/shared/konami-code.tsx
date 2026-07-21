"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiCode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    function onKey(e: KeyboardEvent) {
      buffer = [...buffer, e.key].slice(-CODE.length);
      if (buffer.join(",") === CODE.join(",")) {
        setActive(true);
        setTimeout(() => setActive(false), 4000);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    /* eslint-disable no-console */
    console.log(
      "%cLooking for something?",
      "color:#06B6D4;font-size:20px;font-weight:bold;"
    );
    console.log(
      "%cTry the Konami code, or press \u2318K / Ctrl+K for the command palette.",
      "color:#9AA1AC;font-size:12px;"
    );
    console.log("%cmisamabb2@gmail.com", "color:#7C3AED;font-size:12px;");
    /* eslint-enable no-console */
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[400] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass rounded-2xl px-8 py-6 text-center"
            initial={{ scale: 0.8, rotate: -4 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >
            <p className="text-gradient font-display text-2xl font-bold">
              You found it. 🎮
            </p>
            <p className="mt-1 text-sm text-white/60">
              +30 lives. Thanks for exploring the console.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
