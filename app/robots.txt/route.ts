// /app/robots.txt/route.ts
export async function GET() {
  const body = `
  User-agent: *
  Allow: /
  
  Sitemap: https://mohamedkadi.com/sitemap.xml
  `;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
