import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SectionMarker {
  id: string;
  name: string;
  pos: number; // 0 a 1
}

const SECTION_IDS = [
  { id: "hero-top", name: "Início" },
  { id: "quem-somos", name: "Quem Somos" },
  { id: "a-clique", name: "A Clique" },
  { id: "pessoas", name: "Pessoas" },
  { id: "gastronomia", name: "Gastronomia" },
  { id: "portfolio", name: "Portfólio" },
  { id: "blog", name: "Blog" },
  { id: "fechamento", name: "Contato" },
];

export const MinimalScrollbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 a 1
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("Início");
  const [sections, setSections] = useState<SectionMarker[]>([]);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  // Mapeia onde cada seção começa na página em termos de 0% a 100% de rolagem
  const updateSectionPositions = useCallback(() => {
    if (typeof window === "undefined") return;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const markers: SectionMarker[] = [];
    SECTION_IDS.forEach(({ id, name }) => {
      if (id === "hero-top") {
        markers.push({ id, name, pos: 0 });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const pos = Math.max(0, Math.min(1, top / scrollHeight));
        markers.push({ id, name, pos });
      }
    });
    setSections(markers);
  }, []);

  // Atualiza o progresso conforme a pessoa rola a página naturalmente
  const updateScrollProgress = useCallback(() => {
    if (isDraggingRef.current) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    setScrollProgress(progress);

    if (progress < 0.05) {
      setCurrentSection("Início");
    } else if (progress > 0.95) {
      setCurrentSection("Contato");
    } else {
      let closest = SECTION_IDS[0].name;
      let minDiff = 1;
      sections.forEach((s) => {
        const diff = Math.abs(s.pos - progress);
        if (diff < minDiff) {
          minDiff = diff;
          closest = s.name;
        }
      });
      setCurrentSection(closest);
    }
  }, [sections]);

  useEffect(() => {
    updateSectionPositions();
    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", () => {
      updateSectionPositions();
      updateScrollProgress();
    });

    let interval = setInterval(() => {
      if (window.__lenis) {
        clearInterval(interval);
        window.__lenis.on("scroll", updateScrollProgress);
      }
    }, 150);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      clearInterval(interval);
      if (window.__lenis) {
        window.__lenis.off("scroll", updateScrollProgress);
      }
    };
  }, [updateScrollProgress, updateSectionPositions]);

  // Rola a página para um percentual de 0 a 1
  const scrollToPercent = useCallback((percent: number, immediate = false) => {
    const clamped = Math.max(0, Math.min(1, percent));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = clamped * maxScroll;

    setScrollProgress(clamped);

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { immediate, duration: immediate ? 0 : 0.75 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: immediate ? "instant" : "smooth",
      });
    }
  }, []);

  // Calcula taxa de 0 a 1 a partir da coordenada Y do ponteiro dentro do trilho
  const getProgressFromPointer = (clientY: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    return Math.max(0, Math.min(1, relativeY / rect.height));
  };

  // Início do arrasto
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);

    const progress = getProgressFromPointer(e.clientY);
    scrollToPercent(progress, true);
  };

  // Movimento de arrasto
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const progress = getProgressFromPointer(e.clientY);
    scrollToPercent(progress, true);
  };

  // Fim do arrasto
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      if (pointerIdRef.current !== null) {
        try {
          e.currentTarget.releasePointerCapture(pointerIdRef.current);
        } catch {
          // Ignora
        }
        pointerIdRef.current = null;
      }
    }
  };

  // Clique direto no trilho
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) return;
    const progress = getProgressFromPointer(e.clientY);
    scrollToPercent(progress, false);
  };

  // Botões de extremos
  const handleGoToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrollToPercent(0, false);
  };

  const handleGoToBottom = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrollToPercent(1, false);
  };

  const showTooltip = isDragging || isHovered;

  return (
    <aside
      aria-label="Barra de rolagem minimalista"
      className="fixed right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 z-50 flex items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isDragging) setIsHovered(false);
      }}
    >
      <div className="relative flex flex-col items-center py-2">
        {/* Botão Superior (↑ Topo) */}
        <button
          type="button"
          onClick={handleGoToTop}
          title="Ir para o topo"
          aria-label="Ir para o topo"
          className="w-6 h-6 mb-2 flex items-center justify-center rounded-full bg-[#182218]/70 hover:bg-[#283827] active:scale-90 text-[#EED99E] border border-[#D6B985]/30 shadow-[0_2px_10px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-200 cursor-pointer group hover:border-[#EED99E]"
        >
          <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Trilho Minimalista de Rolagem */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative w-6 h-[50vh] min-h-[300px] max-h-[460px] flex items-center justify-center cursor-pointer group"
        >
          {/* Linha guia do trilho (Rail vertical fino) */}
          <div className="w-[2px] h-full bg-white/20 rounded-full overflow-hidden relative shadow-[0_0_8px_rgba(0,0,0,0.3)]">
            {/* Barra de progresso preenchida em tom dourado */}
            <div
              className="w-full bg-gradient-to-b from-[#D6B985] to-[#FAF7F2] transition-all duration-75"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Marcadores sutis de seções ao longo do trilho */}
          {sections.map((s, idx) => (
            <div
              key={idx}
              className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EED99E]/40 pointer-events-none transition-transform duration-200 group-hover:scale-125"
              style={{ top: `${s.pos * 100}%` }}
              title={s.name}
            />
          ))}

          {/* Marcador arrastável minimalista (Dot / Thumb) */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            tabIndex={0}
            role="slider"
            aria-label="Indicador de rolagem: arraste para navegar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress * 100)}
            className="absolute left-1/2 -translate-x-1/2 touch-none cursor-grab active:cursor-grabbing outline-none flex items-center justify-center transition-[transform,background-color] duration-150"
            style={{
              top: `${scrollProgress * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pílula / Tooltip discreto com o nome da seção atual ao passar o mouse ou arrastar */}
            <div
              className={`absolute right-6 px-2.5 py-1 rounded-full bg-[#182218]/90 text-[#FAF7F2] text-[11px] font-sans font-medium tracking-wide whitespace-nowrap border border-[#D6B985]/30 shadow-[0_4px_12px_rgba(0,0,0,0.6)] backdrop-blur-md pointer-events-none transition-all duration-200 ${
                showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
              }`}
            >
              <span>{currentSection}</span>
            </div>

            {/* O Ponto / Indicador minimalista sobre a linha */}
            <div
              className={`w-3.5 h-3.5 rounded-full bg-[#FAF7F2] border-2 border-[#D6B985] shadow-[0_0_10px_rgba(238,217,158,0.7),0_2px_6px_rgba(0,0,0,0.5)] transition-transform duration-150 ${
                isDragging ? "scale-125 bg-[#EED99E]" : "hover:scale-125"
              }`}
            />
          </div>
        </div>

        {/* Botão Inferior (↓ Rodapé) */}
        <button
          type="button"
          onClick={handleGoToBottom}
          title="Ir para o rodapé"
          aria-label="Ir para o rodapé"
          className="w-6 h-6 mt-2 flex items-center justify-center rounded-full bg-[#182218]/70 hover:bg-[#283827] active:scale-90 text-[#EED99E] border border-[#D6B985]/30 shadow-[0_2px_10px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-200 cursor-pointer group hover:border-[#EED99E]"
        >
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  );
};
