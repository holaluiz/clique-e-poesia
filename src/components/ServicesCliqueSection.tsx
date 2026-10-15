import React, { useState, useRef, useEffect, useCallback } from "react";

export type ProjectCategory = "Todos" | "Montanha" | "Campo" | "Cachoeira" | "Praia";

export interface ProjectItem {
  id: string;
  title: string;
  category: "Montanha" | "Campo" | "Cachoeira" | "Praia";
  location: string;
  image: string;
  tagline: string;
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "chale-mirante",
    title: "Chalé Mirante da Serra",
    category: "Montanha",
    location: "São Bento do Sapucaí · SP",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=85",
    tagline: "Arquitetura integrada à floresta e silêncio das alturas",
  },
  {
    id: "refugio-araucarias",
    title: "Refúgio das Araucárias",
    category: "Montanha",
    location: "Campos do Jordão · SP",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
    tagline: "Luz dourada da tarde e neblina entre os pinheiros",
  },
  {
    id: "pousada-morada-verde",
    title: "Morada dos Pássaros",
    category: "Campo",
    location: "Gonçalves · MG",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85",
    tagline: "Aconchego com lareira acesa e café fresco passado na hora",
  },
  {
    id: "estancia-campestre",
    title: "Estância Boa Vista",
    category: "Campo",
    location: "Serra da Mantiqueira · MG",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=85",
    tagline: "Caminhos de terra, pastos calmos e horizonte aberto",
  },
  {
    id: "cabana-das-aguas",
    title: "Cabana das Águas",
    category: "Cachoeira",
    location: "Brotas · SP",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85",
    tagline: "Deck sobre o rio com o som suave da correnteza",
  },
  {
    id: "ecovila-mata-viva",
    title: "Ecovila Mata Viva",
    category: "Cachoeira",
    location: "Visconde de Mauá · RJ",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=85",
    tagline: "Piscina natural privativa e banho de cachoeira na porta",
  },
  {
    id: "casa-brisa-mar",
    title: "Vila Brisa do Mar",
    category: "Praia",
    location: "Ubatuba · SP",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    tagline: "Refúgio pé na areia com luz natural e brisa costeira",
  },
  {
    id: "refugio-da-costa",
    title: "Refúgio da Ponta Negra",
    category: "Praia",
    location: "Paraty · RJ",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
    tagline: "Encontro da mata atlântica com o mar sereno",
  },
];

const CATEGORIES: ProjectCategory[] = ["Todos", "Montanha", "Campo", "Cachoeira", "Praia"];

