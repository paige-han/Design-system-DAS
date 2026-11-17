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
        "flex flex-col gap-lg rounded-md border-3 border-on-surface bg-surface p-xl md:flex-row md:items-center md:gap-2xl",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="aspect-square w-full shrink-0 rounded-sm border-2 border-subtle bg-default object-cover md:size-[215px]"
      />
      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col gap-md">
          <h3 className="type-title-lg text-primary">{title}</h3>
          <p className="flex flex-wrap gap-x-lg type-label-lg text-secondary">
            <span>{date}</span>
            <span>{time}</span>
          </p>
          <p className="type-label-md text-secondary">{location}</p>
        </div>
        <p className="type-body-md text-primary">{description}</p>
      </div>
    </article>
  );
}
