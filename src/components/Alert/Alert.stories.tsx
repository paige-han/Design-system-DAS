import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { Button } from "../Button";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  args: { className: "w-[480px]" },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { tone: "success", title: "You're subscribed", children: "Look for our next newsletter in your inbox." },
};
export const Error: Story = {
  args: {
    tone: "error",
    title: "We couldn't sign you up",
    children: "Something went wrong on our end. Please try again in a few minutes.",
    action: <Button variant="outlined">Try again</Button>,
  },
};
export const Info: Story = {
  args: { tone: "info", title: "Applications reopen in January", children: "We review new partner requests twice a year." },
};
