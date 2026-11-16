/**
 * HighlightCard: a short stat or achievement with a supporting line.
 *
 * Figma mapping: "Testimonial Card" (Property 1=narrow, 272px). Despite the Figma
 * name, its content is a highlight ("2 Projects Deployed with 4+ Underway").
 */
export interface HighlightCardProps {
  title: string;
  description: string;
  className?: string;
}

export function HighlightCard({ title, description, className = "" }: HighlightCardProps) {
  return (
    <article
      className={[
        "flex flex-col rounded-card border-3 border-surface-card bg-surface p-8 text-center text-on-surface",
        "shadow-elevation-1",
        className,
      ].join(" ")}
    >
      <h3 className="type-body-md font-bold">{title}</h3>
      <p className="type-body-md">{description}</p>
    </article>
  );
}
