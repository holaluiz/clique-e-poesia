import { useEffect, useRef, useState, type RefObject } from "react";
import "./Navbar.css";

const navLinks = [
  { name: "Quem Somos", href: "#quem-somos" },
  { name: "A Clique", href: "#a-clique" },
  { name: "Pessoas", href: "#pessoas" },
  { name: "Blog", href: "#blog" },
];

const LOGO_SRC = "/LOGO BRANCA HORIZONTAL.svg";

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
        <div id={menuId} className="site-mobile-panel" data-lenis-prevent>
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
  const { mobileMenuOpen, setMobileMenuOpen, containerRef, menuButtonRef } = useMobileMenu<HTMLElement>();

  return (
    <header ref={containerRef} className="site-header site-header-hero">
      <a href="#inicio" className="site-header-logo" aria-label="Clique e Poesia — início">
        <img src={LOGO_SRC} alt="Clique & Poesia" />
      </a>
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
          <img src={LOGO_SRC} alt="Clique & Poesia" />
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
