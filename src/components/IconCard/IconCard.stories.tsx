import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCard } from "./IconCard";
import { CodeIcon, GroupsIcon, MedalIcon } from "../../icons";

const meta = {
  title: "Cards/IconCard",
  component: IconCard,
  args: {
    icon: <MedalIcon />,
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

/** A row of benefit cards, as on the Volunteer page. Stacks on Small. */
export const BenefitsRow: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <IconCard icon={<MedalIcon />} title="New Skills" description="Gain expertise in tech & digital." />
      <IconCard icon={<GroupsIcon />} title="Community" description="Work with people who care about Seattle." />
      <IconCard icon={<CodeIcon />} title="Real Projects" description="Ship tools that nonprofits use every day." />
    </div>
  ),
};
