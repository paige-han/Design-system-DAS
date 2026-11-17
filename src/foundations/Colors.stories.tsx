import type { Meta, StoryObj } from "@storybook/react-vite";

/** Reads values straight from tokens.css, so this page always matches the code. */
function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

type Group = { title: string; varPrefix: string; usage: string; tokens: [string, string][] };

const semantic: Group[] = [
  {
    title: "Background",
    varPrefix: "--bg-color-",
    usage: "bg-",
    tokens: [
      ["default", "Cards, inputs"],
      ["subtle", "Light green tint"],
      ["surface", "Page background, project cards"],
      ["surface-alt", "Hover on light surfaces"],
      ["brand", "Icon badges"],
      ["brand-strong", "Header, hero"],
      ["inverse", "Footer"],
      ["accent", "Buttons on dark backgrounds"],
      ["accent-subtle", "Selected chips, active status"],
      ["highlight", "Lime highlight"],
      ["action", "Primary buttons"],
      ["action-pressed", "Primary button hover / pressed"],
      ["action-on-dark", "Elevated button on dark"],
      ["state-layer", "Overlays, use with opacity (bg-state-layer/24)"],
    ],
  },
  {
    title: "Text",
    varPrefix: "--text-color-",
    usage: "text-",
    tokens: [
      ["primary", "Main text"],
      ["secondary", "Labels, supporting text"],
      ["tertiary", "Placeholders, hints"],
      ["brand", "Brand-colored text and icons"],
      ["on-dark", "Text on dark backgrounds"],
      ["on-accent", "Text on yellow"],
      ["error", "Error messages"],
      ["action", "Outlined button label"],
      ["on-action", "Text on primary buttons"],
    ],
  },
  {
    title: "Border",
    varPrefix: "--border-color-",
    usage: "border-",
    tokens: [
      ["default", "Default borders"],
      ["subtle", "Dividers, image frames"],
      ["strong", "Chip outlines"],
      ["brand", "Selected / outlined button"],
      ["on-surface", "White card edge, focus ring on dark"],
      ["error", "Field in error"],
    ],
  },
  {
    title: "Icon",
    varPrefix: "--icon-color-",
    usage: "icon-",
    tokens: [
      ["default", "Icons on light"],
      ["on-dark", "Icons on dark"],
      ["accent", "Lime accent icons, logo trees"],
    ],
  },
];

const primitives: { name: string; steps: string[] }[] = [
  { name: "green", steps: ["50", "400", "500", "600", "700", "800", "900", "950"] },
  { name: "lime", steps: ["200", "300", "400", "600"] },
  { name: "yellow", steps: ["100", "400"] },
  { name: "coral", steps: ["400", "500"] },
  { name: "red", steps: ["500"] },
  { name: "neutral", steps: ["0", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] },
];

function Swatch({ cssName, label, note }: { cssName: string; label: string; note?: string }) {
  const value = cssVar(cssName);
  return (
    <div className="flex w-[196px] flex-col gap-xs">
      <div className="h-18 rounded-sm border border-subtle" style={{ background: `var(${cssName})` }} />
      <div>
        <p className="type-label-lg text-primary">{label}</p>
        <p className="type-caption text-tertiary">
          {value || "—"}
          {note ? ` · ${note}` : ""}
        </p>
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <div className="flex flex-col gap-3xl p-xl">
      <header>
        <h1 className="type-headline-lg text-primary">Colour</h1>
        <p className="type-body-md text-secondary">
          Same names as the Figma Foundations page. Components use the semantic tokens; primitives are only for
          defining them.
        </p>
      </header>
      {semantic.map((g) => (
        <section key={g.title} className="flex flex-col gap-md">
          <h2 className="type-title-md text-primary">
            {g.title} <span className="type-caption text-tertiary">class: {g.usage}…</span>
          </h2>
          <div className="flex flex-wrap gap-md">
            {g.tokens.map(([t, note]) => (
              <Swatch key={t} cssName={`${g.varPrefix}${t}`} label={`${g.usage}${t}`} note={note} />
            ))}
          </div>
        </section>
      ))}
      <section className="flex flex-col gap-md">
        <h2 className="type-title-md text-primary">Primitives</h2>
        {primitives.map((p) => (
          <div key={p.name} className="flex flex-wrap gap-md">
            {p.steps.map((s) => (
              <Swatch key={s} cssName={`--color-${p.name}-${s}`} label={`${p.name}/${s}`} />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorsPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof ColorsPage>;
export default meta;
export const Colors: StoryObj<typeof meta> = {};
