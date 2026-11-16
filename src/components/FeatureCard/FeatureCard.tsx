import type { ReactNode } from "react";
import { IconBadge } from "../IconBadge/IconBadge";

/**
 * FeatureCard: wide card with an icon badge beside a title and a paragraph.
 *
 * Figma mapping: "Card 1 w Icon LA" (Tablet/Desktop, 880px). Used for "what we do"
 * services like Internal tools. On Small screens the icon sits above the text.
 */
export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <article
      className={[
        "flex flex-col gap-6 rounded-card border-3 border-surface-card bg-surface p-8 md:flex-row md:gap-8",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <IconBadge icon={icon} />
      <div className="flex flex-col gap-6 text-on-surface">
        <h3 className="type-title-md">{title}</h3>
        <p className="type-body-lg">{description}</p>
      </div>
    </article>
  );
}
