import { supabase } from "./supabase";

function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua) || window.innerWidth < 768) return "mobile";
  if (/tablet|ipad/i.test(ua) || (window.innerWidth >= 768 && window.innerWidth < 1024)) return "tablet";
  return "desktop";
}

function getCleanReferrer(): string {
  if (typeof document === "undefined" || !document.referrer) return "Direto";
  try {
    const url = new URL(document.referrer);
    const host = url.hostname.toLowerCase();
    if (host.includes(window.location.hostname)) return "Interno";
    if (host.includes("instagram.com")) return "Instagram";
    if (host.includes("google.")) return "Google";
    if (host.includes("facebook.com")) return "Facebook";
    if (host.includes("t.co") || host.includes("twitter.com")) return "Twitter / X";
    if (host.includes("linkedin.com")) return "LinkedIn";
    if (host.includes("pinterest.")) return "Pinterest";
    if (host.includes("whatsapp.")) return "WhatsApp";
    return host.replace(/^www\./, "");
  } catch {
    return "Outro";
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = sessionStorage.getItem("cp_analytics_sid");
    if (!sid) {
      sid = "s_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
      sessionStorage.setItem("cp_analytics_sid", sid);
    }
    return sid;
  } catch {
    return "";
  }
}

let lastTrackedPath = "";

/**
 * Registra a visita de forma leve e assíncrona, sem bloquear a renderização.
 */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !supabase) return;
  // Não rastrear o próprio administrador navegando no painel
  if (path.startsWith("/admin")) return;
  // Evitar disparos duplicados consecutivos para a mesma página
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;

  const executeTrack = () => {
    try {
      const referrer = getCleanReferrer();
      // Não registrar cliques internos entre páginas do próprio site como novo referrer externo
      const finalReferrer = referrer === "Interno" ? "Direto" : referrer;

      supabase
        .from("page_views")
        .insert({
          path,
          referrer: finalReferrer,
          device: getDeviceType(),
          session_id: getSessionId(),
        })
        .then(() => {})
        .catch(() => {});
    } catch {
      // Ignora silenciosamente qualquer erro para não interferir na experiência do visitante
    }
  };

  // Dá prioridade total para o carregamento do site: aguarda o navegador ficar ocioso
  if ("requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(executeTrack);
  } else {
    setTimeout(executeTrack, 1000);
  }
}
