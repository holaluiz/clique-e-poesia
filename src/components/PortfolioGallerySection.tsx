import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { portfolioPhotos, portfolioPhotoCount, portfolioProjects, type PortfolioProject } from "../data/portfolio";
import { PortfolioPhotoViewer } from "./PortfolioPhotoViewer";
import "./PortfolioGallerySection.css";

const PREVIEW_COUNT = 12;
const STEP = 20;
const projectsById = new Map(portfolioProjects.map((project) => [project.id, project]));

export function PortfolioGallerySection() {
  const [visibleCount, setVisibleCount] = useState(PREVIEW_COUNT);
  const [selection, setSelection] = useState<{ project: PortfolioProject; index: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const shown = portfolioPhotos.slice(0, visibleCount);
  const remaining = portfolioPhotoCount - shown.length;
  const nextStep = Math.min(STEP, remaining);

  // Ao recolher, a página encolhe; volta ao início da galeria para a pessoa não se perder.
  const showLess = () => {
    setVisibleCount(PREVIEW_COUNT);
    requestAnimationFrame(() =>
      sectionRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }),
    );
  };

  return (
    <section ref={sectionRef} id="a-clique" className="clique-gallery" aria-labelledby="clique-gallery-heading">
      <div className="clique-gallery-shell">
        <header className="clique-gallery-header">
          <h2 id="clique-gallery-heading">Todas as <em>fotografias.</em></h2>
          <p>{portfolioPhotoCount} cliques reais <span aria-hidden="true">•</span> toque para ampliar</p>
        </header>

        <div id="clique-photo-grid" className="clique-gallery-grid">
          {shown.map((photo) => {
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
