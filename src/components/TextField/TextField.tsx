import { useId, type ChangeEventHandler, type HTMLInputTypeAttribute } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { ErrorIcon } from "../../icons";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * TextField: a form field with its label ABOVE the box, plus helper text and an error message.
 *
 * Built from MUI's form parts (FormControl, FormLabel, OutlinedInput, FormHelperText), which the
 * theme styles. Use it instead of MUI's own <TextField>, whose label floats inside the border.
 * Not in the Figma guide yet: 48px tall, radius md, border default → brand on focus → error.
 */
export interface TextFieldProps {
  /** Visible label. Say what to enter ("Email address"), not an instruction. */
  label: string;
  /** Extra guidance under the label, e.g. a format example. */
  helperText?: string;
  /** Error message, shown below the field. The helper text stays. */
  error?: string;
  /** Marks the field "(optional)". Fields are required by default; mark the exceptions. */
  optional?: boolean;
  multiline?: boolean;
  /** Rows for a multiline field. */
  rows?: number;
  id?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  sx?: Sx;
}

export function TextField({
  label,
  helperText,
  error,
  optional = false,
  multiline = false,
  rows = 5,
  id: idProp,
  disabled,
  sx,
  ...inputProps
}: TextFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy = [helperText && helperId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <FormControl error={Boolean(error)} disabled={disabled} sx={withSx({ display: "flex", gap: sp.xs }, sx)}>
      <FormLabel htmlFor={id}>
        {label}
        {optional && (
          <Typography component="span" variant="labelMedium" color="ds.text.tertiary">
            {" "}
            (optional)
          </Typography>
        )}
      </FormLabel>
      {helperText && (
        <FormHelperText id={helperId} error={false}>
          {helperText}
        </FormHelperText>
      )}
      <OutlinedInput
        id={id}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        required={!optional}
        inputProps={{ "aria-describedby": describedBy, "aria-invalid": error ? true : undefined }}
        {...inputProps}
      />
      {error && (
        <FormHelperText id={errorId}>
          <ErrorIcon sx={{ fontSize: 16 }} />
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
}
