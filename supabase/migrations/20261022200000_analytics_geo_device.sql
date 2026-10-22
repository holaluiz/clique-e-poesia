-- Adiciona campos de localização (cidade, região) e detalhes do aparelho (modelo, navegador)

alter table public.page_views
add column if not exists city text,
add column if not exists region text,
add column if not exists country text,
add column if not exists device_model text,
add column if not exists browser text;

create index if not exists page_views_city_idx on public.page_views (city);
create index if not exists page_views_region_idx on public.page_views (region);
