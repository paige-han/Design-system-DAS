import { useId, type InputHTMLAttributes } from "react";

/**
 * TextInput: single-line text field.
 *
 * Figma mapping: "Email address input" (footer newsletter).
 * White pill, 40px tall, 16px side padding, body/large text.
 * Error state uses color/border/error and color/text/error from the Foundations guide.
 */
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Accessible label. Shown to screen readers only, since the design has no visible label. */
  label: string;
  /** Error message. When set, the field gets a red border and the message shows below. */
  error?: string;
}

export function TextInput({ label, error, className = "", ...props }: TextInputProps) {
  const errorId = useId();
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          "h-10 w-full rounded-xl bg-default px-md",
          "type-body-lg text-primary placeholder:text-tertiary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface",
          error ? "border-2 border-error" : "",
        ].join(" ")}
        {...props}
      />
      {error && (
        <span id={errorId} className="mt-2xs block px-md type-label-md text-error">
          {error}
        </span>
      )}
    </label>
  );
}
