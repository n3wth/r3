import { docsConfig } from "@/lib/docs-config";

export async function GET() {
  const baseUrl = "https://r3.n3wth.com";
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, changefreq: "monthly", priority: "1.0" },
  ];

  const docsPages = docsConfig.flatMap((section) =>
    section.items.map((item) => ({
      url: `${baseUrl}/docs/${item.slug}`,
      changefreq: "weekly",
      priority: "0.8",
    }))
  );

  const allPages = [...staticPages, ...docsPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
