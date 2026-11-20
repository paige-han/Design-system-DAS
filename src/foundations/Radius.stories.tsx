import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { radius } from "../tokens/tokens";
import { rd, sp } from "../mui/sx";
import { Code, FoundationPage } from "./shared";

const use: Record<string, string> = {
  none: "Full-bleed images",
  xs: "Small tags, skeleton lines",
  sm: "List items, chips, image frames",
  md: "Cards, fields, alerts",
  lg: "Large panels",
  xl: "Footer email field",
  full: "Buttons, badges, nav pills",
};

function RadiusPage() {
  return (
    <FoundationPage
      title="Radius"
      intro={
        <>
          Use <Code>{"sx={{ borderRadius: rd.md }}"}</Code>. A bare number in sx is multiplied by MUI's base radius, so always use{" "}
          <Code>rd</Code>.
        </>
      }
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: sp.xl }}>
        {Object.entries(radius).map(([name, px]) => (
          <Box key={name} sx={{ display: "flex", width: 160, flexDirection: "column", gap: sp.xs }}>
            <Box sx={{ height: 96, borderRadius: rd[name as keyof typeof rd], bgcolor: "ds.bg.brand" }} />
            <Typography variant="labelLarge" component="p" color="ds.text.primary">
              radius/{name} · {px === 9999 ? "full" : `${px}px`}
            </Typography>
            <Typography variant="caption" component="p" color="ds.text.tertiary">
              {use[name]}
            </Typography>
          </Box>
        ))}
      </Box>
    </FoundationPage>
  );
}

const meta = {
  title: "Foundations/Radius",
  component: RadiusPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof RadiusPage>;
export default meta;
export const Radius: StoryObj<typeof meta> = {};
