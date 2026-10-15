import React from "react";
import { HandwrittenNote } from "./HandwrittenAnnotations";

export const PeoplePhotographySection: React.FC = () => {
  return (
    <section
      id="pessoas"
      className="relative py-24 sm:py-32 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#F3EBDD] overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1240px] mx-auto space-y-12 sm:space-y-16">
        {/* ========================================================================= */}
        {/* CABEÇALHO EDITORIAL ASSIMÉTRICO (PURA TIPOGRAFIA & ESPAÇO NEGATIVO)       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-2">
          {/* Coluna Esquerda: Título Principal e Eyebrow */}
          <div className="lg:col-span-7 space-y-3">
            {/* Eyebrow padronizado (11-13px, sans-serif medium, tracking moderado) */}
            <div className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] text-[#7B7955] uppercase leading-none">
              RETRATOS &amp; CONEXÕES
            </div>

            {/* Section heading com escala unificada Section Display clamp(48px, 5vw, 76px) */}
            <h2 className="font-serif text-[clamp(3rem,5vw,4.75rem)] font-normal text-[#171713] leading-[1.04] tracking-[-0.025em]">
              Mas e as pessoas? :)
            </h2>

            {/* Subtítulo poético (24-28px) */}
            <p className="font-serif italic text-[24px] sm:text-[28px] text-[#384936] leading-snug pt-1">
              A gente fotografa também!
            </p>
          </div>

          {/* Coluna Direita: Narrativa fluida integrada (16-17.5px, leading 1.6, max 50-70 caracteres) */}
          <div className="lg:col-span-5 space-y-4 text-[#171713]/85">
            {/* Paragraph 2 verbatim */}
            <p className="font-sans text-[16px] sm:text-[17.5px] text-[#171713]/90 leading-[1.6] font-normal max-w-lg">
              Retratamos momentos reais, espontâneos e também aqueles cliques mais conceituais e criativos que a gente ama fazer.
            </p>

            {/* Paragraph 3 verbatim com destaque elegante em bold */}
            <p className="font-sans text-[16px] sm:text-[17.5px] text-[#7B7955] leading-[1.6] font-normal max-w-lg">
              Então, se você ama{" "}
              <strong className="font-semibold text-[#171713]">
                fotos conceituais, criativas e cheias de personalidade
              </strong>
              , já sabe, né? :)
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPOSIÇÃO FOTOGRÁFICA EDITORIAL VIVA (RITMO LIVRE & HOVER SUAVE)         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-2">
          
          {/* Fotografia 1: Espontâneo (Vertical média - col-span-3) */}
          <div className="lg:col-span-3 relative flex flex-col group">
            <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_16px_40px_rgba(23,23,19,0.1)]">
              <img
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=85"
                alt="Momento espontâneo e real"
                className="w-full h-full object-cover transition-all duration-400 ease-out group-hover:scale-[1.03] group-hover:contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Identificação discreta em glass sans-serif 11-13px */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-[8px] bg-[#171713]/50 backdrop-blur-md border border-[#FAF7F2]/10 flex items-center shadow-sm">
                <span className="font-sans text-[11.5px] font-medium text-[#FAF7F2] tracking-[0.04em]">
                  momentos reais
                </span>
              </div>
            </div>
          </div>

          {/* Fotografia 2: Conceitual Luz & Sombra (Vertical maior com offset editorial - col-span-3) */}
          <div className="lg:col-span-3 relative flex flex-col group lg:-translate-y-3">
            <div className="relative aspect-[3/4.6] rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_16px_40px_rgba(23,23,19,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=85"
                alt="Retrato conceitual com iluminação natural"
                className="w-full h-full object-cover transition-all duration-400 ease-out group-hover:scale-[1.03] group-hover:contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 right-4 px-3 py-1 rounded-[8px] bg-[#171713]/50 backdrop-blur-md border border-[#FAF7F2]/10 flex items-center shadow-sm">
                <span className="font-sans text-[11.5px] font-medium text-[#FAF7F2] tracking-[0.04em]">
                  conceitual
                </span>
              </div>
            </div>
          </div>

          {/* Fotografia 3: Autenticidade (Vertical média - col-span-3) */}
          <div className="lg:col-span-3 relative flex flex-col group lg:translate-y-4">
            <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_16px_40px_rgba(23,23,19,0.1)]">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85"
                alt="Expressão autêntica e cheia de personalidade"
                className="w-full h-full object-cover transition-all duration-400 ease-out group-hover:scale-[1.03] group-hover:contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-[8px] bg-[#171713]/50 backdrop-blur-md border border-[#FAF7F2]/10 flex items-center shadow-sm">
                <span className="font-sans text-[11.5px] font-medium text-[#FAF7F2] tracking-[0.04em]">
                  espontâneo
                </span>
              </div>
            </div>
          </div>

          {/* Fotografia 4: Artistic golden hour silhouette (Horizontal curta / ritmo quebrado - col-span-3) */}
          <div className="lg:col-span-3 relative flex flex-col group lg:-translate-y-2">
            <div className="relative aspect-[4/3.4] rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_16px_40px_rgba(23,23,19,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85"
                alt="Fotografia artística ao entardecer"
                className="w-full h-full object-cover transition-all duration-400 ease-out group-hover:scale-[1.03] group-hover:contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-[8px] bg-[#171713]/50 backdrop-blur-md border border-[#FAF7F2]/10 flex items-center shadow-sm">
                <span className="font-sans text-[11.5px] font-medium text-[#FAF7F2] tracking-[0.04em]">
                  personalidade
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
