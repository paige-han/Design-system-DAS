import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { color, primitives } from "../tokens/tokens";
import { rd, sp } from "../mui/sx";
import { Code, FoundationPage } from "./shared";

/** What each semantic token is for. Values are read from tokens.ts, so this page always matches the code. */
const usage: Record<string, Record<string, string>> = {
  bg: {
    default: "Cards, inputs",
    subtle: "Light green tint, success alerts",
    surface: "Page background, project cards",
    surfaceAlt: "Page background (site), info alerts",
    brand: "Icon badges",
    brandStrong: "Header, hero",
    inverse: "Footer",
    accent: "Buttons on dark backgrounds, selected chips",
    accentSubtle: "Chip hover, active status",
    highlight: "Lime highlight",
    action: "Primary buttons",
    actionPressed: "Primary button hover / pressed",
    actionOnDark: "Elevated button on dark",
    stateLayer: "Overlays, used with opacity",
    statusActive: "Badge: Active (extra)",
    statusUnderEvaluation: "Badge: Evaluating (extra)",
    statusCompleted: "Badge: Completed (extra)",
    successSubtle: "Success alert (extra)",
    errorSubtle: "Error alert, error summary (extra)",
  },
  text: {
    primary: "Main text",
    secondary: "Labels, supporting text",
    tertiary: "Placeholders, hints",
    brand: "Brand-colored text and icons",
    onDark: "Text on dark backgrounds",
    onAccent: "Text on yellow",
    error: "Error messages (red/600, extra: red/500 fails 4.5:1 on white)",
    action: "Outlined button label",
    onAction: "Text on primary buttons",
  },
  border: {
    default: "Field borders",
    subtle: "Dividers, image frames",
    strong: "Chip outlines, field hover",
    brand: "Focus ring, focused field, outlined button",
    onSurface: "White card edge, focus ring on dark",
    error: "Field in error",
  },
  icon: { default: "Icons on light", onDark: "Icons on dark", accent: "Lime accent icons, logo trees" },
};

const titles: Record<string, string> = { bg: "Background", text: "Text", border: "Border", icon: "Icon" };

function Swatch({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <Box sx={{ display: "flex", width: 196, flexDirection: "column", gap: sp.xs }}>
      <Box sx={{ height: 72, borderRadius: rd.sm, border: "1px solid", borderColor: "ds.border.subtle", bgcolor: value }} />
      <div>
        <Typography variant="labelLarge" component="p" color="ds.text.primary">
          {label}
        </Typography>
        <Typography variant="caption" component="p" color="ds.text.tertiary">
          {value}
          {note ? ` · ${note}` : ""}
        </Typography>
      </div>
    </Box>
  );
}

function ColorsPage() {
  return (
    <FoundationPage
      title="Colour"
      intro={
        <>
          Same names as the Figma Foundations page. Components use the semantic tokens through the theme, e.g.{" "}
          <Code>sx={'{{ bgcolor: "ds.bg.brand", color: "ds.text.onDark" }}'}</Code>. Primitives only define them.
        </>
      }
    >
      {Object.entries(color).map(([group, tokens]) => (
        <Box component="section" key={group} sx={{ display: "flex", flexDirection: "column", gap: sp.md }}>
          <Typography variant="titleMedium" component="h2" color="ds.text.primary">
            {titles[group]}{" "}
            <Typography component="span" variant="caption" color="ds.text.tertiary">
              ds.{group}.…
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: sp.md }}>
            {Object.entries(tokens).map(([name, value]) => (
              <Swatch key={name} value={value} label={`ds.${group}.${name}`} note={usage[group]?.[name]} />
            ))}
          </Box>
        </Box>
      ))}
      <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: sp.md }}>
        <Typography variant="titleMedium" component="h2" color="ds.text.primary">
          Primitives
        </Typography>
        {Object.entries(primitives).map(([family, steps]) => (
          <Box key={family} sx={{ display: "flex", flexWrap: "wrap", gap: sp.md }}>
            {Object.entries(steps).map(([step, value]) => (
              <Swatch key={step} value={value} label={`${family}/${step}`} />
            ))}
          </Box>
        ))}
      </Box>
    </FoundationPage>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorsPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof ColorsPage>;
export default meta;
export const Colors: StoryObj<typeof meta> = {};
