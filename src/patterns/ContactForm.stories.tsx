import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ContactForm } from "./ContactForm";

const meta = {
  title: "Patterns/Forms/Contact form",
  component: ContactForm,
  args: { onSend: fn(async () => {}) },
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof ContactForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

/** Submit with nothing filled in: summary at the top takes focus, each field shows its message. */
export const ErrorSummary: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole("button", { name: "Send message" }));
    const summary = await c.findByRole("alert");
    await expect(summary).toHaveTextContent("Please fix these 4 things");
    await expect(summary).toHaveFocus();
    await expect(c.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    await expect(c.getByLabelText(/Organization/)).not.toHaveAttribute("aria-invalid");
    await expect(args.onSend).not.toHaveBeenCalled();
  },
};

/** Errors disappear one by one as they're fixed. */
export const FixingErrors: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole("button", { name: "Send message" }));
    await userEvent.type(c.getByLabelText("Name"), "Paige Han");
    await userEvent.type(c.getByLabelText("Email address"), "paige@example.org");
    await expect(c.getByRole("alert")).toHaveTextContent("Please fix these 2 things");
  },
};

async function fillIn(canvasElement: HTMLElement) {
  const c = within(canvasElement);
  await userEvent.type(c.getByLabelText("Name"), "Paige Han");
  await userEvent.type(c.getByLabelText("Email address"), "paige@example.org");
  await userEvent.type(c.getByLabelText("How can we help?"), "Our food bank needs a volunteer sign-up app.");
  await userEvent.click(c.getByLabelText("I agree to be contacted about this request"));
  await userEvent.click(c.getByRole("button", { name: "Send message" }));
  return c;
}

export const Sending: Story = {
  args: { onSend: fn(() => new Promise<void>(() => {})) },
  play: async ({ canvasElement }) => {
    const c = await fillIn(canvasElement);
    const button = c.getByRole("button", { name: "Send message" });
    await expect(button).toBeDisabled();
    await expect(within(button).getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Success: Story = {
  play: async ({ canvasElement, args }) => {
    const c = await fillIn(canvasElement);
    await expect(await c.findByRole("status")).toHaveTextContent("Thanks, we got your message");
    await expect(args.onSend).toHaveBeenCalledOnce();
  },
};

export const ServerError: Story = {
  args: { onSend: fn(async () => Promise.reject(new Error("500"))) },
  play: async ({ canvasElement }) => {
    const c = await fillIn(canvasElement);
    await expect(await c.findByRole("alert")).toHaveTextContent("We couldn't send your message");
    await expect(c.getByLabelText("Name")).toHaveValue("Paige Han");
  },
};
