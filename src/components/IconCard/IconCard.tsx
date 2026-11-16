import type { ReactNode } from "react";

/**
 * IconCard: centered card with an icon badge, a title and a short description.
 *
 * Figma mapping: "Card 1 w/ Icon" (e.g. the "New Skills" volunteer benefit card).
 */
export interface IconCardProps {
  /** Icon shown in the 80px green circle (48px icon works best). */
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function IconCard({ icon, title, description, className = "" }: IconCardProps) {
  return (
    <article
      className={[
        "flex flex-col items-center gap-6 rounded-card border-3 border-surface-card bg-surface-card p-8 text-center",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <span
        className="flex size-20 items-center justify-center rounded-pill bg-icon-badge text-on-dark"
        aria-hidden="true"
      >
        <span className="size-12">{icon}</span>
      </span>
      <h3 className="type-title-lg text-on-surface">{title}</h3>
      <p className="type-body-md text-on-surface">{description}</p>
    </article>
  );
}
