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
        "inline-flex h-8 cursor-pointer items-center gap-xs rounded-sm px-md",
        "type-label-lg-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        selected
          ? "border border-transparent bg-status-active pl-xs text-primary"
          : "border border-strong text-secondary hover:bg-surface-alt",
        className,
      ].join(" ")}
      {...props}
    >
      {selected && <CheckIcon className="size-[18px]" />}
      {label}
    </button>
  );
}
