/**
 * MUI theme for digitalaidseattle.org, built from the design-system tokens.
 *
 * Drop-in replacement for `theme/theme.ts` in digital-aid-seattle-website (MUI v6):
 * same breakpoints, typography variant names and palette shape, so existing pages keep working.
 * It also holds the look of every base part (Button, Chip, inputs, Checkbox, Alert, Skeleton,
 * LinearProgress, Card), so plain MUI code on the site matches the design system:
 *
 *   <Button variant="contained">Apply</Button>                 primary green
 *   <Button variant="contained" color="secondary">Support us</Button>   yellow, on dark backgrounds
 *   <Button variant="elevated">Sign up</Button>               green + shadow, on dark backgrounds
 *   <Button variant="outlined">Learn more</Button>             green outline
 *
 * Values come only from `src/tokens/tokens.ts` (= Figma Foundations).
 * See "For developers / MUI theme" in Storybook for what changes on the site.
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
    labelLargeSemibold: TypeStyle;
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
    labelLargeSemibold?: TypeStyle;
    labelMedium?: TypeStyle;
    labelSmall?: TypeStyle;
    bodyLarge?: TypeStyle;
    bodyMedium?: TypeStyle;
    bodySmall?: TypeStyle;
  }
  interface Palette {
    /** All semantic color tokens (Figma color/bg, text, border, icon). In sx: "ds.bg.brand". */
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
    labelLargeSemibold: true;
    labelMedium: true;
    labelSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    /** Green with a soft shadow, for dark backgrounds (footer "Sign up"). */
    elevated: true;
    /** Site-only: yellow button at the bottom of a card. */
    card: true;
  }
}

