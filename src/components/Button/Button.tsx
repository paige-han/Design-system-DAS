import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button: Digital Aid Seattle's call-to-action.
 *
 * Figma mapping ("Button-dark" component set, M3 based):
 *   variant="primary"  -> Style=Filled, dark green  (on light backgrounds)
 *   variant="onDark"   -> Style=Filled, yellow      (on dark backgrounds, e.g. "Support us")
 *   variant="elevated" -> Style=Elevated, green + shadow (footer "Sign up")
 *   variant="outlined" -> Style=Outlined, green border, smaller label (Volunteer Position "Learn more")
 */
export type ButtonVariant = "primary" | "onDark" | "elevated" | "outlined";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Pick by the background the button sits on. */
  variant?: ButtonVariant;
  /** Optional icon shown before the label (20px). */
  icon?: ReactNode;
  /** Button label. Keep it short and action-first ("Apply to volunteer"). */
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "type-label-lg bg-action text-on-action hover:bg-action-pressed focus-visible:outline-brand",
  onDark: "type-label-lg bg-accent text-on-accent hover:bg-accent/90 focus-visible:outline-on-surface",
  elevated:
    "type-label-lg bg-action-on-dark text-on-action shadow-elevation-dark-2 hover:bg-action-pressed focus-visible:outline-on-surface",
  outlined:
    "border-2 border-brand text-action type-label-md hover:bg-state-layer/8 focus-visible:outline-brand",
};

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        // Shape and size from Figma: 40px tall, pill radius, 24px side padding
        "inline-flex h-10 shrink-0 items-center justify-center gap-xs rounded-full px-lg",
        "whitespace-nowrap",
        "cursor-pointer transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {icon && <span className="inline-flex size-5 shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
