/**
 * TeamCard: a team member's name and role, with an optional photo.
 *
 * Figma mapping: "Card 1 w" (Property 1=Photo, 196px wide) and "Mobile Team Card" (no photo).
 */
export interface TeamCardProps {
  name: string;
  role: string;
  /** Square headshot. Leave out for the compact (mobile) version. */
  photoSrc?: string;
  className?: string;
}

export function TeamCard({ name, role, photoSrc, className = "" }: TeamCardProps) {
  return (
    <article
      className={[
        "flex w-full max-w-[196px] flex-col overflow-hidden rounded-card border-3 border-surface-card bg-surface",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      {photoSrc && <img src={photoSrc} alt={name} className="aspect-square w-full object-cover" />}
      <div className="flex flex-col gap-1 p-4 text-on-surface">
        <h3 className="type-title-md">{name}</h3>
        <p className="type-body-md">{role}</p>
      </div>
    </article>
  );
}
