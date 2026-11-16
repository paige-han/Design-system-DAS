import type { ButtonHTMLAttributes } from "react";
import { CheckIcon } from "../../icons";

/**
 * FilterChip: toggle used to filter a list (e.g. project status).
 *
 * Figma mapping: "Filter chip" (M3, Style=outlined). The unselected look comes from Figma.
 * The selected look (light yellow fill + check) follows the M3 pattern and is not in Figma yet.
 */
export interface FilterChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string;
  selected?: boolean;
}

export function FilterChip({ label, selected = false, className = "", ...props }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={[
        "inline-flex h-8 cursor-pointer items-center gap-2 rounded-sm px-4",
        "type-label-lg-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        selected
          ? "border border-transparent bg-status-active pl-2 text-on-surface"
          : "border border-outline text-on-surface-variant hover:bg-outline-soft",
        className,
      ].join(" ")}
      {...props}
    >
      {selected && <CheckIcon className="size-[18px]" />}
      {label}
    </button>
  );
}
