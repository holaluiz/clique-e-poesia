import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Link2 } from "lucide-react";
import { listPublishedPosts } from "../../lib/blog";
import { Field, PrimaryButton, SecondaryButton, inputClass } from "./ui";

export interface LinkValue {
  href: string;
  newTab: boolean;
  text?: string;
}

interface LinkDialogProps {
  initialHref: string;
  initialNewTab: boolean | null;
  /** Sem texto selecionado: pede o texto que vai aparecer. */
  needsText: boolean;
  editing: boolean;
  onApply: (value: LinkValue) => void;
  onRemove: () => void;
  onCancel: () => void;
}

const SITE_HOSTS = ["cliqueepoesia.vercel.app", "clique-poesia.vercel.app"];

/** Completa endereços digitados sem https:// (ex.: www.instagram.com/...). */
export function normalizeHref(value: string) {
  const href = value.trim();
  if (!href) return "";
  if (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(href)) return href;
  if (/^[^\s/]+\.[^\s]+$/.test(href)) return `https://${href}`;
  return href;
}

/** Links para páginas do próprio site contam como internos. */
export function isInternalHref(value: string) {
  const href = normalizeHref(value);
  if (/^(\/|#)/.test(href)) return true;
  try {
    const host = new URL(href).host;
    return host === window.location.host || SITE_HOSTS.includes(host);
  } catch {
    return false;
  }
}

export const LinkDialog: React.FC<LinkDialogProps> = ({
  initialHref,
  initialNewTab,
  needsText,
  editing,
  onApply,
  onRemove,
  onCancel,
}) => {
  const [href, setHref] = useState(initialHref);
  const [text, setText] = useState("");
  const [newTab, setNewTab] = useState(initialNewTab ?? (initialHref ? !isInternalHref(initialHref) : true));
  const [typeTouched, setTypeTouched] = useState(initialNewTab !== null);
  const [pages, setPages] = useState<{ label: string; href: string }[]>([
    { label: "Início do site", href: "/" },
    { label: "Blog — todos os textos", href: "/blog" },
  ]);
  const [error, setError] = useState("");
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    urlRef.current?.focus();
    let active = true;
    listPublishedPosts()
      .then((posts) => {
        if (!active) return;
        setPages((current) => [...current, ...posts.map((post) => ({ label: `Texto: ${post.title}`, href: `/blog/${post.slug}` }))]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const changeHref = (value: string) => {
    setHref(value);
    setError("");
    // Enquanto a pessoa não escolher o tipo, ele acompanha o endereço digitado.
    if (!typeTouched && value.trim()) setNewTab(!isInternalHref(value));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = normalizeHref(href);
    if (!normalized) return setError("Cole ou escolha um endereço para o link.");
    if (needsText && !text.trim()) return setError("Escreva o texto que vai aparecer com o link.");
    onApply({ href: normalized, newTab, text: needsText ? text.trim() : undefined });
  };

  const typeOption = (value: boolean, title: string, description: string, Icon: React.ElementType) => (
    <label
      className={`flex-1 flex items-start gap-3 rounded-[8px] border px-3.5 py-3 cursor-pointer transition-colors ${
        newTab === value ? "border-[#384936] bg-[#384936]/6" : "border-[#171713]/12 hover:bg-[#171713]/3"
      }`}
    >
      <input
        type="radio"
        name="link-type"
        checked={newTab === value}
        onChange={() => {
          setNewTab(value);
          setTypeTouched(true);
        }}
        className="mt-1 accent-[#384936]"
      />
      <span>
        <span className="flex items-center gap-1.5 text-[14px] font-medium">
          <Icon size={14} /> {title}
        </span>
        <span className="block text-[12.5px] text-[#171713]/55">{description}</span>
      </span>
    </label>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171713]/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="link-dialog-title"
      data-lenis-prevent
      onMouseDown={(event) => event.target === event.currentTarget && onCancel()}
    >
      <form onSubmit={submit} className="w-full max-w-[560px] rounded-[10px] bg-white shadow-2xl">
        <div className="px-5 py-4 border-b border-[#171713]/8">
          <h2 id="link-dialog-title" className="text-[17px] font-medium">
            {editing ? "Editar link" : "Inserir link"}
          </h2>
        </div>

        <div className="px-5 py-5 space-y-4">
          {needsText && (
            <Field label="Texto do link" hint="A palavra ou frase que vai aparecer destacada no texto.">
              <input value={text} onChange={(e) => setText(e.target.value)} className={inputClass} />
            </Field>
          )}

          <Field label="Endereço" hint="Cole um endereço (https://…) ou escolha uma página do site abaixo.">
            <input
              ref={urlRef}
              value={href}
              onChange={(e) => changeHref(e.target.value)}
              placeholder="https://… ou /blog/…"
              className={inputClass}
            />
          </Field>

          <Field label="Páginas do site">
            <select
              value={pages.some((page) => page.href === href) ? href : ""}
              onChange={(e) => e.target.value && changeHref(e.target.value)}
              className={inputClass}
            >
              <option value="">Escolher uma página do site…</option>
              {pages.map((page) => (
                <option key={page.href} value={page.href}>
                  {page.label}
                </option>
              ))}
            </select>
          </Field>

          <fieldset className="space-y-1.5">
            <legend className="text-[13px] font-medium text-[#171713]/80">Tipo de link</legend>
            <div className="flex flex-col sm:flex-row gap-2 pt-1.5">
              {typeOption(false, "Interno", "Abre na mesma aba. Para páginas do próprio site.", Link2)}
              {typeOption(true, "Externo", "Abre em uma nova aba. Para outros sites.", ExternalLink)}
            </div>
          </fieldset>

          {error && <p className="text-[13.5px] text-[#9B2C1F]">{error}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2 px-5 py-4 border-t border-[#171713]/8">
          {editing && (
            <button type="button" onClick={onRemove} className="text-[13.5px] text-[#9B2C1F] underline underline-offset-4">
              Remover link
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <SecondaryButton type="button" onClick={onCancel}>
              Cancelar
            </SecondaryButton>
            <PrimaryButton type="submit">Aplicar</PrimaryButton>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
};
