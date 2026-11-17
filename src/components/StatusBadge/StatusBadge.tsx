/**
 * StatusBadge: shows a project's status on a project card.
 *
 * Matches the live site (`components/cards/StateBadge.tsx` in digital-aid-seattle-website):
 * the `status` values are the ones stored in the CMS, and each shows a shorter label.
 *   "Active"           → "Active"      (yellow)
 *   "Under Evaluation" → "Evaluating"  (light lime)
 *   "Completed"        → "Completed"   (light pink)
 * The CMS also has "Submitted by Partner", "Ready for consideration" and "Declined";
 * those are internal and never shown on the public site, so they have no badge.
 *
 * Figma mapping: "Active" (Property 1=Active) inside Project Card.
 */
export type ProjectStatus = "Active" | "Under Evaluation" | "Completed";

export interface StatusBadgeProps {
  /** The project's status as stored in the CMS. */
  status: ProjectStatus;
  className?: string;
}

export const statusLabels: Record<ProjectStatus, string> = {
  Active: "Active",
  "Under Evaluation": "Evaluating",
  Completed: "Completed",
};

const statusBg: Record<ProjectStatus, string> = {
  Active: "bg-status-active",
  "Under Evaluation": "bg-status-under-evaluation",
  Completed: "bg-status-completed",
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex h-10 items-center rounded-full px-sm type-label-lg-semibold text-secondary ${statusBg[status]} ${className}`}
    >
      {statusLabels[status]}
    </span>
  );
}
