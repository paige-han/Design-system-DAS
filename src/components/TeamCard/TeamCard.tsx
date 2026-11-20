import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * TeamCard: a team member's name and role, with an optional photo.
 *
 * Figma mapping: "Card 1 w" (Property 1=Photo, 196px wide) and "Mobile Team Card" (no photo).
 */
export interface TeamCardProps {
  name: string;
  role: string;
  /** Square headshot. Leave out for the compact (mobile) version. */
  photoSrc?: string;
  sx?: Sx;
}

export function TeamCard({ name, role, photoSrc, sx }: TeamCardProps) {
  return (
    <Card component="article" sx={withSx({ display: "flex", flexDirection: "column", width: "100%", maxWidth: 196 }, sx)}>
      {photoSrc && <Box component="img" src={photoSrc} alt={name} sx={{ aspectRatio: "1", width: "100%", objectFit: "cover" }} />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: sp["2xs"], p: sp.md, color: "ds.text.primary" }}>
        <Typography variant="titleMedium">{name}</Typography>
        <Typography variant="bodyMedium">{role}</Typography>
      </Box>
    </Card>
  );
}
