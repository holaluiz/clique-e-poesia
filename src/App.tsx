import React from "react";
import { StickyNavbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutPeopleSection } from "./components/AboutPeopleSection";
import { ECliqueSection } from "./components/ECliqueSection";
import { PessoasSection } from "./components/PessoasSection";
import { GastronomiaSection } from "./components/GastronomiaSection";
import { PortfolioGallerySection } from "./components/PortfolioGallerySection";
import { BlogSection } from "./components/blog/BlogSection";
import { BlogIndexPage, BlogPostPage } from "./components/blog/BlogPages";
import { AdminPage } from "./components/admin/AdminPage";
import { ClosingSection } from "./components/ClosingSection";
import { usePathname } from "./lib/router";

function HomePage() {
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

  if (path === "/admin" || path.startsWith("/admin/")) return <AdminPage path={path} />;
  if (path === "/blog") return <BlogIndexPage />;
  if (path.startsWith("/blog/")) return <BlogPostPage slug={decodeURIComponent(path.slice("/blog/".length))} />;
  return <HomePage />;
}
