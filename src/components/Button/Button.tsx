import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

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
  /** Shows a spinner and blocks clicks while a form is sending. Keep the label the same. */
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "type-label-lg bg-action text-on-action hover:bg-action-pressed focus-visible:outline-brand",
  onDark: "type-label-lg bg-accent text-on-accent hover:bg-accent/90 focus-visible:outline-on-surface",
  elevated:
    "type-label-lg bg-action-on-dark text-on-action shadow-elevation-dark-2 hover:bg-action-pressed focus-visible:outline-on-surface",
  outlined:
    "border-2 border-brand text-action type-label-md hover:bg-state-layer/8 focus-visible:outline-brand",
};

/** Classes shared by Button and ButtonLink. */
export function buttonClasses(variant: ButtonVariant = "primary", className = "") {
  return [
    // Shape and size from Figma: 40px tall, pill radius, 24px side padding
    "inline-flex h-10 shrink-0 items-center justify-center gap-xs rounded-full px-lg",
    "whitespace-nowrap no-underline",
    "cursor-pointer transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
    variantClasses[variant],
    className,
  ].join(" ");
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  icon,
  children,
  loading = false,
  className = "",
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, `${loading ? "disabled:opacity-100 disabled:cursor-wait" : ""} ${className}`)}
      {...props}
    >
      {loading ? <Spinner /> : icon && <span className="inline-flex size-5 shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  href: string;
  children: ReactNode;
}

/** ButtonLink: looks like a Button, but goes to another page (renders <a>). */
export function ButtonLink({ variant = "primary", icon, children, className = "", ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, className)} {...props}>
      {icon && <span className="inline-flex size-5 shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </a>
  );
}
