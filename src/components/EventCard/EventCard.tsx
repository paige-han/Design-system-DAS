/**
 * EventCard: an upcoming event with image, date, time, place and description.
 *
 * Figma mapping: "Event Card Desktop" (880px). On Small screens the image
 * stacks above the text (no mobile version in Figma yet).
 */
export interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export function EventCard({
  title,
  date,
  time,
  location,
  description,
  imageSrc,
  imageAlt,
  className = "",
}: EventCardProps) {
  return (
    <article
      className={[
        "flex flex-col gap-6 rounded-card border-3 border-surface-card bg-surface p-8 md:flex-row md:items-center md:gap-10",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="aspect-square w-full shrink-0 rounded-sm border-2 border-outline-soft bg-surface-card object-cover md:size-[215px]"
      />
      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col gap-4">
          <h3 className="type-title-lg text-on-surface">{title}</h3>
          <p className="flex flex-wrap gap-x-6 type-label-lg text-on-surface-strong">
            <span>{date}</span>
            <span>{time}</span>
          </p>
          <p className="type-label-md text-on-surface-muted">{location}</p>
        </div>
        <p className="type-body-md text-on-surface">{description}</p>
      </div>
    </article>
  );
}
