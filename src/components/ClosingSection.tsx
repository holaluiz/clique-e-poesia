import React from "react";
import { HandwrittenUnderline } from "./HandwrittenAnnotations";

export const ClosingSection: React.FC = () => {
  return (
    <section
      id="fechamento"
      className="relative py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 bg-[#171713] text-[#FAF7F2] overflow-hidden"
    >
      {/* Background Cinematic Texture & Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2649.webp"
          alt="Chalé de tijolos entre bambus e palmeiras na Aldea Zen"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-[50%_45%] opacity-30 filter saturate-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171713] via-[#171713]/75 to-[#171713]" />
      </div>

      <div className="relative z-10 w-full max-w-[1040px] mx-auto text-center space-y-14 sm:space-y-18">
        {/* Poetic Closing Headline with High Emotional Resonance */}
        <div className="space-y-5 max-w-3xl mx-auto">
          {/* Eyebrow padronizado (11-13px, sans-serif medium, tracking moderado) */}
          <div className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] text-[#B8A58B] uppercase leading-none">
            E NO FIM...
          </div>

          {/* Closing text 100% verbatim preserving two periods .. with poetic handwritten underline */}
          <h2 className="font-serif text-[clamp(3rem,5.5vw,5rem)] font-normal text-[#FAF7F2] leading-[1.06] tracking-[-0.025em] pt-2">
            Tudo é sempre{" "}
            <HandwrittenUnderline color="#EED99E" variant="gentle-wave" strokeWidth={2.4}>
              <span className="italic font-light">um clique e poesia</span>
            </HandwrittenUnderline>
            ..
          </h2>
        </div>

        {/* Brand signature & Colophon with delicate handcrafted touch */}
        <div className="pt-12 sm:pt-16 flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
          <div className="flex items-center gap-2.5">
            <img
              src="/isotipo-clique-poesia.png"
              alt=""
              aria-hidden="true"
              width={171}
              height={192}
              className="h-9 sm:h-10 w-auto"
            />
            <span className="font-serif text-2xl sm:text-[28px] tracking-[0.03em] text-[#FAF7F2]">
              Clique e Poesia
            </span>
          </div>

          <p className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] uppercase text-[#FAF7F2]/65">
            Fotografia · Histórias · Hospitalidade
          </p>
        </div>

        {/* Minimalist Editorial Footer line */}
        <div className="pt-12 text-[12px] font-sans text-[#FAF7F2]/45 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Clique e Poesia. Todos os direitos reservados.</span>
          <span className="font-serif italic text-[13px] text-[#FAF7F2]/60">Fotografar e escrever com afeto.</span>
        </div>
      </div>
    </section>
  );
};
