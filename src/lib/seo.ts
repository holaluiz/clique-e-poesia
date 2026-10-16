// Meta tags da página atual (título, descrição, imagem de compartilhamento, canonical).
// O servidor já entrega as dos textos do blog prontas (api/blog-page.ts); aqui elas acompanham a
// navegação dentro do site, sem recarregar a página.

export interface PageMeta {
  title: string;
  description?: string;
  image?: string | null;
  path?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

function element(selector: string, create: () => HTMLElement, attr: "content" | "href") {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.append(el);
  }
  return { el, attr };
}

function meta(key: "name" | "property", value: string) {
  return element(
    `meta[${key}="${value}"]`,
    () => {
      const el = document.createElement("meta");
      el.setAttribute(key, value);
      return el;
    },
    "content",
  );
}

function set(target: { el: HTMLElement; attr: string }, value: string | null | undefined) {
  if (value) target.el.setAttribute(target.attr, value);
  else target.el.removeAttribute(target.attr);
}

// Valores originais do index.html, para voltar a eles ao sair de uma página.
const defaults = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
};

export function setPageMeta({ title, description, image, path, type = "website", noindex }: PageMeta) {
  const url = path ? new URL(path, window.location.origin).href : window.location.href;
  const text = description ?? defaults.description;
  document.title = title;
  set(meta("name", "description"), text);
  set(meta("property", "og:title"), title);
  set(meta("property", "og:description"), text);
  set(meta("property", "og:type"), type);
  set(meta("property", "og:url"), url);
  set(meta("property", "og:image"), image ?? null);
  set(meta("name", "twitter:title"), title);
  set(meta("name", "twitter:description"), text);
  set(meta("name", "twitter:image"), image ?? null);
  set(meta("name", "robots"), noindex ? "noindex, nofollow" : null);
  set(
    element(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement("link");
        el.rel = "canonical";
        return el;
      },
      "href",
    ),
    url,
  );
}

export function resetPageMeta() {
  setPageMeta({ title: defaults.title, description: defaults.description, path: "/" });
}
