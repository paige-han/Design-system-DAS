import type { Meta, StoryObj } from "@storybook/react-vite";

const levels = [
  { cls: "shadow-elevation-1", name: "Elevation 1", use: "Cards" },
  { cls: "shadow-elevation-2", name: "Elevation 2", use: "Hovered cards, menus" },
  { cls: "shadow-elevation-3", name: "Elevation 3", use: "Dialogs, popovers" },
];

function ElevationPage() {
  return (
    <div className="flex flex-col gap-10 p-8">
      <div>
        <h1 className="type-headline-lg text-on-surface">Elevation</h1>
        <p className="type-body-md text-on-surface-muted">Shadows from Figma "Elevation Light" and "Elevation Dark".</p>
      </div>
      <div className="flex flex-wrap gap-10">
        {levels.map((l) => (
          <div key={l.cls} className={`flex size-48 flex-col justify-end rounded-card bg-surface-card p-5 ${l.cls}`}>
            <p className="type-label-lg text-on-surface">{l.name}</p>
            <p className="type-label-sm font-normal text-on-surface-muted">{l.cls}</p>
            <p className="type-label-sm font-normal text-on-surface-muted">{l.use}</p>
          </div>
        ))}
        <div className="flex size-48 flex-col justify-end rounded-card bg-surface-dark p-5">
          <div className="mb-auto flex h-10 items-center justify-center rounded-pill bg-elevated shadow-elevation-dark-2 type-label-lg text-on-elevated">
            Sign up
          </div>
          <p className="type-label-lg text-on-dark">Elevation Dark 2</p>
          <p className="type-label-sm font-normal text-on-dark">shadow-elevation-dark-2</p>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Elevation",
  component: ElevationPage,
  parameters: { layout: "fullscreen" },
  globals: { backgrounds: { value: "surface" } },
  tags: ["!autodocs"],
} satisfies Meta<typeof ElevationPage>;
export default meta;
export const Elevation: StoryObj<typeof meta> = {};
