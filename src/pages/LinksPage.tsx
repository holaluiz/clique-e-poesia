import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  Share2,
  Check,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { navigate } from "../lib/router";
import { scrollToSection } from "../lib/useSmoothScroll";
import { trackButtonClick } from "../lib/tracker";

// Ícone Pinterest
const PinterestIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M10.2 21.6 12 13.5" />
    <path d="M8.3 14.7A4.5 4.5 0 0 1 7.5 12C7.5 9.2 9.6 7 12.5 7c2.6 0 4.5 1.9 4.5 4.2 0 2.7-1.6 4.8-3.8 4.8-1 0-1.8-.5-2.1-1.2" />
  </svg>
);

// Ícone WhatsApp
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const WHATSAPP_URL =
  "https://wa.me/553897569353?text=" +
  encodeURIComponent(
    "Olá Marcos e Nadine! Vim pelo linktree e gostaria de planejar um ensaio/projeto com a Clique & Poesia."
  );

export const LinksPage: React.FC = () => {
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = async () => {
    trackButtonClick("btn_share", "Compartilhar Linktree");
    const shareData = {
      title: "Clique e Poesia — Links",
      text: "Fotografar e escrever com afeto. Confira os links oficiais da Clique e Poesia!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignora cancelamento
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2400);
      } catch {
        // Fallback
      }
    }
  };

  const handleInternalNav = (url: string, e: React.MouseEvent, buttonId?: string, buttonLabel?: string) => {
    e.preventDefault();
    if (buttonId && buttonLabel) {
      trackButtonClick(buttonId, buttonLabel, url);
    }
    if (url.includes("#")) {
      const hash = url.slice(url.indexOf("#"));
      navigate(url);
      scrollToSection(hash);
    } else {
      navigate(url);
    }
  };

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden selection:bg-[#3F503F] selection:text-[#FAF7F2]">
      {/* ========================================================================= */}
      {/* 1. PLANO DE FUNDO CINEMATOGRÁFICO (PAISAGEM / NATUREZA COM NÉVOA)          */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2649.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[50%_35%] filter brightness-90 saturate-[0.85]"
        />
        {/* Vinheta fotográfica suave dando destaque ao card central */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />
      </div>

      {/* Barra sutil de navegação no topo */}
      <div className="relative z-20 w-full max-w-[420px] flex items-center justify-between pb-3 px-2">
        <a
          href="/"
          onClick={(e) => handleInternalNav("/", e)}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-sans font-medium text-white/85 hover:text-white bg-black/30 hover:bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao site</span>
        </a>

        <div className="relative">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-sans font-medium text-white/85 hover:text-white bg-black/30 hover:bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all duration-200 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartilhar</span>
          </button>

          {copiedToast && (
            <div className="absolute right-0 top-full mt-2 bg-black/85 text-white border border-white/30 text-[11px] py-1 px-2.5 rounded-md shadow-xl whitespace-nowrap animate-fade-in flex items-center gap-1">
              <Check className="w-3 h-3 text-[#25D366]" />
              <span>Link copiado!</span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CARD CENTRAL GLASSMORPHISM (FROSTED GLASS CARD COM AVATAR SOBREPOSTO)   */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full max-w-[390px] sm:max-w-[420px] rounded-[32px] sm:rounded-[36px] bg-white/[0.20] sm:bg-white/[0.22] backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)] px-6 sm:px-8 pb-8 pt-0 mt-14 sm:mt-16 flex flex-col items-center text-center">
        {/* Avatar Circular Sobreposto na Borda Superior */}
        <div className="relative -mt-14 sm:-mt-16 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[3.5px] border-white shadow-[0_10px_25px_rgba(0,0,0,0.35)] shrink-0 bg-[#1D1D18]">
          <img
            src="/perfil.png"
            alt="Clique e Poesia"
            width={128}
            height={128}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/portraits/nadine.webp";
            }}
          />
        </div>

        {/* Nome com tipografia Serif itálica editorial (como na referência) */}
        <h1 className="font-serif italic text-[34px] sm:text-[38px] text-white tracking-[-0.01em] leading-tight font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] pt-3.5">
          Clique e Poesia
        </h1>

        {/* Subtítulo / Ofício */}
        <p className="text-[12.5px] sm:text-[13.5px] text-white/95 font-sans tracking-[0.16em] uppercase font-medium drop-shadow-sm mt-1">
          Fotografia &amp; Afeto
        </p>

        {/* Identificador / Handle (@cliqueepoesia) */}
        <a
          href="https://www.instagram.com/cliqueepoesia/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/85 hover:text-white font-sans tracking-wide mt-1.5 transition-colors drop-shadow-sm"
        >
          @cliqueepoesia
        </a>

        {/* Linha Divisória Tracejada (exatamente como na imagem de referência) */}
        <div className="w-44 mx-auto border-t border-dashed border-white/50 my-4 sm:my-5" />

        {/* ======================================================================= */}
        {/* 3. BOTÕES DE AÇÃO EM PÍLULA TRANSLÚCIDA (PILL BUTTONS DA REFERÊNCIA)     */}
        {/* ======================================================================= */}
        <div className="w-full space-y-3 sm:space-y-3.5">
          {/* 1. PORTFOLIO */}
          <a
            href="/#portfolio"
            onClick={(e) => handleInternalNav("/#portfolio", e, "btn_portfolio", "Portfólio")}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white/50 hover:bg-white/75 active:bg-white/85 backdrop-blur-md text-[#1E1E18] font-sans font-semibold text-[13px] sm:text-[14px] tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-[1.015] text-center block touch-manipulation cursor-pointer"
          >
            PORTFÓLIO
          </a>

          {/* 2. BLOG */}
          <a
            href="/blog"
            onClick={(e) => handleInternalNav("/blog", e, "btn_blog", "Blog")}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white/50 hover:bg-white/75 active:bg-white/85 backdrop-blur-md text-[#1E1E18] font-sans font-semibold text-[13px] sm:text-[14px] tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-[1.015] text-center block touch-manipulation cursor-pointer"
          >
            BLOG
          </a>

          {/* 3. PLANEJE SEU ENSAIO (WHATSAPP COM LEVE DESTAQUE) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("btn_whatsapp", "Planeje seu Ensaio (WhatsApp)", WHATSAPP_URL)}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white/65 hover:bg-white/85 active:bg-white/95 backdrop-blur-md text-[#122414] font-sans font-bold text-[13px] sm:text-[14px] tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.14)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.35)] hover:scale-[1.02] text-center flex items-center justify-center gap-2 border border-white/60 touch-manipulation cursor-pointer"
          >
            <WhatsAppIcon size={18} className="text-[#1CAA55] shrink-0" />
            <span>PLANEJE SEU ENSAIO</span>
          </a>

          {/* 4. HOSPEDAGENS & EXPERIÊNCIAS */}
          <a
            href="/#a-clique"
            onClick={(e) => handleInternalNav("/#a-clique", e, "btn_hospedagens", "Hospedagens")}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white/50 hover:bg-white/75 active:bg-white/85 backdrop-blur-md text-[#1E1E18] font-sans font-semibold text-[13px] sm:text-[14px] tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-[1.015] text-center block touch-manipulation cursor-pointer"
          >
            HOSPEDAGENS
          </a>

          {/* 5. RETRATOS */}
          <a
            href="/#pessoas"
            onClick={(e) => handleInternalNav("/#pessoas", e, "btn_retratos", "Retratos")}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white/50 hover:bg-white/75 active:bg-white/85 backdrop-blur-md text-[#1E1E18] font-sans font-semibold text-[13px] sm:text-[14px] tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-[1.015] text-center block touch-manipulation cursor-pointer"
          >
            RETRATOS
          </a>

          {/* 6. GASTRONOMIA */}
          <a
            href="/#gastronomia"
            onClick={(e) => handleInternalNav("/#gastronomia", e, "btn_gastronomia", "Gastronomia")}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white/50 hover:bg-white/75 active:bg-white/85 backdrop-blur-md text-[#1E1E18] font-sans font-semibold text-[13px] sm:text-[14px] tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-[1.015] text-center block touch-manipulation cursor-pointer"
          >
            GASTRONOMIA
          </a>
        </div>

        {/* Linha com Ícones Sociais no Rodapé do Card */}
        <div className="flex items-center justify-center gap-3 pt-6 w-full">
          <a
            href="https://www.instagram.com/cliqueepoesia/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("icon_instagram", "Instagram Oficial")}
            aria-label="Instagram da Clique e Poesia"
            className="w-10 h-10 rounded-full bg-white/35 hover:bg-white/60 text-[#1E1E18] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
          >
            <Instagram size={17} />
          </a>

          <a
            href="https://pin.it/2PrRZniVb"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("icon_pinterest", "Pinterest Oficial")}
            aria-label="Pinterest da Clique e Poesia"
            className="w-10 h-10 rounded-full bg-white/35 hover:bg-white/60 text-[#1E1E18] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
          >
            <PinterestIcon size={17} />
          </a>

          <a
            href="https://www.linkedin.com/company/clique-poesia/about/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("icon_linkedin", "LinkedIn Oficial")}
            aria-label="LinkedIn da Clique e Poesia"
            className="w-10 h-10 rounded-full bg-white/35 hover:bg-white/60 text-[#1E1E18] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
          >
            <Linkedin size={17} />
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("icon_whatsapp", "WhatsApp Rodapé", WHATSAPP_URL)}
            aria-label="WhatsApp da Clique e Poesia"
            className="w-10 h-10 rounded-full bg-white/35 hover:bg-white/60 text-[#1E1E18] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
          >
            <WhatsAppIcon size={18} />
          </a>
        </div>

        {/* Assinatura Poética */}
        <p className="font-serif italic text-[12.5px] text-white/75 pt-4">
          Tudo é sempre um clique e poesia..
        </p>
      </main>
    </div>
  );
};
