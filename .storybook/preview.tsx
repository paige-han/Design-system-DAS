import type { Preview } from "@storybook/react-vite";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import { theme } from "../src/mui/theme";
import { color, fonts } from "../src/tokens/tokens";

/** The same small reset the website gets from its layout; everything else comes from the theme. */
const baseStyles = {
  "*, *::before, *::after": { boxSizing: "border-box" },
  body: { margin: 0, fontFamily: fonts.sans, color: color.text.primary, WebkitFontSmoothing: "antialiased" },
  img: { display: "block", maxWidth: "100%" },
} as const;

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={baseStyles} />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",

    backgrounds: {
      options: {
        light: { name: "White", value: color.bg.default },
        surface: { name: "Surface (page)", value: color.bg.surface },
        dark: { name: "Dark green", value: color.bg.brandStrong },
      },
    },

    viewport: {
      options: {
        small: { name: "Small (mobile)", styles: { width: "375px", height: "800px" } },
        medium: { name: "Medium (tablet)", styles: { width: "768px", height: "1024px" } },
        large: { name: "Large (desktop)", styles: { width: "1280px", height: "900px" } },
      },
    },

    // Every story is checked for accessibility; a violation fails the test run.
    a11y: { test: "error" },
  },
  initialGlobals: { backgrounds: { value: "light" } },
  tags: ["autodocs"],
};
export default preview;
