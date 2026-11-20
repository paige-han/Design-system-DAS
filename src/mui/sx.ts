/**
 * Helpers for writing token values in MUI `sx`.
 *
 *   sx={{ p: sp.xl, gap: sp.lg, borderRadius: rd.md, bgcolor: "ds.bg.surface", color: "ds.text.primary" }}
 *
 * - `sp` converts our spacing tokens to MUI spacing units (MUI's unit is 8px, so lg 24px → 3).
 *   This keeps code compatible with the site's existing sx={{ m: 4 }} style.
 * - `rd` gives radius tokens as px strings. (A bare number in sx `borderRadius` is multiplied
 *   by MUI's shape.borderRadius, so always use these.)
 * - Colors: use the palette path as a string, "ds.<group>.<name>", e.g. "ds.bg.brandStrong".
 * - Shadows: boxShadow: 1–4 = Elevation 1–4.
 */
import type { SxProps, Theme } from "@mui/material/styles";
import { color, radius, spacing } from "../tokens/tokens";

type SpaceKey = keyof typeof spacing;
type RadiusKey = keyof typeof radius;

export const sp = Object.fromEntries(Object.entries(spacing).map(([k, v]) => [k, v / 8])) as Record<SpaceKey, number>;
export const rd = Object.fromEntries(Object.entries(radius).map(([k, v]) => [k, `${v}px`])) as Record<RadiusKey, string>;

/** Keyboard focus ring. Use `onDark` on dark backgrounds. */
export const focusRing = (onDark = false) => ({
  "&:focus-visible, &.Mui-focusVisible": {
    outline: `2px solid ${onDark ? color.border.onSurface : color.border.brand}`,
    outlineOffset: "2px",
  },
});

/** Stops looping animations for people who turn off motion. */
export const reducedMotion = { "@media (prefers-reduced-motion: reduce)": { animation: "none" } };

/** Lets a component accept an `sx` prop and add it after its own styles. */
export type Sx = SxProps<Theme>;
export const withSx = (own: Sx, extra?: Sx): Sx =>
  [...(Array.isArray(own) ? own : [own]), ...(extra === undefined ? [] : Array.isArray(extra) ? extra : [extra])] as Sx;
