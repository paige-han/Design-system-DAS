import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import { ContractEditIcon } from "../../icons";

/**
 * VolunteerPositionCard: one open volunteer role with a "Learn more" button.
 *
 * Figma mapping: "Volunteer Position" (428 x 112). In Figma the button label is cut off
 * ("Learn mo"); here the button sizes to its label instead.
 */
export interface VolunteerPositionCardProps {
  title: string;
  /** A 24px Material Symbol. Default: contract_edit. */
  icon?: ReactNode;
  ctaLabel?: string;
  onLearnMore?: () => void;
  className?: string;
}

export function VolunteerPositionCard({
  title,
  icon = <ContractEditIcon />,
  ctaLabel = "Learn more →",
  onLearnMore,
  className = "",
}: VolunteerPositionCardProps) {
  return (
    <article
      className={[
        "flex gap-md rounded-sm border-2 border-on-surface bg-surface py-xs pr-lg pl-md",
        "shadow-elevation-2",
        className,
      ].join(" ")}
    >
      <span className="size-6 shrink-0 py-sm text-brand [box-sizing:content-box]" aria-hidden="true">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="py-sm type-title-md text-primary">{title}</h3>
        <div className="pb-sm">
          <Button variant="outlined" onClick={onLearnMore} aria-label={`${ctaLabel.replace(" →", "")}: ${title}`}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
