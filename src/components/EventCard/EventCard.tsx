import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { rd, sp, withSx, type Sx } from "../../mui/sx";

/**
 * EventCard: an upcoming event with image, date, time, place and description.
 *
 * Figma mapping: "Event Card Desktop" (880px). On Small screens the image
 * stacks above the text (no mobile version in Figma yet).
 */
export interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  sx?: Sx;
}

export function EventCard({ title, date, time, location, description, imageSrc, imageAlt, sx }: EventCardProps) {
  return (
    <Card
      component="article"
      sx={withSx(
        {
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
          gap: { xs: sp.lg, md: sp["2xl"] },
          p: sp.xl,
        },
        sx,
      )}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={imageAlt}
        sx={{
          aspectRatio: "1",
          width: { xs: "100%", md: 215 },
          height: { md: 215 },
          flexShrink: 0,
          borderRadius: rd.sm,
          border: "2px solid",
          borderColor: "ds.border.subtle",
          bgcolor: "ds.bg.default",
          objectFit: "cover",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: sp.md }}>
          <Typography variant="titleLarge" color="ds.text.primary">
            {title}
          </Typography>
          <Typography variant="labelLarge" component="p" color="ds.text.secondary" sx={{ display: "flex", flexWrap: "wrap", columnGap: sp.lg }}>
            <span>{date}</span>
            <span>{time}</span>
          </Typography>
          <Typography variant="labelMedium" component="p" color="ds.text.secondary">
            {location}
          </Typography>
        </Box>
        <Typography variant="bodyMedium" color="ds.text.primary">
          {description}
        </Typography>
      </Box>
    </Card>
  );
}
