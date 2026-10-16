import React, { useEffect, useRef, useState } from "react";
import { deletePost, getPostById, savePost, slugify, uploadImage, type BlogPost, type BlogPostDraft } from "../../lib/blog";
import { handleLinkClick, navigate } from "../../lib/router";
import { PostContent } from "../blog/PostContent";
import { Field, PrimaryButton, SecondaryButton, inputClass } from "./ui";

const EMPTY: BlogPostDraft = {
  title: "",
  slug: "",
  location: "",
  excerpt: "",
  cover_url: null,
  content: "",
  status: "draft",
  published_at: null,
};

function toDraft(post: BlogPost): BlogPostDraft {
  const { title, slug, location, excerpt, cover_url, content, status, published_at } = post;
  return { title, slug, location: location ?? "", excerpt: excerpt ?? "", cover_url, content, status, published_at };
}

function describeError(error: unknown) {
  const err = error as { code?: string; message?: string };
  if (err?.code === "23505") return "Já existe um texto com esse endereço. Troque o endereço e tente de novo.";
  if (err?.message?.includes("row-level security")) return "Sua conta não tem permissão para salvar. Entre de novo.";
  return "Não foi possível salvar. Verifique sua conexão e tente de novo.";
}

type Notice = { tone: "ok" | "error"; text: string } | null;

