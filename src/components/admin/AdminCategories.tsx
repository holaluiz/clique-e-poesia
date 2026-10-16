import React, { useEffect, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { deleteCategory, listCategories, saveCategory, type BlogCategory } from "../../lib/blog";
import { AdminCard, PrimaryButton, inputClass } from "./ui";

function describeError(error: unknown) {
  const err = error as { code?: string };
  if (err?.code === "23505") return "Já existe uma categoria com esse nome.";
  if (err?.code === "23514") return "Use pelo menos uma letra ou número no nome.";
  return "Não foi possível salvar. Tente de novo.";
}

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<BlogCategory[] | null>(null);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const load = () =>
    listCategories()
      .then(setCategories)
      .catch(() => setMessage({ tone: "error", text: "Não foi possível carregar as categorias." }));

  useEffect(() => {
    load();
  }, []);

  const run = async (action: () => Promise<unknown>, success: string) => {
    setBusy(true);
    setMessage(null);
    try {
      await action();
      await load();
      setMessage({ tone: "ok", text: success });
      return true;
    } catch (error) {
      setMessage({ tone: "error", text: describeError(error) });
      return false;
    } finally {
      setBusy(false);
    }
  };

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newName.trim()) return;
    if (await run(() => saveCategory(null, newName), "Categoria criada.")) setNewName("");
  };

  const rename = async () => {
    if (!editing || !editing.name.trim()) return;
    if (await run(() => saveCategory(editing.id, editing.name), "Categoria renomeada.")) setEditing(null);
  };

  const remove = (category: BlogCategory) => {
    if (!window.confirm(`Excluir a categoria “${category.name}”? Ela será tirada dos textos que a usam.`)) return;
    run(() => deleteCategory(category.id), "Categoria excluída.");
  };

  return (
    <AdminCard className="max-w-[720px]">
      <form onSubmit={create} className="flex flex-wrap gap-2 px-5 py-4 border-b border-[#171713]/8">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nome da nova categoria"
          aria-label="Nome da nova categoria"
          className={`${inputClass} flex-1 min-w-[200px]`}
        />
        <PrimaryButton type="submit" disabled={busy || !newName.trim()}>
          <Plus size={15} /> Adicionar
        </PrimaryButton>
      </form>

      {message && (
        <p role="status" className={`px-5 pt-3 text-[13.5px] ${message.tone === "error" ? "text-[#9B2C1F]" : "text-[#384936]"}`}>
          {message.text}
        </p>
      )}

      {categories === null ? (
        <p className="px-5 py-10 text-center text-[14px] text-[#171713]/50">Carregando…</p>
      ) : categories.length === 0 ? (
        <p className="px-5 py-10 text-center text-[14px] text-[#171713]/55">Nenhuma categoria ainda.</p>
      ) : (
        <ul className="divide-y divide-[#171713]/6">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center gap-3 px-5 py-3">
              {editing?.id === category.id ? (
                <>
                  <input
                    autoFocus
                    value={editing.name}
                    onChange={(e) => setEditing({ id: category.id, name: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") rename();
                      if (e.key === "Escape") setEditing(null);
                    }}
                    aria-label="Novo nome da categoria"
                    className={`${inputClass} flex-1`}
                  />
                  <button type="button" onClick={rename} disabled={busy} title="Salvar" className="p-2 rounded-[6px] text-[#384936] hover:bg-[#384936]/8">
                    <Check size={16} />
                  </button>
                  <button type="button" onClick={() => setEditing(null)} title="Cancelar" className="p-2 rounded-[6px] text-[#171713]/55 hover:bg-[#171713]/5">
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-[14.5px]">{category.name}</span>
                  <span className="hidden sm:inline text-[12px] text-[#171713]/40">/{category.slug}</span>
                  <button
                    type="button"
                    onClick={() => setEditing({ id: category.id, name: category.name })}
                    className="inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[13px] text-[#384936] hover:bg-[#384936]/8"
                  >
                    <Pencil size={13} /> Renomear
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(category)}
                    disabled={busy}
                    className="inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[13px] text-[#9B2C1F] hover:bg-[#9B2C1F]/8"
                  >
                    <Trash2 size={13} /> Excluir
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  );
};
