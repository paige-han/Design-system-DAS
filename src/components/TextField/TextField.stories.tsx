import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";

const meta = {
  title: "Forms/TextField",
  component: TextField,
  args: { label: "Email address", sx: { width: 400 } },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: "paige@example.org" } };
export const WithHelperText: Story = { args: { helperText: "We'll only use this to reply to you." } };
export const Optional: Story = { args: { label: "Organization", optional: true } };
export const WithError: Story = {
  args: { defaultValue: "paige@", helperText: "We'll only use this to reply to you.", error: "Enter an email address like name@example.org" },
};
export const Multiline: Story = { args: { label: "How can we help?", multiline: true, rows: 5 } };
export const Disabled: Story = { args: { defaultValue: "paige@example.org", disabled: true } };
