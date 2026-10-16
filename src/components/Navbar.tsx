import { useEffect, useRef, useState, type RefObject } from "react";
import "./Navbar.css";

const navLinks = [
  { name: "Quem Somos", href: "#quem-somos" },
  { name: "A Clique", href: "#a-clique" },
  { name: "Pessoas", href: "#pessoas" },
  // Seção do blog ainda será criada; o link já fica no menu.
  { name: "Blog", href: "#blog" },
  { name: "E no fim...", href: "#fechamento" },
];

const LOGO_EVENT = "clique_logo_updated";
const LOGO_KEY = "clique_official_logo_svg";
const DEFAULT_LOGO = "/LOGO BRANCA HORIZONTAL.svg";

function getSavedLogo() {
  try {
    return localStorage.getItem(LOGO_KEY) || DEFAULT_LOGO;
  } catch {
    return DEFAULT_LOGO;
  }
}

function useSyncedLogo() {
  const [logoSrc, setLogoSrc] = useState(getSavedLogo);

  useEffect(() => {
    const handleLogoUpdate = (event: Event) => {
      const updatedLogo = (event as CustomEvent<string>).detail;
      setLogoSrc(typeof updatedLogo === "string" ? updatedLogo : getSavedLogo());
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LOGO_KEY) setLogoSrc(getSavedLogo());
    };
    window.addEventListener(LOGO_EVENT, handleLogoUpdate);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(LOGO_EVENT, handleLogoUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return logoSrc;
}

function useMobileMenu<T extends HTMLElement>() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<T>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handleOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleDesktop = () => {
      if (desktopQuery.matches) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsidePress);
    desktopQuery.addEventListener("change", handleDesktop);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsidePress);
      desktopQuery.removeEventListener("change", handleDesktop);
    };
  }, [mobileMenuOpen]);

  return { mobileMenuOpen, setMobileMenuOpen, containerRef, menuButtonRef };
}

function useActiveSection(enabled: boolean) {
  const [activeHref, setActiveHref] = useState(navLinks[0].href);

  useEffect(() => {
    if (!enabled) return;
    const sections = navLinks
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    let observer: IntersectionObserver;

    const observeSections = () => {
      observer?.disconnect();
      // A thin observation band marks the section occupying the upper third of the screen.
      const viewportHeight = document.documentElement.clientHeight;
      const marker = Math.round(viewportHeight * 0.28);
      observer = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting);
          if (current) setActiveHref(`#${current.target.id}`);
        },
        { rootMargin: `-${marker}px 0px -${Math.max(0, viewportHeight - marker - 1)}px 0px` },
      );
      sections.forEach((section) => observer.observe(section));
    };
    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, [enabled]);

  return activeHref;
}

function Navigation({
  variant,
  mobileMenuOpen,
  menuButtonRef,
  onToggle,
  onClose,
  activeHref,
}: {
  variant: "hero" | "sticky";
  mobileMenuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onToggle: () => void;
  onClose: () => void;
  activeHref?: string;
}) {
  const menuId = `${variant}-mobile-navigation`;

  return (
    <nav className="site-header-navigation" aria-label={variant === "hero" ? "Navegação principal" : "Navegação principal fixa"}>
      <div className="site-nav-desktop">
        {navLinks.map(({ name, href }) => (
          <a key={href} href={href} className="site-nav-link" aria-current={activeHref === href ? "location" : undefined}>
            {name}
          </a>
        ))}
      </div>
      <button
        ref={menuButtonRef}
        type="button"
        className="site-menu-toggle"
        onClick={onToggle}
        aria-expanded={mobileMenuOpen}
        aria-controls={menuId}
        aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
      >
        <span>{mobileMenuOpen ? "Fechar" : "Menu"}</span>
        <span className="site-menu-icon" aria-hidden="true"><span /><span /></span>
      </button>
      {mobileMenuOpen && (
        <div id={menuId} className="site-mobile-panel">
          <p className="site-mobile-label">Nosso universo</p>
          <ul className="site-mobile-links">
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                <a href={href} onClick={onClose} aria-current={activeHref === href ? "location" : undefined}>
                  <span>{name}</span>
                  <span className="site-mobile-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export function Navbar() {
  const logoSrc = useSyncedLogo();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const { mobileMenuOpen, setMobileMenuOpen, containerRef, menuButtonRef } = useMobileMenu<HTMLElement>();

  const handleLogoFile = (file: File) => {
    const isSvg = /\.svg$/i.test(file.name) || file.type === "image/svg+xml";
    if (!isSvg && !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const content = reader.result;
      const dataUrl = isSvg ? `data:image/svg+xml;utf8,${encodeURIComponent(content)}` : content;
      try {
        localStorage.setItem(LOGO_KEY, dataUrl);
      } catch (error) {
        console.warn("Could not save the logo in browser storage:", error);
      }
      window.dispatchEvent(new CustomEvent(LOGO_EVENT, { detail: dataUrl }));
      fetch("/api/upload-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isSvg ? { content } : { dataUrl }),
      }).catch(console.error);
    };
    if (isSvg) reader.readAsText(file);
    else reader.readAsDataURL(file);
  };

  return (
    <header ref={containerRef} className="site-header site-header-hero">
      <div
        className="site-header-brand"
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const file = event.dataTransfer.files?.[0];
          if (file) handleLogoFile(file);
        }}
      >
        <a href="#inicio" className="site-header-logo" aria-label="Clique e Poesia — início">
          <img src={logoSrc} alt="Clique & Poesia" />
        </a>
        <button
          type="button"
          className="site-logo-edit"
          onClick={() => logoInputRef.current?.click()}
          aria-label="Alterar logo da Clique e Poesia"
          title="Alterar logo ou arrastar um arquivo sobre ela"
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m12.5 4.5 3 3M4 16l3.5-.7L16 6.8a2.1 2.1 0 0 0-3-3l-8.3 8.7L4 16Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input
          ref={logoInputRef}
          type="file"
          accept=".svg,image/svg+xml,image/*"
          className="site-logo-input"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleLogoFile(file);
            event.target.value = "";
          }}
        />
      </div>
      <Navigation
        variant="hero"
        mobileMenuOpen={mobileMenuOpen}
        menuButtonRef={menuButtonRef}
        onToggle={() => setMobileMenuOpen((open) => !open)}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}

export function StickyNavbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const logoSrc = useSyncedLogo();
  const { mobileMenuOpen, setMobileMenuOpen, containerRef, menuButtonRef } = useMobileMenu<HTMLDivElement>();
  const activeHref = useActiveSection(isPastHero);

  useEffect(() => {
    if (!isPastHero) setMobileMenuOpen(false);
  }, [isPastHero, setMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("inicio");
      setIsPastHero(hero ? hero.getBoundingClientRect().bottom <= 60 : window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="site-header-sticky"
      data-visible={isPastHero}
      inert={!isPastHero}
      aria-hidden={!isPastHero}
    >
      <div className="site-header site-header-sticky-inner">
        <a href="#inicio" className="site-header-logo" aria-label="Clique e Poesia — voltar ao início">
          <img src={logoSrc} alt="Clique & Poesia" />
        </a>
        <Navigation
          variant="sticky"
          mobileMenuOpen={mobileMenuOpen}
          menuButtonRef={menuButtonRef}
          onToggle={() => setMobileMenuOpen((open) => !open)}
          onClose={() => setMobileMenuOpen(false)}
          activeHref={activeHref}
        />
      </div>
    </div>
  );
}
