import React, { useMemo } from "react";
import DOMPurify from "dompurify";

// O texto vem do editor visual do painel como HTML. Antes de exibir, o DOMPurify remove qualquer
// coisa perigosa (scripts, eventos, iframes); depois as fotos com legenda viram <figure>.
const ALLOWED_TAGS = [
  "p", "br", "h2", "h3", "strong", "b", "em", "i", "u", "s", "a",
  "ul", "ol", "li", "blockquote", "hr", "img", "figure", "figcaption",
];
const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title", "style", "loading"];

function toSafeHtml(content: string) {
  const html = content.trim().startsWith("<")
    ? content
    : content
        .split(/\n\s*\n/)
        .map((paragraph) => `<p>${paragraph.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")}</p>`)
        .join("");

  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR, RETURN_DOM_FRAGMENT: true });

  clean.querySelectorAll("[style]").forEach((element) => {
    // Só o alinhamento do texto passa; outros estilos colados de fora são descartados.
    const align = (element as HTMLElement).style.textAlign;
    element.removeAttribute("style");
    if (align && ["left", "center", "right", "justify"].includes(align)) (element as HTMLElement).style.textAlign = align;
  });

  // Link externo (escolhido no editor) abre em nova aba; interno abre na mesma.
  clean.querySelectorAll("a[href]").forEach((link) => {
    if (link.getAttribute("target") === "_blank") {
      link.setAttribute("rel", "noopener noreferrer");
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  });

  clean.querySelectorAll("img").forEach((image) => {
    image.setAttribute("loading", "lazy");
    image.setAttribute("decoding", "async");
    const caption = image.getAttribute("title")?.trim();
    image.removeAttribute("title");
    if (!caption || image.parentElement?.tagName === "FIGURE") return;
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;
    image.replaceWith(figure);
    figure.append(image, figcaption);
  });

  const container = document.createElement("div");
  container.append(clean);
  return container.innerHTML;
}

export const PostContent: React.FC<{ content: string; className?: string }> = ({ content, className = "" }) => {
  const html = useMemo(() => toSafeHtml(content), [content]);
  return <div className={`blog-prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
};
