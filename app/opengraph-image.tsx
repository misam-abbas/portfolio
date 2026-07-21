import { ImageResponse } from "next/og";
import { SITE } from "@/constants/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(6,182,212,0.3), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              color: "#fff",
              fontSize: 26,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            MA
          </div>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 24 }}>
            {SITE.location}
          </span>
        </div>
        <div style={{ display: "flex", color: "#fff", fontSize: 64, fontWeight: 700 }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", color: "#06B6D4", fontSize: 32, marginTop: 12 }}>
          {SITE.role}
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            marginTop: 24,
            maxWidth: 800,
          }}
        >
          {SITE.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
