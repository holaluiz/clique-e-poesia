import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import type { PortfolioProject } from '../data/portfolio';
import './PortfolioPhotoViewer.css';

interface PortfolioPhotoViewerProps {
  project: PortfolioProject;
  initialIndex: number;
  onClose: () => void;
}

const wrapIndex = (index: number, count: number) => count ? ((index % count) + count) % count : 0;

export function PortfolioPhotoViewer({ project, initialIndex, onClose }: PortfolioPhotoViewerProps) {
  const count = project.images.length;
  const [index, setIndex] = useState(() => wrapIndex(initialIndex, count));
  const [zoomed, setZoomed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const gesture = useRef<{ id: number; x: number; y: number; panX: number; panY: number } | null>(null);
  const pan = useRef({ x: 0, y: 0 });
  const titleId = useId();
  const captionId = useId();
  const photo = project.images[index];

  const resetZoom = () => {
    setZoomed(false);
    setDragging(false);
    pan.current = { x: 0, y: 0 };
    gesture.current = null;
    if (imageRef.current) imageRef.current.style.transform = 'none';
  };

  const selectPhoto = (nextIndex: number) => {
    resetZoom();
    const next = wrapIndex(nextIndex, count);
    if (next !== index) setImageError(false);
    setIndex(next);
  };

  const toggleZoom = () => {
    pan.current = { x: 0, y: 0 };
    gesture.current = null;
    setDragging(false);
    setZoomed((current) => !current);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    thumbnailRefs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [index]);

  const beginGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || (event.target as Element).closest('button')) return;
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      panX: pan.current.x,
      panY: pan.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (zoomed) setDragging(true);
  };

  const moveGesture = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    const image = imageRef.current;
    if (!start || start.id !== event.pointerId || !zoomed || !image) return;
    const maxX = Math.max(0, (image.offsetWidth * 2 - event.currentTarget.clientWidth) / 2);
    const maxY = Math.max(0, (image.offsetHeight * 2 - event.currentTarget.clientHeight) / 2);
    pan.current = {
      x: Math.max(-maxX, Math.min(maxX, start.panX + event.clientX - start.x)),
      y: Math.max(-maxY, Math.min(maxY, start.panY + event.clientY - start.y)),
    };
    image.style.transform = `translate3d(${pan.current.x}px, ${pan.current.y}px, 0) scale(2)`;
  };

  const endGesture = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (cancelled || zoomed) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) >= 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      selectPhoto(index + (deltaX < 0 ? 1 : -1));
    }
  };

  if (!photo) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="portfolio-viewer"
      aria-labelledby={titleId}
      aria-describedby={captionId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          selectPhoto(index + (event.key === 'ArrowRight' ? 1 : -1));
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          selectPhoto(event.key === 'Home' ? 0 : count - 1);
        }
      }}
    >
      <header className="portfolio-viewer-header">
        <div className="portfolio-viewer-heading">
          <p className="portfolio-viewer-eyebrow">{project.categoryLabel}{project.location ? ` · ${project.location}` : ''}</p>
          <h2 id={titleId}>{project.title}</h2>
        </div>
        <div className="portfolio-viewer-actions">
          <button
            type="button"
            className="portfolio-viewer-control"
            aria-pressed={zoomed}
            disabled={imageError}
            aria-label={zoomed ? 'Restaurar enquadramento da foto' : 'Ampliar foto em duas vezes'}
            onClick={toggleZoom}
          >
            <span aria-hidden="true" className="portfolio-viewer-control-icon">{zoomed ? '−' : '+'}</span>
            <span className="portfolio-viewer-action-label">{zoomed ? 'Enquadrar' : 'Ampliar'}</span>
          </button>
          <button type="button" className="portfolio-viewer-control" onClick={onClose} autoFocus aria-label="Fechar galeria">
            <span className="portfolio-viewer-action-label">Fechar</span>
            <span aria-hidden="true" className="portfolio-viewer-control-icon">×</span>
          </button>
        </div>
      </header>

      <div
        className={`portfolio-viewer-stage${zoomed ? ' is-zoomed' : ''}${dragging ? ' is-dragging' : ''}`}
        onPointerDown={beginGesture}
        onPointerMove={moveGesture}
        onPointerUp={(event) => endGesture(event)}
        onPointerCancel={(event) => endGesture(event, true)}
      >
        <button type="button" className="portfolio-viewer-arrow portfolio-viewer-previous" onClick={() => selectPhoto(index - 1)} aria-label="Foto anterior" disabled={count < 2}>
          <span aria-hidden="true">←</span>
        </button>
        <figure className="portfolio-viewer-figure">
          <img
            ref={imageRef}
            key={photo.src}
            className="portfolio-viewer-image"
            src={photo.src}
            alt={photo.alt}
            draggable={false}
            loading="eager"
            decoding="async"
            style={{ transform: zoomed ? 'scale(2)' : 'none', visibility: imageError ? 'hidden' : undefined }}
            onError={() => { setImageError(true); resetZoom(); }}
          />
          {imageError && <p className="portfolio-viewer-error" role="status">Não foi possível carregar esta foto. Você pode ver as próximas.</p>}
        </figure>
        <button type="button" className="portfolio-viewer-arrow portfolio-viewer-next" onClick={() => selectPhoto(index + 1)} aria-label="Próxima foto" disabled={count < 2}>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <footer className="portfolio-viewer-footer">
        <div className="portfolio-viewer-caption-row" role="status" aria-live="polite" aria-atomic="true">
          <p id={captionId} className="portfolio-viewer-caption">{photo.alt || project.description}</p>
          <p className="portfolio-viewer-count">Foto {String(index + 1).padStart(2, '0')} <span>de</span> {String(count).padStart(2, '0')}</p>
        </div>
        <div className="portfolio-viewer-thumbnails" role="group" aria-label="Fotografias do projeto">
          {project.images.map((image, imageIndex) => (
            <button
              ref={(element) => { thumbnailRefs.current[imageIndex] = element; }}
              type="button"
              key={`${image.src}-${imageIndex}`}
              className="portfolio-viewer-thumbnail"
              aria-label={`Ver foto ${imageIndex + 1}: ${image.alt}`}
              aria-pressed={imageIndex === index}
              onClick={() => selectPhoto(imageIndex)}
            >
              <img src={image.thumbnail} alt="" draggable={false} loading="lazy" decoding="async" />
              <span aria-hidden="true">{String(imageIndex + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        <p className="portfolio-viewer-hint">← → para explorar <span aria-hidden="true">·</span> deslize para trocar <span aria-hidden="true">·</span> amplie e arraste <span aria-hidden="true">·</span> Esc para fechar</p>
      </footer>
    </dialog>,
    document.body,
  );
}
