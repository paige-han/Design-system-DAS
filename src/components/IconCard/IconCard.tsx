import type { ReactNode } from "react";
import { IconBadge } from "../IconBadge/IconBadge";

/**
 * IconCard: centered card with an icon badge, a title and a short description.
 *
 * Figma mapping: "Card 1 w/ Icon" (also used as "Card 2" and "Card 3", which only
 * change the icon and text). Volunteer benefits: New Skills, Networking, Community.
 */
export interface IconCardProps {
  /** A Material Symbol from src/icons, shown in the green circle. */
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function IconCard({ icon, title, description, className = "" }: IconCardProps) {
  return (
    <article
      className={[
        "flex flex-col items-center gap-lg rounded-md border-3 border-on-surface bg-default p-xl text-center",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <IconBadge icon={icon} />
      <h3 className="type-title-lg text-primary">{title}</h3>
      <p className="type-body-md text-primary">{description}</p>
    </article>
  );
}
