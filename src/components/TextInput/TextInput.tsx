import type { InputHTMLAttributes } from "react";

/**
 * TextInput: single-line text field.
 *
 * Figma mapping: "Email address input" (footer newsletter).
 * White pill, 40px tall, 16px side padding, body/large text.
 */
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Accessible label. Shown to screen readers only, since the design has no visible label. */
  label: string;
}

export function TextInput({ label, className = "", ...props }: TextInputProps) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        className={[
          "h-10 w-full rounded-input bg-surface-card px-4",
          "type-body-lg text-on-surface placeholder:text-placeholder",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        ].join(" ")}
        {...props}
      />
    </label>
  );
}
