import { StatusBadge, type ProjectStatus } from "../StatusBadge/StatusBadge";

/**
 * ProjectCard: one project on the Projects page.
 *
 * Figma mapping: "Project Card" (420px wide on desktop, full width on mobile).
 */
export interface ProjectCardProps {
  /** Project or partner name. */
  title: string;
  /** Partner organization, e.g. "City of Seattle". */
  partner: string;
  /** Program area, e.g. "Legal Aid". */
  programArea: string;
  status: ProjectStatus;
  /** Date range or "Ongoing". */
  dates: string;
  description: string;
  /** Partner logo or project photo. */
  imageSrc: string;
  imageAlt: string;
  /** "contain" for logos (default), "cover" for photos. */
  imageFit?: "contain" | "cover";
  className?: string;
}

export function ProjectCard({
  title,
  partner,
  programArea,
  status,
  dates,
  description,
  imageSrc,
  imageAlt,
  imageFit = "contain",
  className = "",
}: ProjectCardProps) {
  return (
    <article
      className={[
        "flex w-full max-w-[420px] flex-col gap-5 rounded-card border-3 border-surface-card bg-surface p-8",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <div className="aspect-square w-full overflow-hidden rounded-sm border-2 border-outline-soft bg-surface-card">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`size-full ${imageFit === "cover" ? "object-cover" : "object-contain"}`}
        />
      </div>

      <h3 className="type-title-lg text-on-surface">{title}</h3>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-4 pt-2.5 text-on-surface-strong">
          <p className="type-label-lg">{partner}</p>
          <p className="type-label-md">{programArea}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={status} />
          <p className="type-label-md text-right text-on-surface-muted">{dates}</p>
        </div>
      </div>

      <p className="type-body-md text-on-surface">{description}</p>
    </article>
  );
}
