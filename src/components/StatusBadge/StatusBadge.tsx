/**
 * StatusBadge: shows a project's status.
 *
 * Figma mapping: "Active" (Property 1=Active) inside Project Card.
 * Active and Complete colors come from Figma; Evaluating is a placeholder until it's designed.
 */
export type ProjectStatus = "active" | "evaluating" | "complete";

export interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const styles: Record<ProjectStatus, { label: string; bg: string }> = {
  active: { label: "Active", bg: "bg-status-active" },
  evaluating: { label: "Evaluating", bg: "bg-status-evaluating" },
  complete: { label: "Complete", bg: "bg-status-complete" },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const { label, bg } = styles[status];
  return (
    <span
      className={`inline-flex h-10 items-center rounded-pill px-3 type-label-lg-semibold text-on-surface-muted ${bg} ${className}`}
    >
      {label}
    </span>
  );
}
