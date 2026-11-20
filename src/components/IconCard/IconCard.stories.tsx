import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { sp } from "../../mui/sx";
import { IconCard } from "./IconCard";
import { AcuteIcon, LeaderboardIcon, MonitoringIcon } from "../../icons";

const meta = {
  title: "Cards/IconCard",
  component: IconCard,
  args: {
    icon: <LeaderboardIcon />,
    title: "New Skills",
    description: "Gain expertise in tech & digital.",
    sx: { width: 272 },
  },
  argTypes: { icon: { control: false } },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof IconCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Figma "Card 1 w/ Icon", "Card 2", "Card 3": the volunteer benefits row. Stacks on Small. */
export const BenefitsRow: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: sp.xl }}>
      <IconCard icon={<LeaderboardIcon />} title="New Skills" description="Gain expertise in tech & digital." />
      <IconCard icon={<MonitoringIcon />} title="Networking Opportunities" description="Connect with pros & nonprofits." />
      <IconCard icon={<AcuteIcon />} title="Sense of Community" description="Join a supportive, collaborative team." />
    </Box>
  ),
};
