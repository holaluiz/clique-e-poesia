import React, { useEffect, useState } from "react";
import { listPublishedPosts, type BlogPost } from "../../lib/blog";
import { supabase } from "../../lib/supabase";
import { handleLinkClick } from "../../lib/router";
import { PostCard } from "./PostCard";

const PREVIEW_COUNT = 3;

type ListState = { status: "loading" } | { status: "ready"; posts: Omit<BlogPost, "content">[] } | { status: "error" };

export const BlogSection: React.FC = () => {
  const [state, setState] = useState<ListState>(supabase ? { status: "loading" } : { status: "ready", posts: [] });

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    // Busca um a mais para saber se vale mostrar o link "ver todos".
    listPublishedPosts(PREVIEW_COUNT + 1)
      .then((posts) => active && setState({ status: "ready", posts }))
      .catch(() => active && setState({ status: "error" }));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative py-24 sm:py-32 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#F3EBDD] text-[#171713] overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto space-y-14 sm:space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase leading-none text-[#7B7955]">
              Blog
            </div>
            <h2
              id="blog-heading"
              className="font-serif text-[clamp(3rem,5vw,4.75rem)] font-normal leading-[1.04] tracking-[-0.025em] text-[#171713]"
            >
              Nosso Blog
            </h2>
            <div className="space-y-4 pt-5 [&_strong]:font-semibold [&_strong]:text-[#171713]">
              <p className="text-[17px] sm:text-[19px] leading-[1.6] text-[#171713]/90 max-w-2xl">
                Além de nos hospedarmos para fotografar e filmar sua hospedagem, a gente também cria{" "}
                <strong>textos (Blogs) reais sobre a nossa experiência por lá</strong>, para contar e indicar o lugar para
                outras pessoas.
              </p>
              <p className="text-[16px] sm:text-[17.5px] leading-[1.6] text-[#7B7955] max-w-2xl">
                O texto é <strong>autoral, criativo e bem dinâmico</strong>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:self-end">
            <p className="font-handwriting text-[clamp(1.75rem,2.6vw,2.4rem)] leading-snug text-[#384936] max-w-2xl">
              A gente quer viver a experiência, contar como foi e fazer outras pessoas terem vontade de viver também.
            </p>
          </div>
        </div>

        {state.status === "loading" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12" aria-hidden="true">
            {Array.from({ length: PREVIEW_COUNT }, (_, index) => (
              <div key={index} className="space-y-5 animate-pulse">
                <div className="aspect-[1000/663] rounded-[16px] bg-[#E4D9C5]" />
                <div className="h-3 w-1/3 rounded bg-[#E4D9C5]" />
                <div className="h-7 w-4/5 rounded bg-[#E4D9C5]" />
              </div>
            ))}
          </div>
        )}

        {state.status === "ready" && state.posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-12">
              {state.posts.slice(0, PREVIEW_COUNT).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {state.posts.length > PREVIEW_COUNT && (
              <div className="flex justify-center">
                <a
                  href="/blog"
                  onClick={handleLinkClick}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#171713]/20 text-[14px] font-medium text-[#171713] hover:bg-[#171713] hover:text-[#F3EBDD] transition-colors"
                >
                  Ver todos os textos <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </>
        )}

        {(state.status === "error" || (state.status === "ready" && state.posts.length === 0)) && (
          <div className="rounded-[18px] border border-dashed border-[#7B7955]/40 px-6 py-14 text-center">
            <p className="font-handwriting text-[clamp(1.9rem,3vw,2.6rem)] text-[#384936]">
              Os primeiros textos estão chegando.
            </p>
            <p className="mt-2 text-[15px] text-[#7B7955]">Logo, logo tem história nova por aqui.</p>
          </div>
        )}
      </div>
    </section>
  );
};
