import { useId } from "react";
import Box from "@mui/material/Box";
import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { ErrorIcon } from "../../icons";
import { rd, sp, withSx, type Sx } from "../../mui/sx";
import { color } from "../../tokens/tokens";

/**
 * TextInput: the white pill email field from the footer newsletter.
 * For forms with a visible label, use TextField.
 *
 * Figma mapping: "Email address input". 40px tall, radius xl, body/large text.
 */
export interface TextInputProps extends Omit<InputBaseProps, "error" | "sx"> {
  /** Accessible label. Shown to screen readers only, since the design has no visible label. */
  label: string;
  /** Error message. When set, the field gets a red border and the message shows below. */
  error?: string;
  /** Set when the field sits on a dark background, so the error message stays readable. */
  onDark?: boolean;
  sx?: Sx;
}

export function TextInput({ label, error, onDark = false, sx, id: idProp, ...props }: TextInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;
  return (
    <Box sx={withSx({ display: "block" }, sx)}>
      <Box component="label" htmlFor={id} sx={visuallyHidden}>
        {label}
      </Box>
      <InputBase
        id={id}
        error={Boolean(error)}
        fullWidth
        inputProps={{ "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined }}
        sx={(t) => ({
          ...t.typography.bodyLarge,
          height: 40,
          px: sp.md,
          borderRadius: rd.xl,
          bgcolor: "ds.bg.default",
          color: "ds.text.primary",
          border: error ? `2px solid ${color.border.error}` : "none",
          "& input::placeholder": { color: color.text.tertiary, opacity: 1 },
          "&.Mui-focused": { outline: `2px solid ${color.border.onSurface}`, outlineOffset: "2px" },
        })}
        {...props}
      />
      {error && (
        <Typography
          id={errorId}
          variant="labelMedium"
          sx={{
            mt: sp.xs,
            px: sp.md,
            display: "flex",
            alignItems: "center",
            gap: sp["2xs"],
            color: onDark ? "ds.text.onDark" : "ds.text.error",
          }}
        >
          <ErrorIcon sx={{ fontSize: 16 }} />
          {error}
        </Typography>
      )}
    </Box>
  );
}
