import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const meta = {
  title: "Basics/Button",
  component: Button,
  args: { children: "Apply to volunteer" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "onDark"] },
    icon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const OnDark: Story = {
  args: { variant: "onDark", children: "Partner with us" },
  globals: { backgrounds: { value: "dark" } },
};

export const WithIcon: Story = {
  args: { icon: <PlusIcon />, children: "Add project" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Submit" },
};

/** Every variant side by side, on the background each is meant for. */
export const AllVariants: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-wrap items-center gap-4 bg-white p-10">
        <Button>Apply to volunteer</Button>
        <Button icon={<PlusIcon />}>Add project</Button>
        <Button disabled>Submit</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4 bg-primary p-10">
        <Button variant="onDark">Partner with us</Button>
        <Button variant="onDark" icon={<PlusIcon />}>Add project</Button>
        <Button variant="onDark" disabled>Submit</Button>
      </div>
    </div>
  ),
};
