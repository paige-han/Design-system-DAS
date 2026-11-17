import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { theme } from "./theme";

/**
 * The website's real building blocks (MUI v6) rendered with the token-based theme.
 * Use this page to check the theme before swapping it into digital-aid-seattle-website.
 */
function MuiPreview() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", p: 5, display: "flex", flexDirection: "column", gap: 5 }}>
        <Box>
          <Typography variant="headlineLarge" component="h1">
            MUI theme preview
          </Typography>
          <Typography variant="bodyMedium">
            Website components (MUI v6) styled by <code>src/mui/theme.ts</code>, which is generated from the tokens.
          </Typography>
        </Box>

        <Stack gap={1.5} component="section">
          <Typography variant="titleMedium" component="h2">
            Typography variants
          </Typography>
          {(
            [
              "displayLarge",
              "displayMedium",
              "headlineLarge",
              "headlineMedium",
              "titleLarge",
              "titleMedium",
              "bodyLarge",
              "bodyMedium",
              "labelLarge",
              "labelMedium",
              "labelSmall",
              "caption",
            ] as const
          ).map((v) => (
            <Typography key={v} variant={v} component="p">
              {v}: Free tech solutions for nonprofits
            </Typography>
          ))}
        </Stack>

        <Stack gap={1.5} component="section">
          <Typography variant="titleMedium" component="h2">
            Buttons (tab through to see focus)
          </Typography>
          <Stack direction="row" gap={2} flexWrap="wrap" alignItems="center">
            <Button variant="contained">Contained primary</Button>
            <Button variant="contained" color="secondary">
              Contained secondary
            </Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="card">Card variant (hover me)</Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
          </Stack>
        </Stack>

        <Stack gap={1.5} component="section">
          <Typography variant="titleMedium" component="h2">
            Chips (hover the outlined ones)
          </Typography>
          <Stack direction="row" gap={2}>
            <Chip label="Active" variant="outlined" onClick={() => {}} />
            <Chip label="Evaluating" variant="outlined" onClick={() => {}} />
            <Chip label="Selected" onClick={() => {}} />
          </Stack>
        </Stack>

        <Stack gap={1.5} component="section">
          <Typography variant="titleMedium" component="h2">
            Card with action area (tab to it: focus ring is now visible)
          </Typography>
          <Card sx={{ maxWidth: 360 }}>
            <CardActionArea>
              <CardContent>
                <Typography variant="titleLarge" component="h3">
                  Seattle Humane Society
                </Typography>
                <Typography variant="bodyMedium">
                  Founded in 1897, Seattle Humane promotes the human-animal bond.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>

        <Stack gap={1.5} component="section" sx={{ maxWidth: 400 }}>
          <Typography variant="titleMedium" component="h2">
            Form error (new error color passes contrast)
          </Typography>
          <TextField label="Email address" defaultValue="paige@" error helperText="Enter a valid email address" />
        </Stack>

        <Box component="section" sx={{ bgcolor: "ds.bg.brandStrong", p: 3, borderRadius: `${theme.ds.radius.md}px` }}>
          <Typography variant="titleMedium" component="h2" sx={{ color: "ds.text.onDark" }}>
            Semantic tokens in sx: bgcolor "ds.bg.brandStrong", color "ds.text.onDark"
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const meta = {
  title: "For developers/MUI theme preview",
  component: MuiPreview,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof MuiPreview>;
export default meta;
export const Preview: StoryObj<typeof meta> = {};
