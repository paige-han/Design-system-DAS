import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * EmptyState: shown where content would be, when there is none or it couldn't load.
 * Always says what happened and what the person can do next.
 *
 *   tone="neutral" → nothing to show (no matches, nothing scheduled)
 *   tone="error"   → this section failed to load; offer "Try again"
 *
 * Not in the Figma guide yet.
 */
export interface EmptyStateProps {
  /** A Material Symbol from src/icons. */
  icon: ReactNode;
  /** Short, plain statement: "No matching projects". */
  title: string;
  /** One or two sentences: why, and what to do. */
  description?: ReactNode;
  /** Button that fixes it: "Clear filters", "Try again". */
  action?: ReactNode;
  tone?: "neutral" | "error";
  /** Heading level for the title, to fit the page outline. */
  headingLevel?: 2 | 3;
  sx?: Sx;
}

export function EmptyState({ icon, title, description, action, tone = "neutral", headingLevel = 2, sx }: EmptyStateProps) {
  const error = tone === "error";
  return (
    <Box
      role={error ? "alert" : undefined}
      sx={withSx(
        { display: "flex", maxWidth: 480, flexDirection: "column", alignItems: "center", gap: sp.md, px: sp.md, py: sp["2xl"], textAlign: "center" },
        sx,
      )}
    >
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          display: "flex",
          width: 64,
          height: 64,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          bgcolor: error ? "ds.bg.errorSubtle" : "ds.bg.subtle",
          color: error ? "ds.text.error" : "ds.text.primary",
          "& svg": { fontSize: 32 },
        }}
      >
        {icon}
      </Box>
      <Typography variant="headlineSmall" component={`h${headingLevel}`} color="ds.text.primary">
        {title}
      </Typography>
      {description && (
        <Typography variant="bodyLarge" color="ds.text.secondary">
          {description}
        </Typography>
      )}
      {action && <Box sx={{ mt: sp.xs }}>{action}</Box>}
    </Box>
  );
}
