import type { Meta, StoryObj } from "@storybook/react-vite";

/** Reads token values straight from tokens.css, so this page is always up to date. */
function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const roles: { group: string; tokens: [string, string][] }[] = [
  {
    group: "Actions",
    tokens: [
      ["primary", "Main buttons"],
      ["on-primary", "Text on primary"],
      ["accent", "Buttons on dark backgrounds"],
      ["on-accent", "Text on accent"],
      ["elevated", "Elevated button"],
    ],
  },
  {
    group: "Light surfaces",
    tokens: [
      ["surface", "Page background, project card"],
      ["surface-card", "Cards, inputs"],
      ["on-surface", "Main text"],
      ["on-surface-strong", "Card labels"],
      ["on-surface-muted", "Secondary text"],
      ["on-surface-variant", "Chip text"],
      ["placeholder", "Input placeholder"],
      ["outline", "Chip border"],
      ["outline-soft", "Image border"],
    ],
  },
  {
    group: "Dark surfaces",
    tokens: [
      ["surface-dark", "Header"],
      ["surface-darkest", "Footer"],
      ["on-dark", "Text on dark"],
      ["on-dark-soft", "Footer text"],
    ],
  },
  {
    group: "Brand & status",
    tokens: [
      ["brand-leaf", "Logo trees"],
      ["icon-badge", "Icon circle on cards"],
      ["status-active", "Active badge"],
      ["status-evaluating", "Evaluating badge (placeholder)"],
      ["status-complete", "Complete badge"],
    ],
  },
];

const palette: { name: string; steps: string[] }[] = [
  { name: "primary", steps: ["6", "12", "17", "20", "24", "30", "35"] },
  { name: "secondary", steps: ["20", "92", "98"] },
  { name: "tertiary", steps: ["70", "80"] },
  { name: "neutral", steps: ["20", "25", "40", "92", "95", "97", "98", "100"] },
  { name: "error", steps: ["96"] },
];

function Swatch({ token, note }: { token: string; note?: string }) {
  const value = cssVar(`--color-${token}`);
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-12 shrink-0 rounded-sm border border-outline-soft"
        style={{ background: `var(--color-${token})` }}
      />
      <div className="min-w-0">
        <p className="type-label-lg text-on-surface">{token}</p>
        <p className="type-label-sm font-normal text-on-surface-muted">
          {value || "—"}
          {note ? ` · ${note}` : ""}
        </p>
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      <section>
        <h1 className="type-headline-lg text-on-surface">Color roles</h1>
        <p className="type-body-md mb-6 text-on-surface-muted">
          Components use these names only. Change what a role points to in tokens.css.
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <div key={r.group} className="flex flex-col gap-4">
              <h2 className="type-title-md text-on-surface">{r.group}</h2>
              {r.tokens.map(([t, note]) => (
                <Swatch key={t} token={t} note={note} />
              ))}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className="type-headline-lg text-on-surface">Reference palette</h1>
        <p className="type-body-md mb-6 text-on-surface-muted">From Figma "Open Seattle/ref". Roles point to these.</p>
        <div className="flex flex-col gap-6">
          {palette.map((p) => (
            <div key={p.name}>
              <h2 className="type-title-md mb-3 text-on-surface">{p.name}</h2>
              <div className="flex flex-wrap gap-6">
                {p.steps.map((s) => (
                  <Swatch key={s} token={`${p.name}-${s}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
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
