import { useId, type InputHTMLAttributes } from "react";
import { ErrorIcon } from "../../icons";

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
  /** Set when the field sits on a dark background, so the error message stays readable. */
  onDark?: boolean;
}

export function TextInput({ label, error, onDark = false, className = "", ...props }: TextInputProps) {
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
        <span
          id={errorId}
          className={`mt-xs flex items-center gap-2xs px-md type-label-md ${onDark ? "text-on-dark" : "text-error"}`}
        >
          <ErrorIcon className="size-4 shrink-0" />
          {error}
        </span>
      )}
    </label>
  );
}
