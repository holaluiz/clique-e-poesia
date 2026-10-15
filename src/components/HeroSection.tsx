import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Navbar } from "./Navbar";
import { HeroScrollSequence } from "./HeroScrollSequence";
import { HandwrittenTrail } from "./HandwrittenTrail";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState(
    () => localStorage.getItem("clique_hero_bg_image") || "/BG_01.png"
  );
  const [isDragging, setIsDragging] = useState(false);

  const saveAndApplyImage = (dataUrl: string) => {
    setImageSrc(dataUrl);
    localStorage.setItem("clique_hero_bg_image", dataUrl);
    fetch("/api/upload-hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataUrl }),
    }).catch((error) => console.error("Could not persist hero image:", error));
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    setIsDragging(false);
    if (event.defaultPrevented) return;
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file?.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") saveAndApplyImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <HeroScrollSequence>
      <div
        ref={containerRef}
        className="hero-section"
        onDrop={handleDrop}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
            setIsDragging(false);
          }
        }}
      >
        <div className="hero-photograph" aria-hidden="true">
          <img
            src={imageSrc}
            alt=""
            fetchPriority="high"
            onError={() => {
              if (imageSrc !== "/BG_01.png") setImageSrc("/BG_01.png");
            }}
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <HandwrittenTrail containerRef={containerRef} />
  
        <Navbar />
  
        <div className="hero-content">
          <p className="hero-eyebrow">Sua hospedagem vista por um clique</p>
  
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line">Um Clique,</span>
            <span className="hero-title-line">
              uma <span className="hero-title-script">poesia!</span>
            </span>
          </h1>
  
          <p className="hero-description">
            A gente que ama fotografar e ama escrever,
            <br className="hidden sm:block" />{" "}
            criou a <strong>Clique e Poesia!</strong>
          </p>
  
          <div className="hero-actions">
            <a href="#quem-somos" className="hero-button hero-button-primary">
              Conheça a gente
            </a>
            <a href="#a-clique" className="hero-button hero-button-secondary">
              Ver nosso trabalho
            </a>
          </div>
        </div>
  
        {isDragging && (
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center border-2 border-dashed border-[#E3D9C8] bg-[#20201B]/85 text-[#FAF7F2] backdrop-blur-sm">
            <UploadCloud className="mb-4 h-12 w-12 text-[#D6B985]" aria-hidden="true" />
            <p className="text-2xl">Solte sua fotografia aqui</p>
          </div>
        )}
      </div>
    </HeroScrollSequence>
  );
};
