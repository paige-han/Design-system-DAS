import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListItem } from "./ListItem";
import { CampaignIcon, CodeIcon, GroupsIcon, MonitoringIcon } from "../../icons";
import { partnerLogo } from "../../stories/placeholders";

const meta = {
  title: "Basics/ListItem",
  component: ListItem,
  args: { label: "Community Engagement Liaison", icon: <CampaignIcon />, className: "w-[278px]" },
  argTypes: { icon: { control: false } },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "List Item w/ Icon". */
export const WithIcon: Story = {};

/** Figma "List Item w/ Pic". */
export const WithPicture: Story = {
  args: { label: "Apple", icon: undefined, imageSrc: partnerLogo("Partner"), imageAlt: "Apple logo" },
};

/** A grid of roles. 3 columns on Large, 2 on Medium, 1 on Small. */
export const Grid: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ListItem icon={<CampaignIcon />} label="Community Engagement Liaison" />
      <ListItem icon={<CodeIcon />} label="Software Engineer" />
      <ListItem icon={<MonitoringIcon />} label="Data Analyst" />
      <ListItem icon={<GroupsIcon />} label="Project Manager" />
      <ListItem icon={<CampaignIcon />} label="Marketing Lead" />
      <ListItem icon={<CodeIcon />} label="QA Engineer" />
    </div>
  ),
};
