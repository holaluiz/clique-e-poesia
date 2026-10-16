import React, { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { listCategories, SEO_DESCRIPTION_LIMIT, SEO_TITLE_LIMIT, type BlogCategory } from "../../lib/blog";
import { inputClass } from "./ui";

/** Bloco da coluna lateral do editor, com título. */
export const SettingsCard: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section className="rounded-[8px] bg-white border border-[#171713]/8">
    <header className="px-5 py-3.5 border-b border-[#171713]/8">
      <h2 className="text-[14px] font-medium">{title}</h2>
      {description && <p className="text-[12px] text-[#171713]/50">{description}</p>}
    </header>
    <div className="p-5 space-y-5">{children}</div>
  </section>
);

/** Contador de caracteres que fica laranja quando passa do limite recomendado. */
export const CharCount: React.FC<{ value: string; limit: number }> = ({ value, limit }) => (
  <span className={`text-[12px] tabular-nums ${value.length > limit ? "text-[#B5651D] font-medium" : "text-[#171713]/45"}`}>
    {value.length}/{limit}
  </span>
);

export const CategoryPicker: React.FC<{ value: string[]; onChange: (ids: string[]) => void }> = ({ value, onChange }) => {
  const [categories, setCategories] = useState<BlogCategory[] | null>(null);

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const toggle = (id: string) => onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id]);

  return (
    <fieldset className="space-y-2">
      <legend className="flex w-full items-center justify-between text-[13px] font-medium text-[#171713]/80">
        Categorias
        <a href="/admin/categorias" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12px] font-normal text-[#384936] hover:underline">
          Gerenciar <ExternalLink size={11} />
        </a>
      </legend>
      {categories === null ? (
        <p className="text-[13px] text-[#171713]/45">Carregando…</p>
      ) : (
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((category) => {
            const checked = value.includes(category.id);
            return (
              <label
                key={category.id}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] cursor-pointer transition-colors ${
                  checked ? "border-[#384936] bg-[#384936] text-white" : "border-[#171713]/15 text-[#171713]/75 hover:bg-[#171713]/4"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggle(category.id)} className="sr-only" />
                {category.name}
              </label>
            );
          })}
        </div>
      )}
      <span className="block text-[12px] text-[#171713]/50">Pode marcar mais de uma.</span>
    </fieldset>
  );
};

/** Campo de tags: digite e aperte Enter ou vírgula para adicionar. */
export const TagInput: React.FC<{ value: string[]; onChange: (tags: string[]) => void }> = ({ value, onChange }) => {
  const [draft, setDraft] = useState("");

  const add = (raw: string) => {
    const tags = raw
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean);
    const next = [...value];
    for (const tag of tags) {
      if (!next.some((existing) => existing.toLowerCase() === tag.toLowerCase())) next.push(tag);
    }
    onChange(next);
    setDraft("");
  };

  return (
    <label className="block space-y-1.5">
      <span className="block text-[13px] font-medium text-[#171713]/80">Tags</span>
      <div className={`${inputClass} !p-2 flex flex-wrap items-center gap-1.5 focus-within:border-[#384936] focus-within:ring-2 focus-within:ring-[#384936]/20`}>
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#171713]/6 pl-2.5 pr-1 py-0.5 text-[13px]">
            #{tag}
            <button
              type="button"
              aria-label={`Remover a tag ${tag}`}
              onClick={() => onChange(value.filter((item) => item !== tag))}
              className="p-0.5 rounded-full hover:bg-[#171713]/10"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => (e.target.value.includes(",") ? add(e.target.value) : setDraft(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (draft.trim()) add(draft);
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={() => draft.trim() && add(draft)}
          placeholder={value.length ? "" : "ex.: serra, lareira, casal"}
          className="flex-1 min-w-[120px] bg-transparent px-1 py-0.5 text-[14.5px] focus:outline-none"
        />
      </div>
      <span className="block text-[12px] text-[#171713]/50">Digite e aperte Enter ou vírgula para adicionar.</span>
    </label>
  );
};

/** Prévia de como o texto aparece numa busca do Google. */
export const GooglePreview: React.FC<{ title: string; description: string; url: string }> = ({ title, description, url }) => {
  const cut = (text: string, limit: number) => (text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text);
  return (
    <div className="rounded-[8px] border border-[#171713]/10 bg-[#FAFAF8] p-3.5 space-y-0.5">
      <div className="text-[11px] uppercase tracking-[0.08em] text-[#171713]/40 pb-1">Prévia no Google</div>
      <div className="text-[12.5px] text-[#4d5156] truncate">{url}</div>
      <div className="text-[17px] leading-snug text-[#1a0dab] line-clamp-2">{cut(title || "Título do texto", SEO_TITLE_LIMIT + 5)}</div>
      <div className="text-[13px] leading-snug text-[#4d5156] line-clamp-3">
        {description ? cut(description, SEO_DESCRIPTION_LIMIT + 5) : "Escreva a descrição SEO ou o resumo para aparecer aqui."}
      </div>
    </div>
  );
};

/** Data (YYYY-MM-DD, fuso local) ↔ ISO; meio-dia evita virar o dia por causa do fuso. */
export function isoToDateInput(iso: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function dateInputToIso(value: string) {
  return value ? new Date(`${value}T12:00:00`).toISOString() : null;
}

export { SEO_DESCRIPTION_LIMIT, SEO_TITLE_LIMIT };
