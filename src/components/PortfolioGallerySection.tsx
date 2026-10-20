import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  portfolioPhotos,
  portfolioPhotoCount,
  portfolioProjects,
  type PortfolioOrientation,
  type PortfolioPhoto,
  type PortfolioProject,
} from "../data/portfolio";
import { PortfolioPhotoViewer } from "./PortfolioPhotoViewer";
import "./PortfolioGallerySection.css";

const PREVIEW_COUNT = 12;
const STEP = 20;
const projectsById = new Map(portfolioProjects.map((project) => [project.id, project]));

// Destaque inicial: a melhor foto de cada trabalho, por arquivo (portfolio.ts é gerado por script).
// A ordem H V H H · H V H H · V V H H, distribuída na coluna mais curta, fecha 4 colunas com
// 2 horizontais + 1 vertical cada e alinhadas embaixo.
const FEATURED = [
  "aldea-zen/img_2467.webp",
  "casamento-thalita/img_6065.webp",
  "sam-mariz/img_6412.webp",
  "oca-pizzeria/40.webp",
  "vitoria-e-thalles/_mg_9263.webp",
  "aniversario-gabriela/_mg_2674.webp",
  "pousada-pontal/refugio-tropical-a-beira-da-piscina-2.webp",
  "notari/img_6869.webp",
  "josue/img_9975.webp",
  "nona-burguer/img_5556.webp",
  "pepe-santos/img_7521.webp",
  "degust/degust-24.webp",
];

const featuredPhotos = FEATURED.flatMap((path) => portfolioPhotos.filter((photo) => photo.src.endsWith(`/${path}`)));
const galleryPhotos = [...featuredPhotos, ...portfolioPhotos.filter((photo) => !featuredPhotos.includes(photo))];

// Mesmas proporções do CSS (.clique-gallery-item img), em altura por unidade de largura.
const HEIGHT_RATIO: Record<PortfolioOrientation, number> = { landscape: 3 / 4, portrait: 4 / 3, square: 1 };
const MIN_COLUMN_WIDTH = 256;
const MOBILE_BREAKPOINT = 640;

interface GridMetrics {
  columns: number;
  columnWidth: number;
  gap: number;
}

function measure(grid: HTMLElement | null): GridMetrics {
  const width = grid?.clientWidth ?? Math.min(window.innerWidth, 1440);
  const gap = grid ? parseFloat(getComputedStyle(grid).columnGap) || 0 : 20;
  const columns =
    window.innerWidth < MOBILE_BREAKPOINT
      ? 2
      : Math.max(1, Math.min(4, Math.floor((width + gap) / (MIN_COLUMN_WIDTH + gap))));
  return { columns, columnWidth: (width - gap * (columns - 1)) / columns, gap };
}

/**
 * Cada foto vai para a coluna mais curta, na ordem. Como a escolha só depende das fotos
 * anteriores, "Ver mais" apenas acrescenta embaixo: o que já está na tela não muda de lugar.
 */
function distribute(photos: PortfolioPhoto[], { columns, columnWidth, gap }: GridMetrics) {
  const heights = new Array<number>(columns).fill(0);
  const result = Array.from({ length: columns }, () => [] as PortfolioPhoto[]);
  for (const photo of photos) {
    let target = 0;
    for (let column = 1; column < columns; column++) {
      if (heights[column] < heights[target] - 0.5) target = column;
    }
    result[target].push(photo);
    heights[target] += columnWidth * HEIGHT_RATIO[photo.orientation] + 2 + gap;
  }
  return result;
}

export function PortfolioGallerySection() {
  const [visibleCount, setVisibleCount] = useState(PREVIEW_COUNT);
  const [selection, setSelection] = useState<{ project: PortfolioProject; index: number } | null>(null);
  const [metrics, setMetrics] = useState<GridMetrics>(() => measure(null));
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const shown = galleryPhotos.slice(0, visibleCount);
  const remaining = portfolioPhotoCount - shown.length;
  const nextStep = Math.min(STEP, remaining);
  const columns = distribute(shown, metrics);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const update = () =>
      setMetrics((current) => {
        const next = measure(grid);
        const same =
          next.columns === current.columns &&
          Math.abs(next.columnWidth - current.columnWidth) < 0.5 &&
          next.gap === current.gap;
        return same ? current : next;
      });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  // Ao recolher, a página encolhe; volta ao início da galeria para a pessoa não se perder.
  const showLess = () => {
    setVisibleCount(PREVIEW_COUNT);
    requestAnimationFrame(() =>
      sectionRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }),
    );
  };

  return (
    <section ref={sectionRef} id="portfolio" className="clique-gallery" aria-labelledby="clique-gallery-heading">
      <div className="clique-gallery-shell">
        <header className="clique-gallery-header">
          <h2 id="clique-gallery-heading">Todas as <em>fotografias.</em></h2>
          <p>{portfolioPhotoCount} cliques reais <span aria-hidden="true">•</span> toque para ampliar</p>
        </header>

        <div ref={gridRef} id="clique-photo-grid" className="clique-gallery-grid">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="clique-gallery-column">
              {column.map((photo) => {
                const project = projectsById.get(photo.projectId);
                if (!project) return null;

                return (
                  <motion.button
                    key={photo.src}
                    type="button"
                    className={`clique-gallery-item is-${photo.orientation}`}
                    aria-haspopup="dialog"
                    aria-label={`Ampliar ${project.title}: ${photo.alt}`}
                    onClick={() => setSelection({ project, index: photo.index })}
                    initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={photo.thumbnail}
                      alt=""
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="clique-gallery-caption" aria-hidden="true">
                      <span>{project.title}</span>
                      <span>{photo.alt}</span>
                      <span className="clique-gallery-expand">↗</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>

        {portfolioPhotoCount > PREVIEW_COUNT && (
          <div className="clique-gallery-more">
            <div className="clique-gallery-more-actions">
              {remaining > 0 && (
                <button
                  type="button"
                  aria-controls="clique-photo-grid"
                  onClick={() => setVisibleCount((count) => Math.min(count + STEP, portfolioPhotoCount))}
                >
                  Ver mais {nextStep}
                  <span aria-hidden="true">+</span>
                </button>
              )}
              {visibleCount > PREVIEW_COUNT && (
                <button type="button" className="is-secondary" aria-controls="clique-photo-grid" onClick={showLess}>
                  Ver menos
                  <span aria-hidden="true">−</span>
                </button>
              )}
            </div>
            <p className="clique-gallery-progress" aria-hidden="true">
              {shown.length} de {portfolioPhotoCount}
            </p>
          </div>
        )}
        <p className="sr-only" role="status">{shown.length} de {portfolioPhotoCount} fotografias exibidas.</p>
      </div>

      {selection && (
        <PortfolioPhotoViewer
          key={selection.project.id}
          project={selection.project}
          initialIndex={selection.index}
          onClose={() => setSelection(null)}
        />
      )}
    </section>
  );
}
