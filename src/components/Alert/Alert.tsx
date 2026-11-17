import type { ReactNode } from "react";
import { CheckCircleIcon, ErrorIcon, InfoIcon } from "../../icons";

/**
 * Alert: a message about what just happened (form sent, something failed).
 * Replaces the site's red/green Snackbar, which disappeared after 6 seconds.
 * An alert stays on the page, next to the thing it is about.
 *
 * Not in the Figma guide yet. Backgrounds: color/bg/success-subtle, error-subtle, surface-alt.
 */
export type AlertTone = "success" | "error" | "info";

export interface AlertProps {
  tone: AlertTone;
  /** One short sentence: what happened. */
  title: string;
  /** What to do next, if anything. */
  children?: ReactNode;
  /** Optional button or link, e.g. "Try again". */
  action?: ReactNode;
  className?: string;
}

const tones: Record<AlertTone, { box: string; icon: string; Icon: typeof InfoIcon }> = {
  success: { box: "bg-success-subtle border-brand", icon: "text-brand", Icon: CheckCircleIcon },
  error: { box: "bg-error-subtle border-error", icon: "text-error", Icon: ErrorIcon },
  info: { box: "bg-surface-alt border-default", icon: "text-primary", Icon: InfoIcon },
};

export function Alert({ tone, title, children, action, className = "" }: AlertProps) {
  const t = tones[tone];
  return (
    <div
      // Errors interrupt screen readers; success and info are announced politely.
      role={tone === "error" ? "alert" : "status"}
      className={`flex gap-sm rounded-md border-l-4 p-md ${t.box} ${className}`}
    >
      <t.Icon className={`size-6 shrink-0 ${t.icon}`} />
      <div className="flex flex-1 flex-col gap-2xs">
        <p className="type-title-md text-primary">{title}</p>
        {children && <div className="type-body-md text-secondary">{children}</div>}
        {action && <div className="mt-xs">{action}</div>}
      </div>
    </div>
  );
}
