export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /logo-preview

Sitemap: https://r3.n3wth.com/sitemap.xml
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
