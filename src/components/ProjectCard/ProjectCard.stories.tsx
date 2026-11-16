import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProjectCard } from "./ProjectCard";
import { partnerLogo, projectPhoto } from "../../stories/placeholders";

const meta = {
  title: "Cards/ProjectCard",
  component: ProjectCard,
  args: {
    title: "Seattle Humane Society",
    partner: "City of Bellevue",
    programArea: "Program Areas",
    status: "active",
    dates: "Jun 12 – Nov 1",
    description:
      "Founded in 1897, Seattle Humane proudly promotes the human-animal bond by saving and serving pets in need.",
    imageSrc: partnerLogo("Partner"),
    imageAlt: "Seattle Humane Society logo",
  },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};
export const Complete: Story = {
  args: {
    title: "ClearViction App",
    partner: "City of Seattle",
    programArea: "Legal Aid",
    status: "complete",
    dates: "Jan 1 – Feb 15",
    imageSrc: projectPhoto("Project"),
    imageFit: "cover",
  },
};
