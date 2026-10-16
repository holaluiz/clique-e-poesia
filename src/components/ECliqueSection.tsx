import React from "react";
import { motion, useReducedMotion } from "motion/react";

const CDN = "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio";

// Quatro fotografias em ritmo livre: alturas e deslocamentos diferentes, cada uma com sua etiqueta.
const PHOTOS = [
  {
    src: `${CDN}/aldea-zen/img_3207.webp`,
    alt: "Varanda de um chalé da Aldea Zen aberta para a mata",
    tag: "aconchego",
    tagPosition: "bottom-4 left-4",
    aspect: "aspect-[3/4]",
    offset: "",
    focus: "object-[62%_50%]",
  },
  {
    src: `${CDN}/pousada-pontal/capela-branca-no-jardim-tropical.webp`,
    alt: "Capela branca no jardim tropical da Pousada Pontal",
    tag: "arquitetura",
    tagPosition: "top-4 right-4",
    aspect: "aspect-[3/4.6]",
    offset: "lg:-translate-y-3",
    focus: "object-[50%_50%]",
  },
  {
    src: `${CDN}/aldea-zen/img_3090.webp`,
    alt: "Café da Aldea Zen escondido entre a vegetação",
    tag: "natureza",
    tagPosition: "bottom-4 left-4",
    aspect: "aspect-[3/4]",
    offset: "lg:translate-y-4",
    focus: "object-[55%_50%]",
  },
  {
    src: `${CDN}/pousada-pontal/refugio-tropical-com-piscina-e-palmeiras.webp`,
    alt: "Piscina entre palmeiras na Pousada Pontal",
    tag: "descanso",
    tagPosition: "bottom-4 right-4",
    aspect: "aspect-[4/3.4]",
    offset: "lg:-translate-y-2",
    focus: "object-[50%_50%]",
  },
];

export const ECliqueSection: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="e-a-clique"
      aria-labelledby="e-a-clique-heading"
      className="relative py-24 sm:py-32 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#171713] text-[#F1EFE6] overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto space-y-12 sm:space-y-16">
        {/* Cabeçalho editorial assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-2">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] text-[#D8CEBE]/70 uppercase leading-none">
              Hospedagens &amp; experiências
            </div>

            <h2
              id="e-a-clique-heading"
              className="font-serif text-[clamp(3rem,5vw,4.75rem)] font-normal text-[#FAF7F2] leading-[1.04] tracking-[-0.025em]"
            >
              E a Clique?
            </h2>

            <p className="font-handwriting text-[clamp(2rem,3vw,2.75rem)] text-[#d6b985] leading-snug pt-1">
              Mostrar como é estar aí.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="font-sans text-[16px] sm:text-[17.5px] text-[#F1EFE6]/85 leading-[1.6] font-normal max-w-lg">
              Nós fotografamos seu chalé, pousada ou refúgio natural, produzimos vídeos e materiais para o
              marketing em geral, mostrando{" "}
              <strong className="font-semibold text-[#FAF7F2]">REALMENTE como é se hospedar aí</strong>.
            </p>

            <p className="font-sans text-[16px] sm:text-[17.5px] text-[#D8CEBE]/70 leading-[1.6] font-normal max-w-lg">
              No fundo da coisa toda, a gente quer{" "}
              <strong className="font-semibold text-[#FAF7F2]">contar a experiência através das imagens</strong>.
            </p>
          </div>
        </div>

        {/* Composição fotográfica em ritmo livre */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start pt-2">
          {PHOTOS.map((photo, index) => (
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
              <div
                className={`relative ${photo.aspect} rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_20px_45px_rgba(0,0,0,0.35)]`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
