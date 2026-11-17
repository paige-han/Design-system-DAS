import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { NewsletterForm } from "./NewsletterForm";

const meta = {
  title: "Patterns/Forms/Newsletter sign-up",
  component: NewsletterForm,
  parameters: { layout: "fullscreen" },
  args: { onSubscribe: fn(async () => {}) },
} satisfies Meta<typeof NewsletterForm>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Before anyone types. */
export const Idle: Story = {};

/** Submit with a typo: the message appears under the field. Fixing it clears the message. */
export const InvalidEmail: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const field = c.getByLabelText("Email address");
    await userEvent.type(field, "paige@");
    await userEvent.click(c.getByRole("button", { name: "Sign up" }));
    await expect(c.getByText("Enter an email address like name@example.org")).toBeVisible();
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(args.onSubscribe).not.toHaveBeenCalled();
  },
};

/** Fixing the address removes the error while typing. */
export const ErrorClearsWhenFixed: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const field = c.getByLabelText("Email address");
    await userEvent.click(c.getByRole("button", { name: "Sign up" }));
    await expect(c.getByText("Enter your email address")).toBeVisible();
    await userEvent.type(field, "paige@example.org");
    await expect(c.queryByText(/Enter/)).toBeNull();
  },
};

/** While sending: spinner on the button, the field is locked. */
export const Sending: Story = {
  args: { onSubscribe: fn(() => new Promise<void>(() => {})) },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByLabelText("Email address"), "paige@example.org");
    await userEvent.click(c.getByRole("button", { name: "Sign up" }));
    await expect(c.getByRole("button", { name: "Sign up" })).toHaveAttribute("aria-busy", "true");
  },
};

/** Sent: the form is replaced by a confirmation. */
export const Success: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByLabelText("Email address"), "paige@example.org");
    await userEvent.click(c.getByRole("button", { name: "Sign up" }));
    await expect(await c.findByRole("status")).toHaveTextContent("You're subscribed");
    await expect(args.onSubscribe).toHaveBeenCalledWith("paige@example.org");
  },
};

/** The server failed: an error alert, and what they typed is kept so they can retry. */
export const ServerError: Story = {
  args: { onSubscribe: fn(async () => Promise.reject(new Error("500"))) },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByLabelText("Email address"), "paige@example.org");
    await userEvent.click(c.getByRole("button", { name: "Sign up" }));
    await expect(await c.findByRole("alert")).toHaveTextContent("We couldn't sign you up");
    await expect(c.getByLabelText("Email address")).toHaveValue("paige@example.org");
  },
};

export const Mobile: Story = { globals: { viewport: { value: "small" } } };
