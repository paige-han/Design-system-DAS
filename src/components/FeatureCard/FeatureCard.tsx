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
        "flex flex-col gap-lg rounded-md border-3 border-on-surface bg-surface p-xl md:flex-row md:gap-xl",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <IconBadge icon={icon} />
      <div className="flex flex-col gap-lg text-primary">
        <h3 className="type-title-md">{title}</h3>
        <p className="type-body-lg">{description}</p>
      </div>
    </article>
  );
}
