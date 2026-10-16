import React from "react";
import { EditorialPhotoSection, type EditorialPhoto } from "./EditorialPhotoSection";
import { CutleryLineArt } from "./CutleryLineArt";

const CDN = "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio";

// Pratos da Nona Burguer e do Notari, todos já servidos pelo CDN do portfólio.
const PHOTOS: EditorialPhoto[] = [
  {
    src: `${CDN}/nona-burguer/img_5498.webp`,
    alt: "Hambúrguer artesanal com queijo derretido sob luz vermelha na Nona Burguer",
    tag: "suculento",
    tagPosition: "bottom-4 left-4",
    aspect: "aspect-[3/4]",
    offset: "",
    focus: "object-[55%_60%]",
  },
  {
    src: `${CDN}/notari/img_6675.webp`,
    alt: "Croquetes dourados com molho, rodelas de limão e flores de rabanete no Notari",
    tag: "petiscos",
    tagPosition: "top-4 right-4",
    aspect: "aspect-[3/4.6]",
    offset: "lg:-translate-y-3",
    focus: "object-[50%_50%]",
  },
  {
    src: `${CDN}/notari/img_1352-editar.webp`,
    alt: "Massa com tomates-cereja, molho vermelho e pesto vista de cima no Notari",
    tag: "detalhes",
    tagPosition: "bottom-4 left-4",
    aspect: "aspect-[3/4]",
    offset: "lg:translate-y-4",
    focus: "object-[49%_50%]",
  },
  {
    src: `${CDN}/notari/img_1150.webp`,
    alt: "Costela com osso, batatas e alecrim servida em travessa branca no Notari",
    tag: "na brasa",
    tagPosition: "bottom-4 right-4",
    aspect: "aspect-[4/3.4]",
    offset: "lg:-translate-y-2",
    focus: "object-[50%_55%]",
  },
];

export const GastronomiaSection: React.FC = () => (
  <EditorialPhotoSection
    id="gastronomia"
    tone="dark"
    category="gastronomia"
    eyebrow="Gastronomia"
    title="Calma, é foto."
    script="Mas deu fome, né?"
    paragraphs={[
      <>
        Quando o assunto é gastronomia, nada melhor do que despertar aquela{" "}
        <strong>vontade de experimentar só de olhar</strong>.
      </>,
    ]}
    photos={PHOTOS}
    decoration={
      // Espelhado: o prato ocupa o vazio sob a última foto e a linha corre para a esquerda.
      <CutleryLineArt className="absolute bottom-6 sm:bottom-10 right-0 w-full min-w-[720px] -scale-x-100 text-[#d6b985] opacity-45" />
    }
  />
);
