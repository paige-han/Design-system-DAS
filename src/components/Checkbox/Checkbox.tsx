import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { ErrorIcon } from "../../icons";

/**
 * Checkbox: a single yes/no choice, such as agreeing to be contacted.
 * Not in the Figma guide yet. 20px box in color/bg/action, 48px tall touch row.
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** The label is the whole clickable row. */
  label: ReactNode;
  error?: string;
}

export function Checkbox({ label, error, className = "", id: idProp, ...props }: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;
  return (
    <div className={`flex flex-col gap-2xs ${className}`}>
      <label htmlFor={id} className="flex min-h-12 cursor-pointer items-center gap-sm type-body-md text-primary">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="size-5 shrink-0 cursor-pointer [accent-color:var(--bg-color-action)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={errorId} className="flex items-center gap-2xs type-label-md text-error">
          <ErrorIcon className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
