import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * HighlightCard: a short stat or achievement with a supporting line.
 *
 * Figma mapping: "Testimonial Card" (Property 1=narrow, 272px). Despite the Figma
 * name, its content is a highlight ("2 Projects Deployed with 4+ Underway").
 */
export interface HighlightCardProps {
  title: string;
  description: string;
  sx?: Sx;
}

export function HighlightCard({ title, description, sx }: HighlightCardProps) {
  return (
    <Card component="article" sx={withSx({ display: "flex", flexDirection: "column", p: sp.xl, textAlign: "center", color: "ds.text.primary" }, sx)}>
      <Typography variant="bodyMedium" component="h3" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="bodyMedium">{description}</Typography>
    </Card>
  );
}
