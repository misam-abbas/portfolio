"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useLenis } from "@/hooks/use-lenis";
import CustomCursor from "@/components/shared/cursor";
import CommandPalette from "@/components/shared/command-palette";
import KonamiCode from "@/components/shared/konami-code";

export default function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <KonamiCode />
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
