import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureCard } from "./FeatureCard";
import { AdminPanelIcon } from "../../icons";

const meta = {
  title: "Cards/FeatureCard",
  component: FeatureCard,
  args: {
    icon: <AdminPanelIcon />,
    title: "Internal tools",
    description:
      "Every organization needs infrastructure. Support comes in part from good tooling, and we help design and develop effective tools that help teams thrive. As a bonus, we help teams implement good practices and level up on those tools, too.",
    sx: { maxWidth: 880 },
  },
  argTypes: { icon: { control: false } },
  parameters: { layout: "padded" },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "small" } } };
