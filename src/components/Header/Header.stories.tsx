import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta = {
  title: "Sections/Header",
  component: Header,
  args: { activeHref: "/projects" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "large" } } };
export const Mobile: Story = { globals: { viewport: { value: "small" } } };
export const MobileMenuOpen: Story = {
  args: { defaultMenuOpen: true },
  globals: { viewport: { value: "small" } },
};
