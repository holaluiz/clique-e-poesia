-- Blog da Clique e Poesia: textos, lista de administradores e fotos.

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  location text,
  excerpt text,
  cover_url text,
  content text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index posts_status_published_at_idx on public.posts (status, published_at desc);

-- Só quem está nesta lista escreve no blog. Sem políticas: ninguém lê ou altera pela API.
create table public.blog_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.blog_admins enable row level security;

create function public.is_blog_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.blog_admins where user_id = (select auth.uid()));
$$;

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

create policy "Textos publicados são públicos; admins veem rascunhos"
on public.posts for select
to anon, authenticated
using (status = 'published' or (select public.is_blog_admin()));

create policy "Admins criam textos"
on public.posts for insert
to authenticated
with check ((select public.is_blog_admin()));

create policy "Admins editam textos"
on public.posts for update
to authenticated
using ((select public.is_blog_admin()))
with check ((select public.is_blog_admin()));

create policy "Admins excluem textos"
on public.posts for delete
to authenticated
using ((select public.is_blog_admin()));

-- Fotos do blog: leitura pública pela URL, envio só para admins.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog', 'blog', true, 10485760, array['image/webp', 'image/jpeg', 'image/png', 'image/gif']);

create policy "Admins enviam fotos do blog"
on storage.objects for insert
to authenticated
with check (bucket_id = 'blog' and (select public.is_blog_admin()));

create policy "Admins alteram fotos do blog"
on storage.objects for update
to authenticated
using (bucket_id = 'blog' and (select public.is_blog_admin()));

create policy "Admins excluem fotos do blog"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog' and (select public.is_blog_admin()));
