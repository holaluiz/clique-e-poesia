import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { portfolioPhotos, portfolioPhotoCount, portfolioProjects, type PortfolioProject } from "../data/portfolio";
import { PortfolioPhotoViewer } from "./PortfolioPhotoViewer";
import "./PortfolioGallerySection.css";

const PREVIEW_COUNT = 12;
const projectsById = new Map(portfolioProjects.map((project) => [project.id, project]));

export function PortfolioGallerySection() {
  const [expanded, setExpanded] = useState(false);
  const [selection, setSelection] = useState<{ project: PortfolioProject; index: number } | null>(null);
  const reducedMotion = useReducedMotion();
  const shown = expanded ? portfolioPhotos : portfolioPhotos.slice(0, PREVIEW_COUNT);

  return (
    <section id="a-clique" className="clique-gallery" aria-labelledby="clique-gallery-heading">
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
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="clique-photo-grid"
              onClick={() => setExpanded((current) => !current)}
            >
              {expanded ? "Mostrar menos" : `Ver todas as ${portfolioPhotoCount} fotografias`}
              <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
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
