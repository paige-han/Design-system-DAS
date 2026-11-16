import type { Meta, StoryObj } from "@storybook/react-vite";

const styles = [
  { cls: "type-display-lg", spec: "Oswald Medium 57 / 72, -0.25", use: "Page heroes" },
  { cls: "type-headline-lg", spec: "Oswald Regular 32 / 48", use: "Section titles" },
  { cls: "type-headline-md", spec: "Oswald Regular 28 / 40", use: "Footer newsletter title" },
  { cls: "type-headline-sm", spec: "Oswald Regular 24 / 36", use: "Sub-sections" },
  { cls: "type-title-lg", spec: "Montserrat SemiBold 22 / 28", use: "Card titles" },
  { cls: "type-title-md", spec: "Montserrat Bold 16 / 24, 0.15", use: "Small headings" },
  { cls: "type-body-lg", spec: "Montserrat Medium 16 / 32, 0.5", use: "Body text, links" },
  { cls: "type-body-md", spec: "Montserrat Medium 14 / 28, 0.25", use: "Card descriptions" },
  { cls: "type-label-lg", spec: "Montserrat Bold 14 / 20, 0.1", use: "Buttons, nav links" },
  { cls: "type-label-lg-semibold", spec: "Montserrat SemiBold 14 / 20, 0.1", use: "Chips, badges" },
  { cls: "type-label-md", spec: "Montserrat Bold 12 / 16, 0.5", use: "Meta info, dates" },
  { cls: "type-label-sm", spec: "Montserrat Bold 11 / 16, 0.5", use: "Credits, fine print" },
];

function TypographyPage() {
  return (
    <div className="flex flex-col gap-2 p-8">
      <h1 className="type-headline-lg text-on-surface">Typography</h1>
      <p className="type-body-md mb-6 text-on-surface-muted">
        Use one class per text style, e.g. <code>className="type-title-lg"</code>. Headings use Oswald, everything else
        Montserrat.
      </p>
      {styles.map((s) => (
        <div
          key={s.cls}
          className="grid grid-cols-1 items-baseline gap-2 border-t border-outline-soft py-5 lg:grid-cols-[260px_1fr]"
        >
          <div>
            <p className="type-label-lg text-on-surface">{s.cls}</p>
            <p className="type-label-sm font-normal text-on-surface-muted">{s.spec}</p>
            <p className="type-label-sm font-normal text-on-surface-muted">{s.use}</p>
          </div>
          <p className={`${s.cls} text-on-surface`}>Digital Aid Seattle builds free tools for nonprofits</p>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof TypographyPage>;
export default meta;
export const Typography: StoryObj<typeof meta> = {};
