import React from "react";
import { EditorialPhotoSection, type EditorialPhoto } from "./EditorialPhotoSection";

const CDN = "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio";

// Quatro fotografias em ritmo livre: alturas e deslocamentos diferentes, cada uma com sua etiqueta.
const PHOTOS: EditorialPhoto[] = [
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

export const ECliqueSection: React.FC = () => (
  <EditorialPhotoSection
    id="e-a-clique"
    tone="dark"
    category="hospedagem"
    eyebrow="Hospedagens & experiências"
    title="E a Clique?"
    script="Mostrar como é estar aí."
    paragraphs={[
      <>
        Nós fotografamos seu chalé, pousada ou refúgio natural, produzimos vídeos e materiais para o marketing
        em geral, mostrando <strong>REALMENTE como é se hospedar aí</strong>.
      </>,
      <>
        No fundo da coisa toda, a gente quer <strong>contar a experiência através das imagens</strong>.
      </>,
    ]}
    photos={PHOTOS}
  />
);
