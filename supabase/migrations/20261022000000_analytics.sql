-- Rastreamento de visitas anônimo e leve para a Clique e Poesia

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  device text, -- 'mobile', 'desktop', 'tablet'
  session_id text, -- ID anônimo temporário de sessão para contar visitantes únicos
  created_at timestamptz not null default now()
);

-- Índices para buscas rápidas por data e página
create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);
create index if not exists page_views_session_id_idx on public.page_views (session_id);

alter table public.page_views enable row level security;

-- 1. Qualquer visitante (público) pode inserir um registro de visita
drop policy if exists "Qualquer visitante registra visualização" on public.page_views;
create policy "Qualquer visitante registra visualização"
on public.page_views for insert
to anon, authenticated
with check (true);

-- 2. Apenas administradores autenticados podem ler os dados
drop policy if exists "Apenas admins leem métricas" on public.page_views;
create policy "Apenas admins leem métricas"
on public.page_views for select
to authenticated
using ((select public.is_blog_admin()));
