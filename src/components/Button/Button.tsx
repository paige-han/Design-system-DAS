import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button: Open Seattle's main call-to-action.
 *
 * Figma mapping:
 *   variant="primary" -> "Button"       (dark green, white text; use on light backgrounds)
 *   variant="onDark"  -> "Button-dark"  (yellow, dark green text; use on dark backgrounds)
 */
export type ButtonVariant = "primary" | "onDark";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Pick by the background the button sits on. */
  variant?: ButtonVariant;
  /** Optional icon shown before the label (24px icons work best). */
  icon?: ReactNode;
  /** Button label. Keep it short and action-first ("Apply to volunteer"). */
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary/90 focus-visible:outline-primary",
  onDark: "bg-accent text-on-accent hover:bg-accent/90 focus-visible:outline-accent",
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
        "inline-flex h-10 items-center justify-center gap-2 rounded-pill px-6",
        // Type: label/large
        "font-sans text-label-lg",
        // States
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
