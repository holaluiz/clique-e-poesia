import React from "react";

// Formatação simples do editor: ## subtítulo, **negrito**, *itálico*, > citação, - lista,
// [texto](link) e ![legenda](foto). O React escapa todo o resto, então não há HTML livre.

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;
const IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

function safeUrl(url: string) {
  return /^(https?:\/\/|\/|#|mailto:)/i.test(url) ? url : null;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const href = safeUrl(link[2]);
      if (!href) return link[1];
      const external = /^https?:\/\//i.test(href);
      return (
        <a key={key} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

function renderLines(text: string, keyPrefix: string) {
  return text.split("\n").flatMap((line, index) => [
    ...(index > 0 ? [<br key={`${keyPrefix}-br-${index}`} />] : []),
    ...renderInline(line, `${keyPrefix}-${index}`),
  ]);
}

export const PostContent: React.FC<{ content: string; className?: string }> = ({ content, className = "" }) => {
  const blocks = content.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);

  return (
    <div className={`blog-prose ${className}`}>
      {blocks.map((block, index) => {
        const key = `b${index}`;

        const image = block.match(IMAGE);
        if (image) {
          const src = safeUrl(image[2]);
          if (!src) return null;
          return (
            <figure key={key}>
              <img src={src} alt={image[1]} loading="lazy" decoding="async" />
              {image[1] && <figcaption>{image[1]}</figcaption>}
            </figure>
          );
        }
        if (block.startsWith("### ")) return <h3 key={key}>{renderInline(block.slice(4), key)}</h3>;
        if (block.startsWith("## ")) return <h2 key={key}>{renderInline(block.slice(3), key)}</h2>;
        if (block.startsWith(">")) {
          const quote = block.split("\n").map((line) => line.replace(/^>\s?/, "")).join("\n");
          return <blockquote key={key}>{renderLines(quote, key)}</blockquote>;
        }
        if (block.split("\n").every((line) => /^[-•]\s/.test(line))) {
          return (
            <ul key={key}>
              {block.split("\n").map((line, item) => (
                <li key={`${key}-${item}`}>{renderInline(line.replace(/^[-•]\s/, ""), `${key}-${item}`)}</li>
              ))}
            </ul>
          );
        }
        return <p key={key}>{renderLines(block, key)}</p>;
      })}
    </div>
  );
};
