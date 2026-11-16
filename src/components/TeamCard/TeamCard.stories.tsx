import type { Meta, StoryObj } from "@storybook/react-vite";
import { TeamCard } from "./TeamCard";
import { headshot } from "../../stories/placeholders";

const meta = {
  title: "Cards/TeamCard",
  component: TeamCard,
  args: { name: "Jeffrey", role: "Program Manager", photoSrc: headshot("Photo") },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof TeamCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Card 1 w". */
export const WithPhoto: Story = {};
/** Figma "Mobile Team Card". */
export const NoPhoto: Story = { args: { photoSrc: undefined } };
