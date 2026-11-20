import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { sp, withSx, type Sx } from "../../mui/sx";

/**
 * ProcessSteps: a numbered list of steps.
 *
 * Figma mapping: "Process Step" (one row each: green 22px number + body/large text),
 * e.g. the "How to volunteer" steps.
 */
export interface ProcessStepsProps {
  steps: string[];
  sx?: Sx;
}

export function ProcessSteps({ steps, sx }: ProcessStepsProps) {
  return (
    <Box component="ol" sx={withSx({ display: "flex", flexDirection: "column", gap: sp.xs, m: 0, p: 0, listStyle: "none" }, sx)}>
      {steps.map((step, i) => (
        <Box component="li" key={step} sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography variant="titleLarge" component="span" aria-hidden="true" color="ds.text.brand" sx={{ width: 40, flexShrink: 0 }}>
            {i + 1}.
          </Typography>
          <Typography variant="bodyLarge" component="span" color="ds.text.primary">
            {step}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
