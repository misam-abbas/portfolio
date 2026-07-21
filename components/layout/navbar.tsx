"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollYProgress, scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  function isLinkActive(href: string) {
    if (href.startsWith("#")) return active === href.slice(1);
    return pathname.startsWith(href);
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (latest > prev && latest > 200) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    const sections = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
      l.href.slice(1)
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on outside click and Escape, matching the
  // dismiss behavior of every other overlay on the site.
  useEffect(() => {
    if (!mobileOpen) return;

    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(target) &&
        !toggleButtonRef.current?.contains(target)
      ) {
        setMobileOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-portfolio pt-4">
        <div
          className={cn(
            "glass flex items-center justify-between rounded-2xl px-4 py-3 transition-shadow",
            scrolled && "shadow-[0_8px_40px_-12px_rgba(124,58,237,0.35)]"
          )}
        >
          <Link
            href="#hero"
            data-cursor-hover
            className="font-display text-lg font-bold tracking-tight text-white"
          >
            {SITE.name.split(" ").map((n) => n[0]).join("")}
            <span className="text-[var(--color-cyan)]">.</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm text-white/70 transition-colors hover:text-white",
                  isLinkActive(link.href) && "text-white"
                )}
              >
                {isLinkActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ duration: 0.25 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              data-cursor-hover
              className="glass flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs text-white/60 hover:text-white"
            >
              Chat Mode <ArrowUpRight className="h-3 w-3" />
            </Link>
            <Link
              href="#contact"
              data-cursor-hover
              className="rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)] px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              Let&apos;s talk
            </Link>
          </div>

          <button
            ref={toggleButtonRef}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              ref={mobileNavRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/5",
                    isLinkActive(link.href) && "bg-white/10 text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center gap-1.5 rounded-lg border-t border-white/10 px-3 py-2.5 pt-3 text-sm text-white/60"
              >
                Chat Mode <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-[var(--color-purple)] via-[var(--color-cyan)] to-[var(--color-blue)]"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  );
}
