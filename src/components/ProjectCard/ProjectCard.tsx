import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { StatusBadge, type ProjectStatus } from "../StatusBadge/StatusBadge";
import { rd, sp, withSx, type Sx } from "../../mui/sx";

/**
 * ProjectCard: one project on the Projects page.
 *
 * Figma mapping: "Project Card" (420px wide on desktop, full width on mobile).
 */
export interface ProjectCardProps {
  /** Project or partner name. */
  title: string;
  /** Partner organization, e.g. "City of Seattle". */
  partner: string;
  /** Program area, e.g. "Legal Aid". */
  programArea: string;
  status: ProjectStatus;
  /** Date range or "Ongoing". */
  dates: string;
  description: string;
  /** Partner logo or project photo. */
  imageSrc: string;
  imageAlt: string;
  /** "contain" for logos (default), "cover" for photos. */
  imageFit?: "contain" | "cover";
  sx?: Sx;
}

export function ProjectCard({ title, partner, programArea, status, dates, description, imageSrc, imageAlt, imageFit = "contain", sx }: ProjectCardProps) {
  return (
    <Card component="article" sx={withSx({ display: "flex", width: "100%", maxWidth: 420, flexDirection: "column", gap: "20px", p: sp.xl }, sx)}>
      <Box
        sx={{
          aspectRatio: "1",
          width: "100%",
          overflow: "hidden",
          borderRadius: rd.sm,
          border: "2px solid",
          borderColor: "ds.border.subtle",
          bgcolor: "ds.bg.default",
        }}
      >
        <Box component="img" src={imageSrc} alt={imageAlt} sx={{ width: "100%", height: "100%", objectFit: imageFit }} />
      </Box>

      <Typography variant="titleLarge" color="ds.text.primary">
        {title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: sp.md }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: sp.md, pt: "10px", color: "ds.text.secondary" }}>
          <Typography variant="labelLarge" component="p">
            {partner}
          </Typography>
          <Typography variant="labelMedium" component="p">
            {programArea}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
          <StatusBadge status={status} />
          <Typography variant="labelMedium" component="p" color="ds.text.secondary" sx={{ textAlign: "right" }}>
            {dates}
          </Typography>
        </Box>
      </Box>

      <Typography variant="bodyMedium" color="ds.text.primary">
        {description}
      </Typography>
    </Card>
  );
}
