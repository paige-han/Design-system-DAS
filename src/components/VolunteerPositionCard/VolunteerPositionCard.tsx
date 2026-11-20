import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { ContractEditIcon } from "../../icons";
import { rd, sp, withSx, type Sx } from "../../mui/sx";

/**
 * VolunteerPositionCard: one open volunteer role with a "Learn more" button.
 *
 * Figma mapping: "Volunteer Position" (428 x 112). In Figma the button label is cut off
 * ("Learn mo"); here the button sizes to its label instead.
 */
export interface VolunteerPositionCardProps {
  title: string;
  /** A 24px Material Symbol. Default: contract_edit. */
  icon?: ReactNode;
  ctaLabel?: string;
  onLearnMore?: () => void;
  sx?: Sx;
}

export function VolunteerPositionCard({
  title,
  icon = <ContractEditIcon />,
  ctaLabel = "Learn more →",
  onLearnMore,
  sx,
}: VolunteerPositionCardProps) {
  return (
    <Card
      component="article"
      elevation={2}
      sx={withSx({ display: "flex", gap: sp.md, py: sp.xs, pr: sp.lg, pl: sp.md, borderRadius: rd.sm, borderWidth: 2 }, sx)}
    >
      <Box component="span" aria-hidden="true" sx={{ display: "flex", py: sp.sm, color: "ds.text.brand", "& svg": { fontSize: 24 } }}>
        {icon}
      </Box>
      <Box sx={{ display: "flex", minWidth: 0, flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="titleMedium" color="ds.text.primary" sx={{ py: sp.sm }}>
          {title}
        </Typography>
        <Box sx={{ pb: sp.sm }}>
          <Button variant="outlined" onClick={onLearnMore} aria-label={`${ctaLabel.replace(" →", "")}: ${title}`}>
            {ctaLabel}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
