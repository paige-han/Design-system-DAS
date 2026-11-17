import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  args: { label: "Send me the Digital Aid Seattle newsletter" },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithError: Story = {
  args: { label: "I agree to be contacted about this request", error: "Check this box so we can reply to you" },
};
export const Disabled: Story = { args: { disabled: true } };
