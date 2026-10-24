import React, { useEffect, useState, useTransition } from "react";
import {
  Eye,
  Users,
  Smartphone,
  Globe,
  RefreshCw,
  TrendingUp,
  Share2,
  Calendar,
  AlertCircle,
  ExternalLink,
  MapPin,
  Laptop,
  Clock,
  Compass,
  MousePointerClick,
  MessageCircle,
  Trash2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { AdminCard } from "./ui";

type Period = "today" | "7d" | "30d" | "all";

interface RecentVisitorSession {
  sessionId: string;
  paths: string[];
  pageCount: number;
  city?: string;
  region?: string;
  device_model?: string;
  browser?: string;
  referrer?: string;
  lastActive: string;
}

interface ButtonClickStat {
  id: string;
  label: string;
  count: number;
  percentage: number;
  category: "whatsapp" | "link" | "social";
}

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  avgPagesPerVisitor: number;
  mobileCount: number;
  desktopCount: number;
  bioLinksVisitors: number;
  totalClicks: number;
  buttonClicks: ButtonClickStat[];
  pages: { path: string; views: number; uniqueVisitors: number }[];
  referrers: { source: string; count: number }[];
  cities: { location: string; visitors: number; views: number }[];
  devices: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  dailyViews: { date: string; label: string; count: number }[];
  recentSessions: RecentVisitorSession[];
}

const BUTTON_LABELS: Record<string, { label: string; category: "whatsapp" | "link" | "social" }> = {
  btn_whatsapp: { label: "Planeje seu Ensaio (WhatsApp)", category: "whatsapp" },
  icon_whatsapp: { label: "WhatsApp (Ícone Rodapé)", category: "whatsapp" },
  btn_portfolio: { label: "Portfólio", category: "link" },
  btn_blog: { label: "Blog", category: "link" },
  btn_hospedagens: { label: "Hospedagens", category: "link" },
  btn_retratos: { label: "Retratos", category: "link" },
  btn_gastronomia: { label: "Gastronomia", category: "link" },
  btn_share: { label: "Compartilhar Linktree", category: "social" },
  icon_instagram: { label: "Instagram Oficial", category: "social" },
  icon_pinterest: { label: "Pinterest Oficial", category: "social" },
  icon_linkedin: { label: "LinkedIn Oficial", category: "social" },
};

