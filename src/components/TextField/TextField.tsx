import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ErrorIcon } from "../../icons";

/**
 * TextField: a form field with a visible label, for forms on light backgrounds.
 * (TextInput is the label-less pill used in the footer newsletter.)
 *
 * Not in the Figma guide yet. Built from tokens: label/large label, body/large input,
 * 48px tall, radius md, border default → brand on focus → error.
 * Same name as MUI's TextField so it maps 1:1 when the site adopts these components.
 */
interface BaseProps {
  /** Visible label. Say what to enter ("Email address"), not an instruction. */
  label: string;
  /** Extra guidance under the label, e.g. a format example. */
  helperText?: string;
  /** Error message. Replaces nothing: the helper text stays, the error shows below the field. */
  error?: string;
  /** Marks the field "(optional)". Fields are required by default; mark the exceptions. */
  optional?: boolean;
  className?: string;
}

type InputProps = BaseProps & { multiline?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
type AreaProps = BaseProps & { multiline: true; rows?: number } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;
export type TextFieldProps = InputProps | AreaProps;

export function TextField(props: TextFieldProps) {
  const { label, helperText, error, optional = false, className = "", id: idProp, ...rest } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy = [helperText && helperId, error && errorId].filter(Boolean).join(" ") || undefined;

  const fieldClasses = [
    "w-full rounded-md border bg-default px-md type-body-lg text-primary placeholder:text-tertiary",
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand",
    error ? "border-2 border-error" : "border-default",
  ].join(" ");

  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    required: optional ? undefined : true,
  };

  return (
    <div className={`flex flex-col gap-xs ${className}`}>
      <label htmlFor={id} className="type-label-lg text-primary">
        {label}
        {optional && <span className="type-label-md text-tertiary"> (optional)</span>}
      </label>
      {helperText && (
        <p id={helperId} className="type-label-md text-secondary">
          {helperText}
        </p>
      )}
      {"multiline" in rest && rest.multiline ? (
        (() => {
          const { multiline: _m, rows = 5, ...areaRest } = rest as Omit<AreaProps, keyof BaseProps>;
          return <textarea rows={rows} className={`${fieldClasses} py-sm`} {...shared} {...areaRest} />;
        })()
      ) : (
        (() => {
          const { multiline: _m, ...inputRest } = rest as Omit<InputProps, keyof BaseProps>;
          return <input className={`${fieldClasses} h-12`} {...shared} {...inputRest} />;
        })()
      )}
      {error && (
        <p id={errorId} className="flex items-center gap-2xs type-label-md text-error">
          <ErrorIcon className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
