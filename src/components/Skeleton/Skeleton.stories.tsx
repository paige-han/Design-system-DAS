import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { ProjectCardSkeleton } from "./Skeleton";
import { sp } from "../../mui/sx";

/** MUI Skeleton with the theme's color and gentle pulse (still for people who turn off motion). */
const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Shapes: Story = {
  render: () => (
    <Box sx={{ display: "flex", width: 360, flexDirection: "column", gap: sp.md }}>
      <Skeleton variant="text" width="66%" height={28} />
      <Skeleton variant="text" height={16} />
      <Skeleton variant="text" width="83%" height={16} />
      <Skeleton variant="rounded" height={160} />
      <Skeleton variant="rounded" width={112} height={40} sx={{ borderRadius: "999px" }} />
    </Box>
  ),
};
export const ProjectCardLoading: Story = { render: () => <ProjectCardSkeleton /> };
