const CACHE_HEADERS = { "Cache-Control": "public, max-age=0, s-maxage=3600" };

// /robots.txt: libera o site para buscadores, esconde o painel e aponta o sitemap.

export function GET(request: Request) {
  const body = ["User-agent: *", "Allow: /", "Disallow: /admin", "", `Sitemap: ${new URL(request.url).origin}/sitemap.xml`, ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", ...CACHE_HEADERS } });
}
