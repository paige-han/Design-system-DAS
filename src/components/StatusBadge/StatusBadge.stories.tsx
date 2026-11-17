import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge } from "./StatusBadge";

const meta = {
  title: "Basics/StatusBadge",
  component: StatusBadge,
  args: { status: "Active" },
  argTypes: { status: { control: "inline-radio", options: ["Active", "Under Evaluation", "Completed"] } },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};
/** CMS value "Under Evaluation", shown as "Evaluating" (same as the live site). */
export const UnderEvaluation: Story = { args: { status: "Under Evaluation" } };
export const Completed: Story = { args: { status: "Completed" } };
export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-md">
      <StatusBadge status="Active" />
      <StatusBadge status="Under Evaluation" />
      <StatusBadge status="Completed" />
    </div>
  ),
};
