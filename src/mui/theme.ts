/**
 * MUI theme for digitalaidseattle.org, generated from the design-system tokens.
 *
 * Drop-in replacement for `theme/theme.ts` in digital-aid-seattle-website (MUI v6):
 * same breakpoints, same typography variant names, same component overrides and palette
 * shape, so existing pages keep working. Values now come from `src/tokens/tokens.ts`
 * (= Figma Foundations), and a few bugs are fixed. See "For developers / MUI theme"
 * in Storybook for the full list of changes.
 *
 * New code can use every semantic token directly:
 *   sx={{ bgcolor: "ds.bg.brandStrong", color: "ds.text.onDark", p: theme.ds.space.lg + "px" }}
 */
import type { CSSProperties } from "react";
import { createTheme } from "@mui/material/styles";
import { breakpoints, color, elevation, fonts, primitives, radius, spacing, typography } from "../tokens/tokens";

type TypeStyle = CSSProperties;

declare module "@mui/material/styles" {
  interface TypographyVariants {
    displayLarge: TypeStyle;
    displayMedium: TypeStyle;
    displaySmall: TypeStyle;
    headlineLarge: TypeStyle;
    headlineMedium: TypeStyle;
    headlineSmall: TypeStyle;
    titleLarge: TypeStyle;
    titleMedium: TypeStyle;
    titleSmall: TypeStyle;
    labelLarge: TypeStyle;
    labelMedium: TypeStyle;
    labelSmall: TypeStyle;
    bodyLarge: TypeStyle;
    bodyMedium: TypeStyle;
    bodySmall: TypeStyle;
  }
  interface TypographyVariantsOptions {
    displayLarge?: TypeStyle;
    displayMedium?: TypeStyle;
    displaySmall?: TypeStyle;
    headlineLarge?: TypeStyle;
    headlineMedium?: TypeStyle;
    headlineSmall?: TypeStyle;
    titleLarge?: TypeStyle;
    titleMedium?: TypeStyle;
    titleSmall?: TypeStyle;
    labelLarge?: TypeStyle;
    labelMedium?: TypeStyle;
    labelSmall?: TypeStyle;
    bodyLarge?: TypeStyle;
    bodyMedium?: TypeStyle;
    bodySmall?: TypeStyle;
  }
  interface Palette {
    /** All semantic color tokens (Figma color/bg, text, border, icon). */
    ds: typeof color;
  }
  interface PaletteOptions {
    ds?: typeof color;
  }
  interface Theme {
    ds: { space: typeof spacing; radius: typeof radius; elevation: typeof elevation };
  }
  interface ThemeOptions {
    ds?: { space: typeof spacing; radius: typeof radius; elevation: typeof elevation };
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineSmall: true;
    titleLarge: true;
    titleMedium: true;
    titleSmall: true;
    labelLarge: true;
    labelMedium: true;
    labelSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    card: true;
  }
}

const focusRing = { outline: `2px solid ${color.border.brand}`, outlineOffset: 2 };

// Start from MUI's defaults so the 25-step shadow scale exists, then use our Elevation 1–4.
const base = createTheme();
const shadows = [...base.shadows] as typeof base.shadows;
shadows[1] = elevation[1];
shadows[2] = elevation[2];
shadows[3] = elevation[3];
shadows[4] = elevation[4];

export const theme = createTheme({
  breakpoints: {
    // Same as the site today. md (600) and lg (960) match the Figma frames.
    values: { xs: 0, sm: 320, md: breakpoints.md, lg: breakpoints.lg, xl: 1536 },
  },
  shadows,
  palette: {
    mode: "light",
    primary: {
      main: color.bg.brandStrong, // #003029, header / hero green (unchanged)
      light: color.bg.brand, // #005045
      dark: color.bg.action, // #00382F, Figma bg/action
      contrastText: color.text.onAction,
    },
    secondary: {
      main: color.bg.accent, // #F5ED4F
      light: color.bg.accentSubtle, // FIX: was #F5ED4F (same as main), so yellow hovers never changed
      dark: "#d2cb2d", // kept from the current site; not in the Figma guide
      contrastText: color.text.onAccent,
    },
    success: { main: color.bg.action },
    error: { main: color.text.error }, // FIX: was #FF897D (about 2.3:1 on white); now 6.5:1
    background: {
      default: color.bg.surfaceAlt, // #F2F7F7, page background (unchanged)
      paper: color.bg.default,
    },
    text: {
      primary: color.text.primary,
      // COMPAT: the site uses text.secondary for light text on dark backgrounds.
      // Kept that way so nothing breaks; new code should use ds.text.onDark / ds.text.secondary.
      secondary: color.text.onDark,
    },
    divider: color.border.subtle,
    ds: color,
  },
  ds: { space: spacing, radius, elevation },
  typography: {
    fontFamily: fonts.sans,
    button: typography.labelLarge,
    displayLarge: typography.displayLarge,
    displayMedium: typography.displaySmall, // 45/60 = Figma "Display/Small"
    displaySmall: { fontFamily: fonts.display, fontWeight: 500, fontSize: "36px", lineHeight: "48px" }, // site only
    headlineLarge: typography.headlineLarge,
    headlineMedium: typography.headlineMedium,
    headlineSmall: typography.headlineSmall,
    titleLarge: typography.titleLarge,
    titleMedium: typography.titleMedium,
    titleSmall: typography.labelLarge, // site's titleSmall = Label/Large values
    labelLarge: typography.labelLarge,
    labelMedium: typography.labelMedium,
    labelSmall: typography.labelSmall, // letter spacing 0 (Figma); site had 0.5px
    bodyLarge: typography.bodyLarge,
    bodyMedium: typography.bodyMedium,
    bodySmall: { fontFamily: fonts.sans, fontWeight: 500, fontSize: "12px", lineHeight: "24px", letterSpacing: "0.4px" }, // site only
    caption: typography.caption, // Figma "Caption"
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          backgroundColor: color.bg.surface,
          border: `3px solid ${color.border.onSurface}`,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: radius.sm,
          backgroundColor: color.bg.surface,
          border: `2px solid ${color.border.onSurface}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radius.full,
          padding: `10px ${spacing.lg}px`,
          textTransform: "none",
          boxShadow: "none",
          whiteSpace: "nowrap",
          minWidth: "auto",
          "&.Mui-focusVisible": focusRing,
        },
        outlined: {
          borderWidth: 2,
          "&:hover": { borderWidth: 2 },
        },
      },
      variants: [
        {
          props: { variant: "card" },
          style: {
            color: color.text.onAccent, // FIX: was the string "primary.dark", which isn't resolved here
            backgroundColor: color.bg.accent,
            marginTop: "auto",
            "&:hover": { backgroundColor: color.bg.accentSubtle },
          },
        },
      ],
    },
    MuiAccordion: {
      styleOverrides: { root: { boxShadow: "none" } },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: { displayLarge: "h1", displayMedium: "h1" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: radius.sm },
        outlined: {
          color: primitives.neutral[700],
          borderColor: color.border.strong,
          "&:hover": { backgroundColor: color.bg.accentSubtle }, // FIX: was full yellow
        },
        filled: { backgroundColor: color.bg.accent, border: "none" },
      },
    },
    MuiCardActionArea: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: { "&.Mui-focusVisible": focusRing }, // FIX: keyboard focus was invisible
        focusHighlight: { background: "transparent" },
      },
    },
  },
});

export default theme;
