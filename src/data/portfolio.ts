// Authentic Clique e Poesia photography, served from Cloudflare R2 CDN.
// Global low-latency CDN delivery: max 1600px full WebP and 600px preview WebP.

export type PortfolioOrientation = "landscape" | "portrait" | "square";
export type PortfolioCategory = "hospedagem" | "casamentos" | "gastronomia" | "shows";

export interface PortfolioImage {
  src: string;
  thumbnail: string;
  alt: string;
  orientation: PortfolioOrientation;
  width: number;
  height: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  description: string;
  coverImage: string;
  location: string;
  year: string;
  images: PortfolioImage[];
}

export interface PortfolioPhoto extends PortfolioImage {
  projectId: string;
  /** Zero-based photo index within the owning project. */
  index: number;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    "id": "aldea-zen",
    "title": "Aldea Zen Chalés",
    "category": "hospedagem",
    "categoryLabel": "Hospedagens & Chalés",
    "description": "Ensaio imersivo de experiência de hospedagem. Registramos a arquitetura acolhedora, a luz da montanha e a sensação real de desacelerar.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2467.webp",
    "location": "Serra da Mantiqueira, SP",
    "year": "2024",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2467.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2467.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 1",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2485.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2485.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 2",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2509.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2509.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 3",
        "orientation": "landscape",
        "width": 1600,
        "height": 1200
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2530.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2530.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 4",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2570.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2570.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 5",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2573.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2573.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 6",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2642.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2642.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 7",
        "orientation": "landscape",
        "width": 1600,
        "height": 1200
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2649.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2649.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 8",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2650.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2650.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 9",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2651.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2651.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 10",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2681.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2681.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 11",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2685.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2685.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 12",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2693.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2693.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 13",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2788.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2788.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 14",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2815.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2815.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 15",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2818.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2818.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 16",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2879.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2879.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 17",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_2965.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_2965.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 18",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3062.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3062.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 19",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3090.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3090.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 20",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3162.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3162.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 21",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3172.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3172.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 22",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3190.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3190.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 23",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3194.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3194.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 24",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3207.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3207.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 25",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3208.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3208.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 26",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3223.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3223.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 27",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3229.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3229.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 28",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3232.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3232.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 29",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/img_3248.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/img_3248.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 30",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/_mg_2471.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/_mg_2471.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 31",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/_mg_2492.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/_mg_2492.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 32",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/_mg_2512.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aldea-zen/thumbs/_mg_2512.webp",
        "alt": "Chalé e acolhimento na Mantiqueira — Detalhe 33",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      }
    ]
  },
  {
    "id": "casamento-thalita",
    "title": "Casamento Thalita",
    "category": "casamentos",
    "categoryLabel": "Casamentos & Casais",
    "description": "Casamento intimista ao ar livre. Foco absoluto na verdade do momento, nas trocas de olhar espontâneas e na poesia de um dia inesquecível.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6067.webp",
    "location": "Celebração ao Ar Livre",
    "year": "2024",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6065.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6065.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 1",
        "orientation": "portrait",
        "width": 1280,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6067.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6067.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 2",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6069.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6069.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 3",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6073.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6073.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 4",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6075.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6075.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 5",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6092-1.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6092-1.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 6",
        "orientation": "portrait",
        "width": 1280,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6157.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6157.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 7",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6195.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6195.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 8",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/img_6203.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/casamento-thalita/thumbs/img_6203.webp",
        "alt": "Emoções e poesia no casamento ao ar livre — Detalhe 9",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      }
    ]
  },
  {
    "id": "aniversario-gabriela",
    "title": "Aniversário Gabriela — 15 Anos",
    "category": "casamentos",
    "categoryLabel": "Celebrações & 15 Anos",
    "description": "A emoção e a energia vibrante de uma celebração única de 15 anos, capturando cada abraço, dança e sorriso genuíno.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2651.webp",
    "location": "Festa & Celebração",
    "year": "2023",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5158-editar.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5158-editar.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 1",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5190.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5190.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 2",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5263.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5263.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 3",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5275.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5275.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 4",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5302.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5302.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 5",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5307.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5307.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 6",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5314.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5314.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 7",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5424.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5424.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 8",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5444.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5444.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 9",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/img_5483.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/img_5483.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 10",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2651.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2651.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 11",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2655.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2655.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 12",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2656.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2656.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 13",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2658.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2658.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 14",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2662.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2662.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 15",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2666-editar.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2666-editar.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 16",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2671.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2671.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 17",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2674.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2674.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 18",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2688.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2688.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 19",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2704.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2704.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 20",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2754-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2754-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 21",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2755-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2755-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 22",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2758-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2758-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 23",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2763.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2763.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 24",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2768-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2768-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 25",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2769-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2769-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 26",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2771-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2771-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 27",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2774-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2774-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 28",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2775-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2775-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 29",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2866-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2866-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 30",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2870-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2870-aprimorado-nr.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 31",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/_mg_2879.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/aniversario-gabriela/thumbs/_mg_2879.webp",
        "alt": "Celebração e espontaneidade de 15 anos — Detalhe 32",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      }
    ]
  },
  {
    "id": "vitoria-e-thalles",
    "title": "Ensaio Vitória e Thalles",
    "category": "casamentos",
    "categoryLabel": "Casamentos & Casais",
    "description": "Conexão genuína, cumplicidade e luz natural em um ensaio pré-wedding poético e espontâneo.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8653-2.webp",
    "location": "Ensaio ao Pôr do Sol",
    "year": "2023",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8445-editar.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8445-editar.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 1",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8447-editar.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8447-editar.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 2",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8450.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8450.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 3",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8492.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8492.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 4",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8504.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8504.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 5",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8626-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8626-2.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 6",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8653-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8653-2.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 7",
        "orientation": "landscape",
        "width": 1600,
        "height": 1200
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_8655-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_8655-2.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 8",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9073.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9073.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 9",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9155.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9155.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 10",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9209.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9209.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 11",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9224.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9224.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 12",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9227.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9227.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 13",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9242.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9242.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 14",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9364.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9364.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 15",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9420.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9420.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 16",
        "orientation": "landscape",
        "width": 1600,
        "height": 1280
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9428.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9428.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 17",
        "orientation": "square",
        "width": 1600,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9435.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9435.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 18",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9436.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9436.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 19",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9456.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9456.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 20",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9457.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9457.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 21",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/img_9459.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/img_9459.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 22",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_2942.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_2942.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 23",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_2972-editar.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_2972-editar.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 24",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9132-aprimorado-nr.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9132-aprimorado-nr.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 25",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9179.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9179.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 26",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9182.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9182.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 27",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9263.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9263.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 28",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9365.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9365.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 29",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9366.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9366.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 30",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9391.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9391.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 31",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9396.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9396.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 32",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/_mg_9459-editar.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/vitoria-e-thalles/thumbs/_mg_9459-editar.webp",
        "alt": "Afeto e cumplicidade na luz natural — Detalhe 33",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      }
    ]
  },
  {
    "id": "josue",
    "title": "Ensaio Josué",
    "category": "casamentos",
    "categoryLabel": "Ensaios & Retratos",
    "description": "Retratos expressivos com linguagem cinematográfica, jogos de sombras e sensibilidade autoral.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9912.webp",
    "location": "Sessão Autoral",
    "year": "2023",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9912.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9912.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 1",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9913.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9913.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 2",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9919.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9919.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 3",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9921.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9921.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 4",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9922.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9922.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 5",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9925.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9925.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 6",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9931.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9931.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 7",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9932.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9932.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 8",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9933.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9933.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 9",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9935.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9935.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 10",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9941.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9941.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 11",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9949.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9949.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 12",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9964.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9964.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 13",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9965.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9965.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 14",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9975.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9975.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 15",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9994.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9994.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 16",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/img_9995.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/josue/thumbs/img_9995.webp",
        "alt": "Expressão e sensibilidade autoral — Detalhe 17",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      }
    ]
  },
  {
    "id": "degust",
    "title": "Degust Gastronomia",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Experiências",
    "description": "Fotografia gastronômica focada em texturas, cores vivas e o cuidado artesanal de cada prato.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-19.webp",
    "location": "Restaurante Contemporâneo",
    "year": "2024",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-18.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/thumbs/degust-18.webp",
        "alt": "Pratos artesanais e texturas contemporâneas — Detalhe 1",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-19.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/thumbs/degust-19.webp",
        "alt": "Pratos artesanais e texturas contemporâneas — Detalhe 2",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-24.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/thumbs/degust-24.webp",
        "alt": "Pratos artesanais e texturas contemporâneas — Detalhe 3",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-25.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/thumbs/degust-25.webp",
        "alt": "Pratos artesanais e texturas contemporâneas — Detalhe 4",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-30.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/thumbs/degust-30.webp",
        "alt": "Pratos artesanais e texturas contemporâneas — Detalhe 5",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-35.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/thumbs/degust-35.webp",
        "alt": "Pratos artesanais e texturas contemporâneas — Detalhe 6",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/degust-36.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/degust/thumbs/degust-36.webp",
        "alt": "Pratos artesanais e texturas contemporâneas — Detalhe 7",
        "orientation": "portrait",
        "width": 1200,
        "height": 1600
      }
    ]
  },
  {
    "id": "oca-pizzeria",
    "title": "Oca Pizzeria Artesanal",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Experiências",
    "description": "A magia da massa fermentada, o forno a lenha e a atmosfera acolhedora de uma pizzaria autêntica.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/14.webp",
    "location": "Pizzaria Artesanal",
    "year": "2024",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/14.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/14.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 1",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/15.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/15.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 2",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/3.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/3.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 3",
        "orientation": "portrait",
        "width": 1406,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/33.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/33.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 4",
        "orientation": "landscape",
        "width": 1600,
        "height": 1197
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/39.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/39.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 5",
        "orientation": "landscape",
        "width": 1600,
        "height": 1197
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/40.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/40.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 6",
        "orientation": "landscape",
        "width": 1600,
        "height": 1197
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/44.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/44.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 7",
        "orientation": "portrait",
        "width": 1089,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/5.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/5.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 8",
        "orientation": "portrait",
        "width": 1406,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/img_1199.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/img_1199.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 9",
        "orientation": "landscape",
        "width": 1600,
        "height": 1200
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/_mg_2459.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/oca-pizzeria/thumbs/_mg_2459.webp",
        "alt": "Pizzas artesanais ao forno a lenha — Detalhe 10",
        "orientation": "portrait",
        "width": 1406,
        "height": 1600
      }
    ]
  },
  {
    "id": "nona-burguer",
    "title": "Nona Burguer",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Experiências",
    "description": "Fotografia comercial de alta energia: suculência, identidade marcante e sabor que salta aos olhos.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5310.webp",
    "location": "Hamburgueria Artesanal",
    "year": "2024",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5310.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5310.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 1",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5379.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5379.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 2",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5388.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5388.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 3",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5395.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5395.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 4",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5434.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5434.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 5",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5443.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5443.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 6",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5444.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5444.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 7",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5491.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5491.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 8",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5498.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5498.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 9",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5512.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5512.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 10",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5536.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5536.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 11",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5556.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5556.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 12",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5590.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5590.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 13",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/img_5636.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/nona-burguer/thumbs/img_5636.webp",
        "alt": "Hamburgueria artesanal de alta energia — Detalhe 14",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      }
    ]
  },
  {
    "id": "notari",
    "title": "Notari Drinks & Gastronomia",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Experiências",
    "description": "Coquetelaria autoral, ambiente sofisticado e detalhes refinados capturados na luz ambiente ideal.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/24roll.webp",
    "location": "Bar & Gastronomia",
    "year": "2024",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/20.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/20.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 1",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/24roll.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/24roll.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 2",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_0668.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_0668.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 3",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_0910.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_0910.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 4",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_1033.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_1033.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 5",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_1093.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_1093.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 6",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_1150.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_1150.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 7",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_1238.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_1238.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 8",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_1352-editar.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_1352-editar.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 9",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_1425.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_1425.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 10",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_2045.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_2045.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 11",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_2283.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_2283.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 12",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_4535.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_4535.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 13",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_5184.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_5184.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 14",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_5224.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_5224.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 15",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_6675.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_6675.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 16",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_6786.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_6786.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 17",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_6869.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_6869.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 18",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_6903.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_6903.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 19",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_9186.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_9186.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 20",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_9268.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_9268.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 21",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_9657.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_9657.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 22",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_9698.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_9698.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 23",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/img_9730.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/notari/thumbs/img_9730.webp",
        "alt": "Coquetéis autorais e gastronomia refinada — Detalhe 24",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      }
    ]
  },
  {
    "id": "pepe-santos",
    "title": "Pepé Santos no Palco",
    "category": "shows",
    "categoryLabel": "Música & Shows",
    "description": "Energia pulsante da música ao vivo: iluminação dramática, expressividade e o ápice de cada solo.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7173.webp",
    "location": "Show ao Vivo",
    "year": "2023",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7167.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7167.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 1",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7173.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7173.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 2",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7176.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7176.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 3",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7197.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7197.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 4",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7201.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7201.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 5",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7203.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7203.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 6",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7222.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7222.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 7",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7240.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7240.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 8",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7258.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7258.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 9",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7332.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7332.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 10",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7336.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7336.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 11",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7400.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7400.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 12",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7409.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7409.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 13",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7436.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7436.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 14",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7477.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7477.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 15",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7488.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7488.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 16",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7521.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7521.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 17",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7547.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7547.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 18",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7556.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7556.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 19",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/img_7562.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/pepe-santos/thumbs/img_7562.webp",
        "alt": "Solos vibrantes e iluminação de palco — Detalhe 20",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      }
    ]
  },
  {
    "id": "sam-mariz",
    "title": "Sam Mariz — Show Forró 2022",
    "category": "shows",
    "categoryLabel": "Música & Shows",
    "description": "A alegria contagiante do forró, o movimento da dança e a vibração do público em uma noite inesquecível.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6412.webp",
    "location": "Festival de Forró",
    "year": "2022",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6406.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6406.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 1",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6412.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6412.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 2",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6418.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6418.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 3",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6421.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6421.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 4",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6441.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6441.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 5",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6447.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6447.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 6",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6469.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6469.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 7",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6470.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6470.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 8",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6494-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6494-2.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 9",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6498.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6498.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 10",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6501.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6501.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 11",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6502.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6502.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 12",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6543.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6543.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 13",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6555.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6555.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 14",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6560.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6560.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 15",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6580.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6580.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 16",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6584.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6584.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 17",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6623.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6623.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 18",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6625.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6625.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 19",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6674.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6674.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 20",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6678.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6678.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 21",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6681.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6681.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 22",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6757.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6757.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 23",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6776.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6776.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 24",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6777.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6777.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 25",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6781.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6781.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 26",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/img_6808.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/sam-mariz/thumbs/img_6808.webp",
        "alt": "Sanfona, forró e celebração do público — Detalhe 27",
        "orientation": "portrait",
        "width": 1066,
        "height": 1600
      }
    ]
  },
  {
    "id": "lee-robert",
    "title": "Show do Lee Robert",
    "category": "shows",
    "categoryLabel": "Música & Shows",
    "description": "Presença de palco magnética e emoção pura, documentadas em enquadramentos dinâmicos e calorosos.",
    "coverImage": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0092-2.webp",
    "location": "Turnê Musical",
    "year": "2023",
    "images": [
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0001.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0001.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 1",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0032.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0032.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 2",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0033.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0033.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 3",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0043.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0043.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 4",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0073.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0073.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 5",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0092-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0092-2.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 6",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0115.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0115.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 7",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0117.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0117.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 8",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0126.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0126.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 9",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0133.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0133.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 10",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0147.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0147.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 11",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0149.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0149.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 12",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0177-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0177-2.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 13",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_0190.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_0190.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 14",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9720-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9720-2.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 15",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9721.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9721.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 16",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9728.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9728.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 17",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9752.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9752.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 18",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9763.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9763.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 19",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9764.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9764.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 20",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9769.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9769.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 21",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9779.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9779.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 22",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9811.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9811.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 23",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9816.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9816.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 24",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9817.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9817.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 25",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9821.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9821.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 26",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9830.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9830.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 27",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9837-2.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9837-2.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 28",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      },
      {
        "src": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/_mg_9906.webp",
        "thumbnail": "https://media.umcaracaramelo.com.br/clique-e-poesia/portfolio/lee-robert/thumbs/_mg_9906.webp",
        "alt": "Presença de palco e emoção ao vivo — Detalhe 29",
        "orientation": "portrait",
        "width": 1067,
        "height": 1600
      }
    ]
  }
];

/** Alternate projects while preserving the original order of every photo series. */
export function interleavePortfolio(projects: readonly PortfolioProject[]): PortfolioPhoto[] {
  const photos: PortfolioPhoto[] = [];
  const longest = Math.max(0, ...projects.map((project) => project.images.length));
  for (let index = 0; index < longest; index++) {
    projects.forEach((project) => {
      const image = project.images[index];
      if (image) photos.push({ ...image, projectId: project.id, index });
    });
  }
  return photos;
}

export const portfolioPhotos = interleavePortfolio(portfolioProjects);
export const portfolioPhotoCount = portfolioPhotos.length;