export const AdminAnalytics: React.FC = () => {
  const [period, setPeriod] = useState<Period>("7d");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    avgPagesPerVisitor: 0,
    mobileCount: 0,
    desktopCount: 0,
    bioLinksVisitors: 0,
    totalClicks: 0,
    buttonClicks: [],
    pages: [],
    referrers: [],
    cities: [],
    devices: [],
    browsers: [],
    dailyViews: [],
    recentSessions: [],
  });
  const [, startTransition] = useTransition();

  const fetchAnalytics = async (selectedPeriod: Period) => {
    if (!supabase) {
      setError("Conexão com o Supabase não configurada.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("page_views")
        .select("id, path, referrer, device, device_model, browser, city, region, country, session_id, created_at");

      const now = new Date();
      let startOfDayIso = "";
      let past7Iso = "";
      let past30Iso = "";

      if (selectedPeriod === "today") {
        startOfDayIso = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        query = query.gte("created_at", startOfDayIso);
      } else if (selectedPeriod === "7d") {
        past7Iso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", past7Iso);
      } else if (selectedPeriod === "30d") {
        past30Iso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", past30Iso);
      }

      const { data: rows, error: queryError } = await query.order("created_at", { ascending: false });

      if (queryError) {
        if (queryError.message.includes("does not exist") || queryError.code === "42P01") {
          setError(
            "A tabela 'page_views' ainda não foi criada no Supabase. Execute o script SQL no painel do Supabase para ativar o rastreamento."
          );
        } else {
          setError("Erro ao carregar métricas: " + queryError.message);
        }
        setLoading(false);
        return;
      }

      // 2. Buscar cliques na tabela dedicada 'link_clicks'
      let clicksQuery = supabase
        .from("link_clicks")
        .select("id, button_id, button_label, target_url, device, device_model, city, region, session_id, created_at");

      if (selectedPeriod === "today") {
        clicksQuery = clicksQuery.gte("created_at", startOfDayIso);
      } else if (selectedPeriod === "7d") {
        clicksQuery = clicksQuery.gte("created_at", past7Iso);
      } else if (selectedPeriod === "30d") {
        clicksQuery = clicksQuery.gte("created_at", past30Iso);
      }

      const { data: dedicatedClicks } = await clicksQuery.order("created_at", { ascending: false });

      // Agrupamento de cliques em botões
      const clickMap = new Map<string, number>();
      let totalClicksCount = 0;

      const isBotOrDev = (r: { city?: string | null; country?: string | null; device_model?: string | null }) => {
        if (r.city === "San Jose" && r.device_model === "Linux PC") return true;
        if (r.country === "United States" && r.device_model === "Linux PC") return true;
        return false;
      };

      if (dedicatedClicks && dedicatedClicks.length > 0) {
        for (const c of dedicatedClicks) {
          if (isBotOrDev(c)) continue;
          totalClicksCount++;
          const btnKey = c.button_id || "desconhecido";
          clickMap.set(btnKey, (clickMap.get(btnKey) || 0) + 1);
        }
      }

      // Separar page views normais e fallbacks de cliques
      const validRows: typeof rows = [];

      for (const row of rows || []) {
        if (isBotOrDev(row)) continue;

        if (row.path && row.path.startsWith("click:")) {
          // Se não usou a tabela dedicada, usa o fallback registrado em page_views
          if (!dedicatedClicks || dedicatedClicks.length === 0) {
            const btnKey = row.path.replace("click:", "");
            totalClicksCount++;
            clickMap.set(btnKey, (clickMap.get(btnKey) || 0) + 1);
          }
        } else {
          validRows.push(row);
        }
      }

      // Montar ranking de botões clicados
      const buttonClicks: ButtonClickStat[] = Array.from(clickMap.entries())
        .map(([id, count]) => {
          const info = BUTTON_LABELS[id] || { label: id, category: "link" };
          return {
            id,
            label: info.label,
            count,
            percentage: totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0,
            category: info.category,
          };
        })
        .sort((a, b) => b.count - a.count);

      if (validRows.length === 0 && totalClicksCount === 0) {
        setData({
          totalViews: 0,
          uniqueVisitors: 0,
          avgPagesPerVisitor: 0,
          mobileCount: 0,
          desktopCount: 0,
          bioLinksVisitors: 0,
          totalClicks: 0,
          buttonClicks: [],
          pages: [],
          referrers: [],
          cities: [],
          devices: [],
          browsers: [],
          dailyViews: [],
          recentSessions: [],
        });
        setLoading(false);
        return;
      }

      // =========================================================================
      // AGRUPAMENTO INTELIGENTE POR APARELHO / VISITANTE ÚNICO
      // Garante que se uma mesma pessoa navegar por 10 páginas, ela conte como
      // 1 visitante, 1 celular e 1 pessoa na sua cidade!
      // =========================================================================
      interface VisitorSessionData {
        sessionId: string;
        deviceType: string;
        deviceModel: string;
        browser: string;
        city: string;
        referrer: string;
        paths: string[];
        lastActive: string;
      }

      const sessionMap = new Map<string, VisitorSessionData>();
      const pageViewMap = new Map<string, number>();
      const pageUniqueMap = new Map<string, Set<string>>();
      const dateMap = new Map<string, number>();

      for (const row of validRows) {
        const sid = row.session_id || `anon_${row.id}`;

        // Contagem de páginas
        pageViewMap.set(row.path, (pageViewMap.get(row.path) || 0) + 1);
        if (!pageUniqueMap.has(row.path)) {
          pageUniqueMap.set(row.path, new Set<string>());
        }
        pageUniqueMap.get(row.path)!.add(sid);

        // Agrupamento por dia
        if (row.created_at) {
          const d = new Date(row.created_at);
          const dateKey = d.toISOString().split("T")[0];
          dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
        }

        const loc = row.city
          ? row.region
            ? `${row.city}, ${row.region}`
            : row.city
          : "Localização em processamento";

        const dev = row.device_model || (row.device === "mobile" ? "Celular (Android/iOS)" : "Computador (PC/Mac)");
        const nav = row.browser || "Navegador Web";
        const ref = row.referrer || "Direto";

        if (!sessionMap.has(sid)) {
          sessionMap.set(sid, {
            sessionId: sid,
            deviceType: row.device || "desktop",
            deviceModel: dev,
            browser: nav,
            city: loc,
            referrer: ref,
            paths: [row.path],
            lastActive: row.created_at || new Date().toISOString(),
          });
        } else {
          const s = sessionMap.get(sid)!;
          // Adiciona à trilha de navegação se for diferente da anterior
          if (s.paths[s.paths.length - 1] !== row.path) {
            s.paths.push(row.path);
          }
          if (s.city === "Localização em processamento" && loc !== "Localização em processamento") {
            s.city = loc;
          }
        }
      }

      // Agora agrupamos as métricas baseadas no número real de VISITANTES ÚNICOS
      const uniqueVisitorsCount = sessionMap.size || validRows.length;
      let mobileCount = 0;
      let desktopCount = 0;
      let bioLinksVisitors = 0;

      const cityMap = new Map<string, { visitors: number; views: number }>();
      const deviceMap = new Map<string, number>();
      const browserMap = new Map<string, number>();
      const refMap = new Map<string, number>();

      for (const s of sessionMap.values()) {
        // Celular vs Desktop por pessoa
        if (s.deviceType === "mobile" || s.deviceType === "tablet") mobileCount++;
        else desktopCount++;

        // Visitou a página da Bio (/links)?
        if (s.paths.some((p) => p.startsWith("/links") || p.startsWith("/linktree"))) {
          bioLinksVisitors++;
        }

        // Cidades (1 por visitante!)
        const currCity = cityMap.get(s.city) || { visitors: 0, views: 0 };
        currCity.visitors++;
        currCity.views += s.paths.length;
        cityMap.set(s.city, currCity);

        // Modelos de Aparelho (1 por celular!)
        deviceMap.set(s.deviceModel, (deviceMap.get(s.deviceModel) || 0) + 1);

        // Navegadores (1 por visitante!)
        browserMap.set(s.browser, (browserMap.get(s.browser) || 0) + 1);

        // Origem do tráfego (1 por visitante!)
        const finalRef = s.referrer === "Interno" ? "Direto" : s.referrer;
        refMap.set(finalRef, (refMap.get(finalRef) || 0) + 1);
      }

      const pages = Array.from(pageViewMap.entries())
        .map(([path, views]) => ({
          path,
          views,
          uniqueVisitors: pageUniqueMap.get(path)?.size || views,
        }))
        .sort((a, b) => b.views - a.views);

      const referrers = Array.from(refMap.entries())
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count);

      const cities = Array.from(cityMap.entries())
        .map(([location, stats]) => ({
          location,
          visitors: stats.visitors,
          views: stats.views,
        }))
        .sort((a, b) => b.visitors - a.visitors);

      const devices = Array.from(deviceMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      const browsers = Array.from(browserMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      const dailyViews = Array.from(dateMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, count]) => {
          const [, m, day] = date.split("-");
          return {
            date,
            label: `${day}/${m}`,
            count,
          };
        });

      // Últimas sessões de visitantes agrupadas por pessoa com sua trilha
      const recentSessions: RecentVisitorSession[] = Array.from(sessionMap.values())
        .slice(0, 15)
        .map((s) => ({
          sessionId: s.sessionId,
          paths: s.paths,
          pageCount: s.paths.length,
          city: s.city,
          device_model: s.deviceModel,
          browser: s.browser,
          referrer: s.referrer,
          lastActive: s.lastActive,
        }));

      const avgPages = uniqueVisitorsCount > 0
        ? Math.round((validRows.length / uniqueVisitorsCount) * 10) / 10
        : 1;

      setData({
        totalViews: validRows.length,
        uniqueVisitors: uniqueVisitorsCount,
        avgPagesPerVisitor: avgPages,
        mobileCount,
        desktopCount,
        bioLinksVisitors,
        totalClicks: totalClicksCount,
        buttonClicks,
        pages,
        referrers,
        cities,
        devices,
        browsers,
        dailyViews,
        recentSessions,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao buscar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  const mobilePercent = data.uniqueVisitors > 0
    ? Math.round((data.mobileCount / data.uniqueVisitors) * 100)
    : 0;
  const maxDayCount = Math.max(...data.dailyViews.map((d) => d.count), 1);
  const conversionRate = data.bioLinksVisitors > 0
    ? Math.round((data.totalClicks / data.bioLinksVisitors) * 100)
    : 0;

  const formatVisitTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const handleResetMetrics = async () => {
    if (!supabase) return;
    const ok = window.confirm(
      "Deseja realmente zerar todo o histórico de acessos e cliques no banco de dados para recomeçar o rastreamento do zero?"
    );
    if (!ok) return;

    setLoading(true);
    try {
      await supabase.from("page_views").delete().gte("created_at", "2000-01-01");
      await supabase.from("link_clicks").delete().gte("created_at", "2000-01-01");
      await fetchAnalytics(period);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatPathLabel = (path: string) => {
    if (path === "/") return "Home";
    if (path === "/links") return "Linktree";
    if (path === "/blog") return "Blog";
    if (path.startsWith("/blog/")) return "Post do Blog";
    return path;
  };

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-[#171713]/10">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#384936]" />
          <span className="text-[13px] font-medium text-[#171713]/70">Período de Análise:</span>
          <div className="inline-flex rounded-md bg-[#ECEEEF] p-0.5 text-[12px] font-medium">
            <button
              type="button"
              onClick={() => startTransition(() => setPeriod("today"))}
              className={`px-2.5 py-1 rounded transition-colors ${
                period === "today" ? "bg-white text-[#171713] shadow-sm font-semibold" : "text-[#171713]/60 hover:text-[#171713]"
              }`}
            >
              Hoje
            </button>
            <button
              type="button"
              onClick={() => startTransition(() => setPeriod("7d"))}
              className={`px-2.5 py-1 rounded transition-colors ${
                period === "7d" ? "bg-white text-[#171713] shadow-sm font-semibold" : "text-[#171713]/60 hover:text-[#171713]"
              }`}
            >
              Últimos 7 dias
            </button>
            <button
              type="button"
              onClick={() => startTransition(() => setPeriod("30d"))}
              className={`px-2.5 py-1 rounded transition-colors ${
                period === "30d" ? "bg-white text-[#171713] shadow-sm font-semibold" : "text-[#171713]/60 hover:text-[#171713]"
              }`}
            >
              Últimos 30 dias
            </button>
            <button
              type="button"
              onClick={() => startTransition(() => setPeriod("all"))}
              className={`px-2.5 py-1 rounded transition-colors ${
                period === "all" ? "bg-white text-[#171713] shadow-sm font-semibold" : "text-[#171713]/60 hover:text-[#171713]"
              }`}
            >
              Tudo
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetMetrics}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium text-red-700 bg-red-50 hover:bg-red-100/80 border border-red-200/80 transition-colors cursor-pointer"
            title="Limpar todo o histórico de acessos e cliques"
          >
            <Trash2 size={13} />
            <span>Zerar Histórico</span>
          </button>

          <button
            type="button"
            onClick={() => fetchAnalytics(period)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium bg-[#171713]/5 hover:bg-[#171713]/10 text-[#171713]/75 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} className={loading ? "animate-spin text-[#384936]" : ""} />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* Aviso de exclusão dos acessos dos donos e do sistema */}
      <div className="bg-[#384936]/8 border border-[#384936]/20 rounded-lg px-4 py-2.5 flex items-center justify-between text-[12.5px] text-[#20201B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
          <span>
            <strong>Filtro Ativo:</strong> Seus acessos (<em>marcosgabriel.saga@gmail.com</em>, <em>jordananadine@gmail.com</em>), robôs/servidores de deploy e assistentes virtuais estão sendo 100% desconsiderados. O painel agrupa por <strong>aparelho único</strong> para não inflar visitas duplicadas.
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4 text-[13px] flex items-start gap-3">
          <AlertCircle size={18} className="shrink-0 text-amber-600 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium">Configuração necessária no banco de dados:</p>
            <p className="text-[12.5px] opacity-90">{error}</p>
          </div>
        </div>
      )}

      {/* Cartões Principais (KPIs) com foco em PESSOAS REAIS e APARELHOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Visitantes Únicos (Métrica Principal) */}
        <AdminCard className="p-4 flex items-center justify-between border-l-4 border-l-[#384936]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#384936]">Visitantes Únicos</span>
            <div className="text-[26px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : data.uniqueVisitors.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-[#171713]/60 flex items-center gap-1 mt-1">
              <Users size={11} className="text-[#384936]" /> Pessoas / Celulares reais
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#384936]/15 text-[#384936] flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
        </AdminCard>

        {/* Páginas Vistas (Volume Total de Navegação) */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#171713]/50">Páginas Vistas</span>
            <div className="text-[24px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : data.totalViews.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <Layers size={11} /> Média {data.avgPagesPerVisitor} páginas/visitante
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-700 flex items-center justify-center shrink-0">
            <Eye size={18} />
          </div>
        </AdminCard>

        {/* % Celular vs Computador */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#171713]/50">Aparelhos Celulares</span>
            <div className="text-[24px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : `${mobilePercent}%`}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <Smartphone size={11} /> {data.mobileCount} cel · {data.desktopCount} PC
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
            <Smartphone size={18} />
          </div>
        </AdminCard>

        {/* Pessoas no Link da Bio (/links) */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#171713]/50">Pessoas na Bio (/links)</span>
            <div className="text-[24px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : data.bioLinksVisitors.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <Share2 size={11} /> Visitantes no Linktree
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
            <Share2 size={18} />
          </div>
        </AdminCard>

        {/* Total de Cliques nos Botões */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#171713]/50">Cliques nos Botões</span>
            <div className="text-[24px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : data.totalClicks.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <MousePointerClick size={11} /> {conversionRate}% taxa de conversão
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-purple-500/10 text-purple-700 flex items-center justify-center shrink-0">
            <MousePointerClick size={18} />
          </div>
        </AdminCard>
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO ESPECIAL: CLIQUES NOS BOTÕES DO LINKTREE / BIO                      */}
      {/* ========================================================================= */}
      <AdminCard className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#171713]/10 pb-3">
          <div>
            <h3 className="text-[15px] font-medium text-[#171713] flex items-center gap-2">
              <MousePointerClick size={17} className="text-[#384936]" />
              <span>Cliques nos Botões do Linktree (Bio)</span>
            </h3>
            <p className="text-[12px] text-[#171713]/55 mt-0.5">
              Métricas exatas de quantas pessoas clicaram em cada botão da sua página de links (/links)
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[12px] bg-[#384936]/10 text-[#384936] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span>Total: {data.totalClicks} cliques</span>
              {data.bioLinksVisitors > 0 && (
                <span className="text-[#384936]/70">· {conversionRate}% de conversão</span>
              )}
            </span>
          </div>
        </div>

        {data.buttonClicks.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#171713]/5 text-[#171713]/40 flex items-center justify-center mx-auto">
              <MousePointerClick size={22} />
            </div>
            <p className="text-[13.5px] font-medium text-[#171713]/70">Nenhum clique registrado ainda neste período.</p>
            <p className="text-[12px] text-[#171713]/45 max-w-md mx-auto">
              Assim que os visitantes acessarem o seu Linktree pelo Instagram e clicarem em Planeje seu Ensaio, Portfólio, Blog ou redes, os contadores aparecerão aqui automaticamente.
            </p>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {data.buttonClicks.map((btn) => {
              const isWhatsApp = btn.category === "whatsapp";
              const isSocial = btn.category === "social";

              const badgeColor = isWhatsApp
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : isSocial
                ? "bg-pink-100 text-pink-800 border-pink-200"
                : "bg-blue-100 text-blue-800 border-blue-200";

              const barColor = isWhatsApp
                ? "bg-emerald-600"
                : isSocial
                ? "bg-pink-600"
                : "bg-[#384936]";

              return (
                <div key={btn.id} className="p-3 rounded-lg bg-[#171713]/2 hover:bg-[#171713]/4 transition-colors space-y-1.5 border border-[#171713]/5">
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2 min-w-0 pr-3">
                      {isWhatsApp ? (
                        <MessageCircle size={15} className="text-emerald-600 shrink-0" />
                      ) : (
                        <MousePointerClick size={15} className="text-[#384936] shrink-0" />
                      )}
                      <span className="font-semibold text-[#171713] truncate">{btn.label}</span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${badgeColor}`}>
                        {btn.category === "whatsapp" ? "Contato" : btn.category === "social" ? "Rede" : "Site"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[13px] font-bold text-[#171713] font-mono">
                        {btn.count.toLocaleString("pt-BR")} {btn.count === 1 ? "clique" : "cliques"}
                      </span>
                      <span className="text-[11.5px] font-medium text-[#171713]/50 w-11 text-right">
                        ({btn.percentage}%)
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-[#171713]/8 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${Math.max(4, btn.percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      {/* Gráfico de Acessos Recentes por Dia */}
      {data.dailyViews.length > 0 && (
        <AdminCard className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-medium text-[#171713]">Atividade ao longo do período</h3>
              <p className="text-[12px] text-[#171713]/50">Quantidade de páginas visualizadas por dia</p>
            </div>
          </div>

          <div className="pt-4 flex items-end gap-2 h-36 border-b border-[#171713]/10 pb-2 overflow-x-auto">
            {data.dailyViews.map((day) => {
              const heightPercent = Math.max(8, Math.round((day.count / maxDayCount) * 100));
              return (
                <div key={day.date} className="flex-1 min-w-[28px] max-w-[48px] flex flex-col items-center gap-1.5 group">
                  <div className="text-[11px] font-medium text-[#171713]/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.count}
                  </div>
                  <div className="w-full bg-[#171713]/10 rounded-t-sm h-24 flex items-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-[#384936] group-hover:bg-[#465b43] transition-all rounded-t-sm"
                      title={`${day.count} visualizações em ${day.date}`}
                    />
                  </div>
                  <span className="text-[10px] text-[#171713]/50 truncate">{day.label}</span>
                </div>
              );
            })}
          </div>
        </AdminCard>
      )}

      {/* Localização & Aparelhos (Agora agrupados por APARELHO ÚNICO / PESSOA) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Cidades & Regiões */}
        <AdminCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#171713]/10 pb-2.5">
            <div>
              <h3 className="text-[14px] font-medium text-[#171713] flex items-center gap-1.5">
                <MapPin size={15} className="text-[#384936]" /> Cidades & Localização
              </h3>
              <p className="text-[11px] text-[#171713]/50">Contagem de visitantes únicos por cidade</p>
            </div>
            <span className="text-[11.5px] font-semibold text-[#171713]/60">Pessoas</span>
          </div>

          {data.cities.length === 0 ? (
            <p className="text-[13px] text-[#171713]/50 py-4 text-center">Nenhuma localização registrada ainda.</p>
          ) : (
            <div className="space-y-2.5 pt-1">
              {data.cities.slice(0, 7).map((c) => {
                const percent = data.uniqueVisitors > 0 ? Math.round((c.visitors / data.uniqueVisitors) * 100) : 0;
                return (
                  <div key={c.location} className="space-y-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-[#171713]/85 truncate max-w-[200px] sm:max-w-xs flex items-center gap-1.5">
                        <Compass size={13} className="text-[#384936]/60 shrink-0" />
                        {c.location}
                      </span>
                      <div className="flex items-center gap-2 text-right shrink-0">
                        <span className="text-[#171713] font-bold text-[12px]">
                          {c.visitors} {c.visitors === 1 ? "pessoa" : "pessoas"}
                        </span>
                        <span className="text-[#171713]/40 text-[11px]">
                          ({c.views} {c.views === 1 ? "pág." : "págs."})
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-[#171713]/8 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#384936] h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminCard>

        {/* Modelo do Celular & Aparelhos */}
        <AdminCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#171713]/10 pb-2.5">
            <div>
              <h3 className="text-[14px] font-medium text-[#171713] flex items-center gap-1.5">
                <Smartphone size={15} className="text-[#384936]" /> Modelos de Aparelho & Dispositivos
              </h3>
              <p className="text-[11px] text-[#171713]/50">Quantidade de aparelhos físicos identificados</p>
            </div>
            <span className="text-[11.5px] font-semibold text-[#171713]/60">Aparelhos</span>
          </div>

          {data.devices.length === 0 ? (
            <p className="text-[13px] text-[#171713]/50 py-4 text-center">Nenhum aparelho identificado ainda.</p>
          ) : (
            <div className="space-y-2.5 pt-1">
              {data.devices.slice(0, 7).map((d) => {
                const percent = data.uniqueVisitors > 0 ? Math.round((d.count / data.uniqueVisitors) * 100) : 0;
                const isMobile = d.name.toLowerCase().includes("iphone") || d.name.toLowerCase().includes("samsung") || d.name.toLowerCase().includes("motorola") || d.name.toLowerCase().includes("android");
                return (
                  <div key={d.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-[#171713]/85 truncate max-w-[200px] sm:max-w-xs flex items-center gap-1.5">
                        {isMobile ? <Smartphone size={13} className="text-emerald-700/70 shrink-0" /> : <Laptop size={13} className="text-blue-700/70 shrink-0" />}
                        {d.name}
                      </span>
                      <span className="text-[#171713] font-bold text-[12px]">
                        {d.count} {d.count === 1 ? "aparelho" : "aparelhos"} <span className="text-[#171713]/40 font-normal">({percent}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-[#171713]/8 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-700/70 h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminCard>
      </div>

      {/* Páginas Mais Vistas & Origens de Tráfego */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Páginas Mais Vistas */}
        <AdminCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#171713]/10 pb-2.5">
            <h3 className="text-[14px] font-medium text-[#171713] flex items-center gap-1.5">
              <Globe size={15} className="text-[#384936]" /> Páginas Mais Acessadas
            </h3>
            <span className="text-[11.5px] text-[#171713]/50">Pessoas / Acessos</span>
          </div>

          {data.pages.length === 0 ? (
            <p className="text-[13px] text-[#171713]/50 py-4 text-center">Nenhum dado registrado neste período.</p>
          ) : (
            <div className="space-y-2.5 pt-1">
              {data.pages.map((p) => {
                const percent = data.totalViews > 0 ? Math.round((p.views / data.totalViews) * 100) : 0;
                const displayPath = p.path === "/" ? "Home (Página Inicial)" : p.path;
                return (
                  <div key={p.path} className="space-y-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-[#171713]/85 truncate max-w-[200px] sm:max-w-xs">{displayPath}</span>
                      <div className="flex items-center gap-2 text-right">
                        <span className="text-[#171713] font-bold text-[12px]">{p.uniqueVisitors} {p.uniqueVisitors === 1 ? "pessoa" : "pessoas"}</span>
                        <span className="text-[#171713]/40 text-[11px]">({p.views} views)</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#171713]/8 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#384936] h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminCard>

        {/* Origem do Tráfego & Aplicativos */}
        <AdminCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#171713]/10 pb-2.5">
            <h3 className="text-[14px] font-medium text-[#171713] flex items-center gap-1.5">
              <ExternalLink size={15} className="text-[#384936]" /> Origem do Tráfego & Apps
            </h3>
            <span className="text-[11.5px] text-[#171713]/50">Pessoas</span>
          </div>

          {data.referrers.length === 0 ? (
            <p className="text-[13px] text-[#171713]/50 py-4 text-center">Nenhum dado registrado neste período.</p>
          ) : (
            <div className="space-y-2.5 pt-1">
              {data.referrers.map((r) => {
                const percent = data.uniqueVisitors > 0 ? Math.round((r.count / data.uniqueVisitors) * 100) : 0;
                return (
                  <div key={r.source} className="space-y-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-[#171713]/85">{r.source}</span>
                      <span className="text-[#171713] font-bold text-[12px]">
                        {r.count} {r.count === 1 ? "pessoa" : "pessoas"} <span className="text-[#171713]/40 font-normal">({percent}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-[#171713]/8 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#384936] h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminCard>
      </div>

      {/* Feed em Tempo Real: Sessões Únicas de Visitantes com Trilha de Navegação */}
      {data.recentSessions.length > 0 && (
        <AdminCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#171713]/10 pb-2.5">
            <div>
              <h3 className="text-[14px] font-medium text-[#171713] flex items-center gap-1.5">
                <Clock size={15} className="text-[#384936]" /> Últimos Visitantes em Tempo Real
              </h3>
              <p className="text-[11.5px] text-[#171713]/50">
                Cada linha representa 1 pessoa/celular com a sequência de páginas que ela explorou
              </p>
            </div>
            <span className="text-[11.5px] text-[#171713]/50 font-medium">Sessões recentes</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-[#171713]/8 text-[#171713]/50 font-medium">
                  <th className="py-2 pr-3">Horário</th>
                  <th className="py-2 px-3">Aparelho / Modelo</th>
                  <th className="py-2 px-3">Cidade / Região</th>
                  <th className="py-2 px-3">Trilha Navegada pelo Visitante</th>
                  <th className="py-2 px-3">App / Navegador</th>
                  <th className="py-2 pl-3">Origem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171713]/5">
                {data.recentSessions.map((s) => (
                  <tr key={s.sessionId} className="hover:bg-[#171713]/2 transition-colors">
                    <td className="py-3 pr-3 font-mono text-[11.5px] text-[#171713]/60 whitespace-nowrap">
                      {formatVisitTime(s.lastActive)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#171713] whitespace-nowrap">
                      {s.device_model || "Desconhecido"}
                    </td>
                    <td className="py-3 px-3 text-[#171713]/80 whitespace-nowrap">
                      {s.city ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} className="text-[#384936]" />
                          {s.city}
                        </span>
                      ) : (
                        <span className="text-[#171713]/40">Não identificada</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {s.paths.map((p, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#384936]/10 text-[#384936] border border-[#384936]/15">
                              {formatPathLabel(p)}
                            </span>
                            {idx < s.paths.length - 1 && (
                              <ArrowRight size={10} className="text-[#171713]/30 shrink-0" />
                            )}
                          </React.Fragment>
                        ))}
                        {s.pageCount > 1 && (
                          <span className="text-[10px] text-[#171713]/40 ml-1">
                            ({s.pageCount} páginas)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        s.browser?.includes("Instagram")
                          ? "bg-pink-100 text-pink-800"
                          : s.browser?.includes("WhatsApp")
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-[#171713]/5 text-[#171713]/70"
                      }`}>
                        {s.browser || "Navegador"}
                      </span>
                    </td>
                    <td className="py-3 pl-3 text-[#171713]/60 whitespace-nowrap">
                      {s.referrer || "Direto"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </div>
  );
};
