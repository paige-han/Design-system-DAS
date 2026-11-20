import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { sp } from "../../mui/sx";
import { VolunteerPositionCard } from "./VolunteerPositionCard";

const meta = {
  title: "Cards/VolunteerPositionCard",
  component: VolunteerPositionCard,
  args: { title: "Grant Writer", sx: { width: 428 } },
  argTypes: { icon: { control: false } },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof VolunteerPositionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Open roles in two columns on Medium and up. */
export const OpenRoles: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: sp.lg }}>
      {["Grant Writer", "UX Designer", "Frontend Engineer", "Volunteer Coordinator"].map((t) => (
        <VolunteerPositionCard key={t} title={t} />
      ))}
    </Box>
  ),
};
