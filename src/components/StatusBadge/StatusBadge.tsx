import Box from "@mui/material/Box";
import { sp, withSx, type Sx } from "../../mui/sx";
import type { color } from "../../tokens/tokens";

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
  sx?: Sx;
}

export const statusLabels: Record<ProjectStatus, string> = {
  Active: "Active",
  "Under Evaluation": "Evaluating",
  Completed: "Completed",
};

const statusBg: Record<ProjectStatus, `ds.bg.${keyof typeof color.bg}`> = {
  Active: "ds.bg.statusActive",
  "Under Evaluation": "ds.bg.statusUnderEvaluation",
  Completed: "ds.bg.statusCompleted",
};

export function StatusBadge({ status, sx }: StatusBadgeProps) {
  return (
    <Box
      component="span"
      sx={withSx(
        (t) => ({
          ...t.typography.labelLargeSemibold,
          display: "inline-flex",
          height: 40,
          alignItems: "center",
          px: sp.sm,
          borderRadius: "999px",
          color: "ds.text.secondary",
          bgcolor: statusBg[status],
        }),
        sx,
      )}
    >
      {statusLabels[status]}
    </Box>
  );
}
