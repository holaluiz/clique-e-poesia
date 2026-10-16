import React, { useMemo } from "react";
import DOMPurify from "dompurify";

// O texto vem do editor visual do painel como HTML. Antes de exibir, o DOMPurify remove qualquer
// coisa perigosa (scripts, eventos, iframes); depois as fotos com legenda viram <figure>.
const ALLOWED_TAGS = [
  "p", "br", "h2", "h3", "strong", "b", "em", "i", "u", "s", "a", "span",
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

  clean.querySelectorAll<HTMLElement>("[style]").forEach((element) => {
    // Só o alinhamento e a cor do texto passam; outros estilos colados de fora são descartados.
    const { textAlign, color } = element.style;
    element.removeAttribute("style");
    if (["left", "center", "right", "justify"].includes(textAlign)) element.style.textAlign = textAlign;
    if (/^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i.test(color)) element.style.color = color;
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

export const DEFAULT_TEXT_COLOR = "#20201b";
export const DEFAULT_LINK_COLOR = "#384936";

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

/** Cores gerais do texto (escolhidas no painel) como variáveis CSS usadas em blog.css. */
export function postColorStyle(textColor?: string | null, linkColor?: string | null) {
  const style: Record<string, string> = {};
  if (textColor && HEX_COLOR.test(textColor)) style["--post-text"] = textColor;
  if (linkColor && HEX_COLOR.test(linkColor)) style["--post-link"] = linkColor;
  return style as React.CSSProperties;
}

export const PostContent: React.FC<{
  content: string;
  className?: string;
  textColor?: string | null;
  linkColor?: string | null;
}> = ({ content, className = "", textColor, linkColor }) => {
  const html = useMemo(() => toSafeHtml(content), [content]);
  return (
    <div
      className={`blog-prose ${className}`}
      style={postColorStyle(textColor, linkColor)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
