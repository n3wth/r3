import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AxiomWebVitals } from "next-axiom";
import { PostHogProvider } from "../components/PostHogProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload if needed
});

export const metadata: Metadata = {
  metadataBase: new URL("https://r3.n3wth.com"),
  title: {
    default: "n3wth/r3 - Persistent memory for AI assistants",
    template: "%s - n3wth/r3",
  },
  description:
    "An MCP server that gives Claude, Gemini, and GPT memory that survives between sessions. Local Redis, vector search, and knowledge graphs with zero configuration.",
  keywords: [
    "r3",
    "MCP server",
    "AI memory",
    "Redis",
    "vector search",
    "Claude",
    "Gemini",
    "GPT",
    "persistent memory",
  ],
  authors: [{ name: "Oliver Newth" }],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "n3wth/r3 - Persistent memory for AI assistants",
    description:
      "An MCP server that gives Claude, Gemini, and GPT memory that survives between sessions. Install with npx @n3wth/r3.",
    url: "https://r3.n3wth.com",
    siteName: "n3wth/r3",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "n3wth/r3 - Persistent memory for AI assistants",
    description:
      "An MCP server that gives Claude, Gemini, and GPT memory that survives between sessions. Install with npx @n3wth/r3.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <AxiomWebVitals />
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#08090b" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }

              // Preload critical resources
              const linkPrefetch = document.createElement('link');
              linkPrefetch.rel = 'prefetch';
              linkPrefetch.href = '/docs';
              document.head.appendChild(linkPrefetch);
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <PostHogProvider>
          {children}
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
