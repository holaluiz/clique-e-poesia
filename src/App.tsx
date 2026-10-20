import React, { Suspense, lazy, useEffect } from "react";
import { StickyNavbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutPeopleSection } from "./components/AboutPeopleSection";
import { ECliqueSection } from "./components/ECliqueSection";
import { PessoasSection } from "./components/PessoasSection";
import { GastronomiaSection } from "./components/GastronomiaSection";
import { PortfolioGallerySection } from "./components/PortfolioGallerySection";
import { BlogSection } from "./components/blog/BlogSection";
import { ClosingSection } from "./components/ClosingSection";
import { usePathname, navigate } from "./lib/router";
import { useSmoothScroll, scrollToSection } from "./lib/useSmoothScroll";

// Páginas fora da home ficam em arquivos separados: o visitante da home não baixa o painel nem o leitor do blog.
const AdminPage = lazy(() => import("./components/admin/AdminPage").then((m) => ({ default: m.AdminPage })));
const BlogIndexPage = lazy(() => import("./components/blog/BlogPages").then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import("./components/blog/BlogPages").then((m) => ({ default: m.BlogPostPage })));
const LinksPage = lazy(() => import("./pages/LinksPage").then((m) => ({ default: m.LinksPage })));

function HomePage() {
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        scrollToSection(window.location.hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("clique:navigate", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("clique:navigate", handleHash);
    };
  }, []);

  return (
    <div className="bg-[#F2EDE3] min-h-screen text-[#20201B] selection:bg-[#3F503F] selection:text-[#F2EDE3] font-sans antialiased">
      {/* O menu fixo aparece após a hero e sua sequência de apresentação. */}
      <StickyNavbar />

      <main className="w-full flex flex-col">
        {/* Hero e narrativa sincronizada à rolagem, sobre a mesma fotografia. */}
        <HeroSection />

        {/* 2. About the People (Mas quem é a gente? :)) */}
        <AboutPeopleSection />

        {/* E a Clique? — o que a gente faz */}
        <ECliqueSection />

        {/* Mas e as pessoas? — retratos */}
        <PessoasSection />

        {/* Calma, é foto. — gastronomia */}
        <GastronomiaSection />

        {/* Galeria de fotografias reais do portfólio. */}
        <PortfolioGallerySection />

        {/* Nosso Blog — textos publicados pelo administrador */}
        <BlogSection />

        {/* Fechamento (E no fim...) */}
        <ClosingSection />
      </main>
    </div>
  );
}

export default function App() {
  const path = usePathname();
  useSmoothScroll();

  useEffect(() => {
    if (path === "/links" || path.startsWith("/links/") || path === "/linktree" || path.startsWith("/linktree/")) {
      document.title = "Links Oficiais — Clique e Poesia | Um clique, uma poesia!";
    } else {
      document.title = "Clique e Poesia — Um Clique, uma poesia!";
    }
  }, [path]);

  let page: React.ReactNode = <HomePage />;
  if (path === "/admin" || path.startsWith("/admin/")) page = <AdminPage path={path} />;
  else if (path === "/blog") page = <BlogIndexPage />;
  else if (path.startsWith("/blog/")) page = <BlogPostPage slug={decodeURIComponent(path.slice("/blog/".length))} />;
  else if (path === "/links" || path.startsWith("/links/") || path === "/linktree" || path.startsWith("/linktree/")) {
    page = <LinksPage />;
  }

  return <Suspense fallback={<div className="min-h-screen bg-[#F3EBDD]" />}>{page}</Suspense>;
}
