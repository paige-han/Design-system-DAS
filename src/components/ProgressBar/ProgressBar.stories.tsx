import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Feedback/ProgressBar",
  component: ProgressBar,
  args: { label: "Loading projects" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProgressBar>;
export default meta;
export const Indeterminate: StoryObj<typeof meta> = {};
