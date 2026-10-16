import React from "react";
import { motion, useReducedMotion } from "motion/react";

// Talheres e pratos em traço contínuo dourado (public/talheres-linha.png, fundo transparente).
// Revela da esquerda para a direita, como se a linha fosse sendo desenhada. O gatilho fica no
// contêiner: com o recorte inicial a imagem tem área visível zero e nunca "entraria" na tela.
export const CutleryLineArt: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.img
        src="/talheres-linha.png"
        alt=""
        width={1920}
        height={407}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="block w-full h-auto opacity-70 select-none pointer-events-none"
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)" },
          visible: { clipPath: "inset(0 0% 0 0)" },
        }}
        transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.div>
  );
};
