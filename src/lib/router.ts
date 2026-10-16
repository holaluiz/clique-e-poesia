import { useEffect, useState, type MouseEvent } from "react";

// Roteamento mínimo por caminho: a Vercel já devolve o index.html para qualquer URL.
const NAVIGATE_EVENT = "clique:navigate";

function currentPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path || "/";
}

export function navigate(to: string) {
  window.history.pushState(null, "", to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  if (!to.includes("#")) window.scrollTo(0, 0);
}

export function usePathname() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const update = () => setPath(currentPath());
    window.addEventListener("popstate", update);
    window.addEventListener(NAVIGATE_EVENT, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);

  return path;
}

/** Navega sem recarregar a página em cliques comuns; mantém Ctrl/Cmd+clique abrindo nova aba. */
export function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  const href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("/") || href.includes("#")) return;
  event.preventDefault();
  navigate(href);
}
