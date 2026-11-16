import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCard } from "./IconCard";
import { AcuteIcon, LeaderboardIcon, MonitoringIcon } from "../../icons";

const meta = {
  title: "Cards/IconCard",
  component: IconCard,
  args: {
    icon: <LeaderboardIcon />,
    title: "New Skills",
    description: "Gain expertise in tech & digital.",
    className: "w-[272px]",
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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <IconCard icon={<LeaderboardIcon />} title="New Skills" description="Gain expertise in tech & digital." />
      <IconCard icon={<MonitoringIcon />} title="Networking Opportunities" description="Connect with pros & nonprofits." />
      <IconCard icon={<AcuteIcon />} title="Sense of Community" description="Join a supportive, collaborative team." />
    </div>
  ),
};
