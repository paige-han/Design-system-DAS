import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { spacing } from "../tokens/tokens";
import { rd, sp } from "../mui/sx";
import { Code, FoundationPage } from "./shared";

function SpacingPage() {
  return (
    <FoundationPage
      title="Spacing"
      intro={
        <>
          Use the names through <Code>sp</Code>: <Code>{"sx={{ p: sp.lg, gap: sp.md }}"}</Code>. <Code>sp</Code> converts to MUI's
          8px unit (sp.lg = 3 = 24px), so it mixes with the site's existing <Code>{"sx={{ m: 4 }}"}</Code>.
        </>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: sp.lg }}>
        {Object.entries(spacing).map(([name, px]) => (
          <Box key={name} sx={{ display: "flex", alignItems: "center", gap: sp.md }}>
            <Typography variant="labelMedium" component="p" color="ds.text.primary" sx={{ width: 220 }}>
              spacing/{name} · {px}px · sp["{name}"] = {px / 8}
            </Typography>
            <Box sx={{ height: 24, width: px, borderRadius: rd.xs, bgcolor: "ds.bg.brand" }} />
          </Box>
        ))}
      </Box>
    </FoundationPage>
  );
}

const meta = {
  title: "Foundations/Spacing",
  component: SpacingPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof SpacingPage>;
export default meta;
export const Spacing: StoryObj<typeof meta> = {};
