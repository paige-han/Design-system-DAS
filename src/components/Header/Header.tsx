import { useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Logo } from "../Logo/Logo";
import { CloseIcon, MenuIcon } from "../../icons";
import { focusRing, rd, sp } from "../../mui/sx";
import { color, layout } from "../../tokens/tokens";

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
    <Box
      component="a"
      href={link.href}
      aria-current={active ? "page" : undefined}
      sx={(t) => ({
        ...t.typography.labelLarge,
        borderRadius: rd.full,
        px: sp.sm,
        py: "10px",
        color: "ds.text.onDark",
        textDecoration: "none",
        transition: "background-color 150ms",
        bgcolor: active ? alpha(color.bg.stateLayer, 0.24) : "transparent",
        "&:hover": { bgcolor: alpha(color.bg.stateLayer, active ? 0.24 : 0.16) },
        ...focusRing(true),
      })}
    >
      {link.label}
    </Box>
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
    <Box component="header" sx={{ bgcolor: "ds.bg.brandStrong" }}>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          height: { xs: 80, lg: 78 },
          maxWidth: layout.contentWidth,
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: sp.md, lg: 0 },
        }}
      >
        <Box component="a" href="/" sx={{ borderRadius: rd.sm, ...focusRing(true) }}>
          <Logo braces={false} sx={{ display: { lg: "none" } }} />
          <Logo sx={{ display: { xs: "none", lg: "block" } }} />
        </Box>

        <Box component="nav" aria-label="Main" sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: sp.lg }}>
          {links.map((link) => (
            <NavItem key={link.href} link={link} active={link.href === activeHref} />
          ))}
        </Box>

        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <Button variant="contained" color="secondary" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </Box>

        <IconButton
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          sx={{ display: { lg: "none" }, width: 40, height: 40, p: 0, color: "ds.text.onDark", ...focusRing(true) }}
        >
          {open ? <CloseIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 40 }} />}
        </IconButton>
      </Box>

      {open && (
        <Box
          component="nav"
          aria-label="Main"
          sx={{ display: { xs: "flex", lg: "none" }, flexDirection: "column", alignItems: "flex-start", gap: sp.xs, px: sp.md, pt: sp.xs, pb: sp.lg }}
        >
          {links.map((link) => (
            <NavItem key={link.href} link={link} active={link.href === activeHref} />
          ))}
          <Button variant="contained" color="secondary" onClick={onCtaClick} sx={{ mt: sp.xs }}>
            {ctaLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
}
