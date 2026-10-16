import React, { useRef } from "react";
import { Navbar } from "./Navbar";
import { HeroScrollSequence } from "./HeroScrollSequence";
import { HandwrittenTrail } from "./HandwrittenTrail";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HeroScrollSequence>
      <div ref={containerRef} className="hero-section">
        <div className="hero-photograph" aria-hidden="true">
          <img src="/BG_01.png" alt="" fetchPriority="high" />
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
      </div>
    </HeroScrollSequence>
  );
};
