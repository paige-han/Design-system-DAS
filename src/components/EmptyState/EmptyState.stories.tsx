import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";
import Button from "@mui/material/Button";
import { EventBusyIcon, MailIcon, RefreshIcon, SearchOffIcon, ErrorIcon } from "../../icons";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Projects page: filters hide everything. */
export const NoMatches: Story = {
  args: {
    icon: <SearchOffIcon />,
    title: "No matching projects",
    description: "Try removing a filter to see more projects.",
    action: <Button variant="outlined">Clear filters</Button>,
  },
};

/** Events page: nothing public is scheduled (copy from the live site). */
export const NoUpcomingEvents: Story = {
  args: {
    icon: <EventBusyIcon />,
    title: "No public events right now",
    description: "All upcoming events are invite-only. Please check back in the future for public events.",
  },
};

/** Newsletters page: the list is empty. */
export const NoNewsletters: Story = {
  args: {
    icon: <MailIcon />,
    title: "No newsletters yet",
    description: "Sign up below and we'll send the first one to your inbox.",
  },
};

/** A section's data failed to load. */
export const LoadError: Story = {
  args: {
    tone: "error",
    icon: <ErrorIcon />,
    title: "We couldn't load projects",
    description: "Check your connection and try again. If it keeps happening, we're probably fixing it.",
    action: (
      <Button variant="contained" startIcon={<RefreshIcon />}>
        Try again
      </Button>
    ),
  },
};
