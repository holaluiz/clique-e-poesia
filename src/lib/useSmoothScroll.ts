import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

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
      window.__lenis = lenis;
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
      window.__lenis = null;
    };
  }, []);
}

/**
 * Rola de forma confiável para uma seção da página pelo ID, compatível com Lenis e com o layout dinâmico no mobile.
 */
export function scrollToSection(hashOrId: string) {
  if (typeof window === "undefined") return;
  const id = hashOrId.replace(/^[/#]+/, "");
  if (!id) {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const perform = () => {
    const el = document.getElementById(id);
    if (!el) return false;

    // Compensa altura da navbar fixa (~70px)
    const offset = -75;

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset, immediate: false });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    return true;
  };

  // Se o elemento ainda não estiver no DOM (renderização em andamento), tenta repetidamente
  if (!perform()) {
    let retries = 0;
    const interval = setInterval(() => {
      retries++;
      if (perform() || retries > 30) {
        clearInterval(interval);
      }
    }, 50);
  } else {
    // Reajustes pós-layout (evita desvios por carregamento de imagens no mobile)
    setTimeout(perform, 300);
    setTimeout(perform, 700);
  }
}
