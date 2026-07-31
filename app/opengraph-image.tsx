import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Compound Group — Consumer health, built honestly";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#F4F1EB",
          fontFamily: "Georgia, serif",
          color: "#1C1C1A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#1C1C1A",
              color: "#F4F1EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontStyle: "italic",
            }}
          >
            C
          </div>
          <div style={{ fontSize: 28, letterSpacing: -0.5 }}>
            The Compound Group
          </div>
        </div>

        <div
          style={{
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: -3,
            maxWidth: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Consumer health,</span>
          <span>
            built{" "}
            <span style={{ fontStyle: "italic", color: "#3B5D4F" }}>
              honestly.
            </span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#6B6A66",
          }}
        >
          <span>Independently operated · Est. 2026</span>
          <span style={{ fontStyle: "italic" }}>thecompoundgroup.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
