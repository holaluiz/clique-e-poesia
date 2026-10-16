// Cada função da Vercel é autocontida (imports relativos quebram no runtime ESM da Vercel).
// Mesmo projeto e chave publicável do site (src/lib/supabase.ts): só leem o que é público.
const SUPABASE_URL = "https://epgrrmieydprnpzqwonp.supabase.co";
const SUPABASE_KEY = "sb_publishable_hUrqAh1UOI3QI8AnaMcOKg_6Ods-Wdc";
/** Cache na CDN da Vercel: 5 min fresco, depois serve a cópia antiga enquanto atualiza. */
const CACHE_HEADERS = { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400" };

async function supabaseGet<T>(path: string): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}`);
  return (await response.json()) as T;
}

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// /sitemap.xml: lista para o Google com a página inicial, o blog e cada texto publicado.

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  let posts: { slug: string; updated_at: string }[] = [];
  try {
    posts = await supabaseGet("posts?select=slug,updated_at&status=eq.published&order=published_at.desc");
  } catch {
    // Sem o Supabase, o sitemap sai só com as páginas fixas.
  }

  const urls = [
    { loc: `${origin}/`, lastmod: undefined as string | undefined },
    { loc: `${origin}/blog`, lastmod: posts[0]?.updated_at },
    ...posts.map((post) => ({ loc: `${origin}/blog/${post.slug}`, lastmod: post.updated_at })),
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls.map(
      ({ loc, lastmod }) =>
        `  <url><loc>${escapeHtml(loc)}</loc>${lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ""}</url>`,
    ),
    `</urlset>`,
  ].join("\n");

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", ...CACHE_HEADERS } });
}
