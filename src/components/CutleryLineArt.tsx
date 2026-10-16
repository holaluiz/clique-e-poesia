import React from "react";
import { motion, useReducedMotion } from "motion/react";

// Prato, garfo e colher em traço contínuo; a linha segue em laços até a borda direita.
const STROKES = [
  // Arremate em laço à esquerda
  "M 0 236 C 22 214, 52 204, 60 222 C 68 242, 34 250, 30 230 C 26 210, 70 196, 112 208",
  // Prato: borda externa e fundo
  "M 420 150 A 120 120 0 1 1 420 149.9",
  "M 382 150 A 82 82 0 1 1 382 149.9",
  // Colher: cabo e concha
  "M 255 98 C 200 78, 120 46, 84 36 C 66 31, 58 52, 74 58 C 120 74, 200 100, 252 110",
  "M 257 107 A 46 27 22 1 1 257 106.9",
  // Garfo: cabo, cabeça e dentes
  "M 238.6 188.1 L 58.4 248.3 C 50 251, 54 261, 61.6 257.7 L 240.6 193.7",
  "M 238.6 188.1 Q 262 170, 275.3 165.8 L 316 151.7",
  "M 240.6 193.7 Q 268 196, 283.1 188.4 L 323.8 174.3",
  "M 277.9 173.3 L 318.6 159.2",
  "M 280.5 180.9 L 321.2 166.8",
  "M 275.3 165.8 Q 276 178, 283.1 188.4",
  // Linha que sai do prato, faz os laços e corre até o fim
  "M 369 190 C 400 205, 420 175, 405 170 C 390 165, 385 195, 420 205 C 455 215, 470 180, 455 178 C 440 176, 440 205, 475 212 C 505 218, 515 185, 502 183 C 488 181, 490 212, 525 218 C 545 222, 552 192, 540 190 C 528 188, 532 220, 570 225 C 700 240, 900 230, 1200 214",
];

export const CutleryLineArt: React.FC<{ className?: string }> = ({ className = "" }) => {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1200 290"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {STROKES.map((d, index) => (
        <motion.path
          key={index}
          d={d}
          vectorEffect="non-scaling-stroke"
          initial={reducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.2, delay: index * 0.12, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
};
