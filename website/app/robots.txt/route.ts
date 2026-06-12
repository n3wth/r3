export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://r3.n3wth.com/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
}
