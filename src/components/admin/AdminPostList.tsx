import React, { useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { formatPostDate, listAllPosts, type BlogPost } from "../../lib/blog";
import { handleLinkClick, navigate } from "../../lib/router";
import { AdminCard, PrimaryButton } from "./ui";

type ListState = { status: "loading" } | { status: "ready"; posts: Omit<BlogPost, "content">[] } | { status: "error" };

const StatusBadge: React.FC<{ published: boolean }> = ({ published }) => (
  <span
    className={`inline-block px-2.5 py-0.5 rounded-full text-[11.5px] font-medium ${
      published ? "bg-[#384936]/12 text-[#2C3A2B]" : "bg-[#171713]/8 text-[#171713]/65"
    }`}
  >
    {published ? "Publicado" : "Rascunho"}
  </span>
);

export const AdminPostList: React.FC = () => {
  const [state, setState] = useState<ListState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    listAllPosts()
      .then((posts) => active && setState({ status: "ready", posts }))
      .catch(() => active && setState({ status: "error" }));
    return () => {
      active = false;
    };
  }, []);

  return (
    <AdminCard>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#171713]/8">
        <p className="text-[13.5px] text-[#171713]/55">Rascunhos ficam só aqui. Publicados aparecem na seção “Nosso Blog” do site.</p>
        <PrimaryButton type="button" onClick={() => navigate("/admin/novo")} className="!py-2">
          <Plus size={15} /> Novo texto
        </PrimaryButton>
      </div>

      {state.status === "loading" && <p className="px-5 py-10 text-center text-[14px] text-[#171713]/50">Carregando…</p>}
      {state.status === "error" && (
        <p className="px-5 py-10 text-center text-[14px] text-[#9B2C1F]">Não foi possível carregar os textos. Recarregue a página.</p>
      )}
      {state.status === "ready" && state.posts.length === 0 && (
        <p className="px-5 py-12 text-center text-[14px] text-[#171713]/55">
          Nenhum texto ainda. Clique em “Novo texto” para escrever o primeiro.
        </p>
      )}
      {state.status === "ready" && state.posts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-[#171713]/8 text-[11.5px] uppercase tracking-[0.06em] text-[#171713]/45">
                <th className="px-5 py-3 font-medium">Título</th>
                <th className="px-3 py-3 font-medium">Hospedagem / local</th>
                <th className="px-3 py-3 font-medium">Situação</th>
                <th className="px-3 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171713]/6">
              {state.posts.map((post) => {
                const published = post.status === "published";
                return (
                  <tr key={post.id} className="hover:bg-[#171713]/[0.02]">
                    <td className="px-5 py-3">
                      <a href={`/admin/texto/${post.id}`} onClick={handleLinkClick} className="flex items-center gap-3 group">
                        <span className="w-[60px] h-[40px] flex-none rounded-[6px] overflow-hidden bg-[#171713]/8">
                          {post.cover_url && <img src={post.cover_url} alt="" className="w-full h-full object-cover" loading="lazy" />}
                        </span>
                        <span className="font-medium text-[#171713] group-hover:text-[#384936] line-clamp-2">
                          {post.title || "Sem título"}
                        </span>
                      </a>
                    </td>
                    <td className="px-3 py-3 text-[#171713]/65">{post.location || "—"}</td>
                    <td className="px-3 py-3">
                      <StatusBadge published={published} />
                    </td>
                    <td className="px-3 py-3 text-[#171713]/65 whitespace-nowrap">
                      {formatPostDate(published ? post.published_at : post.updated_at)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <a
                          href={`/admin/texto/${post.id}`}
                          onClick={handleLinkClick}
                          className="inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[13px] text-[#384936] hover:bg-[#384936]/8"
                        >
                          <Pencil size={13} /> Editar
                        </a>
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[13px] text-[#171713]/60 hover:bg-[#171713]/5"
                        >
                          <ExternalLink size={13} /> Ver
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminCard>
  );
};
