import React from "react";
import { StickyNavbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutPeopleSection } from "./components/AboutPeopleSection";
import { PortfolioGallerySection } from "./components/PortfolioGallerySection";
import { PeoplePhotographySection } from "./components/PeoplePhotographySection";
import { BlogSection } from "./components/BlogSection";
import { ClosingSection } from "./components/ClosingSection";

export default function App() {
  return (
    <div className="bg-[#F2EDE3] min-h-screen text-[#20201B] selection:bg-[#3F503F] selection:text-[#F2EDE3] font-sans antialiased">
      {/* O menu fixo aparece após a hero e sua sequência de apresentação. */}
      <StickyNavbar />

      <main className="w-full flex flex-col">
        {/* Hero e narrativa sincronizada à rolagem, sobre a mesma fotografia. */}
        <HeroSection />

        {/* 2. About the People (Mas quem é a gente? :)) */}
        <AboutPeopleSection />

        {/* Galeria de fotografias reais do portfólio. */}
        <PortfolioGallerySection />

        {/* 4. People / Portrait Photography (Mas e as pessoas? :)) */}
        <PeoplePhotographySection />

        {/* 5. Blog (Nosso Blog) */}
        <BlogSection />

        {/* 6. Closing (E no fim...) */}
        <ClosingSection />
      </main>
    </div>
  );
}
