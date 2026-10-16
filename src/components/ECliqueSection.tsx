import React from "react";
import { motion, useReducedMotion } from "motion/react";

// Fotografias da faixa "E a Clique?" — duas colunas desencontradas, ritmo editorial.
const PHOTOS = [
  {
    src: "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3207.webp",
    alt: "Chalé e acolhimento na Mantiqueira",
  },
  {
    src: "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pousada-pontal/capela-branca-no-jardim-tropical.webp",
    alt: "Capela branca no jardim tropical da Pousada Pontal",
  },
  {
    src: "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3090.webp",
    alt: "Chalé na Mantiqueira",
  },
  {
    src: "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pousada-pontal/refugio-tropical-com-piscina-e-palmeiras.webp",
    alt: "Piscina entre palmeiras na Pousada Pontal",
  },
];

export const ECliqueSection: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const columns = [PHOTOS.slice(0, 2), PHOTOS.slice(2, 4)];

  return (
    <section
      id="e-a-clique"
      aria-labelledby="e-a-clique-heading"
      className="relative pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-36 px-6 sm:px-10 lg:px-16 bg-[#171713] text-[#F1EFE6] overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* Texto */}
        <div className="lg:col-span-5 flex flex-col">
          <h2
            id="e-a-clique-heading"
            className="font-serif text-[clamp(2.5rem,4vw,3.75rem)] font-normal text-[#FAF7F2] leading-[1.08] tracking-[-0.025em]"
          >
            E a Clique?
          </h2>

          <p className="mt-8 font-sans text-[17px] sm:text-[19px] text-[#F1EFE6]/85 leading-[1.6] max-w-md">
            Nós fotografamos seu chalé, pousada ou refúgio natural, produzimos vídeos e materiais para o
            marketing em geral, mostrando{" "}
            <strong className="text-[#d6b985] font-semibold">REALMENTE</strong> como é se hospedar aí.
          </p>

          <p className="mt-6 font-sans text-[17px] sm:text-[19px] text-[#F1EFE6]/85 leading-[1.6] max-w-md">
            No fundo da coisa toda, a gente quer contar a experiência através das imagens.
          </p>

          <p className="mt-8 font-handwriting text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[1] text-balance text-[#d6b985] -rotate-2 origin-left">
            Mostrar como é estar aí.
          </p>
        </div>

        {/* Fotografias */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex flex-col gap-4 sm:gap-6 ${columnIndex === 1 ? "pt-10 sm:pt-16" : ""}`}
            >
              {column.map((photo, photoIndex) => (
                <motion.div
                  key={photo.src}
                  className={`relative aspect-[3/2] w-full rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_20px_45px_rgba(0,0,0,0.35)] group`}
                  initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.7,
                    delay: reducedMotion ? 0 : (columnIndex * 2 + photoIndex) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
