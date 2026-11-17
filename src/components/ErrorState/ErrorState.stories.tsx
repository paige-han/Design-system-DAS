import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "Feedback/ErrorState",
  component: ErrorState,
  parameters: { layout: "fullscreen" },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof ErrorState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: {
    code: "404",
    title: "We can't find that page",
    description: "The link may be old, or the page may have moved. Head back to our home page to keep exploring.",
  },
};
export const SystemError: Story = {
  args: { code: "500", title: "System Error", description: "Something went wrong. Please head back to our home page to continue your journey." },
};
