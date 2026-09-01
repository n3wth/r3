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
          gap: "48px",
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 24 L36 68 L47 57 L54 74 L61 71 L54 54 L70 54 Z"
            fill="#f2f3f5"
          />
        </svg>
        <div
          style={{
            fontSize: "96px",
            fontWeight: 700,
            color: "#f2f3f5",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          r3
        </div>
      </div>
    ),
    { ...size },
  );
}
