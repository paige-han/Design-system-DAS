import type { Meta, StoryObj } from "@storybook/react-vite";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { sp } from "../../mui/sx";

/**
 * Alerts are plain MUI `<Alert>` + `<AlertTitle>`, styled by the theme.
 * Use them for the result of something the person did (a form sent or failed).
 * They stay on the page, next to what they're about. (The site's Snackbar vanished after 6s.)
 *
 * Screen readers: MUI gives every Alert role="alert", which interrupts. Pass `role="status"`
 * for success and info so they are announced politely. Put any button inside, below the text.
 */
const meta = {
  title: "Feedback/Alert",
  component: Alert,
  args: { sx: { width: 480 } },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: (args) => (
    <Alert {...args} severity="success" role="status">
      <AlertTitle>You're subscribed</AlertTitle>
      Look for our next newsletter in your inbox.
    </Alert>
  ),
};
export const Error: Story = {
  render: (args) => (
    <Alert {...args} severity="error">
      <AlertTitle>We couldn't sign you up</AlertTitle>
      Something went wrong on our end. Please try again in a few minutes.
      <Box sx={{ mt: sp.xs }}>
        <Button variant="outlined">Try again</Button>
      </Box>
    </Alert>
  ),
};
export const Info: Story = {
  render: (args) => (
    <Alert {...args} severity="info" role="status">
      <AlertTitle>Applications reopen in January</AlertTitle>
      We review new partner requests twice a year.
    </Alert>
  ),
};
