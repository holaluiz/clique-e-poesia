import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, type LucideProps } from "lucide-react";

// Ícones no mesmo traço do lucide para as redes que ele não tem.
const Pinterest: React.FC<LucideProps> = ({ size = 24, strokeWidth = 2, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M10.2 21.6 12 13.5" />
    <path d="M8.3 14.7A4.5 4.5 0 0 1 7.5 12C7.5 9.2 9.6 7 12.5 7c2.6 0 4.5 1.9 4.5 4.2 0 2.7-1.6 4.8-3.8 4.8-1 0-1.8-.5-2.1-1.2" />
  </svg>
);

const Tiktok: React.FC<LucideProps> = ({ size = 24, strokeWidth = 2, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5" />
  </svg>
);

// Preencha o href com o endereço do perfil; sem href o ícone aparece sem link.
const SOCIAL_LINKS: { label: string; href: string; Icon: React.FC<LucideProps> }[] = [
  { label: "Instagram", href: "", Icon: Instagram },
  { label: "Facebook", href: "", Icon: Facebook },
  { label: "LinkedIn", href: "", Icon: Linkedin },
  { label: "Pinterest", href: "", Icon: Pinterest },
  { label: "YouTube", href: "", Icon: Youtube },
  { label: "TikTok", href: "", Icon: Tiktok },
];

const iconClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF7F2]/15 text-[#FAF7F2]/70 transition-colors";

export const SocialLinks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <ul className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
    {SOCIAL_LINKS.map(({ label, href, Icon }) => (
      <li key={label}>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Clique e Poesia no ${label}`}
            title={label}
            className={`${iconClass} hover:border-[#EED99E]/60 hover:text-[#EED99E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EED99E]`}
          >
            <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
        ) : (
          <span role="img" aria-label={label} title={label} className={iconClass}>
            <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
          </span>
        )}
      </li>
    ))}
  </ul>
);
