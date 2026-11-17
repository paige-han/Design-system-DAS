/**
 * Design tokens as a JavaScript object, for code that can't read CSS variables
 * (the MUI theme in `src/mui/theme.ts`, charts, emails).
 *
 * Same values as `tokens.css`, same names as the Figma Foundations variables.
 * `tokens.test.ts` fails if this file and `tokens.css` ever disagree, so change both together.
 */

export const primitives = {
  green: {
    50: "#f3fffa",
    400: "#005d51",
    500: "#005045",
    600: "#004138",
    700: "#00382f",
    800: "#003029",
    900: "#00211f",
    950: "#001713",
  },
  lime: { 200: "#b8e97a", 300: "#a6d569", 400: "#8bb950", 600: "#598320" },
  yellow: { 100: "#fffad8", 400: "#f5ed4f" },
  coral: { 400: "#e58a7b", 500: "#cf6f64" },
  red: { 500: "#de3730", 600: "#ba1a1a" },
  neutral: {
    0: "#ffffff",
    50: "#f7fafa",
    100: "#f2f7f7",
    200: "#eaf1f1",
    300: "#d5ddde",
    400: "#bec8c9",
    500: "#6f797a",
    600: "#566061",
    700: "#3f4849",
    800: "#333f40",
    900: "#293233",
    950: "#191c1d",
  },
} as const;

const { green, lime, yellow, red, neutral } = primitives;

export const color = {
  bg: {
    default: neutral[0],
    subtle: green[50],
    surface: neutral[50],
    surfaceAlt: neutral[100],
    brand: green[500],
    brandStrong: green[800],
    inverse: green[900],
    accent: yellow[400],
    accentSubtle: yellow[100],
    highlight: lime[300],
    action: green[700],
    actionPressed: green[400],
    actionOnDark: green[600],
    stateLayer: neutral[500],
    statusActive: yellow[100],
    statusUnderEvaluation: "#ddffaf",
    statusCompleted: "#fff0ee",
  },
  text: {
    primary: green[900],
    secondary: neutral[800],
    tertiary: neutral[600],
    brand: green[500],
    onDark: neutral[50],
    onAccent: green[900],
    error: red[600],
    action: green[700],
    onAction: neutral[0],
  },
  border: {
    default: neutral[400],
    subtle: neutral[200],
    strong: neutral[500],
    brand: green[700],
    onSurface: neutral[0],
    error: red[500],
  },
  icon: {
    default: green[900],
    onDark: neutral[50],
    accent: lime[300],
  },
} as const;

export const spacing = {
  "2xs": 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 64,
  "4xl": 80,
  "5xl": 120,
} as const;

export const radius = { none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 28, full: 9999 } as const;

export const elevation = {
  1: "0 2px 4px 0 #343d3e0a, 0 4px 8px 2px #343d3e0a",
  2: "0 4px 8px 0 #343d3e14, 0 8px 16px 0 #343d3e14",
  3: "0 6px 12px 0 #5660611f, 0 12px 24px 0 #5660611f",
  4: "0 10px 20px 0 #56606133, 0 20px 40px 0 #56606133",
  dark2: "0 4px 8px 0 #00110e14, 0 8px 16px 2px #00110e14",
} as const;

export const breakpoints = { md: 600, lg: 960 } as const;

export const fonts = {
  sans: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  display: '"Oswald", "Montserrat", ui-sans-serif, sans-serif',
} as const;

type TypeStyle = {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};
const t = (family: "sans" | "display", weight: number, size: number, line: number, ls = 0): TypeStyle => ({
  fontFamily: fonts[family],
  fontWeight: weight,
  fontSize: `${size}px`,
  lineHeight: `${line}px`,
  letterSpacing: `${ls}px`,
});

/** Figma text styles (+ two extras the site uses: displayMedium 45 / displaySmall 36 naming, labelLargeSemibold). */
export const typography = {
  displayLarge: t("display", 500, 57, 72, -0.25),
  displaySmall: t("display", 500, 45, 60), // Figma "Display/Small"
  headlineLarge: t("display", 400, 32, 48),
  headlineMedium: t("display", 400, 28, 40),
  headlineSmall: t("display", 400, 24, 36),
  titleLarge: t("sans", 600, 22, 28),
  titleMedium: t("sans", 700, 16, 24, 0.15),
  bodyLarge: t("sans", 500, 16, 32, 0.5),
  bodyMedium: t("sans", 500, 14, 28, 0.25),
  labelLarge: t("sans", 700, 14, 20, 0.1),
  labelLargeSemibold: t("sans", 600, 14, 20, 0.1),
  labelMedium: t("sans", 700, 12, 16, 0.5),
  labelSmall: t("sans", 700, 11, 16, 0),
  caption: t("sans", 400, 11, 16, 0),
} as const;

export const tokens = { primitives, color, spacing, radius, elevation, breakpoints, fonts, typography } as const;
export default tokens;
