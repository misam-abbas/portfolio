"use client";

import { useState } from "react";
import LoadingScreen from "@/components/shared/loading-screen";
import Providers from "@/components/layout/providers";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <Providers>{children}</Providers>
      </div>
    </>
  );
}