export const ServicesCliqueSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("Todos");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bgImage, setBgImage] = useState<string>(ALL_PROJECTS[0].image);
  const [isTransitioningBg, setIsTransitioningBg] = useState<boolean>(false);

  // Interaction states for Drag & Autoplay
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [hasDragged, setHasDragged] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Viewport tracking for precise bleed calculations
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filtragem de projetos
  const filteredProjects = ALL_PROJECTS.filter((item) =>
    selectedCategory === "Todos" ? true : item.category === selectedCategory
  );

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sinalizar interação do usuário para pausar autoplay e retomar suavemente
  const triggerUserInteraction = useCallback(() => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 4500);
  }, []);

  // Atualizar fundo imersivo dinâmico com efeito de dissolução suave
  useEffect(() => {
    if (currentProject && currentProject.image !== bgImage) {
      setIsTransitioningBg(true);
      const timer = setTimeout(() => {
        setBgImage(currentProject.image);
        setIsTransitioningBg(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentProject, bgImage]);

  // Ao mudar de categoria, reiniciar com o primeiro projeto daquela categoria
  const handleCategoryChange = (category: ProjectCategory) => {
    triggerUserInteraction();
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  const handlePrev = useCallback(() => {
    triggerUserInteraction();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  }, [filteredProjects.length, triggerUserInteraction]);

  const handleNext = useCallback(() => {
    triggerUserInteraction();
    setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  }, [filteredProjects.length, triggerUserInteraction]);

  // Autoplay suave (5 segundos), pausando com hover, toque, drag ou foco
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      prefersReducedMotion ||
      isHovered ||
      isDragging ||
      isInteracting ||
      filteredProjects.length <= 1
    ) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [handleNext, isHovered, isDragging, isInteracting, filteredProjects.length]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Gestos de toque (mobile) e arraste (desktop)
  const handleTouchStart = (e: React.TouchEvent) => {
    triggerUserInteraction();
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
    setHasDragged(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - dragStartX;
    if (Math.abs(offset) > 10) setHasDragged(true);
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset > 45) {
      handlePrev();
    } else if (dragOffset < -45) {
      handleNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    triggerUserInteraction();
    setDragStartX(e.clientX);
    setIsDragging(true);
    setHasDragged(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStartX;
    if (Math.abs(offset) > 10) setHasDragged(true);
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset > 45) {
      handlePrev();
    } else if (dragOffset < -45) {
      handleNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Cálculo da posição circular para cada item do carrossel
  const getItemOffset = (index: number) => {
    const total = filteredProjects.length;
    let diff = (index - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Cálculo paramétrico responsivo de posicionamento edge-to-edge
  const getSlidePositioning = (offset: number) => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    // Dimensões do slide ativo e laterais
    let activeW: number;
    let sideW: number;
    let gap: number;

    if (isMobile) {
      activeW = Math.min(windowWidth * 0.85, 380);
      sideW = Math.min(windowWidth * 0.68, 300);
      gap = 16;
    } else if (isTablet) {
      activeW = Math.min(windowWidth * 0.58, 540);
      sideW = Math.min(windowWidth * 0.38, 360);
      gap = 20;
    } else {
      activeW = Math.min(windowWidth * 0.47, 820);
      sideW = Math.min(windowWidth * 0.28, 480);
      gap = 22;
    }

    const step1 = activeW / 2 + gap + (sideW * 0.88) / 2;
    const step2 = step1 + sideW * 0.88 + gap;

    let translateX = dragOffset;
    let scale = 1;
    let opacity = 1;
    let zIndex = 30;

    if (offset === 0) {
      translateX = dragOffset;
      scale = 1;
      opacity = 1;
      zIndex = 30;
    } else if (offset === 1) {
      translateX = step1 + dragOffset;
      scale = 0.88;
      opacity = 0.55;
      zIndex = 20;
    } else if (offset === -1) {
      translateX = -step1 + dragOffset;
      scale = 0.88;
      opacity = 0.55;
      zIndex = 20;
    } else if (offset === 2) {
      translateX = step2 + dragOffset;
      scale = 0.78;
      opacity = 0.2;
      zIndex = 10;
    } else if (offset === -2) {
      translateX = -step2 + dragOffset;
      scale = 0.78;
      opacity = 0.2;
      zIndex = 10;
    } else {
      translateX = (offset > 0 ? step2 + 400 : -step2 - 400) + dragOffset;
      scale = 0.65;
      opacity = 0;
      zIndex = 0;
    }

    return { translateX, scale, opacity, zIndex };
  };

  return (
    <section
      id="a-clique"
      className="relative min-h-screen lg:h-[100svh] lg:max-h-[100svh] flex flex-col justify-between py-4 sm:py-6 lg:py-5 px-0 bg-[#171713] overflow-hidden select-none transition-colors duration-700"
    >
      {/* ========================================================================= */}
      {/* 1. FUNDO IMERSIVO DINÂMICO QUE ACOMPANHA A FOTOGRAFIA ATIVA               */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover scale-110 blur-3xl saturate-150 transition-opacity duration-700 ease-out ${
            isTransitioningBg ? "opacity-20" : "opacity-35"
          }`}
        />
        <div className="absolute inset-0 bg-[#171713]/85 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171713] via-transparent to-[#171713]" />
      </div>

      {/* ========================================================================= */}
      {/* PARTE 1 & 2: CABEÇALHO EDITORIAL COMPACTO & FILTROS DISCRETOS             */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto text-center flex-none space-y-2 sm:space-y-2.5 px-4 sm:px-8">
        {/* Eyebrow “HOSPEDAGENS & REFÚGIOS” */}
        <div className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] text-[#B8A58B] uppercase leading-none">
          HOSPEDAGENS &amp; REFÚGIOS
        </div>

        {/* “E a Clique?” com escala unificada Section Display */}
        <h2 className="font-serif text-[clamp(2.8rem,4.6vw,4.4rem)] font-normal text-[#FAF7F2] leading-[1.02] tracking-[-0.025em]">
          E a Clique?
        </h2>

        {/* Texto curto existente mantido 100% verbatim */}
        <p className="font-sans text-[15px] sm:text-[17px] text-[#D8CEBE]/90 leading-[1.55] font-light max-w-2xl mx-auto">
          Nós fotografamos seu{" "}
          <strong className="font-semibold text-[#FAF7F2]">chalé, pousada ou refúgio natural</strong>
          , produzindo vídeos e materiais que mostram{" "}
          <strong className="font-semibold text-[#FAF7F2]">REALMENTE</strong>{" "}
          como é estar aí.
        </p>

        {/* Título da galeria & Seletor de categorias em uma única barra compacta */}
        <div className="pt-1 sm:pt-1.5 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
          <h3 className="font-serif text-[20px] sm:text-[23px] font-normal text-[#FAF7F2] tracking-[-0.015em]">
            Conheça alguns dos nossos projetos
          </h3>

          {/* Filtros horizontais em glass sutil e elegante (sem pill branca sólida) */}
          <div className="inline-flex items-center p-1 rounded-[10px] bg-[#171713]/50 border border-[#FAF7F2]/10 backdrop-blur-md shadow-sm overflow-x-auto max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 sm:px-3.5 py-1 rounded-[7px] text-[12.5px] sm:text-[13.5px] font-sans transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#FAF7F2]/18 text-[#FAF7F2] border border-[#FAF7F2]/20 font-medium shadow-sm"
                      : "text-[#FAF7F2]/65 font-normal hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/08"
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PARTE 3: CARROSSEL EDGE-TO-EDGE CINEMATOGRÁFICO COM PRESENÇA HORIZONTAL   */}
      {/* [ imagem parcial ] [ IMAGEM ATIVA MAIOR ] [ imagem parcial ]              */}
      {/* ========================================================================= */}
      <div
        ref={carouselContainerRef}
        className="relative z-10 w-full flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[460px] max-h-[56vh] my-auto cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUp();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Seta esquerda discreta em glass suave */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Projeto anterior"
          className="flex absolute left-3 sm:left-6 lg:left-8 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center bg-[#171713]/40 hover:bg-[#171713]/75 border border-[#FAF7F2]/15 text-[#FAF7F2]/90 hover:text-[#FAF7F2] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.25)] cursor-pointer"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Seta direita discreta em glass suave */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Próximo projeto"
          className="flex absolute right-3 sm:right-6 lg:right-8 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center bg-[#171713]/40 hover:bg-[#171713]/75 border border-[#FAF7F2]/15 text-[#FAF7F2]/90 hover:text-[#FAF7F2] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.25)] cursor-pointer"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Faixa fotográfica contínua */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          {filteredProjects.map((item, index) => {
            const offset = getItemOffset(index);
            const isCenter = offset === 0;

            if (Math.abs(offset) > 2) {
              return null;
            }

            const { translateX, scale, opacity, zIndex } = getSlidePositioning(offset);

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasDragged) return;
                  if (offset < 0) handlePrev();
                  if (offset > 0) handleNext();
                }}
                style={{
                  transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                  left: "50%",
                  top: "50%",
                  zIndex,
                  opacity,
                  transition: isDragging
                    ? "none"
                    : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease",
                }}
                className={`absolute pointer-events-auto cursor-pointer ${
                  isCenter
                    ? "w-[85vw] sm:w-[58vw] md:w-[48vw] lg:w-[46vw] max-w-[820px] aspect-[16/10] sm:aspect-[16/9.5]"
                    : "w-[70vw] sm:w-[40vw] md:w-[30vw] lg:w-[28vw] max-w-[480px] aspect-[16/10] sm:aspect-[16/9.5]"
                }`}
              >
                {/* Fotografia emoldurada organicamente com cantos 14-16px */}
                <div
                  className={`relative w-full h-full rounded-[14px] sm:rounded-[16px] overflow-hidden bg-[#171713] border transition-all duration-500 ${
                    isCenter
                      ? "border-[#FAF7F2]/20 shadow-[0_20px_50px_rgba(0,0,0,0.65)] ring-1 ring-[#FAF7F2]/10"
                      : "border-[#FAF7F2]/10 shadow-[0_8px_25px_rgba(0,0,0,0.35)] hover:opacity-85"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  {/* Gradiente sutil inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Categoria discreta em glass */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-[8px] bg-[#171713]/50 backdrop-blur-md text-[11px] font-sans font-medium tracking-[0.16em] text-[#FAF7F2] uppercase border border-[#FAF7F2]/10">
                    {item.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PARTE 4: CÁPSULA EDITORIAL DE INFORMAÇÕES DO PROJETO EM GLASS DISCRETO    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full flex-none flex flex-col items-center justify-center text-center pt-1.5 sm:pt-2 pb-1 sm:pb-2 space-y-2 px-4 sm:px-8">
        {currentProject && (
          <div
            key={currentProject.id}
            className="flex flex-col items-center text-center space-y-1.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-[14px] bg-[#171713]/60 backdrop-blur-md border border-[#FAF7F2]/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-500 max-w-xl mx-auto animate-fade-in"
          >
            {/* NOME DO PROJETO (Serifada editorial) */}
            <span className="font-serif text-[22px] sm:text-[26px] md:text-[28px] font-normal text-[#FAF7F2] tracking-[-0.018em] leading-tight">
              {currentProject.title}
            </span>

            {/* Localização (Sans-serif uppercase) */}
            <span className="text-[11px] sm:text-[12px] font-sans font-medium text-[#B8A58B] uppercase tracking-[0.18em] leading-none">
              {currentProject.location}
            </span>

            {/* Descrição curta (Sans-serif refinada e poética) */}
            <span className="text-[13.5px] sm:text-[14.5px] font-sans text-[#FAF7F2]/80 italic pt-0.5 leading-snug">
              “{currentProject.tagline}”
            </span>
          </div>
        )}

        {/* Indicadores sutis de slide e posição */}
        <div className="flex items-center justify-center gap-3.5 text-[#C9C0B1]/65 text-[11px] font-sans tracking-[0.06em]">
          {/* Marcadores em barra discreta */}
          <div className="flex items-center gap-1.5">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  triggerUserInteraction();
                  setCurrentIndex(idx);
                }}
                aria-label={`Ir para o projeto ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-400 cursor-pointer ${
                  idx === currentIndex
                    ? "w-5 bg-[#FAF7F2] opacity-90"
                    : "w-1 bg-[#FAF7F2]/25 hover:bg-[#FAF7F2]/60"
                }`}
              />
            ))}
          </div>

          <span>
            {currentIndex + 1} / {filteredProjects.length}
          </span>
        </div>
      </div>
    </section>
  );
};
