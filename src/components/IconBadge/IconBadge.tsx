import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { withSx, type Sx } from "../../mui/sx";

/**
 * IconBadge: an icon inside an 80px green circle.
 *
 * Figma mapping: the "Icon" layer (Ellipse + Material Symbol) used in
 * Card 1 w/ Icon, Card 2, Card 3 and Card 1 w Icon LA.
 */
export interface IconBadgeProps {
  /** A Material Symbol from src/icons (or @mui/icons-material). Shown at 40px. */
  icon: ReactNode;
  sx?: Sx;
}

export function IconBadge({ icon, sx }: IconBadgeProps) {
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={withSx(
        {
          display: "flex",
          width: 80,
          height: 80,
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          bgcolor: "ds.bg.brand",
          color: "ds.icon.onDark",
          "& svg": { fontSize: 40 },
        },
        sx,
      )}
    >
      {icon}
    </Box>
  );
}
