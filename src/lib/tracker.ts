import { supabase } from "./supabase";

interface GeoInfo {
  city?: string;
  region?: string;
  country?: string;
}

const IGNORED_EMAILS = [
  "marcosgabriel.saga@gmail.com",
  "jordananadine@gmail.com",
];

/**
 * Verifica se o usuário atual é Marcos ou Jordana Nadine, ou se este navegador
 * foi marcado para não registrar métricas próprias.
 */
export function isAnalyticsIgnored(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // 1. Flag salva no navegador
    if (localStorage.getItem("cp_ignore_analytics") === "true") {
      return true;
    }

    // 2. Checagem de sessão de login no localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes("auth-token") || key.startsWith("sb-"))) {
        const val = localStorage.getItem(key);
        if (val) {
          const lower = val.toLowerCase();
          for (const email of IGNORED_EMAILS) {
            if (lower.includes(email.toLowerCase())) {
              localStorage.setItem("cp_ignore_analytics", "true");
              return true;
            }
          }
        }
      }
    }
  } catch {
    // Fallback silencioso
  }
  return false;
}

export function setIgnoreAnalytics(ignore: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (ignore) {
      localStorage.setItem("cp_ignore_analytics", "true");
    } else {
      localStorage.removeItem("cp_ignore_analytics");
    }
  } catch {}
}

function getDeviceDetails(): { deviceType: "mobile" | "tablet" | "desktop"; deviceModel: string; browser: string } {
  if (typeof window === "undefined") {
    return { deviceType: "desktop", deviceModel: "Desktop", browser: "Navegador" };
  }

  const ua = navigator.userAgent;
  let deviceType: "mobile" | "tablet" | "desktop" = "desktop";
  if (/mobile/i.test(ua) || window.innerWidth < 768) deviceType = "mobile";
  else if (/tablet|ipad/i.test(ua) || (window.innerWidth >= 768 && window.innerWidth < 1024)) deviceType = "tablet";

  // Identificação do Modelo / Plataforma
  let deviceModel = "Desconhecido";
  if (/iPhone/i.test(ua)) deviceModel = "iPhone (Apple)";
  else if (/iPad/i.test(ua)) deviceModel = "iPad (Apple)";
  else if (/Android/i.test(ua)) {
    const match = ua.match(/Android[^;]+; ([^)]+)\)/);
    if (match && match[1]) {
      const rawModel = match[1].split("Build")[0].trim();
      if (/SM-[A-Z0-9]+/i.test(rawModel)) deviceModel = `Samsung (${rawModel})`;
      else if (/moto/i.test(rawModel)) deviceModel = `Motorola (${rawModel})`;
      else if (/Redmi|POCO|Xiaomi/i.test(rawModel)) deviceModel = `Xiaomi (${rawModel})`;
      else deviceModel = rawModel.slice(0, 30);
    } else {
      deviceModel = "Android";
    }
  } else if (/Windows NT/i.test(ua)) deviceModel = "Windows PC";
  else if (/Macintosh/i.test(ua)) deviceModel = "Mac / Apple";
  else if (/Linux/i.test(ua)) deviceModel = "Linux PC";

  // Identificação do Navegador ou Aplicativo de Origem
  let browser = "Navegador Web";
  if (/Instagram/i.test(ua)) browser = "Instagram App";
  else if (/WhatsApp/i.test(ua)) browser = "WhatsApp App";
  else if (/FBAN|FBAV/i.test(ua)) browser = "Facebook App";
  else if (/Edg/i.test(ua)) browser = "Microsoft Edge";
  else if (/Chrome/i.test(ua)) browser = "Google Chrome";
  else if (/Safari/i.test(ua)) browser = "Apple Safari";
  else if (/Firefox/i.test(ua)) browser = "Mozilla Firefox";

  return { deviceType, deviceModel, browser };
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

async function getCachedGeo(): Promise<GeoInfo> {
  if (typeof window === "undefined") return {};
  try {
    const cached = sessionStorage.getItem("cp_analytics_geo");
    if (cached) return JSON.parse(cached);

    // Consulta assíncrona leve com timeout de segurança de 2 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch("https://ipwho.is/", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        const geo: GeoInfo = {
          city: data.city || undefined,
          region: data.region || undefined,
          country: data.country || undefined,
        };
        sessionStorage.setItem("cp_analytics_geo", JSON.stringify(geo));
        return geo;
      }
    }
  } catch {
    // Falhas de rede ou bloqueadores de rastreio não interrompem a execução
  }
  return {};
}

let lastTrackedPath = "";

/**
 * Registra a visita de forma leve e assíncrona, sem bloquear a renderização.
 */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !supabase) return;
  // Não rastrear o próprio administrador navegando no painel
  if (path.startsWith("/admin")) return;
  // Não rastrear acessos do Marcos ou da Jordana Nadine
  if (isAnalyticsIgnored()) return;
  // Evitar disparos duplicados consecutivos para a mesma página
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;

  const executeTrack = async () => {
    try {
      const referrer = getCleanReferrer();
      const finalReferrer = referrer === "Interno" ? "Direto" : referrer;
      const { deviceType, deviceModel, browser } = getDeviceDetails();
      const geo = await getCachedGeo();

      supabase
        .from("page_views")
        .insert({
          path,
          referrer: finalReferrer,
          device: deviceType,
          device_model: deviceModel,
          browser,
          city: geo.city || null,
          region: geo.region || null,
          country: geo.country || null,
          session_id: getSessionId(),
        })
        .then(() => {})
        .catch(() => {});
    } catch {
      // Ignora silenciosamente qualquer erro para não interferir na experiência do visitante
    }
  };

  if ("requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
      executeTrack();
    });
  } else {
    setTimeout(executeTrack, 800);
  }
}
