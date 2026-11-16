import type { Preview } from "@storybook/react-vite";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      options: {
        light: { name: "White", value: "#FFFFFF" },
        surface: { name: "Surface (page)", value: "#F7FAFA" },
        dark: { name: "Dark green", value: "#003029" },
      },
    },
    viewport: {
      options: {
        small: { name: "Small (mobile)", styles: { width: "375px", height: "800px" } },
        medium: { name: "Medium (tablet)", styles: { width: "768px", height: "1024px" } },
        large: { name: "Large (desktop)", styles: { width: "1280px", height: "900px" } },
      },
    },
  },
  initialGlobals: { backgrounds: { value: "light" } },
  tags: ["autodocs"],
};
export default preview;
