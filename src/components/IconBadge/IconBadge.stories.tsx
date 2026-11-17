import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconBadge } from "./IconBadge";
import { AcuteIcon, AdminPanelIcon, LeaderboardIcon, MonitoringIcon } from "../../icons";

const meta = {
  title: "Basics/IconBadge",
  component: IconBadge,
  args: { icon: <LeaderboardIcon /> },
  argTypes: { icon: { control: false } },
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllIcons: Story = {
  render: () => (
    <div className="flex gap-lg">
      {[LeaderboardIcon, MonitoringIcon, AcuteIcon, AdminPanelIcon].map((I, i) => (
        <IconBadge key={i} icon={<I />} />
      ))}
    </div>
  ),
};
