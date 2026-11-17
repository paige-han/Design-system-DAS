import type { Meta, StoryObj } from "@storybook/react-vite";

const steps = [
  ["2xs", 4],
  ["xs", 8],
  ["sm", 12],
  ["md", 16],
  ["lg", 24],
  ["xl", 32],
  ["2xl", 40],
  ["3xl", 64],
  ["4xl", 80],
  ["5xl", 120],
] as const;

function SpacingPage() {
  return (
    <div className="flex flex-col gap-lg p-xl">
      <div>
        <h1 className="type-headline-lg text-primary">Spacing</h1>
        <p className="type-body-md text-secondary">
          Use the names with any spacing class: <code>p-lg</code>, <code>gap-md</code>, <code>mt-xl</code>. Odd
          one-off values can still use the 4px base unit (<code>gap-1.5</code> = 6px).
        </p>
      </div>
      {steps.map(([name, px]) => (
        <div key={name} className="flex items-center gap-md">
          <p className="w-45 type-label-md text-primary">
            spacing/{name} · {px}px
          </p>
          <div className="h-6 rounded-xs bg-brand" style={{ width: `var(--spacing-${name})` }} />
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Spacing",
  component: SpacingPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof SpacingPage>;
export default meta;
export const Spacing: StoryObj<typeof meta> = {};
