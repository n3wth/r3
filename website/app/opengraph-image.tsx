import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "n3wth/r3 - Open-source persistent memory for AI assistants";
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
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontFamily: "monospace",
              color: "#787c83",
              fontWeight: 600,
            }}
          >
            n3wth/r3
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#f2f3f5",
              textAlign: "center",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Persistent memory for AI assistants
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#9aa0a8",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            Open-source MCP server with local Redis caching and vector search.
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {["Claude Code", "Gemini CLI", "MCP"].map((tool) => (
              <div
                key={tool}
                style={{
                  border: "1px solid rgba(255,255,255,0.17)",
                  borderRadius: "999px",
                  padding: "8px 20px",
                  fontSize: "16px",
                  color: "#62666d",
                }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
