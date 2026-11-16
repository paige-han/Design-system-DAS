import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProcessSteps } from "./ProcessSteps";

const meta = {
  title: "Basics/ProcessSteps",
  component: ProcessSteps,
  args: {
    steps: [
      "Read our oath, then apply to volunteer using the button below.",
      "Meet with our team to find a project that fits your skills.",
      "Join your project team and start building.",
    ],
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ProcessSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
