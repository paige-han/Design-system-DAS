import type { FormEvent, ReactNode } from "react";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import { GitHubIcon, LinkedInIcon } from "../../icons";

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

  return (
    <footer className="bg-inverse px-md py-14 text-on-dark lg:px-0 lg:py-4xl">
      <div className="mx-auto flex max-w-content flex-col gap-14 lg:gap-4xl">
        {/* Newsletter */}
        <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="type-headline-md">Sign up for our newsletter</h2>
            <p className="type-body-lg">{newsletterText}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-md md:flex-row md:gap-xl">
            <TextInput
              label="Email address"
              name="email"
              type="email"
              placeholder="email address"
              required
              className="w-full md:w-[400px]"
            />
            <Button type="submit" variant="elevated">
              Sign up
            </Button>
          </form>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2xl lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-between gap-lg">
            <Logo />
            <div className="flex flex-col gap-md type-label-sm">
              <p className="font-normal">
                Illustrations by:
                <br />
                Storyset by Freepik
              </p>
              <p>© Digital Aid Seattle {new Date().getFullYear()}</p>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-1 gap-x-5xl gap-y-2xl md:grid-cols-2">
            {linkGroups.map((group) => (
              <div key={group.title} className="flex w-[190px] flex-col gap-2xs">
                <h3 className="type-label-lg">{group.title}</h3>
                <ul className="flex flex-col gap-2xs">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="type-body-lg hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <ul className="flex gap-lg lg:flex-col lg:justify-center">
            {socialLinks.map((s) => (
              <li key={s.href}>
                <a href={s.href} aria-label={s.label} className="block size-12 text-on-dark">
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
