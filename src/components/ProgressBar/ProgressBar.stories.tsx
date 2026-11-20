import type { Meta, StoryObj } from "@storybook/react-vite";
import LinearProgress from "@mui/material/LinearProgress";

/**
 * Page loading bar: plain MUI `<LinearProgress>`, styled by the theme (4px, green on light green).
 * Put it at the top of the page while a page's data loads; for content areas prefer Skeleton.
 *   <LinearProgress aria-label="Loading projects" sx={{ position: "fixed", top: 0, left: 0, right: 0 }} />
 */
const meta = {
  title: "Feedback/ProgressBar",
  component: LinearProgress,
  args: { "aria-label": "Loading projects" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LinearProgress>;
export default meta;
export const Indeterminate: StoryObj<typeof meta> = {};