const px = (n: number) => `${n}px`;
const ring = (c: string) => ({ outline: `2px solid ${c}`, outlineOffset: 2 });
const noMotion = { "@media (prefers-reduced-motion: reduce)": { animation: "none" } };

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
    labelLargeSemibold: typography.labelLargeSemibold, // chips and badges
    labelMedium: typography.labelMedium,
    labelSmall: typography.labelSmall, // letter spacing 0 (Figma); site had 0.5px
    bodyLarge: typography.bodyLarge,
    bodyMedium: typography.bodyMedium,
    bodySmall: { fontFamily: fonts.sans, fontWeight: 500, fontSize: "12px", lineHeight: "24px", letterSpacing: "0.4px" }, // site only
    caption: typography.caption, // Figma "Caption"
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayLarge: "h1",
          displayMedium: "h1",
          headlineLarge: "h2",
          headlineMedium: "h2",
          headlineSmall: "h2",
          titleLarge: "h3",
          titleMedium: "h3",
          bodyLarge: "p",
          bodyMedium: "p",
          labelLarge: "span",
          labelLargeSemibold: "span",
          labelMedium: "span",
          labelSmall: "span",
        },
      },
    },

    /* ---------- Buttons: Figma "Button-dark" (40px tall, pill) ---------- */
    MuiButton: {
      defaultProps: { disableElevation: true, loadingPosition: "start" },
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: radius.full,
          padding: `10px ${px(spacing.lg)}`,
          gap: spacing.xs,
          textTransform: "none",
          boxShadow: "none",
          whiteSpace: "nowrap",
          minWidth: "auto",
          "&.Mui-focusVisible": ring(color.border.brand),
          "&.Mui-disabled": { opacity: 0.4 },
          "& .MuiButton-startIcon": { margin: 0 },
          "& .MuiButton-startIcon > *:nth-of-type(1)": { fontSize: 20 },
        },
        loadingIndicator: { position: "static", transform: "none" },
        loading: { "&.Mui-disabled": { opacity: 1, cursor: "wait" } },
      },
      variants: [
        {
          // Primary: dark green, on light backgrounds
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: color.bg.action,
            color: color.text.onAction,
            "&:hover": { backgroundColor: color.bg.actionPressed, boxShadow: "none" },
            "&.Mui-disabled": { backgroundColor: color.bg.action, color: color.text.onAction },
          },
        },
        {
          // On dark: yellow ("Support us")
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: color.bg.accent,
            color: color.text.onAccent,
            "&:hover": { backgroundColor: `${color.bg.accent}e6`, boxShadow: "none" },
            "&.Mui-focusVisible": ring(color.border.onSurface),
            "&.Mui-disabled": { backgroundColor: color.bg.accent, color: color.text.onAccent },
          },
        },
        {
          props: { variant: "elevated" },
          style: {
            backgroundColor: color.bg.actionOnDark,
            color: color.text.onAction,
            boxShadow: elevation.dark2,
            "&:hover": { backgroundColor: color.bg.actionPressed, boxShadow: elevation.dark2 },
            "&.Mui-focusVisible": ring(color.border.onSurface),
            "&.Mui-disabled": { backgroundColor: color.bg.actionOnDark, color: color.text.onAction },
          },
        },
        {
          // Outlined: green border, smaller label (Figma Volunteer Position "Learn more")
          props: { variant: "outlined" },
          style: {
            ...typography.labelMedium,
            padding: `8px ${px(spacing.lg - 2)}`,
            border: `2px solid ${color.border.brand}`,
            color: color.text.action,
            "&:hover": { border: `2px solid ${color.border.brand}`, backgroundColor: `${color.bg.stateLayer}14` },
            "&.Mui-disabled": { border: `2px solid ${color.border.brand}`, color: color.text.action },
          },
        },
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

    /* ---------- Chips: Figma "Filter chip" (32px, radius sm) ---------- */
    MuiChip: {
      styleOverrides: {
        root: {
          ...typography.labelLargeSemibold,
          height: 32,
          borderRadius: radius.sm,
          paddingInline: spacing.md - 12, // MUI adds 12px inside the label
          "&.Mui-focusVisible": ring(color.border.brand),
          "& .MuiChip-icon": { fontSize: 18, color: color.text.primary, marginLeft: 0, marginRight: -4 },
        },
        outlined: {
          color: color.text.secondary,
          borderColor: color.border.strong,
          "&.MuiChip-clickable:hover": { backgroundColor: color.bg.accentSubtle }, // FIX: was full yellow
        },
        filled: {
          backgroundColor: color.bg.accent,
          color: color.text.onAccent,
          border: "1px solid transparent",
          "&.MuiChip-clickable:hover": { backgroundColor: color.bg.accent },
        },
      },
    },

    /* ---------- Cards and tiles ---------- */
    MuiCard: {
      defaultProps: { elevation: 1 },
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
    MuiCardActionArea: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: { "&.Mui-focusVisible": ring(color.border.brand) }, // FIX: keyboard focus was invisible
        focusHighlight: { background: "transparent" },
      },
    },
    MuiAccordion: {
      styleOverrides: { root: { boxShadow: "none" } },
    },

    /* ---------- Form fields ---------- */
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...typography.labelLarge,
          color: color.text.primary,
          "&.Mui-focused, &.Mui-error, &.Mui-disabled": { color: color.text.primary },
        },
        asterisk: { display: "none" }, // we mark optional fields instead
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...typography.labelMedium,
          margin: 0,
          color: color.text.secondary,
          display: "flex",
          alignItems: "center",
          gap: spacing["2xs"],
          "&.Mui-error": { color: color.text.error },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ...typography.bodyLarge,
          backgroundColor: color.bg.default,
          borderRadius: radius.md,
          color: color.text.primary,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: color.border.default },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: color.border.strong },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: color.border.brand, borderWidth: 2 },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: color.border.error, borderWidth: 2 },
        },
        input: {
          height: 48,
          boxSizing: "border-box",
          padding: `0 ${px(spacing.md)}`,
          "&::placeholder": { color: color.text.tertiary, opacity: 1 },
        },
        multiline: { padding: `${px(spacing.sm)} ${px(spacing.md)}` },
        inputMultiline: { height: "auto", padding: 0 },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: color.border.strong,
          "&.Mui-checked": { color: color.bg.action },
          "&.Mui-focusVisible": ring(color.border.brand),
          "& .MuiSvgIcon-root": { fontSize: 24 },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: { marginLeft: -9, minHeight: 48, gap: spacing["2xs"] },
        label: { ...typography.bodyMedium, color: color.text.primary },
      },
    },

    /* ---------- Feedback ---------- */
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          borderLeft: "4px solid",
          padding: spacing.md,
          gap: spacing.sm,
          ...typography.bodyMedium,
          color: color.text.secondary,
        },
        icon: { padding: 0, marginRight: 0, opacity: 1, fontSize: 24 },
        message: { padding: 0, display: "flex", flexDirection: "column", gap: spacing["2xs"], overflow: "visible" },
        standardSuccess: { backgroundColor: color.bg.successSubtle, borderColor: color.border.brand, "& .MuiAlert-icon": { color: color.text.brand } },
        standardError: { backgroundColor: color.bg.errorSubtle, borderColor: color.border.error, "& .MuiAlert-icon": { color: color.text.error } },
        standardInfo: { backgroundColor: color.bg.surfaceAlt, borderColor: color.border.default, "& .MuiAlert-icon": { color: color.text.primary } },
      },
    },
    MuiAlertTitle: {
      styleOverrides: { root: { ...typography.titleMedium, color: color.text.primary, margin: 0 } },
    },
    MuiSkeleton: {
      defaultProps: { animation: "pulse" },
      styleOverrides: {
        root: { backgroundColor: `${color.bg.stateLayer}29`, ...noMotion },
        text: { borderRadius: radius.xs, transform: "none" },
        rounded: { borderRadius: radius.sm },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 4, backgroundColor: color.bg.subtle },
        bar: { backgroundColor: color.bg.action, ...noMotion },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: { color: "currentColor", ...noMotion },
        // With motion off, show a still three-quarter ring instead of MUI's 1px starting dash.
        circle: { "@media (prefers-reduced-motion: reduce)": { animation: "none", strokeDasharray: "80px, 200px", strokeDashoffset: 0 } },
      },
    },
  },
});

export default theme;
