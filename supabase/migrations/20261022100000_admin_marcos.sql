-- Ativação e permissão de administrador para marcosgabriel.saga@gmail.com

-- 1. Confirmar o e-mail imediatamente (dispensa clicar no link do e-mail)
update auth.users
set email_confirmed_at = now()
where email = 'marcosgabriel.saga@gmail.com';

-- 2. Conceder permissão de administrador no painel da Clique e Poesia
insert into public.blog_admins (user_id)
select id from auth.users where email = 'marcosgabriel.saga@gmail.com'
on conflict (user_id) do nothing;
