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
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { AdminCard } from "./ui";

type Period = "today" | "7d" | "30d" | "all";

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  mobileCount: number;
  desktopCount: number;
  bioLinksCount: number;
  pages: { path: string; count: number }[];
  referrers: { source: string; count: number }[];
  dailyViews: { date: string; label: string; count: number }[];
}

export const AdminAnalytics: React.FC = () => {
  const [period, setPeriod] = useState<Period>("7d");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    mobileCount: 0,
    desktopCount: 0,
    bioLinksCount: 0,
    pages: [],
    referrers: [],
    dailyViews: [],
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
      let query = supabase.from("page_views").select("path, referrer, device, session_id, created_at");

      const now = new Date();
      if (selectedPeriod === "today") {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        query = query.gte("created_at", startOfDay);
      } else if (selectedPeriod === "7d") {
        const past7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", past7);
      } else if (selectedPeriod === "30d") {
        const past30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", past30);
      }

      const { data: rows, error: queryError } = await query.order("created_at", { ascending: true });

      if (queryError) {
        if (queryError.message.includes("relation \"public.page_views\" does not exist") || queryError.code === "42P01") {
          setError("A tabela 'page_views' ainda não foi criada no Supabase. Execute o script SQL no painel do Supabase para ativar o rastreamento.");
        } else {
          setError("Erro ao carregar métricas: " + queryError.message);
        }
        setLoading(false);
        return;
      }

      if (!rows || rows.length === 0) {
        setData({
          totalViews: 0,
          uniqueVisitors: 0,
          mobileCount: 0,
          desktopCount: 0,
          bioLinksCount: 0,
          pages: [],
          referrers: [],
          dailyViews: [],
        });
        setLoading(false);
        return;
      }

      // 1. Totais e visitantes únicos
      const uniqueSessions = new Set<string>();
      let mobile = 0;
      let desktop = 0;
      let bioLinks = 0;
      const pageMap = new Map<string, number>();
      const refMap = new Map<string, number>();
      const dateMap = new Map<string, number>();

      for (const row of rows) {
        if (row.session_id) uniqueSessions.add(row.session_id);

        if (row.device === "mobile" || row.device === "tablet") mobile++;
        else desktop++;

        if (row.path.startsWith("/links") || row.path.startsWith("/linktree")) bioLinks++;

        pageMap.set(row.path, (pageMap.get(row.path) || 0) + 1);

        const ref = row.referrer || "Direto";
        refMap.set(ref, (refMap.get(ref) || 0) + 1);

        if (row.created_at) {
          const d = new Date(row.created_at);
          const dateKey = d.toISOString().split("T")[0];
          dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
        }
      }

      const pages = Array.from(pageMap.entries())
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count);

      const referrers = Array.from(refMap.entries())
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count);

      const dailyViews = Array.from(dateMap.entries()).map(([date, count]) => {
        const [, m, day] = date.split("-");
        return {
          date,
          label: `${day}/${m}`,
          count,
        };
      });

      setData({
        totalViews: rows.length,
        uniqueVisitors: uniqueSessions.size || rows.length,
        mobileCount: mobile,
        desktopCount: desktop,
        bioLinksCount: bioLinks,
        pages,
        referrers,
        dailyViews,
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

  const mobilePercent = data.totalViews > 0 ? Math.round((data.mobileCount / data.totalViews) * 100) : 0;
  const maxDayCount = Math.max(...data.dailyViews.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Barra de Ações & Filtros */}
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

        <button
          type="button"
          onClick={() => fetchAnalytics(period)}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12.5px] font-medium bg-[#171713]/5 hover:bg-[#171713]/10 text-[#171713]/75 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? "animate-spin text-[#384936]" : ""} />
          <span>Atualizar</span>
        </button>
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

      {/* Cartões de Indicadores Chave (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Visitas */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11.5px] font-medium uppercase tracking-wider text-[#171713]/50">Visualizações</span>
            <div className="text-[26px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : data.totalViews.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <Eye size={11} /> Páginas abertas
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#384936]/10 text-[#384936] flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
        </AdminCard>

        {/* Visitantes Únicos */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11.5px] font-medium uppercase tracking-wider text-[#171713]/50">Visitantes Únicos</span>
            <div className="text-[26px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : data.uniqueVisitors.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <Users size={11} /> Pessoas diferentes
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-700 flex items-center justify-center">
            <Users size={20} />
          </div>
        </AdminCard>

        {/* % Dispositivos Móveis */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11.5px] font-medium uppercase tracking-wider text-[#171713]/50">Acessos por Celular</span>
            <div className="text-[26px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : `${mobilePercent}%`}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <Smartphone size={11} /> {data.mobileCount} celular · {data.desktopCount} desktop
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
            <Smartphone size={20} />
          </div>
        </AdminCard>

        {/* Visitas na Bio (/links) */}
        <AdminCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11.5px] font-medium uppercase tracking-wider text-[#171713]/50">Link da Bio (/links)</span>
            <div className="text-[26px] font-serif font-bold text-[#171713] leading-tight mt-0.5">
              {loading ? "..." : data.bioLinksCount.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-[#171713]/45 flex items-center gap-1 mt-1">
              <Share2 size={11} /> Instagram / Linktree
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Share2 size={20} />
          </div>
        </AdminCard>
      </div>

      {/* Gráfico Visual de Acessos Recentes por Dia */}
      {data.dailyViews.length > 0 && (
        <AdminCard className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-medium text-[#171713]">Atividade ao longo do período</h3>
              <p className="text-[12px] text-[#171713]/50">Quantidade de acessos diários</p>
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

      {/* Tabelas de Detalhamento: Páginas & Origens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Páginas mais Acessadas */}
        <AdminCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#171713]/10 pb-2.5">
            <h3 className="text-[14px] font-medium text-[#171713] flex items-center gap-1.5">
              <Globe size={15} className="text-[#384936]" /> Páginas Mais Vistas
            </h3>
            <span className="text-[11.5px] text-[#171713]/50">Acessos</span>
          </div>

          {data.pages.length === 0 ? (
            <p className="text-[13px] text-[#171713]/50 py-4 text-center">Nenhum dado registrado neste período.</p>
          ) : (
            <div className="space-y-2.5 pt-1">
              {data.pages.map((p) => {
                const percent = data.totalViews > 0 ? Math.round((p.count / data.totalViews) * 100) : 0;
                const displayPath = p.path === "/" ? "Home (Página Inicial)" : p.path;
                return (
                  <div key={p.path} className="space-y-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-[#171713]/85 truncate max-w-[220px] sm:max-w-xs">{displayPath}</span>
                      <span className="text-[#171713]/60 font-mono text-[12px]">
                        {p.count} <span className="text-[#171713]/40">({percent}%)</span>
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

        {/* Origem do Tráfego (Referrers) */}
        <AdminCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#171713]/10 pb-2.5">
            <h3 className="text-[14px] font-medium text-[#171713] flex items-center gap-1.5">
              <ExternalLink size={15} className="text-[#384936]" /> Origem do Tráfego
            </h3>
            <span className="text-[11.5px] text-[#171713]/50">Visitantes</span>
          </div>

          {data.referrers.length === 0 ? (
            <p className="text-[13px] text-[#171713]/50 py-4 text-center">Nenhum dado registrado neste período.</p>
          ) : (
            <div className="space-y-2.5 pt-1">
              {data.referrers.map((r) => {
                const percent = data.totalViews > 0 ? Math.round((r.count / data.totalViews) * 100) : 0;
                return (
                  <div key={r.source} className="space-y-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-[#171713]/85">{r.source}</span>
                      <span className="text-[#171713]/60 font-mono text-[12px]">
                        {r.count} <span className="text-[#171713]/40">({percent}%)</span>
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
    </div>
  );
};
