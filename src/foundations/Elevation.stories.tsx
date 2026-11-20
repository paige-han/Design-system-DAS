import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { rd, sp } from "../mui/sx";
import { Code, FoundationPage } from "./shared";

const levels = [
  { level: 1, use: "Cards (MUI Card default)" },
  { level: 2, use: "Hovered cards, menus, volunteer position card" },
  { level: 3, use: "Popovers, raised panels" },
  { level: 4, use: "Dialogs" },
];

const tile = { display: "flex", height: 120, width: 200, flexDirection: "column", justifyContent: "flex-end", borderRadius: rd.md, p: sp.md } as const;

function ElevationPage() {
  return (
    <FoundationPage
      title="Elevation"
      intro={
        <>
          Figma Elevation/1–4 are the theme's shadows 1–4: <Code>{"sx={{ boxShadow: 2 }}"}</Code> or <Code>{"<Card elevation={2}>"}</Code>.
        </>
      }
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: sp["2xl"] }}>
        {levels.map((l) => (
          <Box key={l.level} sx={{ ...tile, bgcolor: "ds.bg.default", boxShadow: l.level }}>
            <Typography variant="labelLarge" component="p" color="ds.text.primary">
              Elevation/{l.level}
            </Typography>
            <Typography variant="caption" component="p" color="ds.text.tertiary">
              boxShadow: {l.level}
            </Typography>
            <Typography variant="caption" component="p" color="ds.text.tertiary">
              {l.use}
            </Typography>
          </Box>
        ))}
        <Box sx={{ ...tile, bgcolor: "ds.bg.brandStrong" }}>
          <Box sx={{ mb: "auto" }}>
            <Button variant="elevated">Sign up</Button>
          </Box>
          <Typography variant="labelLarge" component="p" color="ds.text.onDark">
            Elevation Dark/2 (extra)
          </Typography>
          <Typography variant="caption" component="p" color="ds.text.onDark">
            Button variant="elevated"
          </Typography>
        </Box>
      </Box>
    </FoundationPage>
  );
}

const meta = {
  title: "Foundations/Elevation",
  component: ElevationPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof ElevationPage>;
export default meta;
export const Elevation: StoryObj<typeof meta> = {};
