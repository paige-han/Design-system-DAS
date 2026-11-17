import type { Meta, StoryObj } from "@storybook/react-vite";

const levels = [
  { cls: "shadow-elevation-1", name: "Elevation/1", use: "Cards" },
  { cls: "shadow-elevation-2", name: "Elevation/2", use: "Hovered cards, menus" },
  { cls: "shadow-elevation-3", name: "Elevation/3", use: "Popovers, raised panels" },
  { cls: "shadow-elevation-4", name: "Elevation/4", use: "Dialogs" },
];

function ElevationPage() {
  return (
    <div className="flex flex-col gap-2xl p-xl">
      <div>
        <h1 className="type-headline-lg text-primary">Elevation</h1>
        <p className="type-body-md text-secondary">Shadows from the Figma Foundations page (Elevation/1–4).</p>
      </div>
      <div className="flex flex-wrap gap-2xl">
        {levels.map((l) => (
          <div key={l.cls} className={`flex h-30 w-50 flex-col justify-end rounded-md bg-default p-md ${l.cls}`}>
            <p className="type-label-lg text-primary">{l.name}</p>
            <p className="type-caption text-tertiary">{l.cls}</p>
            <p className="type-caption text-tertiary">{l.use}</p>
          </div>
        ))}
        <div className="flex h-30 w-50 flex-col justify-end rounded-md bg-brand-strong p-md">
          <div className="mb-auto flex h-10 items-center justify-center rounded-full bg-action-on-dark shadow-elevation-dark-2 type-label-lg text-on-action">
            Sign up
          </div>
          <p className="type-label-lg text-on-dark">Elevation Dark/2 (extra)</p>
          <p className="type-caption text-on-dark">shadow-elevation-dark-2</p>
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
