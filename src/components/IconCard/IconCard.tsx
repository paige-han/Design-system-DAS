import type { ReactNode } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { IconBadge } from "../IconBadge/IconBadge";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * IconCard: centered card with an icon badge, a title and a short description.
 * MUI Card (rounded, white border, Elevation 1 from the theme) on a white background.
 *
 * Figma mapping: "Card 1 w/ Icon" (also used as "Card 2" and "Card 3", which only
 * change the icon and text). Volunteer benefits: New Skills, Networking, Community.
 */
export interface IconCardProps {
  /** A Material Symbol from src/icons, shown in the green circle. */
  icon: ReactNode;
  title: string;
  description: string;
  sx?: Sx;
}

export function IconCard({ icon, title, description, sx }: IconCardProps) {
  return (
    <Card
      component="article"
      sx={withSx(
        { display: "flex", flexDirection: "column", alignItems: "center", gap: sp.lg, p: sp.xl, textAlign: "center", bgcolor: "ds.bg.default" },
        sx,
      )}
    >
      <IconBadge icon={icon} />
      <Typography variant="titleLarge" color="ds.text.primary">
        {title}
      </Typography>
      <Typography variant="bodyMedium" color="ds.text.primary">
        {description}
      </Typography>
    </Card>
  );
}
