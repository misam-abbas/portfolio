"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { CERTIFICATES } from "@/constants/data";

export default function Certificates() {
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);

  if (CERTIFICATES.length === 0) return null;

  function next() {
    setIndex((i) => (i + 1) % CERTIFICATES.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + CERTIFICATES.length) % CERTIFICATES.length);
  }

  const cert = CERTIFICATES[index];
  if (!cert) return null;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading eyebrow="Certificates" title="Credentials" />

        <div className="mx-auto flex max-w-lg items-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous certificate"
            data-cursor-hover
            className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.button
                key={cert.title}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setPreview(index)}
                data-cursor-hover
                className="glass glow-border block w-full rounded-2xl p-6 text-left"
              >
                <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-xl bg-white/5">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-6"
                    sizes="400px"
                  />
                </div>
                <p className="font-display text-sm font-semibold text-white">
                  {cert.title}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {cert.issuer} · {cert.date}
                </p>
              </motion.button>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            aria-label="Next certificate"
            data-cursor-hover
            className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {CERTIFICATES.map((c, i) => (
            <button
              key={c.title}
              onClick={() => setIndex(i)}
              aria-label={`Go to ${c.title}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-[var(--color-cyan)]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {preview !== null && CERTIFICATES[preview] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/85 p-6 backdrop-blur-md"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass relative max-w-lg rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                aria-label="Close preview"
                className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-white/5">
                <Image
                  src={CERTIFICATES[preview].image}
                  alt={CERTIFICATES[preview].title}
                  fill
                  className="object-contain p-8"
                  sizes="500px"
                />
              </div>
              <p className="mt-4 font-display text-base font-semibold text-white">
                {CERTIFICATES[preview].title}
              </p>
              <p className="text-sm text-white/50">
                {CERTIFICATES[preview].issuer} · {CERTIFICATES[preview].date}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
