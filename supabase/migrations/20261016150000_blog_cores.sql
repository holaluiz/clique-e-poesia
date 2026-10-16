-- Cores gerais de cada texto do blog (vazias: cores padrão do site).
alter table public.posts
  add column text_color text check (text_color ~* '^#[0-9a-f]{6}$'),
  add column link_color text check (link_color ~* '^#[0-9a-f]{6}$');
