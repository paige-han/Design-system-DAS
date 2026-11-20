import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckboxField } from "./CheckboxField";

const meta = {
  title: "Forms/CheckboxField",
  component: CheckboxField,
  args: { label: "Send me the Digital Aid Seattle newsletter" },
} satisfies Meta<typeof CheckboxField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithError: Story = {
  args: { label: "I agree to be contacted about this request", error: "Check this box so we can reply to you" },
};
export const Disabled: Story = { args: { disabled: true } };
