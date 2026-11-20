import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * ProjectCardSkeleton: ProjectCard's layout while projects load, made of MUI Skeletons.
 * For other content, use MUI <Skeleton> directly (the theme gives it our color and pulse):
 *   <Skeleton variant="text" width="60%" height={28} />   a line of text
 *   <Skeleton variant="rounded" height={160} />           an image
 *   <Skeleton variant="rounded" sx={{ borderRadius: rd.full }} width={96} height={40} />   a badge or button
 */
export function ProjectCardSkeleton({ sx }: { sx?: Sx }) {
  return (
    <Card aria-hidden="true" sx={withSx({ display: "flex", width: "100%", maxWidth: 420, flexDirection: "column", gap: "20px", p: sp.xl }, sx)}>
      <Skeleton variant="rounded" sx={{ aspectRatio: "1", width: "100%", height: "auto" }} />
      <Skeleton variant="text" width="66%" height={28} />
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: sp.md }}>
        <Box sx={{ display: "flex", width: "50%", flexDirection: "column", gap: sp.md, pt: "10px" }}>
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" width="66%" height={16} />
        </Box>
        <Skeleton variant="rounded" width={96} height={40} sx={{ borderRadius: "999px" }} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: sp.xs }}>
        <Skeleton variant="text" height={16} />
        <Skeleton variant="text" height={16} />
        <Skeleton variant="text" width="50%" height={16} />
      </Box>
    </Card>
  );
}
