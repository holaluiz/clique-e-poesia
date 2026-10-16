import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { portfolioPhotos, type PortfolioCategory, type PortfolioProject } from "../data/portfolio";
import { PortfolioPhotoViewer } from "./PortfolioPhotoViewer";

export interface EditorialPhoto {
  src: string;
  alt: string;
  tag: string;
  tagPosition: string;
  aspect: string;
  offset: string;
  focus: string;
  /** Miniatura e dimensões para fotos fora do portfólio; as do portfólio são lidas de lá. */
  thumbnail?: string;
  width?: number;
  height?: number;
}

interface EditorialPhotoSectionProps {
  id: string;
  tone: "dark" | "light";
  eyebrow: string;
  title: string;
  script: string;
  paragraphs: [React.ReactNode, React.ReactNode?];
  photos: EditorialPhoto[];
  category: PortfolioCategory;
  /** Foto de fundo nítida, escurecida pela cor da seção (como a hero). */
  backdrop?: string;
  /** Ilustração de ponta a ponta, presa ao pé da seção e atrás das fotos. */
  decoration?: React.ReactNode;
}

// Paletas: escura (sobre #171713) e clara (papel creme), mantendo o mesmo ritmo editorial.
const TONES = {
  dark: {
    section: "bg-[#171713] text-[#F1EFE6]",
    eyebrow: "text-[#D8CEBE]/70",
    title: "text-[#FAF7F2]",
    script: "text-[#d6b985]",
    lead: "text-[#F1EFE6]/85",
    muted: "text-[#D8CEBE]/70",
    strong: "[&_strong]:font-semibold [&_strong]:text-[#FAF7F2]",
    shadow: "shadow-[0_20px_45px_rgba(0,0,0,0.35)]",
    backdropFade: "bg-[linear-gradient(to_bottom,#171713,transparent_22%,transparent_78%,#171713)]",
  },
  light: {
    section: "bg-[#F3EBDD] text-[#171713]",
    eyebrow: "text-[#7B7955]",
    title: "text-[#171713]",
    script: "text-[#384936]",
    lead: "text-[#171713]/90",
    muted: "text-[#7B7955]",
    strong: "[&_strong]:font-semibold [&_strong]:text-[#171713]",
    shadow: "shadow-[0_16px_40px_rgba(23,23,19,0.12)]",
    backdropFade: "bg-[linear-gradient(to_bottom,#F3EBDD,transparent_22%,transparent_78%,#F3EBDD)]",
  },
};

export const EditorialPhotoSection: React.FC<EditorialPhotoSectionProps> = ({
  id,
  tone,
  eyebrow,
  title,
  script,
  paragraphs,
  photos,
  category,
  backdrop,
  decoration,
}) => {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const colors = TONES[tone];
  const headingId = `${id}-heading`;

  // Projeto sintético para o visualizador: reaproveita miniaturas e dimensões do portfólio.
  const viewerProject: PortfolioProject = {
    id,
    title,
    category,
    categoryLabel: eyebrow,
    description: script,
    coverImage: photos[0].src,
    location: "",
    year: "",
    images: photos.map((photo) => {
      const match = portfolioPhotos.find((item) => item.src === photo.src);
      const width = photo.width ?? match?.width ?? 1600;
      const height = photo.height ?? match?.height ?? 1067;
      return {
        src: photo.src,
        thumbnail: photo.thumbnail ?? match?.thumbnail ?? photo.src,
        alt: photo.alt,
        orientation: match?.orientation ?? (width >= height ? "landscape" : "portrait"),
        width,
        height,
      };
    }),
  };

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      // Com ilustração, o respiro inferior acompanha a largura (como ela), para que as fotos
      // cubram sempre a mesma fração do desenho em qualquer tela.
      className={`relative pt-24 sm:pt-32 lg:pt-36 ${
        decoration ? "pb-[9.5vw]" : "pb-24 sm:pb-32 lg:pb-36"
      } px-6 sm:px-10 lg:px-16 overflow-hidden ${colors.section}`}
    >
      {/* Foto de fundo escurecida; o degradê funde só as bordas com as seções vizinhas. */}
      {backdrop && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img
            src={backdrop}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-40"
          />
          <div className={`absolute inset-0 ${colors.backdropFade}`} />
        </div>
      )}
      {decoration && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 pointer-events-none">
          {decoration}
        </div>
      )}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto space-y-12 sm:space-y-16">
        {/* Cabeçalho editorial assimétrico */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-2 ${
            backdrop ? "[text-shadow:0_1px_14px_rgb(0_0_0/0.7)]" : ""
          }`}
        >
          <div className="lg:col-span-7 space-y-3">
            <div
              className={`text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] uppercase leading-none ${colors.eyebrow}`}
            >
              {eyebrow}
            </div>

            <h2
              id={headingId}
              className={`font-serif text-[clamp(3rem,5vw,4.75rem)] font-normal leading-[1.04] tracking-[-0.025em] ${colors.title}`}
            >
              {title}
            </h2>

            <p className={`font-handwriting text-[clamp(2rem,3vw,2.75rem)] leading-snug pt-1 ${colors.script}`}>
              {script}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className={`font-sans text-[16px] sm:text-[17.5px] leading-[1.6] font-normal max-w-lg ${colors.lead} ${colors.strong}`}>
              {paragraphs[0]}
            </p>

            {paragraphs[1] && (
              <p className={`font-sans text-[16px] sm:text-[17.5px] leading-[1.6] font-normal max-w-lg ${colors.muted} ${colors.strong}`}>
                {paragraphs[1]}
              </p>
            )}
          </div>
        </div>

        {/* Composição fotográfica em ritmo livre */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start pt-2">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              className={`lg:col-span-3 relative flex flex-col group ${photo.offset}`}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Ampliar fotografia: ${photo.alt}`}
                onClick={() => setOpenIndex(index)}
                className={`relative block w-full ${photo.aspect} rounded-[16px] overflow-hidden bg-[#20201B] ${colors.shadow} cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6b985]`}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover ${photo.focus} transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:contrast-[1.03]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/60 via-transparent to-transparent pointer-events-none" />

                <div
                  className={`absolute ${photo.tagPosition} px-3 py-1 rounded-[8px] bg-[#171713]/50 backdrop-blur-md border border-[#FAF7F2]/10 flex items-center shadow-sm`}
                >
                  <span className="font-sans text-[11.5px] font-medium text-[#FAF7F2] tracking-[0.04em]">
                    {photo.tag}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className={`absolute ${photo.tagPosition.startsWith("top-4 left") ? "top-4 right-4" : "top-4 left-4"} w-8 h-8 rounded-full bg-[#171713]/50 backdrop-blur-md border border-[#FAF7F2]/10 flex items-center justify-center text-[#FAF7F2] text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  ↗
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <PortfolioPhotoViewer project={viewerProject} initialIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
};
