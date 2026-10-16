-- Categorias, tags e SEO dos textos do blog.

create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  created_at timestamptz not null default now()
);

alter table public.blog_categories enable row level security;

create policy "Categorias são públicas"
on public.blog_categories for select
to anon, authenticated
using (true);

create policy "Admins criam categorias"
on public.blog_categories for insert
to authenticated
with check ((select public.is_blog_admin()));

create policy "Admins editam categorias"
on public.blog_categories for update
to authenticated
using ((select public.is_blog_admin()))
with check ((select public.is_blog_admin()));

create policy "Admins excluem categorias"
on public.blog_categories for delete
to authenticated
using ((select public.is_blog_admin()));

insert into public.blog_categories (name, slug) values
  ('Hospedagem', 'hospedagem'),
  ('Natureza', 'natureza'),
  ('Chalés', 'chales'),
  ('Pousadas', 'pousadas'),
  ('Gastronomia', 'gastronomia');

alter table public.posts
  add column category_ids uuid[] not null default '{}',
  add column tags text[] not null default '{}',
  add column seo_title text,
  add column seo_description text;

create index posts_category_ids_idx on public.posts using gin (category_ids);

-- Ao excluir uma categoria, ela sai dos textos que a usavam.
create function public.remove_deleted_category_from_posts()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.posts set category_ids = array_remove(category_ids, old.id) where old.id = any (category_ids);
  return old;
end;
$$;

revoke execute on function public.remove_deleted_category_from_posts() from public, anon, authenticated;

create trigger blog_categories_remove_from_posts
after delete on public.blog_categories
for each row execute function public.remove_deleted_category_from_posts();
