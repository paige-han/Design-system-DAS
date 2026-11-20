import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { IconBadge } from "../IconBadge/IconBadge";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * FeatureCard: wide card with an icon badge beside a title and a paragraph.
 *
 * Figma mapping: "Card 1 w Icon LA" (Tablet/Desktop, 880px). Used for "what we do"
 * services like Internal tools. On Small screens the icon sits above the text.
 */
export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  sx?: Sx;
}

export function FeatureCard({ icon, title, description, sx }: FeatureCardProps) {
  return (
    <Card
      component="article"
      sx={withSx({ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: sp.lg, md: sp.xl }, p: sp.xl }, sx)}
    >
      <IconBadge icon={icon} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: sp.lg, color: "ds.text.primary" }}>
        <Typography variant="titleMedium">{title}</Typography>
        <Typography variant="bodyLarge">{description}</Typography>
      </Box>
    </Card>
  );
}
