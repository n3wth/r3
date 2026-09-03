import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "r3 Documentation";

export default async function Image() {
  const [satoshiBold, satoshiRegular] = await Promise.all([
    readFile(join(process.cwd(), "fonts", "Satoshi-Bold.ttf")),
    readFile(join(process.cwd(), "fonts", "Satoshi-Regular.ttf")),
  ]);

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
          gap: "32px",
          padding: "80px",
        }}
      >
        <svg
          width="56"
          height="56"
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              fontFamily: "Satoshi",
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            r3 Documentation
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 400,
              fontFamily: "Satoshi",
              color: "#a1a1aa",
              textAlign: "center",
            }}
          >
            Persistent memory for AI assistants
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            fontSize: "18px",
            fontWeight: 500,
            fontFamily: "Satoshi",
            color: "#71717a",
          }}
        >
          n3wth/r3
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "18px",
            fontWeight: 500,
            fontFamily: "Satoshi",
            color: "#71717a",
          }}
        >
          r3.n3wth.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Satoshi",
          data: satoshiRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Satoshi",
          data: satoshiBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