export const AdminPostEditor: React.FC<{ postId: string | null }> = ({ postId }) => {
  const [id, setId] = useState(postId);
  const [form, setForm] = useState<BlogPostDraft>(EMPTY);
  const [saved, setSaved] = useState<BlogPostDraft>(EMPTY);
  const [loading, setLoading] = useState(Boolean(postId));
  const [slugTouched, setSlugTouched] = useState(Boolean(postId));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  useEffect(() => {
    if (!postId) return;
    getPostById(postId)
      .then((post) => {
        const draft = toDraft(post);
        setForm(draft);
        setSaved(draft);
      })
      .catch(() => setNotice({ tone: "error", text: "Não encontramos esse texto." }))
      .finally(() => setLoading(false));
  }, [postId]);

  // Avisa antes de fechar a aba com alterações não salvas.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = <K extends keyof BlogPostDraft>(key: K, value: BlogPostDraft[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
    setNotice(null);
  };

  const persist = async (overrides: Partial<BlogPostDraft>, successText: string) => {
    const next = { ...form, ...overrides, slug: slugify(form.slug) };
    if (!next.title.trim()) return setNotice({ tone: "error", text: "Dê um título ao texto antes de salvar." });
    if (!next.slug) return setNotice({ tone: "error", text: "O endereço do texto não pode ficar vazio." });
    if (next.status === "published" && !next.content.trim()) {
      return setNotice({ tone: "error", text: "Escreva o texto antes de publicar." });
    }
    setBusy(successText);
    try {
      const post = await savePost(id, {
        ...next,
        title: next.title.trim(),
        location: next.location?.trim() || null,
        excerpt: next.excerpt?.trim() || null,
      });
      const draft = toDraft(post);
      setForm(draft);
      setSaved(draft);
      setSlugTouched(true);
      if (!id) {
        setId(post.id);
        window.history.replaceState(null, "", `/admin/texto/${post.id}`);
      }
      setNotice({ tone: "ok", text: successText });
    } catch (error) {
      setNotice({ tone: "error", text: describeError(error) });
    } finally {
      setBusy(null);
    }
  };

  const publish = () =>
    persist({ status: "published", published_at: form.published_at ?? new Date().toISOString() }, "Publicado! Já está no site.");
  const unpublish = () => persist({ status: "draft" }, "Voltou para rascunho. Saiu do site.");
  const saveDraft = () => persist({}, form.status === "published" ? "Alterações publicadas." : "Rascunho salvo.");

  const remove = async () => {
    if (!id || !window.confirm(`Excluir “${form.title || "este texto"}”? Isso não pode ser desfeito.`)) return;
    setBusy("delete");
    try {
      await deletePost(id);
      navigate("/admin/textos");
    } catch {
      setNotice({ tone: "error", text: "Não foi possível excluir. Tente de novo." });
      setBusy(null);
    }
  };

  const goBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (dirty && !window.confirm("Sair sem salvar as alterações?")) {
      event.preventDefault();
      return;
    }
    handleLinkClick(event);
  };

  // Ferramentas de formatação: agem sobre o trecho selecionado no texto.
  const editContent = (transform: (text: string, start: number, end: number) => { text: string; start: number; end: number }) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const result = transform(form.content, textarea.selectionStart, textarea.selectionEnd);
    update("content", result.text);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.start, result.end);
    });
  };

  const wrap = (before: string, after: string, placeholder: string) =>
    editContent((text, start, end) => {
      const selected = text.slice(start, end) || placeholder;
      return {
        text: text.slice(0, start) + before + selected + after + text.slice(end),
        start: start + before.length,
        end: start + before.length + selected.length,
      };
    });

  const prefixLine = (prefix: string, placeholder: string) =>
    editContent((text, start, end) => {
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const selected = text.slice(lineStart, end) || placeholder;
      const lines = selected.split("\n").map((line) => prefix + line.replace(/^(#{2,3} |> |- )/, ""));
      const block = lines.join("\n");
      const needsGap = lineStart > 0 && text[lineStart - 2] !== "\n" ? "\n" : "";
      return {
        text: text.slice(0, lineStart) + needsGap + block + text.slice(end),
        start: lineStart + needsGap.length + prefix.length,
        end: lineStart + needsGap.length + block.length,
      };
    });

  const insertLink = () => {
    const url = window.prompt("Cole o endereço do link (https://…)");
    if (url) wrap("[", `](${url.trim()})`, "texto do link");
  };

  const insertBlock = (block: string) =>
    editContent((text, start) => {
      const before = text.slice(0, start).replace(/\s*$/, "");
      const after = text.slice(start).replace(/^\s*/, "");
      const prefix = before ? `${before}\n\n` : "";
      const next = `${prefix}${block}\n\n${after}`;
      const caret = prefix.length + block.length + 2;
      return { text: next, start: caret, end: caret };
    });

  const handleImage = async (file: File | undefined, target: "cover" | "content") => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setNotice({ tone: "error", text: "Escolha um arquivo de imagem." });
    setBusy(target === "cover" ? "cover" : "image");
    try {
      const url = await uploadImage(file);
      if (target === "cover") update("cover_url", url);
      else insertBlock(`![Escreva aqui a legenda da foto](${url})`);
    } catch {
      setNotice({ tone: "error", text: "Não foi possível enviar a imagem. Tente de novo." });
    } finally {
      setBusy(null);
    }
  };

  if (loading) return <p className="text-center text-[#7B7955] pt-20">Carregando texto…</p>;

  const published = form.status === "published";
  const toolbar: { label: string; title: string; action: () => void; className?: string }[] = [
    { label: "B", title: "Negrito", action: () => wrap("**", "**", "texto em negrito"), className: "font-bold" },
    { label: "I", title: "Itálico", action: () => wrap("*", "*", "texto em itálico"), className: "italic font-serif" },
    { label: "Subtítulo", title: "Subtítulo", action: () => prefixLine("## ", "Subtítulo") },
    { label: "“ Citação", title: "Citação em destaque", action: () => prefixLine("> ", "Uma frase marcante") },
    { label: "• Lista", title: "Lista", action: () => prefixLine("- ", "Item da lista") },
    { label: "Link", title: "Inserir link", action: insertLink },
  ];

  return (
    <div className="space-y-5 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/admin/textos" onClick={goBack} className="text-[13.5px] font-medium text-[#384936]">
          ← Todos os textos
        </a>
        <div className="flex items-center gap-3 text-[13px]">
          <span className={`px-3 py-1 rounded-full font-medium ${published ? "bg-[#384936] text-[#FAF7F2]" : "bg-[#E4D9C5] text-[#171713]/75"}`}>
            {published ? "Publicado" : "Rascunho"}
          </span>
          {id && (
            <a href={`/blog/${saved.slug}`} target="_blank" rel="noreferrer" className="text-[#384936] underline underline-offset-4">
              {published ? "Ver no site" : "Pré-visualizar página"}
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8 space-y-4">
          <input
            aria-label="Título"
            placeholder="Título do texto"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full rounded-[8px] border border-[#171713]/8 bg-white px-5 py-4 font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-tight tracking-[-0.02em] placeholder:text-[#171713]/30 focus:outline-none focus:border-[#384936] focus:ring-2 focus:ring-[#384936]/20"
          />

          <div className="rounded-[8px] bg-white border border-[#171713]/8 overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 border-b border-[#171713]/10 px-2 py-2">
              <div className="flex rounded-[8px] bg-[#171713]/6 p-1 mr-2">
                {(["write", "preview"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTab(value)}
                    className={`px-4 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors ${
                      tab === value ? "bg-white text-[#171713] shadow-sm" : "text-[#171713]/60"
                    }`}
                  >
                    {value === "write" ? "Escrever" : "Pré-visualizar"}
                  </button>
                ))}
              </div>
              {tab === "write" &&
                toolbar.map((tool) => (
                  <button
                    key={tool.title}
                    type="button"
                    title={tool.title}
                    onClick={tool.action}
                    className={`min-w-9 h-9 px-3 rounded-[10px] text-[14px] text-[#171713]/80 hover:bg-white transition-colors ${tool.className ?? ""}`}
                  >
                    {tool.label}
                  </button>
                ))}
              {tab === "write" && (
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={busy === "image"}
                  className="h-9 px-3 rounded-[10px] text-[14px] text-[#171713]/80 hover:bg-white transition-colors disabled:opacity-50"
                >
                  {busy === "image" ? "Enviando foto…" : "+ Foto"}
                </button>
              )}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  handleImage(e.target.files?.[0], "content");
                  e.target.value = "";
                }}
              />
            </div>

            {tab === "write" ? (
              <textarea
                ref={textareaRef}
                aria-label="Texto"
                value={form.content}
                onChange={(e) => update("content", e.target.value)}
                placeholder={"Comece a contar como foi a experiência…\n\nDeixe uma linha em branco entre um parágrafo e outro."}
                className="block w-full min-h-[520px] resize-y bg-transparent px-5 sm:px-7 py-6 text-[17px] leading-[1.75] text-[#171713] placeholder:text-[#171713]/35 focus:outline-none"
              />
            ) : (
              <div className="px-5 sm:px-10 py-8 min-h-[520px] bg-[#F3EBDD]/40">
                {form.content.trim() ? (
                  <PostContent content={form.content} />
                ) : (
                  <p className="text-[#7B7955]">Nada para mostrar ainda.</p>
                )}
              </div>
            )}
          </div>
          <p className="text-[12.5px] text-[#7B7955] leading-relaxed">
            Dica: selecione um trecho e use os botões acima. Depois de inserir uma foto, troque “Escreva aqui a legenda da foto” pela
            legenda (ou apague para deixar sem).
          </p>
        </div>

        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-16">
          <div className="rounded-[8px] bg-white border border-[#171713]/8 p-5 sm:p-6 space-y-5">
            <div className="space-y-2">
              <span className="block text-[13px] font-medium text-[#171713]/80">Foto de capa</span>
              <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-[#E4D9C5]">
                {form.cover_url ? (
                  <img src={form.cover_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[13px] text-[#7B7955]">Sem capa</div>
                )}
              </div>
              <div className="flex gap-2">
                <SecondaryButton
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={busy === "cover"}
                  className="flex-1 !py-2 !text-[13.5px]"
                >
                  {busy === "cover" ? "Enviando…" : form.cover_url ? "Trocar capa" : "Enviar capa"}
                </SecondaryButton>
                {form.cover_url && (
                  <SecondaryButton type="button" onClick={() => update("cover_url", null)} className="!py-2 !text-[13.5px]">
                    Remover
                  </SecondaryButton>
                )}
              </div>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  handleImage(e.target.files?.[0], "cover");
                  e.target.value = "";
                }}
              />
            </div>

            <Field label="Hospedagem / local" hint="Aparece acima do título. Ex.: Aldea Zen · Serra da Mantiqueira">
              <input value={form.location ?? ""} onChange={(e) => update("location", e.target.value)} className={inputClass} />
            </Field>

            <Field label="Resumo" hint="Uma ou duas frases que aparecem no cartão do blog.">
              <textarea
                rows={3}
                value={form.excerpt ?? ""}
                onChange={(e) => update("excerpt", e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </Field>

            <Field label="Endereço da página" hint={<>{window.location.host}/blog/<strong>{form.slug || "…"}</strong></>}>
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
                }}
                className={inputClass}
              />
            </Field>
          </div>

          {id && (
            <button type="button" onClick={remove} disabled={busy !== null} className="text-[13px] text-[#9B2C1F] underline underline-offset-4">
              Excluir este texto
            </button>
          )}
        </aside>
      </div>

      {/* Barra de ações fixa no rodapé */}
      <div className="fixed inset-x-0 lg:left-60 bottom-0 z-30 border-t border-[#171713]/10 bg-white/95 backdrop-blur-md">
        <div className="px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <p role="status" className={`text-[13.5px] ${notice?.tone === "error" ? "text-[#9B2C1F]" : "text-[#384936]"}`}>
            {notice?.text ?? (dirty ? "Alterações não salvas" : id ? "Tudo salvo" : "")}
          </p>
          <div className="flex flex-wrap gap-2 ml-auto">
            {published ? (
              <>
                <SecondaryButton type="button" onClick={unpublish} disabled={busy !== null}>
                  Despublicar
                </SecondaryButton>
                <PrimaryButton type="button" onClick={saveDraft} disabled={busy !== null || !dirty}>
                  {busy ? "Salvando…" : "Salvar alterações"}
                </PrimaryButton>
              </>
            ) : (
              <>
                <SecondaryButton type="button" onClick={saveDraft} disabled={busy !== null || (!dirty && Boolean(id))}>
                  Salvar rascunho
                </SecondaryButton>
                <PrimaryButton type="button" onClick={publish} disabled={busy !== null}>
                  {busy ? "Salvando…" : "Publicar"}
                </PrimaryButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
