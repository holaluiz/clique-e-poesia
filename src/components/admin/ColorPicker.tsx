import React, { useEffect, useRef, useState } from "react";
import { Baseline, Check, RotateCcw } from "lucide-react";

// Paleta com as cores da Clique e Poesia e algumas de apoio.
const SWATCHES = [
  { name: "Preto", value: "#171713" },
  { name: "Verde", value: "#384936" },
  { name: "Oliva", value: "#7B7955" },
  { name: "Dourado", value: "#B8955A" },
  { name: "Terracota", value: "#B5651D" },
  { name: "Vinho", value: "#9B2C1F" },
  { name: "Azul", value: "#2F5D8A" },
  { name: "Lilás", value: "#6B4E8A" },
  { name: "Cinza", value: "#6B6B66" },
];

interface ColorPickerProps {
  /** Cor do trecho selecionado (vazia: cor padrão do texto). */
  value: string | undefined;
  onChange: (color: string) => void;
  onReset: () => void;
}

function toHex(color: string | undefined) {
  if (!color) return "#171713";
  if (color.startsWith("#")) return color.length === 4 ? `#${[...color.slice(1)].map((c) => c + c).join("")}` : color;
  const rgb = color.match(/\d+/g);
  return rgb ? `#${rgb.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, "0")).join("")}` : "#171713";
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, onReset }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const current = value ? toHex(value).toLowerCase() : "";

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (color: string) => {
    onChange(color);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        title="Cor do texto"
        aria-label="Cor do texto"
        aria-haspopup="true"
        aria-expanded={open}
        // Mantém a seleção do texto ao abrir a paleta.
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setOpen((state) => !state)}
        className={`w-8 h-8 flex flex-col items-center justify-center rounded-[6px] transition-colors ${
          open ? "bg-[#171713]/8" : "text-[#171713]/70 hover:bg-[#171713]/6 hover:text-[#171713]"
        }`}
      >
        <Baseline size={15} strokeWidth={2} />
        <span className="mt-[1px] h-[3px] w-4 rounded-full" style={{ backgroundColor: value || "#171713" }} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Escolher cor do texto"
          onMouseDown={(event) => {
            // Cliques na paleta não tiram a seleção do texto (exceto no seletor de cor do sistema).
            if (!(event.target instanceof HTMLInputElement)) event.preventDefault();
          }}
          className="absolute left-0 top-10 z-30 w-[228px] rounded-[10px] border border-[#171713]/10 bg-white p-3 shadow-[0_12px_32px_rgba(23,23,19,0.16)] space-y-3"
        >
          <div className="grid grid-cols-5 gap-2">
            {SWATCHES.map((swatch) => {
              const active = current === swatch.value.toLowerCase();
              return (
                <button
                  key={swatch.value}
                  type="button"
                  title={swatch.name}
                  aria-label={swatch.name}
                  aria-pressed={active}
                  onClick={() => choose(swatch.value)}
                  className="w-9 h-9 rounded-full flex items-center justify-center ring-offset-2 hover:ring-2 hover:ring-[#171713]/20 transition"
                  style={{ backgroundColor: swatch.value }}
                >
                  {active && <Check size={15} className="text-white" />}
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-[13px] text-[#171713]/75 hover:bg-[#171713]/4 cursor-pointer">
            <input
              type="color"
              value={toHex(value)}
              onChange={(event) => onChange(event.target.value)}
              className="w-7 h-7 rounded-full border-0 bg-transparent p-0 cursor-pointer"
              aria-label="Outra cor"
            />
            Outra cor…
          </label>

          <button
            type="button"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-[13px] text-[#171713]/75 hover:bg-[#171713]/4"
          >
            <RotateCcw size={14} /> Cor padrão
          </button>
        </div>
      )}
    </div>
  );
};
