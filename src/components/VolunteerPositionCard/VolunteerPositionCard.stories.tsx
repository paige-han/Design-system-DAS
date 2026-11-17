import type { Meta, StoryObj } from "@storybook/react-vite";
import { VolunteerPositionCard } from "./VolunteerPositionCard";

const meta = {
  title: "Cards/VolunteerPositionCard",
  component: VolunteerPositionCard,
  args: { title: "Grant Writer", className: "w-[428px]" },
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
    <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
      {["Grant Writer", "UX Designer", "Frontend Engineer", "Volunteer Coordinator"].map((t) => (
        <VolunteerPositionCard key={t} title={t} />
      ))}
    </div>
  ),
};
