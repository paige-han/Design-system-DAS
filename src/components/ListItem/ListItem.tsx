import type { ReactNode } from "react";

/**
 * ListItem: a small labeled tile, laid out in grids (roles, skills, partners).
 *
 * Figma mapping: "List Item w/ Icon" (56px tall, 24px icon) and
 * "List Item w/ Pic" (72px tall, 56px thumbnail). Pass either `icon` or `imageSrc`.
 */
export interface ListItemProps {
  label: string;
  /** A 24px Material Symbol from src/icons. */
  icon?: ReactNode;
  /** A logo or photo, shown as a 56px thumbnail. */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function ListItem({ label, icon, imageSrc, imageAlt = "", className = "" }: ListItemProps) {
  return (
    <div
      className={[
        "flex items-center gap-4 rounded-sm border-2 border-surface-card bg-surface py-2 pr-6 pl-4",
        "shadow-elevation-1",
        imageSrc ? "min-h-18" : "min-h-14",
        className,
      ].join(" ")}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt} className="size-14 shrink-0 object-contain" />
      ) : (
        icon && <span className="size-6 shrink-0 text-icon" aria-hidden="true">{icon}</span>
      )}
      <span className="type-label-md text-on-surface">{label}</span>
    </div>
  );
}
