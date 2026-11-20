import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { sp, withSx, type Sx } from "../../mui/sx";
import { layout } from "../../tokens/tokens";

/**
 * ErrorState: the body of a whole-page error (404 Page not found, 500 System error).
 * Same content as the site's ErrorComponent: title, explanation, "Back home".
 * The large code replaces the PNG illustration until a new one is designed.
 *
 * Not in the Figma guide yet.
 */
export interface ErrorStateProps {
  /** Large decorative code, e.g. "404". Hidden from screen readers. */
  code?: string;
  title: string;
  description: ReactNode;
  /** Defaults to a "Back home" button linking to "/". */
  action?: ReactNode;
  sx?: Sx;
}

export function ErrorState({ code, title, description, action, sx }: ErrorStateProps) {
  return (
    <Box
      component="section"
      sx={withSx(
        {
          mx: "auto",
          display: "flex",
          width: "100%",
          maxWidth: layout.contentWidth,
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: { lg: "space-between" },
          gap: sp["2xl"],
          px: { xs: sp.md, lg: 0 },
          py: sp["4xl"],
        },
        sx,
      )}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: 418,
          flexDirection: "column",
          alignItems: { xs: "center", lg: "flex-start" },
          gap: sp.xl,
          textAlign: { xs: "center", lg: "left" },
        }}
      >
        <Typography variant="headlineLarge" component="h2" color="ds.text.primary">
          {title}
        </Typography>
        <Typography variant="bodyLarge" color="ds.text.secondary">
          {description}
        </Typography>
        {action ?? (
          <Button variant="contained" href="/">
            Back home
          </Button>
        )}
      </Box>
      {code && (
        <Typography
          aria-hidden="true"
          component="p"
          sx={(t) => ({
            fontFamily: t.typography.displayLarge.fontFamily,
            fontWeight: 500,
            fontSize: { xs: 160, lg: 220 },
            lineHeight: 1,
            userSelect: "none",
            color: "ds.text.brand",
          })}
        >
          {code}
        </Typography>
      )}
    </Box>
  );
}
