import type { Meta, StoryObj } from "@storybook/react-vite";

const radii = [
  ["none", "0px", ""],
  ["xs", "4px", "Checkboxes"],
  ["sm", "8px", "Chips, images, list items"],
  ["md", "12px", "Cards"],
  ["lg", "16px", "Large panels"],
  ["xl", "28px", "Text inputs"],
  ["full", "9999px", "Buttons, badges, icon badges"],
] as const;

function RadiusPage() {
  return (
    <div className="flex flex-col gap-lg p-xl">
      <div>
        <h1 className="type-headline-lg text-primary">Radius</h1>
        <p className="type-body-md text-secondary">
          Class: <code>rounded-md</code>, <code>rounded-full</code> …
        </p>
      </div>
      <div className="flex flex-wrap gap-md">
        {radii.map(([name, px, use]) => (
          <div key={name} className="flex w-30 flex-col gap-xs">
            <div className="h-24 bg-highlight" style={{ borderRadius: `var(--radius-${name})` }} />
            <p className="type-label-md text-primary">rounded-{name}</p>
            <p className="type-caption text-tertiary">
              {px}
              {use ? ` · ${use}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Radius",
  component: RadiusPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof RadiusPage>;
export default meta;
export const Radius: StoryObj<typeof meta> = {};
