import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { sp } from "../../mui/sx";
import { TextInput } from "./TextInput";

const meta = {
  title: "Basics/TextInput",
  component: TextInput,
  args: { label: "Email address", placeholder: "email address", sx: { width: 400 } },
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
/** On dark backgrounds the message is light so it stays readable; the icon and border still flag the error. */
export const WithErrorOnDark: Story = {
  args: { defaultValue: "paige@", error: "Enter an email address like name@example.org", onDark: true },
  decorators: [(Story) => <Box sx={{ bgcolor: "ds.bg.brandStrong", p: sp.lg }}><Story /></Box>],
};
