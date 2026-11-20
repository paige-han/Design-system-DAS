import type { ReactNode } from "react";
import MuiListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * ListItem: a small labeled tile, laid out in grids (roles, skills, partners).
 * Built on MUI ListItem; its rounded white-bordered look comes from the theme.
 *
 * Figma mapping: "List Item w/ Icon" (56px tall, 24px icon) and
 * "List Item w/ Pic" (72px tall, 56px thumbnail). Pass either `icon` or `imageSrc`.
 */
export interface ListItemProps {
  label: string;
  /** A 24px Material Symbol from src/icons. */
  icon?: ReactNode;
  /** A logo or photo, shown as a 56px thumbnail. */
  imageSrc?: string;
  imageAlt?: string;
  sx?: Sx;
}

export function ListItem({ label, icon, imageSrc, imageAlt = "", sx }: ListItemProps) {
  return (
    <MuiListItem
      component="div"
      sx={withSx(
        {
          gap: sp.md,
          py: sp.xs,
          pr: sp.lg,
          pl: sp.md,
          boxShadow: 1,
          minHeight: imageSrc ? 72 : 56,
        },
        sx,
      )}
    >
      {imageSrc ? (
        <Box component="img" src={imageSrc} alt={imageAlt} sx={{ width: 56, height: 56, flexShrink: 0, objectFit: "contain" }} />
      ) : (
        icon && (
          <Box component="span" aria-hidden="true" sx={{ display: "flex", color: "ds.text.brand", "& svg": { fontSize: 24 } }}>
            {icon}
          </Box>
        )
      )}
      <Typography variant="labelMedium" color="ds.text.primary">
        {label}
      </Typography>
    </MuiListItem>
  );
}
