import React from "react";
import { EditorialPhotoSection, type EditorialPhoto } from "./EditorialPhotoSection";

const CDN = "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio";

// Fotos fora do portfólio ficam em /public/pessoas (1600px + miniaturas de 600px).
const PHOTOS: EditorialPhoto[] = [
  {
    src: `${CDN}/notari/img_4535.webp`,
    alt: "Casal brindando com vinho em um jantar",
    tag: "momentos reais",
    tagPosition: "bottom-4 left-4",
    aspect: "aspect-[3/4]",
    offset: "",
    focus: "object-[50%_40%]",
  },
  {
    src: "/pessoas/notari-img_2816.webp",
    thumbnail: "/pessoas/thumbs/notari-img_2816.webp",
    width: 1067,
    height: 1600,
    alt: "Retrato conceitual de uma mulher segurando uma rosa vermelha",
    tag: "conceitual",
    tagPosition: "top-4 right-4",
    aspect: "aspect-[3/4.6]",
    offset: "lg:-translate-y-3",
    focus: "object-[50%_50%]",
  },
  {
    src: `${CDN}/josue/img_9949.webp`,
    alt: "Músico sorrindo com o violão sob a luz da tarde",
    tag: "espontâneo",
    tagPosition: "bottom-4 left-4",
    aspect: "aspect-[3/4]",
    offset: "lg:translate-y-4",
    focus: "object-[60%_35%]",
  },
  {
    src: "/pessoas/batizado-miguel-img_0335.webp",
    thumbnail: "/pessoas/thumbs/batizado-miguel-img_0335.webp",
    width: 1600,
    height: 1067,
    alt: "Família reunida no batizado do Miguel",
    tag: "em família",
    tagPosition: "bottom-4 right-4",
    aspect: "aspect-[4/3.4]",
    offset: "lg:-translate-y-2",
    focus: "object-[50%_40%]",
  },
];

export const PessoasSection: React.FC = () => (
  <EditorialPhotoSection
    id="pessoas"
    tone="light"
    category="casamentos"
    eyebrow="Retratos & conexões"
    title="Mas e as pessoas? :)"
    script="A gente fotografa também!"
    paragraphs={[
      <>
        Retratamos momentos reais, espontâneos e também aqueles cliques mais conceituais e criativos que a gente
        ama fazer.
      </>,
      <>
        Então, se você ama <strong>fotos conceituais, criativas e cheias de personalidade</strong>, já sabe, né? :)
      </>,
    ]}
    photos={PHOTOS}
  />
);
