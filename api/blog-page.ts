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

const SITE_NAME = "Clique e Poesia";

// Entrega /blog/:slug com título, descrição, imagem e dados estruturados já no HTML,
// para Google, WhatsApp e Facebook lerem sem rodar JavaScript. O resto da página é o site normal.

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  published_at: string | null;
  updated_at: string;
}

const COLUMNS = "slug,title,excerpt,cover_url,seo_title,seo_description,tags,published_at,updated_at";

/** Troca as meta tags genéricas do index.html pelas do texto. */
export function injectPostMeta(html: string, post: PostMeta, origin: string) {
  const url = `${origin}/blog/${post.slug}`;
  const title = post.seo_title?.trim() || `${post.title} — ${SITE_NAME}`;
  const description = post.seo_description?.trim() || post.excerpt?.trim() || "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: description || undefined,
    image: post.cover_url || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${origin}/isotipo-clique-poesia.png` } },
  };

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    description && `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    description && `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    post.cover_url && `<meta property="og:image" content="${escapeHtml(post.cover_url)}" />`,
    post.cover_url && `<meta property="og:image:width" content="1000" />`,
    post.cover_url && `<meta property="og:image:height" content="663" />`,
    post.published_at && `<meta property="article:published_time" content="${escapeHtml(post.published_at)}" />`,
    ...(post.tags ?? []).map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`),
    `<meta name="twitter:card" content="${post.cover_url ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    description && `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    post.cover_url && `<meta name="twitter:image" content="${escapeHtml(post.cover_url)}" />`,
    // "<" escapado para o JSON nunca fechar a tag <script> antes da hora.
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].filter(Boolean);

  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+(name|property)="(description|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<\/head>/i, `    ${tags.join("\n    ")}\n  </head>`);
}

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  const shell = await fetch(`${origin}/index.html`);
  const html = await shell.text();
  const headers = { "Content-Type": "text/html; charset=utf-8", ...CACHE_HEADERS };

  // Endereço que nem pode existir (a regra do banco só aceita letras, números e hífens).
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return new Response(html, { status: 404, headers });

  try {
    const [post] = await supabaseGet<PostMeta[]>(
      `posts?select=${COLUMNS}&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    );
    // Sem texto publicado: a página do site mostra "não está por aqui"; o 404 avisa o Google.
    if (!post) return new Response(html, { status: 404, headers });
    return new Response(injectPostMeta(html, post, origin), { status: 200, headers });
  } catch {
    // Se o Supabase falhar, entrega o site normal: o texto ainda carrega pelo navegador.
    return new Response(html, { status: 200, headers: { ...headers, "Cache-Control": "no-store" } });
  }
}
