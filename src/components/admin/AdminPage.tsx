import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ChevronRight, ExternalLink, FilePlus2, FileText, Home, KeyRound, LayoutDashboard, LogOut, Menu, Tags, X } from "lucide-react";
import { isBlogAdmin } from "../../lib/blog";
import { handleLinkClick, navigate } from "../../lib/router";
import { resetPageMeta, setPageMeta } from "../../lib/seo";
import { supabase } from "../../lib/supabase";
import { AdminCategories } from "./AdminCategories";
import { AdminPostList } from "./AdminPostList";
import { AdminPostEditor } from "./AdminPostEditor";
import { AdminCard, Field, PrimaryButton, inputClass } from "./ui";
import "../blog/blog.css";

type NavItem = { label: string; href: string; icon: React.ElementType; external?: boolean; match?: (path: string) => boolean };

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Painel",
    items: [{ label: "Painel Administrativo", href: "/admin", icon: LayoutDashboard, match: (path) => path === "/admin" }],
  },
  {
    section: "Blog",
    items: [
      { label: "Textos", href: "/admin/textos", icon: FileText, match: (path) => path === "/admin/textos" || path.startsWith("/admin/texto/") },
      { label: "Novo texto", href: "/admin/novo", icon: FilePlus2 },
      { label: "Categorias", href: "/admin/categorias", icon: Tags },
    ],
  },
  {
    section: "Site",
    items: [
      { label: "Ver site", href: "/", icon: ExternalLink, external: true },
      { label: "Ver blog", href: "/blog", icon: ExternalLink, external: true },
    ],
  },
  {
    section: "Conta",
    items: [{ label: "Alterar senha", href: "/admin/senha", icon: KeyRound }],
  },
];

// Título e trilha de cada tela do painel.
function pageInfo(path: string): { title: string; crumbs: string[] } {
  if (path === "/admin/textos") return { title: "Textos do blog", crumbs: ["Blog", "Textos"] };
  if (path === "/admin/novo") return { title: "Novo texto", crumbs: ["Blog", "Novo texto"] };
  if (path.startsWith("/admin/texto/")) return { title: "Editar texto", crumbs: ["Blog", "Textos", "Editar"] };
  if (path === "/admin/categorias") return { title: "Categorias", crumbs: ["Blog", "Categorias"] };
  if (path === "/admin/senha") return { title: "Alterar senha", crumbs: ["Conta", "Alterar senha"] };
  return { title: "Painel Administrativo", crumbs: ["Dashboard"] };
}

