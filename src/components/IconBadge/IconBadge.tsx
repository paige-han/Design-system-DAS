import type { ReactNode } from "react";

/**
 * IconBadge: an icon inside an 80px green circle.
 *
 * Figma mapping: the "Icon" layer (Ellipse + Material Symbol) used in
 * Card 1 w/ Icon, Card 2, Card 3 and Card 1 w Icon LA.
 */
export interface IconBadgeProps {
  /** A Material Symbol from src/icons. */
  icon: ReactNode;
  className?: string;
}

export function IconBadge({ icon, className = "" }: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-20 shrink-0 items-center justify-center rounded-pill bg-icon-badge text-on-dark ${className}`}
    >
      <span className="size-10">{icon}</span>
    </span>
  );
}
