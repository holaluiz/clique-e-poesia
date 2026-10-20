import React from "react";
import { HandwrittenUnderline } from "./HandwrittenAnnotations";
import { SocialLinks } from "./SocialLinks";

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const ClosingSection: React.FC = () => {
  const whatsappUrl =
    "https://wa.me/553897569353?text=" +
    encodeURIComponent("Gostaria de planejar um ensaio com vocês da Clique & Poesia!");
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

        {/* Botão de Destaque CTA WhatsApp */}
        <div className="pt-4 sm:pt-6 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button hero-button-primary hero-button-cta"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span>Planeje seu ensaio aqui</span>
          </a>
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
            Fotografia · Histórias · Hospedagens
          </p>

          <SocialLinks className="pt-5" />
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