const TopBar: React.FC<{ email?: string; onSignOut?: () => void; onToggleMenu?: () => void; menuOpen?: boolean }> = ({
  email,
  onSignOut,
  onToggleMenu,
  menuOpen,
}) => (
  <header className="fixed inset-x-0 top-0 z-40 h-12 bg-[#171713] text-[#FAF7F2] flex items-center justify-between px-3 sm:px-4">
    <div className="flex items-center gap-2 min-w-0">
      {onToggleMenu && (
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-white/10"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}
      <a href="/admin" onClick={handleLinkClick} className="flex items-center gap-2 min-w-0">
        <img src="/isotipo-clique-poesia.png" alt="" width={171} height={192} className="h-6 w-auto" />
        <span className="text-[14px] font-medium truncate">Clique e Poesia</span>
      </a>
    </div>
    {onSignOut && (
      <div className="flex items-center gap-4 text-[12.5px]">
        {email && <span className="hidden md:inline text-[#FAF7F2]/60">{email}</span>}
        <button type="button" onClick={onSignOut} className="flex items-center gap-1.5 text-[#FAF7F2]/75 hover:text-[#FAF7F2]">
          <LogOut size={14} /> Sair
        </button>
      </div>
    )}
  </header>
);

const Sidebar: React.FC<{ path: string; open: boolean; onNavigate: () => void }> = ({ path, open, onNavigate }) => (
  <>
    {open && <div className="lg:hidden fixed inset-0 top-12 z-20 bg-[#171713]/40" onClick={onNavigate} aria-hidden="true" />}
    <nav
      aria-label="Menu do administrador"
      className={`fixed left-0 top-12 bottom-0 z-30 w-60 overflow-y-auto bg-white border-r border-[#171713]/10 py-3 transition-transform duration-200 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
      data-lenis-prevent
    >
      {NAV.map((group) => (
        <div key={group.section} className="mb-3">
          <div className="mx-3 mb-1 pb-1.5 pt-2 border-b border-[#171713]/8 text-[10.5px] font-medium tracking-[0.08em] uppercase text-[#171713]/45">
            {group.section}
          </div>
          <ul className="px-2 space-y-0.5">
            {group.items.map((item) => {
              const active = item.match ? item.match(path) : path === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {
                          onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
                            onNavigate();
                            handleLinkClick(event);
                          },
                        })}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] transition-colors ${
                      active ? "bg-[#384936] text-white" : "text-[#171713]/75 hover:bg-[#171713]/5 hover:text-[#171713]"
                    }`}
                  >
                    <Icon size={15} className={active ? "text-white" : "text-[#171713]/50"} />
                    <span className="flex-1">{item.label}</span>
                    {!item.external && <ChevronRight size={13} className={active ? "text-white/70" : "text-[#171713]/25"} />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  </>
);

const AdminLayout: React.FC<{ path: string; email?: string; onSignOut: () => void; children: React.ReactNode }> = ({
  path,
  email,
  onSignOut,
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { title, crumbs } = pageInfo(path);

  return (
    <div className="min-h-screen bg-[#ECEEEF] text-[#171713]">
      <TopBar email={email} onSignOut={onSignOut} onToggleMenu={() => setMenuOpen((open) => !open)} menuOpen={menuOpen} />
      <Sidebar path={path} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <main className="pt-12 lg:pl-60">
        <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-5">
          <div>
            <h1 className="text-[20px] font-medium leading-tight">{title}</h1>
            <nav aria-label="Você está em" className="mt-1 flex items-center gap-1.5 text-[12px] text-[#171713]/50">
              <Home size={12} />
              {crumbs.map((crumb) => (
                <React.Fragment key={crumb}>
                  <span aria-hidden="true">/</span>
                  <span>{crumb}</span>
                </React.Fragment>
              ))}
            </nav>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

const AuthScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#ECEEEF] text-[#171713]">
    <TopBar />
    <main className="pt-12 px-4">
      <div className="max-w-[420px] mx-auto mt-12 sm:mt-20">
        <AdminCard className="p-7 sm:p-9 space-y-6">{children}</AdminCard>
      </div>
    </main>
  </div>
);

function translateAuthError(message: string) {
  if (/invalid login credentials/i.test(message)) return "E-mail ou senha incorretos.";
  if (/email not confirmed/i.test(message)) return "Esse e-mail ainda não foi confirmado.";
  if (/rate limit|too many/i.test(message)) return "Muitas tentativas. Espere um pouco e tente de novo.";
  if (/password should be at least/i.test(message)) return "A senha precisa ter pelo menos 8 caracteres.";
  if (/different from the old/i.test(message)) return "A nova senha precisa ser diferente da atual.";
  return "Não foi possível concluir. Tente de novo.";
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "info"; text: string } | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    const { error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setMessage({ tone: "error", text: translateAuthError(error.message) });
    setBusy(false);
  };

  const resetPassword = async () => {
    if (!email.trim()) {
      setMessage({ tone: "error", text: "Digite seu e-mail acima para receber o link." });
      return;
    }
    setBusy(true);
    const { error } = await supabase!.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/senha`,
    });
    setMessage(
      error
        ? { tone: "error", text: translateAuthError(error.message) }
        : { tone: "info", text: "Se esse e-mail for de um administrador, você vai receber um link para criar uma nova senha." },
    );
    setBusy(false);
  };

  return (
    <AuthScreen>
      <div className="space-y-1.5">
        <h1 className="text-[22px] font-medium">Painel Administrativo</h1>
        <p className="text-[14px] text-[#171713]/55">Entre para escrever e publicar os textos do blog.</p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <Field label="E-mail">
          <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Senha">
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </Field>
        {message && (
          <p role="status" className={`text-[13.5px] ${message.tone === "error" ? "text-[#9B2C1F]" : "text-[#384936]"}`}>
            {message.text}
          </p>
        )}
        <PrimaryButton type="submit" disabled={busy} className="w-full">
          {busy ? "Entrando…" : "Entrar"}
        </PrimaryButton>
      </form>
      <button type="button" onClick={resetPassword} disabled={busy} className="text-[13px] text-[#171713]/55 underline underline-offset-4">
        Esqueci minha senha
      </button>
    </AuthScreen>
  );
};

const PasswordPage: React.FC<{ recovering: boolean; onDone: () => void }> = ({ recovering, onDone }) => {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "ok"; text: string } | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) return setMessage({ tone: "error", text: "A senha precisa ter pelo menos 8 caracteres." });
    if (password !== confirmation) return setMessage({ tone: "error", text: "As duas senhas não são iguais." });
    setBusy(true);
    const { error } = await supabase!.auth.updateUser({ password });
    setBusy(false);
    if (error) return setMessage({ tone: "error", text: translateAuthError(error.message) });
    setPassword("");
    setConfirmation("");
    setMessage({ tone: "ok", text: "Senha alterada." });
    onDone();
  };

  return (
    <AdminCard className="max-w-[520px] p-6 space-y-5">
      {recovering && <p className="text-[14px] text-[#384936]">Crie uma nova senha para continuar.</p>}
      <form onSubmit={submit} className="space-y-4">
        <Field label="Nova senha" hint="Pelo menos 8 caracteres.">
          <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Repita a nova senha">
          <input
            type="password"
            autoComplete="new-password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className={inputClass}
          />
        </Field>
        {message && (
          <p role="status" className={`text-[13.5px] ${message.tone === "error" ? "text-[#9B2C1F]" : "text-[#384936]"}`}>
            {message.text}
          </p>
        )}
        <PrimaryButton type="submit" disabled={busy}>
          {busy ? "Salvando…" : "Salvar senha"}
        </PrimaryButton>
      </form>
    </AdminCard>
  );
};

const Dashboard: React.FC = () => (
  <>
    <AdminCard className="px-6 py-4 text-center text-[13.5px] text-[#171713]/60">
      Escolha uma das opções no menu lateral para navegar no sistema.
    </AdminCard>
    <AdminCard className="px-6 py-6 flex items-center gap-3">
      <img src="/isotipo-clique-poesia.png" alt="" width={171} height={192} className="h-12 w-auto" />
      <div>
        <div className="font-serif text-[22px] leading-tight">Clique e Poesia</div>
        <div className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-[#171713]/45">
          Fotografia · Histórias · Hospitalidade
        </div>
      </div>
    </AdminCard>
  </>
);

export const AdminPage: React.FC<{ path: string }> = ({ path }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | undefined>(undefined);
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    setPageMeta({ title: "Administrador — Clique e Poesia", noindex: true });
    return resetPageMeta;
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecovering(true);
        navigate("/admin/senha");
      }
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) {
      setAdmin(undefined);
      return;
    }
    let active = true;
    isBlogAdmin()
      .then((result) => active && setAdmin(result))
      .catch(() => active && setAdmin(false));
    return () => {
      active = false;
    };
  }, [userId]);

  if (!supabase) {
    return (
      <AuthScreen>
        <h1 className="text-[22px] font-medium">Blog ainda não conectado</h1>
        <p className="text-[14px] text-[#171713]/60">
          Faltam as variáveis <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> na hospedagem.
        </p>
      </AuthScreen>
    );
  }

  if (session === undefined || (session && admin === undefined)) {
    return (
      <div className="min-h-screen bg-[#ECEEEF]">
        <TopBar />
        <p className="pt-32 text-center text-[14px] text-[#171713]/50">Carregando…</p>
      </div>
    );
  }
  if (!session) return <LoginForm />;

  const signOut = () => supabase!.auth.signOut();

  if (!admin) {
    return (
      <AuthScreen>
        <h1 className="text-[22px] font-medium">Sem permissão</h1>
        <p className="text-[14px] text-[#171713]/60">Essa conta entrou, mas ainda não está na lista de administradores do blog.</p>
        <button type="button" onClick={signOut} className="text-[13px] text-[#171713]/55 underline underline-offset-4">
          Sair
        </button>
      </AuthScreen>
    );
  }

  const editMatch = path.match(/^\/admin\/texto\/([0-9a-f-]{36})$/);
  let content: React.ReactNode;
  if (path === "/admin/novo") content = <AdminPostEditor key="novo" postId={null} />;
  else if (editMatch) content = <AdminPostEditor key={editMatch[1]} postId={editMatch[1]} />;
  else if (path === "/admin/textos") content = <AdminPostList />;
  else if (path === "/admin/categorias") content = <AdminCategories />;
  else if (path === "/admin/senha") content = <PasswordPage recovering={recovering} onDone={() => setRecovering(false)} />;
  else content = <Dashboard />;

  return (
    <AdminLayout path={path} email={session.user.email} onSignOut={signOut}>
      {content}
    </AdminLayout>
  );
};
