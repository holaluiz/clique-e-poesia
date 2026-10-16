import React from "react";
import { formatPostDate, type BlogPost } from "../../lib/blog";
import { handleLinkClick } from "../../lib/router";

export const PostCard: React.FC<{ post: Omit<BlogPost, "content"> }> = ({ post }) => (
  <a
    href={`/blog/${post.slug}`}
    onClick={handleLinkClick}
    className="group flex flex-col gap-5 rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#384936]"
  >
    <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-[#E4D9C5] shadow-[0_16px_40px_rgba(23,23,19,0.12)]">
      {post.cover_url ? (
        <img
          src={post.cover_url}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-handwriting text-[40px] text-[#7B7955]/60">
          Clique e Poesia
        </div>
      )}
      {post.status === "draft" && (
        <span className="absolute top-4 left-4 px-3 py-1 rounded-[8px] bg-[#171713]/60 backdrop-blur-md text-[11.5px] font-medium text-[#FAF7F2]">
          rascunho
        </span>
      )}
    </div>

    <div className="space-y-2.5 px-1">
      <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#7B7955]">
        {[post.location, formatPostDate(post.published_at)].filter(Boolean).join(" · ")}
      </div>
      <h3 className="font-serif text-[26px] sm:text-[28px] leading-[1.12] tracking-[-0.02em] text-[#171713]">
        {post.title}
      </h3>
      {post.excerpt && <p className="text-[16px] leading-[1.6] text-[#171713]/75 line-clamp-3">{post.excerpt}</p>}
      <span className="inline-flex items-center gap-2 pt-1 text-[14px] font-medium text-[#384936]">
        Ler o texto
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </div>
  </a>
);
