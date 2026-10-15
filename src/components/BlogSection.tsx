import React from "react";
import { HandwrittenUnderline, HandwrittenNote } from "./HandwrittenAnnotations";

export const BlogSection: React.FC = () => {
  return (
    <section
      id="blog"
      className="relative pt-20 sm:pt-28 lg:pt-32 pb-24 sm:pb-32 lg:pb-36 px-6 sm:px-10 lg:px-16 bg-[#171713] text-[#FAF7F2] overflow-hidden"
    >
      {/* Editorial paper grain texture on dark background */}
      <div className="absolute inset-0 editorial-paper-texture pointer-events-none opacity-15" />

      {/* Transição suave para o fechamento */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#171713] pointer-events-none z-10" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        {/* ========================================================================= */}
        {/* COMPOSIÇÃO EDITORIAL TIPO REVISTA / DIÁRIO DE CAMPO                       */}
        {/* A fotografia ocupa papel protagonista e dominante (col-span-7 no desktop) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Coluna Esquerda: Grande Fotografia Editorial Cinematográfica (col-span-7) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10.5] rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1500&q=85"
                alt="Registro de experiência em refúgio"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/85 via-transparent to-transparent pointer-events-none" />
              
              {/* Etiqueta de Diário Fotográfico em glass suave */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-[8px] bg-[#171713]/40 backdrop-blur-md border border-[#FAF7F2]/10 flex items-center gap-2">
                <span className="text-[10px] font-sans font-medium tracking-[0.24em] text-[#FAF7F2] uppercase">
                  Diário de Bordo
                </span>
              </div>

              {/* Scrapbook note sutil em glass */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-[8px] bg-[#384936]/80 backdrop-blur-md flex items-center gap-1 shadow-sm">
                <HandwrittenNote size="sm" rotate={-2} color="#FAF7F2">
                  vivência real
                </HandwrittenNote>
              </div>

              {/* Legenda fotográfica de revista sobre a imagem */}
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-[#FAF7F2]">
                <div className="space-y-0.5">
                  <span className="font-serif italic text-xl sm:text-2xl block text-[#FAF7F2]">
                    Diário de Bordo
                  </span>
                  <span className="text-xs font-sans text-[#B8A58B] tracking-wider uppercase">
                    Vivência real &amp; relato autoral
                  </span>
                </div>
                <span className="text-[11px] font-sans text-[#FAF7F2]/60 tracking-widest hidden sm:inline uppercase">
                  Refúgio das Araucárias
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Tipografia Editorial Expressiva (col-span-5) */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              {/* Eyebrow padronizado (11-13px, sans-serif medium, tracking moderado) */}
              <div className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] text-[#B8A58B] uppercase leading-none">
                RELATOS &amp; VIVÊNCIAS
              </div>

              {/* Section heading com escala unificada Section Display clamp(48px, 5vw, 76px) */}
              <h2 className="font-serif text-[clamp(3rem,5vw,4.75rem)] font-normal text-[#FAF7F2] leading-[1.04] tracking-[-0.025em]">
                Nosso Blog
              </h2>
            </div>

            <div className="space-y-5 text-[#D8CEBE]">
              {/* Paragraph 1 verbatim including por lá**,** (16-17.5px, 50-70 caracteres) */}
              <p className="font-sans text-[16px] sm:text-[17.5px] text-[#D8CEBE] leading-[1.65] font-light max-w-md">
                Além de nos hospedarmos para fotografar e filmar sua hospedagem, a gente também cria textos (Blogs) reais sobre a{" "}
                <strong className="text-[#FAF7F2] font-medium">nossa experiência</strong>{" "}
                por lá**,** para contar e indicar o lugar para outras pessoas.
              </p>

              {/* Paragraph 2 verbatim with single elegant handwritten underline (20-23px) */}
              <p className="font-serif italic text-[20px] sm:text-[23px] text-[#EED99E] leading-snug max-w-md">
                O texto é{" "}
                <HandwrittenUnderline color="#EED99E" variant="gentle-wave" strokeWidth={2}>
                  <span>autoral, criativo e bem dinâmico</span>
                </HandwrittenUnderline>
                .
              </p>

              {/* Paragraph 3 verbatim */}
              <p className="font-sans text-[15.5px] sm:text-[17px] text-[#B8A58B] leading-[1.65] font-normal max-w-md">
                A gente quer viver a experiência, contar como foi e fazer outras pessoas terem{" "}
                <strong className="font-medium text-[#FAF7F2]">vontade de viver também</strong>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
