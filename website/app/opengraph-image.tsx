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
          width="64"
          height="64"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 4L28 26H4L16 4Z" fill="#30d158" />
        </svg>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#f2f3f5",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          r3
        </div>
      </div>
    ),
    { ...size },
  );
}
