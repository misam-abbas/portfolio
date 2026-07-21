"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/constants/data";

export default function Footer() {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container-portfolio">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <Link
              href="#hero"
              data-cursor-hover
              className="font-display text-lg font-bold text-white"
            >
              {SITE.name}
            </Link>
            <p className="mt-2 max-w-xs text-sm text-white/50">
              {SITE.role} based in {SITE.location}, building thoughtful
              products end to end.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-2 text-center text-sm text-white/60 sm:text-left"
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} data-cursor-hover className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/60 hover:border-white/30 hover:text-white"
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <motion.button
            onClick={scrollTop}
            data-cursor-hover
            aria-label="Back to top"
            whileHover={{ y: -2 }}
            className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5"
          >
            Back to top <ArrowUp className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
