import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Basics/Logo",
  component: Logo,
  globals: { backgrounds: { value: "dark" } },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBraces: Story = {};
export const WithoutBraces: Story = { args: { braces: false } };
export const Large: Story = { args: { height: 96 } };
