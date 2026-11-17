import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterChip } from "./FilterChip";

const meta = {
  title: "Basics/FilterChip",
  component: FilterChip,
  args: { label: "Active" },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = { args: { selected: true } };

/** The project status filter from the Projects page. Click to toggle. */
export const StatusFilter: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (s: string) =>
      setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
    return (
      <div className="flex gap-lg">
        {["Active", "Evaluating", "Complete"].map((s) => (
          <FilterChip key={s} label={s} selected={selected.includes(s)} onClick={() => toggle(s)} />
        ))}
      </div>
    );
  },
};
