import type { FormEvent, ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Logo } from "../Logo/Logo";
import { TextInput } from "../TextInput/TextInput";
import { GitHubIcon, LinkedInIcon } from "../../icons";
import { focusRing, sp } from "../../mui/sx";
import { layout } from "../../tokens/tokens";

/**
 * Footer: newsletter signup, site links, credits and social links.
 *
 * Figma mapping: "Footer" (Large, 1280px). Stacks into one column on Small/Medium.
 */
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface FooterProps {
  linkGroups?: FooterLinkGroup[];
  socialLinks?: SocialLink[];
  /** Line under the newsletter title. Default is the Figma placeholder text. */
  newsletterText?: string;
  onSubscribe?: (email: string) => void;
}

export const defaultFooterLinks: FooterLinkGroup[] = [
  { title: "Contact us", links: [{ label: "info@digitalseattle.org", href: "mailto:info@digitalseattle.org" }] },
  {
    title: "Work with us",
    links: [
      { label: "Partner", href: "/partner" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  { title: "About Digital Aid Seattle", links: [{ label: "Privacy Policy", href: "/privacy" }] },
];

export const defaultSocialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/digitalaidseattle", icon: <LinkedInIcon /> },
  { label: "GitHub", href: "https://github.com/digitalaidseattle", icon: <GitHubIcon /> },
];

export function Footer({
  linkGroups = defaultFooterLinks,
  socialLinks = defaultSocialLinks,
  newsletterText = "Sign up for our newsletter to...",
  onSubscribe,
}: FooterProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    onSubscribe?.(String(email ?? ""));
  }

  const list = { m: 0, p: 0, listStyle: "none" } as const;

  return (
    <Box component="footer" sx={{ bgcolor: "ds.bg.inverse", color: "ds.text.onDark", px: { xs: sp.md, lg: 0 }, py: { xs: "56px", lg: sp["4xl"] } }}>
      <Box sx={{ mx: "auto", display: "flex", maxWidth: layout.contentWidth, flexDirection: "column", gap: { xs: "56px", lg: sp["4xl"] } }}>
        {/* Newsletter */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { lg: "center" },
            justifyContent: { lg: "space-between" },
            gap: sp.lg,
          }}
        >
          <div>
            <Typography variant="headlineMedium" component="h2">
              Sign up for our newsletter
            </Typography>
            <Typography variant="bodyLarge">{newsletterText}</Typography>
          </div>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: sp.md, md: sp.xl } }}>
            <TextInput label="Email address" name="email" type="email" placeholder="email address" required sx={{ width: { xs: "100%", md: 400 } }} />
            <Button type="submit" variant="elevated">
              Sign up
            </Button>
          </Box>
        </Box>

        {/* Links */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: { lg: "space-between" }, gap: sp["2xl"] }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: sp.lg }}>
            <Logo />
            <Box sx={{ display: "flex", flexDirection: "column", gap: sp.md }}>
              <Typography variant="labelSmall" component="p" sx={{ fontWeight: 400 }}>
                Illustrations by:
                <br />
                Storyset by Freepik
              </Typography>
              <Typography variant="labelSmall" component="p">
                © Digital Aid Seattle {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>

          <Box
            component="nav"
            aria-label="Footer"
            sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, columnGap: sp["5xl"], rowGap: sp["2xl"] }}
          >
            {linkGroups.map((group) => (
              <Box key={group.title} sx={{ display: "flex", width: 190, flexDirection: "column", gap: sp["2xs"] }}>
                <Typography variant="labelLarge" component="h3">
                  {group.title}
                </Typography>
                <Box component="ul" sx={{ ...list, display: "flex", flexDirection: "column", gap: sp["2xs"] }}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Typography
                        variant="bodyLarge"
                        component="a"
                        href={link.href}
                        sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" }, ...focusRing(true) }}
                      >
                        {link.label}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <Box component="ul" sx={{ ...list, display: "flex", flexDirection: { lg: "column" }, justifyContent: { lg: "center" }, gap: sp.lg }}>
            {socialLinks.map((s) => (
              <li key={s.href}>
                <Box
                  component="a"
                  href={s.href}
                  aria-label={s.label}
                  sx={{ display: "block", width: 48, height: 48, color: "ds.text.onDark", "& svg": { fontSize: 48 }, borderRadius: "50%", ...focusRing(true) }}
                >
                  {s.icon}
                </Box>
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
