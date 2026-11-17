import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput } from "./TextInput";

const meta = {
  title: "Basics/TextInput",
  component: TextInput,
  args: { label: "Email address", placeholder: "email address", className: "w-[400px]" },
  globals: { backgrounds: { value: "dark" } },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: "paige@example.org" } };
export const WithError: Story = {
  args: { defaultValue: "paige@", error: "Enter a valid email address" },
  globals: { backgrounds: { value: "light" } },
};
