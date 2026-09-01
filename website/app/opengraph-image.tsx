import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "r3 - Persistent memory for AI assistants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090b",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontFamily: "monospace",
              color: "#62666d",
              fontWeight: 500,
            }}
          >
            n3wth/r3
          </div>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#f2f3f5",
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            Persistent memory for AI
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
