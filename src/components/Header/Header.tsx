import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { CloseIcon, MenuIcon } from "../../icons";

/**
 * Header: site navigation bar.
 *
 * Figma mapping: "Headers" (Large, 1280px) and "Headers Mobile" (Small, 320px).
 * Large (960px+): logo with braces, nav links, "Support us" button.
 * Small/Medium: logo without braces and a menu button. The open menu panel is not
 * in Figma yet, so it uses the same link and button styles as desktop.
 */
export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  links?: NavLink[];
  /** href of the current page; that link gets the active pill. */
  activeHref?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Start with the mobile menu open (useful for Storybook). */
  defaultMenuOpen?: boolean;
}

export const defaultNavLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Partner", href: "/partner" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Events", href: "/events" },
];

function NavItem({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <a
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={[
        "rounded-full px-sm py-2.5 type-label-lg text-on-dark transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface",
        active ? "bg-state-layer/24" : "hover:bg-state-layer/16",
      ].join(" ")}
    >
      {link.label}
    </a>
  );
}

export function Header({
  links = defaultNavLinks,
  activeHref,
  ctaLabel = "Support us",
  onCtaClick,
  defaultMenuOpen = false,
}: HeaderProps) {
  const [open, setOpen] = useState(defaultMenuOpen);

  return (
    <header className="bg-brand-strong">
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-md lg:h-[78px] lg:px-0">
        <a href="/" className="rounded-sm focus-visible:outline-2 focus-visible:outline-on-surface">
          <Logo braces={false} className="lg:hidden" />
          <Logo className="hidden lg:block" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-lg lg:flex">
          {links.map((link) => (
            <NavItem key={link.href} link={link} active={link.href === activeHref} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button variant="onDark" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex size-10 cursor-pointer items-center justify-center text-on-dark lg:hidden"
        >
          {open ? <CloseIcon className="size-8" /> : <MenuIcon className="size-10" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Main" className="flex flex-col items-start gap-xs px-md pt-xs pb-lg lg:hidden">
          {links.map((link) => (
            <NavItem key={link.href} link={link} active={link.href === activeHref} />
          ))}
          <Button variant="onDark" onClick={onCtaClick} className="mt-xs">
            {ctaLabel}
          </Button>
        </nav>
      )}
    </header>
  );
}
