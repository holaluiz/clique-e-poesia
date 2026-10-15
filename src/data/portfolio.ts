// Authentic Clique e Poesia photography, adapted from the original portfolio.
// Images are served locally: 960 px previews and full WebP photographs up to 1600 px.

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
    "coverImage": "/gallery/aldea-zen/aldea-zen-2-1600.webp",
    "location": "Serra da Mantiqueira, SP",
    "year": "2024",
    "images": [
      {
        "src": "/gallery/aldea-zen/aldea-zen-2-1600.webp",
        "thumbnail": "/gallery/aldea-zen/aldea-zen-2-960.webp",
        "alt": "Vista panorâmica do deck",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/aldea-zen/aldea-zen-1-1280.webp",
        "thumbnail": "/gallery/aldea-zen/aldea-zen-1-960.webp",
        "alt": "Chalé em meio à vegetação",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      },
      {
        "src": "/gallery/aldea-zen/aldea-zen-3-1600.webp",
        "thumbnail": "/gallery/aldea-zen/aldea-zen-3-960.webp",
        "alt": "Ambiente interno aconchegante",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/aldea-zen/aldea-zen-4-1280.webp",
        "thumbnail": "/gallery/aldea-zen/aldea-zen-4-960.webp",
        "alt": "Detalhes em madeira e natureza",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      }
    ]
  },
  {
    "id": "casamento-thalita",
    "title": "Casamento Thalita",
    "category": "casamentos",
    "categoryLabel": "Casamentos & Casais",
    "description": "Casamento intimista ao ar livre. Foco absoluto na verdade do momento, nas trocas de olhar espontâneas e na poesia de um dia inesquecível.",
    "coverImage": "/gallery/casamento-thalita/casamento-thalita-1-1536.webp",
    "location": "Celebração ao Ar Livre",
    "year": "2024",
    "images": [
      {
        "src": "/gallery/casamento-thalita/casamento-thalita-1-1536.webp",
        "thumbnail": "/gallery/casamento-thalita/casamento-thalita-1-960.webp",
        "alt": "Retrato emotivo da noiva",
        "orientation": "portrait",
        "width": 1536,
        "height": 1920
      },
      {
        "src": "/gallery/casamento-thalita/casamento-thalita-2-1600.webp",
        "thumbnail": "/gallery/casamento-thalita/casamento-thalita-2-960.webp",
        "alt": "Cenário da cerimônia na luz natural",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/casamento-thalita/casamento-thalita-3-1600.webp",
        "thumbnail": "/gallery/casamento-thalita/casamento-thalita-3-960.webp",
        "alt": "Abraço e beijo do casal",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/casamento-thalita/casamento-thalita-4-1600.webp",
        "thumbnail": "/gallery/casamento-thalita/casamento-thalita-4-960.webp",
        "alt": "Caminhada a dois sob os aplausos",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/casamento-thalita/casamento-thalita-5-1600.webp",
        "thumbnail": "/gallery/casamento-thalita/casamento-thalita-5-960.webp",
        "alt": "Detalhes e carinho da festa",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/casamento-thalita/casamento-thalita-6-1536.webp",
        "thumbnail": "/gallery/casamento-thalita/casamento-thalita-6-960.webp",
        "alt": "Retrato do casal na natureza",
        "orientation": "portrait",
        "width": 1536,
        "height": 1920
      }
    ]
  },
  {
    "id": "vitoria-thalles",
    "title": "Vitória & Thalles",
    "category": "casamentos",
    "categoryLabel": "Casamentos & Casais",
    "description": "Ensaio espontâneo de casal. Sem poses forçadas — apenas vento, risadas, luz dourada de fim de tarde e conexão autêntica.",
    "coverImage": "/gallery/vitoria-thalles/vitoria-thalles-1-1280.webp",
    "location": "Ensaio em Meio à Natureza",
    "year": "2024",
    "images": [
      {
        "src": "/gallery/vitoria-thalles/vitoria-thalles-1-1280.webp",
        "thumbnail": "/gallery/vitoria-thalles/vitoria-thalles-1-960.webp",
        "alt": "Abraço espontâneo entre as copas",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      },
      {
        "src": "/gallery/vitoria-thalles/vitoria-thalles-2-1280.webp",
        "thumbnail": "/gallery/vitoria-thalles/vitoria-thalles-2-960.webp",
        "alt": "Sorrisos verdadeiros e cumplicidade",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      },
      {
        "src": "/gallery/vitoria-thalles/vitoria-thalles-3-1440.webp",
        "thumbnail": "/gallery/vitoria-thalles/vitoria-thalles-3-960.webp",
        "alt": "Luz de ouro do entardecer",
        "orientation": "portrait",
        "width": 1440,
        "height": 1920
      },
      {
        "src": "/gallery/vitoria-thalles/vitoria-thalles-4-1440.webp",
        "thumbnail": "/gallery/vitoria-thalles/vitoria-thalles-4-960.webp",
        "alt": "Caminhada suave na grama",
        "orientation": "portrait",
        "width": 1440,
        "height": 1920
      },
      {
        "src": "/gallery/vitoria-thalles/vitoria-thalles-5-1280.webp",
        "thumbnail": "/gallery/vitoria-thalles/vitoria-thalles-5-960.webp",
        "alt": "Olhar cúmplice e sereno",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      },
      {
        "src": "/gallery/vitoria-thalles/vitoria-thalles-6-1440.webp",
        "thumbnail": "/gallery/vitoria-thalles/vitoria-thalles-6-960.webp",
        "alt": "Instante leve e afetuoso",
        "orientation": "portrait",
        "width": 1440,
        "height": 1920
      }
    ]
  },
  {
    "id": "oca-pizzeria",
    "title": "Oca Pizzeria",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Lifestyle",
    "description": "Fotografia gastronômica e sensorial para pizzaria artesanal. A textura da massa fermentada, o fogo no forno a lenha e a atmosfera acolhedora.",
    "coverImage": "/gallery/oca-pizzeria/oca-pizza-1-1600.webp",
    "location": "Oca Pizzeria Artesanal",
    "year": "2024",
    "images": [
      {
        "src": "/gallery/oca-pizzeria/oca-pizza-1-1600.webp",
        "thumbnail": "/gallery/oca-pizzeria/oca-pizza-1-960.webp",
        "alt": "Pizza saindo fumegante do forno a lenha",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/oca-pizzeria/oca-pizza-2-1600.webp",
        "thumbnail": "/gallery/oca-pizzeria/oca-pizza-2-960.webp",
        "alt": "Massa artesanal e ingredientes selecionados",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/oca-pizzeria/oca-pizza-3-1600.webp",
        "thumbnail": "/gallery/oca-pizzeria/oca-pizza-3-960.webp",
        "alt": "Fatia com queijo derretido e manjericão fresco",
        "orientation": "portrait",
        "width": 1600,
        "height": 1821
      },
      {
        "src": "/gallery/oca-pizzeria/oca-pizza-4-1600.webp",
        "thumbnail": "/gallery/oca-pizzeria/oca-pizza-4-960.webp",
        "alt": "Ambiente rústico da casa",
        "orientation": "landscape",
        "width": 1600,
        "height": 1196
      }
    ]
  },
  {
    "id": "degust-gastronomia",
    "title": "Degust",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Lifestyle",
    "description": "Identidade visual e fotografia de cardápio e experiência para marca gastronômica. Cores vivas, detalhes de corte e iluminação de água na boca.",
    "coverImage": "/gallery/degust-gastronomia/degust-2-1600.webp",
    "location": "Degust Gastronomia",
    "year": "2023",
    "images": [
      {
        "src": "/gallery/degust-gastronomia/degust-2-1600.webp",
        "thumbnail": "/gallery/degust-gastronomia/degust-2-960.webp",
        "alt": "Prato principal com empratamento de autor",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/degust-gastronomia/degust-1-1440.webp",
        "thumbnail": "/gallery/degust-gastronomia/degust-1-960.webp",
        "alt": "Detalhe vertical da textura culinária",
        "orientation": "portrait",
        "width": 1440,
        "height": 1920
      },
      {
        "src": "/gallery/degust-gastronomia/degust-3-1600.webp",
        "thumbnail": "/gallery/degust-gastronomia/degust-3-960.webp",
        "alt": "Composição gastronômica em luz natural",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      }
    ]
  },
  {
    "id": "notari-drinks",
    "title": "Notari",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Lifestyle",
    "description": "Fotografia de drinks autorais, sushi contemporâneo e ambiência intimista para o Notari.",
    "coverImage": "/gallery/notari-drinks/notari-drinks-1-1600.webp",
    "location": "Notari Gastronomia",
    "year": "2023",
    "images": [
      {
        "src": "/gallery/notari-drinks/notari-drinks-1-1600.webp",
        "thumbnail": "/gallery/notari-drinks/notari-drinks-1-960.webp",
        "alt": "Coquetel autoral em taça de cristal",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/notari-drinks/notari-ambiente-1-1600.webp",
        "thumbnail": "/gallery/notari-drinks/notari-ambiente-1-960.webp",
        "alt": "Salão com iluminação cenográfica âmbar",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/notari-drinks/notari-prato-1-1600.webp",
        "thumbnail": "/gallery/notari-drinks/notari-prato-1-960.webp",
        "alt": "Empratamento de alta gastronomia",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      }
    ]
  },
  {
    "id": "nona-burguer",
    "title": "Nona Burguer",
    "category": "gastronomia",
    "categoryLabel": "Gastronomia & Lifestyle",
    "description": "Lanches artesanais com apelo editorial contemporâneo. Queijo derretido, ponto da carne perfeito e luz quente de bistrô urbano.",
    "coverImage": "/gallery/nona-burguer/nona-burguer-1-1600.webp",
    "location": "Nona Burguer",
    "year": "2024",
    "images": [
      {
        "src": "/gallery/nona-burguer/nona-burguer-1-1600.webp",
        "thumbnail": "/gallery/nona-burguer/nona-burguer-1-960.webp",
        "alt": "Hambúrguer artesanal suculento com pão brioche",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "/gallery/nona-burguer/nona-burguer-2-1280.webp",
        "thumbnail": "/gallery/nona-burguer/nona-burguer-2-960.webp",
        "alt": "Close vertical do smash burger",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      },
      {
        "src": "/gallery/nona-burguer/nona-burguer-3-1280.webp",
        "thumbnail": "/gallery/nona-burguer/nona-burguer-3-960.webp",
        "alt": "Acompanhamentos crocantes e molho especial",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      }
    ]
  },
  {
    "id": "lee-robert",
    "title": "Show do Lee Robert",
    "category": "shows",
    "categoryLabel": "Shows & Música",
    "description": "Cobertura de show ao vivo com pegada cinematográfica. Fumaça, contraluz dramático, guitarra elétrica e a energia pulsante da noite.",
    "coverImage": "/gallery/lee-robert/lee-robert-1-1600.webp",
    "location": "Palco Ao Vivo",
    "year": "2024",
    "images": [
      {
        "src": "/gallery/lee-robert/lee-robert-1-1600.webp",
        "thumbnail": "/gallery/lee-robert/lee-robert-1-960.webp",
        "alt": "Solo de guitarra na fumaça e contraluz",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      },
      {
        "src": "/gallery/lee-robert/lee-robert-2-1280.webp",
        "thumbnail": "/gallery/lee-robert/lee-robert-2-960.webp",
        "alt": "Retrato vertical do guitarrista no ápice do acorde",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      },
      {
        "src": "/gallery/lee-robert/lee-robert-3-1280.webp",
        "thumbnail": "/gallery/lee-robert/lee-robert-3-960.webp",
        "alt": "Vocalista em entrega total ao microfone",
        "orientation": "portrait",
        "width": 1280,
        "height": 1920
      },
      {
        "src": "/gallery/lee-robert/lee-robert-4-1600.webp",
        "thumbnail": "/gallery/lee-robert/lee-robert-4-960.webp",
        "alt": "Visão panorâmica da banda no palco",
        "orientation": "landscape",
        "width": 1600,
        "height": 1067
      }
    ]
  },
  {
    "id": "pepe-santos",
    "title": "Pepé Santos",
    "category": "shows",
    "categoryLabel": "Shows & Música",
    "description": "Retratos de palco e ensaio de música com foco na sensibilidade instrumental e na expressão intimista do artista.",
    "coverImage": "/gallery/pepe-santos/pepe-santos-1-1279.webp",
    "location": "Show Acústico",
    "year": "2023",
    "images": [
      {
        "src": "/gallery/pepe-santos/pepe-santos-1-1279.webp",
        "thumbnail": "/gallery/pepe-santos/pepe-santos-1-960.webp",
        "alt": "Pepé Santos com violão sob foco pontual",
        "orientation": "portrait",
        "width": 1279,
        "height": 1920
      },
      {
        "src": "/gallery/pepe-santos/pepe-santos-2-1279.webp",
        "thumbnail": "/gallery/pepe-santos/pepe-santos-2-960.webp",
        "alt": "Expressão no canto e cordas dedilhadas",
        "orientation": "portrait",
        "width": 1279,
        "height": 1920
      },
      {
        "src": "/gallery/pepe-santos/pepe-santos-3-1600.webp",
        "thumbnail": "/gallery/pepe-santos/pepe-santos-3-960.webp",
        "alt": "Palco intimista e clima acolhedor",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      }
    ]
  },
  {
    "id": "sam-mariz",
    "title": "Sam Mariz • Show Forró",
    "category": "shows",
    "categoryLabel": "Shows & Música",
    "description": "Celebração da música e da cultura brasileira. A dança do público, os instrumentos regionais e o calor humano em cada compasso.",
    "coverImage": "/gallery/sam-mariz/sam-mariz-1-1600.webp",
    "location": "Festival de Cultura & Forró",
    "year": "2022",
    "images": [
      {
        "src": "/gallery/sam-mariz/sam-mariz-1-1600.webp",
        "thumbnail": "/gallery/sam-mariz/sam-mariz-1-960.webp",
        "alt": "Sanfona e acordeão puxando o ritmo",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "/gallery/sam-mariz/sam-mariz-2-1600.webp",
        "thumbnail": "/gallery/sam-mariz/sam-mariz-2-960.webp",
        "alt": "Público dançando e celebrando",
        "orientation": "landscape",
        "width": 1600,
        "height": 1066
      },
      {
        "src": "/gallery/sam-mariz/sam-mariz-3-1279.webp",
        "thumbnail": "/gallery/sam-mariz/sam-mariz-3-960.webp",
        "alt": "Expressão vibrante do vocalista",
        "orientation": "portrait",
        "width": 1279,
        "height": 1920
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
