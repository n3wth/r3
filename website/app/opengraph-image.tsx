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
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.4 6.6 25.2 14a1.5 1.5 0 0 1-.15 2.78l-6.1 1.78a2 2 0 0 0-1.32 1.24l-2.2 6.1c-.5 1.36-2.42 1.27-2.78-.15L8.0 8.2A1.6 1.6 0 0 1 9.4 6.6Z"
            fill="#ffffff"
          />
        </svg>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
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
