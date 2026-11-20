import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { sp } from "../../mui/sx";
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
    <Box sx={{ display: "flex", gap: sp.md }}>
      <StatusBadge status="Active" />
      <StatusBadge status="Under Evaluation" />
      <StatusBadge status="Completed" />
    </Box>
  ),
};
