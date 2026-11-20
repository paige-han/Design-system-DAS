import { useId, type ChangeEventHandler, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { ErrorIcon } from "../../icons";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * CheckboxField: a single yes/no choice with its label, and an error message if needed.
 * MUI Checkbox + FormControlLabel; colors come from the theme. Not in the Figma guide yet.
 */
export interface CheckboxFieldProps {
  /** The label; the whole row is clickable. */
  label: ReactNode;
  error?: string;
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  sx?: Sx;
}

export function CheckboxField({ label, error, id: idProp, sx, ...props }: CheckboxFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;
  return (
    <Box sx={withSx({ display: "flex", flexDirection: "column", gap: sp["2xs"] }, sx)}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            id={id}
            inputProps={{ "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined }}
            {...props}
          />
        }
      />
      {error && (
        <FormHelperText id={errorId} error>
          <ErrorIcon sx={{ fontSize: 16 }} />
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
