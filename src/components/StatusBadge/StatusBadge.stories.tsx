import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge } from "./StatusBadge";

const meta = {
  title: "Basics/StatusBadge",
  component: StatusBadge,
  args: { status: "active" },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};
export const Evaluating: Story = { args: { status: "evaluating" } };
export const Complete: Story = { args: { status: "complete" } };
export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4">
      <StatusBadge status="active" />
      <StatusBadge status="evaluating" />
      <StatusBadge status="complete" />
    </div>
  ),
};
