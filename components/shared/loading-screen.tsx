"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

function getInitialPoints(canvas: HTMLCanvasElement, text: string): Point[] {
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.min(width / 4, 160)}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const imageData = ctx.getImageData(0, 0, width, height);
  const points: Point[] = [];
  const gap = 5;
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const alpha = imageData.data[(y * width + x) * 4 + 3];
      if (alpha && alpha > 128) {
        points.push({ x, y });
      }
    }
  }
  ctx.clearRect(0, 0, width, height);
  return points;
}

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.min(window.innerWidth, 900);
    const height = 260;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const offscreen = document.createElement("canvas");
    offscreen.width = width * dpr;
    offscreen.height = height * dpr;

    const targets = getInitialPoints(offscreen, "MA").map((p) => ({
      x: p.x / dpr,
      y: p.y / dpr,
    }));

    const particles = targets.map((t) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      tx: t.x,
      ty: t.y,
      vx: 0,
      vy: 0,
    }));

    let frame = 0;
    let raf: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      frame++;
      let settled = 0;

      particles.forEach((p, i) => {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.02;
        p.vy += dy * 0.02;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(dx) < 0.6 && Math.abs(dy) < 0.6) settled++;

        const hue = (i / particles.length) * 60 + 190;
        ctx.fillStyle = `hsl(${hue}, 90%, 65%)`;
        ctx.fillRect(p.x, p.y, 2, 2);
      });

      const pct = Math.min(100, Math.round((settled / particles.length) * 100));
      setProgress((prev) => (pct > prev ? pct : prev));

      if (frame < 180 && settled < particles.length * 0.98) {
        raf = requestAnimationFrame(draw);
      } else {
        setProgress(100);
      }
    }

    if (particles.length === 0) {
      // Font metrics unavailable (e.g. reduced environments) — skip straight to 100%.
      setProgress(100);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 700);
    }, 400);
    return () => clearTimeout(t);
  }, [progress, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-[var(--color-bg)]"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <canvas ref={canvasRef} className="max-w-full" aria-hidden="true" />
          <div className="w-48 font-mono text-xs tracking-widest text-white/60">
            <div className="mb-2 flex justify-between">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-px bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="sr-only" role="status">
            Loading portfolio, {progress} percent complete
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
