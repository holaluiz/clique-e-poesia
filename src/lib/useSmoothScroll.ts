import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Rolagem suave (com inércia) em todo o site. Mantém o scroll nativo da janela,
 * então `useScroll` do Motion e os listeners de scroll continuam funcionando.
 * Respeita `prefers-reduced-motion`; elementos com `data-lenis-prevent` rolam nativamente.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const sync = () => {
      lenis?.destroy();
      lenis = reducedMotion.matches
        ? null
        : new Lenis({ autoRaf: true, lerp: 0.1, anchors: true, allowNestedScroll: true });
    };

    // Troca de rota (ver lib/router.ts): interrompe a animação em curso para não
    // continuar rolando na página nova.
    const interrupt = () => {
      lenis?.stop();
      lenis?.start();
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    window.addEventListener("clique:navigate", interrupt);
    window.addEventListener("popstate", interrupt);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      window.removeEventListener("clique:navigate", interrupt);
      window.removeEventListener("popstate", interrupt);
      lenis?.destroy();
    };
  }, []);
}
