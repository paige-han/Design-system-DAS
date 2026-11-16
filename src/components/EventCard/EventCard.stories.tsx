import type { Meta, StoryObj } from "@storybook/react-vite";
import { EventCard } from "./EventCard";
import { eventImage } from "../../stories/placeholders";

const meta = {
  title: "Cards/EventCard",
  component: EventCard,
  args: {
    title: "Earth-a-thon",
    date: "March 27, 2023",
    time: "6:00 – 8:00 PM",
    location: "123 ABC Street, Seattle, WA",
    description:
      "Join us in person or online to help research, design and build tech-for-good products for our planet and its people.",
    imageSrc: eventImage("Event"),
    imageAlt: "Earth-a-thon event poster",
    className: "max-w-[880px]",
  },
  parameters: { layout: "padded" },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "small" } } };
