import React, { useEffect, useState } from "react";
import { formatPostDate, getPostBySlug, listPublishedPosts, type BlogPost } from "../../lib/blog";
import { handleLinkClick } from "../../lib/router";
import { supabase } from "../../lib/supabase";
import { PostCard } from "./PostCard";
import { PostContent } from "./PostContent";
import "./blog.css";

const SITE_TITLE = "Clique e Poesia — Um Clique, uma poesia!";

export const BlogShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#F3EBDD] text-[#171713]">
    <header className="sticky top-0 z-30 bg-[#171713] text-[#FAF7F2]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between gap-4">
        <a href="/" onClick={handleLinkClick} className="flex items-center gap-2.5" aria-label="Clique e Poesia — início">
          <img src="/isotipo-clique-poesia.png" alt="" width={171} height={192} className="h-7 w-auto" />
          <span className="font-serif text-[19px] tracking-[0.02em]">Clique e Poesia</span>
        </a>
        <a href="/#blog" className="text-[13px] font-medium text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors">
          ← Voltar ao site
        </a>
      </div>
    </header>
    <main>{children}</main>
  </div>
);

const Message: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="max-w-[680px] mx-auto px-6 py-32 text-center space-y-3">
    <p className="font-handwriting text-[clamp(2.2rem,4vw,3rem)] text-[#384936]">{title}</p>
    <p className="text-[16px] text-[#7B7955]">{text}</p>
    <a href="/blog" onClick={handleLinkClick} className="inline-block pt-4 text-[14px] font-medium text-[#384936] underline underline-offset-4">
      Ver todos os textos
    </a>
  </div>
);

type PostState = { status: "loading" } | { status: "ready"; post: BlogPost } | { status: "missing" } | { status: "error" };

export const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const [state, setState] = useState<PostState>({ status: "loading" });

  useEffect(() => {
    if (!supabase) {
      setState({ status: "missing" });
      return;
    }
    let active = true;
    setState({ status: "loading" });
    getPostBySlug(slug)
      .then((post) => active && setState(post ? { status: "ready", post } : { status: "missing" }))
      .catch(() => active && setState({ status: "error" }));
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (state.status === "ready") document.title = `${state.post.title} — Clique e Poesia`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [state]);

  if (state.status === "loading") {
    return (
      <BlogShell>
        <div className="max-w-[760px] mx-auto px-6 py-24 space-y-6 animate-pulse" aria-label="Carregando texto">
          <div className="h-4 w-40 rounded bg-[#E4D9C5]" />
          <div className="h-14 w-4/5 rounded bg-[#E4D9C5]" />
          <div className="max-w-[1000px] mx-auto aspect-[1000/663] rounded-[16px] bg-[#E4D9C5]" />
        </div>
      </BlogShell>
    );
  }
  if (state.status === "missing") {
    return (
      <BlogShell>
        <Message title="Esse texto não está por aqui." text="Ele pode ter mudado de endereço ou ainda não foi publicado." />
      </BlogShell>
    );
  }
  if (state.status === "error") {
    return (
      <BlogShell>
        <Message title="Ops, algo deu errado." text="Não conseguimos carregar o texto agora. Tente de novo em instantes." />
      </BlogShell>
    );
  }

  const { post } = state;
  return (
    <BlogShell>
      <article className="pb-28 sm:pb-36">
        <header className="max-w-[860px] mx-auto px-6 pt-16 sm:pt-24 pb-10 sm:pb-14 text-center space-y-5">
          {post.status === "draft" && (
            <span className="inline-block px-3 py-1 rounded-full bg-[#171713] text-[12px] font-medium text-[#FAF7F2]">
              Rascunho — só o administrador vê esta página
            </span>
          )}
          <div className="text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase text-[#7B7955]">
            {[post.location, formatPostDate(post.published_at)].filter(Boolean).join(" · ")}
          </div>
          <h1 className="font-serif text-[clamp(2.6rem,5.5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.025em]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="max-w-[640px] mx-auto text-[18px] sm:text-[20px] leading-[1.55] text-[#171713]/75">{post.excerpt}</p>
          )}
        </header>

        {post.cover_url && (
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 mb-14 sm:mb-20">
            <img
              src={post.cover_url}
              alt=""
              width={1000}
              height={663}
              className="w-full h-auto aspect-[1000/663] object-cover rounded-[18px] shadow-[0_24px_60px_rgba(23,23,19,0.18)]"
            />
          </div>
        )}

        <PostContent content={post.content} className="max-w-[680px] mx-auto px-6" />

        <footer className="max-w-[680px] mx-auto px-6 pt-16 mt-16 border-t border-[#171713]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-handwriting text-[28px] text-[#384936]">Um clique, uma poesia.</span>
          <a href="/blog" onClick={handleLinkClick} className="text-[14px] font-medium text-[#384936] hover:underline underline-offset-4">
            Ler outros textos →
          </a>
        </footer>
      </article>
    </BlogShell>
  );
};

type ListState = { status: "loading" } | { status: "ready"; posts: Omit<BlogPost, "content">[] } | { status: "error" };

export const BlogIndexPage: React.FC = () => {
  const [state, setState] = useState<ListState>(supabase ? { status: "loading" } : { status: "ready", posts: [] });

  useEffect(() => {
    document.title = "Blog — Clique e Poesia";
    return () => {
      document.title = SITE_TITLE;
    };
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    listPublishedPosts()
      .then((posts) => active && setState({ status: "ready", posts }))
      .catch(() => active && setState({ status: "error" }));
    return () => {
      active = false;
    };
  }, []);

  return (
    <BlogShell>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 space-y-14">
        <header className="space-y-3 pb-8 border-b border-[#171713]/10">
          <div className="text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase text-[#7B7955]">Blog</div>
          <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] font-normal leading-[1.02] tracking-[-0.03em]">Nosso Blog</h1>
          <p className="font-handwriting text-[clamp(1.8rem,3vw,2.5rem)] text-[#384936]">Viver, contar e dar vontade de viver também.</p>
        </header>

        {state.status === "loading" && <p className="text-[#7B7955]">Carregando textos…</p>}
        {state.status === "error" && <p className="text-[#7B7955]">Não conseguimos carregar os textos agora. Tente de novo em instantes.</p>}
        {state.status === "ready" && state.posts.length === 0 && (
          <p className="font-handwriting text-[2.2rem] text-[#384936]">Os primeiros textos estão chegando.</p>
        )}
        {state.status === "ready" && state.posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {state.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </BlogShell>
  );
};
