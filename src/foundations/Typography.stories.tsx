import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Text, { type TypographyProps } from "@mui/material/Typography";
import { sp } from "../mui/sx";
import { Code, FoundationPage } from "./shared";

const styles: { variant: TypographyProps["variant"]; figma: string; spec: string; use: string }[] = [
  { variant: "displayLarge", figma: "Display/Large", spec: "Oswald Medium 57/72, -0.25", use: "Page heroes" },
  { variant: "displayMedium", figma: "Display/Small", spec: "Oswald Medium 45/60", use: "Smaller heroes (site name: displayMedium)" },
  { variant: "headlineLarge", figma: "Headline/Large", spec: "Oswald Regular 32/48", use: "Section titles" },
  { variant: "headlineMedium", figma: "Headline/Medium", spec: "Oswald Regular 28/40", use: "Footer newsletter title" },
  { variant: "headlineSmall", figma: "Headline/Small", spec: "Oswald Regular 24/36", use: "Sub-sections" },
  { variant: "titleLarge", figma: "Title/Large", spec: "Montserrat SemiBold 22/28", use: "Card titles" },
  { variant: "titleMedium", figma: "Title/Medium", spec: "Montserrat Bold 16/24, 0.15", use: "Small headings" },
  { variant: "bodyLarge", figma: "Body/Large", spec: "Montserrat Medium 16/32, 0.5", use: "Body text, links" },
  { variant: "bodyMedium", figma: "Body/Medium", spec: "Montserrat Medium 14/28, 0.25", use: "Card descriptions" },
  { variant: "labelLarge", figma: "Label/Large", spec: "Montserrat Bold 14/20, 0.1", use: "Buttons, nav links" },
  { variant: "labelLargeSemibold", figma: "(extra)", spec: "Montserrat SemiBold 14/20, 0.1", use: "Chips, badges" },
  { variant: "labelMedium", figma: "Label/Medium", spec: "Montserrat Bold 12/16, 0.5", use: "Meta info, dates" },
  { variant: "labelSmall", figma: "Label/Small", spec: "Montserrat Bold 11/16", use: "Fine print" },
  { variant: "caption", figma: "Caption", spec: "Montserrat Regular 11/16", use: "Credits, captions" },
];

function TypographyPage() {
  return (
    <FoundationPage
      title="Typography"
      intro={
        <>
          One MUI Typography variant per Figma text style, e.g. <Code>{'<Text variant="titleLarge">'}</Code>. Headings use
          Oswald, everything else Montserrat. The site also has displaySmall (36) and bodySmall (12), which aren't in Figma.
        </>
      }
    >
      <div>
        {styles.map((s) => (
          <Box
            key={s.variant}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "260px 1fr" },
              alignItems: "baseline",
              gap: sp.xs,
              borderTop: "1px solid",
              borderColor: "ds.border.subtle",
              py: sp.lg,
            }}
          >
            <div>
              <Text variant="labelLarge" component="p" color="ds.text.primary">
                {s.variant}
              </Text>
              <Text variant="caption" component="p" color="ds.text.tertiary">
                {s.figma} · {s.spec}
              </Text>
              <Text variant="caption" component="p" color="ds.text.tertiary">
                {s.use}
              </Text>
            </div>
            <Text variant={s.variant} component="p" color="ds.text.primary">
              Free tech solutions for nonprofits
            </Text>
          </Box>
        ))}
      </div>
    </FoundationPage>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof TypographyPage>;
export default meta;
export const Typography: StoryObj<typeof meta> = {};
