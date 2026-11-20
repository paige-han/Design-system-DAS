import type { Meta, StoryObj } from "@storybook/react-vite";
import { HighlightCard } from "./HighlightCard";

const meta = {
  title: "Cards/HighlightCard",
  component: HighlightCard,
  args: {
    title: "2 Projects Deployed with 4+ Underway",
    description: "Websites, databases, mobile apps, and dashboards built for local nonprofits since 2023.",
    sx: { width: 272 },
  },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof HighlightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
