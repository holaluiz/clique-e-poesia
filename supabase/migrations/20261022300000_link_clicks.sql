-- Tabela para rastrear cliques específicos nos botões do Linktree e do site

create table if not exists public.link_clicks (
  id uuid primary key default gen_random_uuid(),
  button_id text not null,
  button_label text not null,
  target_url text,
  session_id text,
  device text,
  device_model text,
  city text,
  region text,
  created_at timestamptz not null default now()
);

create index if not exists link_clicks_created_at_idx on public.link_clicks (created_at desc);
create index if not exists link_clicks_button_id_idx on public.link_clicks (button_id);

alter table public.link_clicks enable row level security;

grant insert on table public.link_clicks to anon, authenticated;
grant select, delete on table public.link_clicks to authenticated;

drop policy if exists "Permitir clique anonimo" on public.link_clicks;
create policy "Permitir clique anonimo"
on public.link_clicks for insert
to public
with check (true);

drop policy if exists "Admins leem cliques" on public.link_clicks;
create policy "Admins leem cliques"
on public.link_clicks for select
to authenticated
using ((select public.is_blog_admin()));

drop policy if exists "Admins excluem cliques" on public.link_clicks;
create policy "Admins excluem cliques"
on public.link_clicks for delete
to authenticated
using ((select public.is_blog_admin()));
