import Chip, { type ChipProps } from "@mui/material/Chip";
import { CheckIcon } from "../../icons";

/**
 * FilterChip: toggle used to filter a list (e.g. project status).
 *
 * Built on MUI Chip, the same way the live Projects page does it:
 * outlined when off; filled yellow with a check when on (look set in the theme).
 * Adds aria-pressed so screen readers announce on/off.
 *
 * Figma mapping: "Filter chip" (M3, Style=outlined). The selected look is from the live site;
 * it is not in Figma yet.
 */
export interface FilterChipProps extends Omit<ChipProps, "variant" | "icon" | "onClick" | "children"> {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, selected = false, onClick, ...props }: FilterChipProps) {
  return (
    <Chip
      label={label}
      variant={selected ? "filled" : "outlined"}
      icon={selected ? <CheckIcon /> : undefined}
      onClick={onClick ?? (() => {})}
      aria-pressed={selected}
      {...props}
    />
  );
}
