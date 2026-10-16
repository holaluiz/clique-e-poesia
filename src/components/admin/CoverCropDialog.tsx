import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Cropper, { type Area } from "react-easy-crop";
import { ZoomIn, ZoomOut } from "lucide-react";
import { COVER_SIZE } from "../../lib/blog";
import { PrimaryButton, SecondaryButton } from "./ui";

interface CoverCropDialogProps {
  file: File;
  busy: boolean;
  onCancel: () => void;
  onConfirm: (area: Area) => void;
}

/** Janela para enquadrar a capa na proporção fixa de 1000×663. */
export const CoverCropDialog: React.FC<CoverCropDialogProps> = ({ file, busy, onCancel, onConfirm }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<Area | null>(null);
  const [centered, setCentered] = useState<Area | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Enquadramento central padrão, caso o recorte ainda não tenha informado a área escolhida.
  useEffect(() => {
    if (!imageUrl) return;
    const image = new window.Image();
    image.onload = () => {
      const ratio = COVER_SIZE.width / COVER_SIZE.height;
      const width = Math.min(image.naturalWidth, image.naturalHeight * ratio);
      const height = width / ratio;
      setCentered({ x: (image.naturalWidth - width) / 2, y: (image.naturalHeight - height) / 2, width, height });
    };
    image.src = imageUrl;
  }, [imageUrl]);

  const area = cropArea ?? centered;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onCancel]);

  // Abaixo de 1000px de largura a capa é ampliada e perde nitidez.
  const lowResolution = area !== null && area.width < COVER_SIZE.width;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171713]/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cover-crop-title"
      data-lenis-prevent
    >
      <div className="w-full max-w-[760px] rounded-[10px] bg-white shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#171713]/8">
          <h2 id="cover-crop-title" className="text-[17px] font-medium">
            Enquadrar foto de capa
          </h2>
          <p className="text-[13px] text-[#171713]/55">
            Arraste a foto para escolher o enquadramento. A capa é salva em {COVER_SIZE.width}×{COVER_SIZE.height}.
          </p>
        </div>

        <div className="relative h-[min(56vh,440px)] bg-[#171713]">
          {imageUrl && (
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={COVER_SIZE.width / COVER_SIZE.height}
            minZoom={1}
            maxZoom={4}
            zoomSpeed={0.2}
            showGrid
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, pixels) => setCropArea(pixels)}
          />
          )}
        </div>

        <div className="px-5 py-4 space-y-4">
          <label className="flex items-center gap-3">
            <ZoomOut size={16} className="text-[#171713]/50" aria-hidden="true" />
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              aria-label="Zoom"
              className="flex-1 accent-[#384936]"
            />
            <ZoomIn size={16} className="text-[#171713]/50" aria-hidden="true" />
          </label>

          {lowResolution && (
            <p className="text-[13px] text-[#9B5B1F]">
              Com esse zoom, a área escolhida tem só {Math.round(area!.width)}px de largura e a capa pode ficar sem nitidez.
              Diminua o zoom ou use uma foto maior.
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-2">
            <SecondaryButton type="button" onClick={onCancel} disabled={busy}>
              Cancelar
            </SecondaryButton>
            <PrimaryButton type="button" onClick={() => area && onConfirm(area)} disabled={busy || !area}>
              {busy ? "Salvando capa…" : "Usar esta capa"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
