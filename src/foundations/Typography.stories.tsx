import type { Meta, StoryObj } from "@storybook/react-vite";

const styles = [
  { cls: "type-display-lg", figma: "Display/Large", spec: "Oswald Medium 57/72, -0.25", use: "Page heroes" },
  { cls: "type-display-sm", figma: "Display/Small", spec: "Oswald Medium 45/60", use: "Smaller heroes" },
  { cls: "type-headline-lg", figma: "Headline/Large", spec: "Oswald Regular 32/48", use: "Section titles" },
  { cls: "type-headline-md", figma: "Headline/Medium", spec: "Oswald Regular 28/40", use: "Footer newsletter title" },
  { cls: "type-headline-sm", figma: "Headline/Small", spec: "Oswald Regular 24/36", use: "Sub-sections" },
  { cls: "type-title-lg", figma: "Title/Large", spec: "Montserrat SemiBold 22/28", use: "Card titles" },
  { cls: "type-title-md", figma: "Title/Medium", spec: "Montserrat Bold 16/24, 0.15", use: "Small headings" },
  { cls: "type-body-lg", figma: "Body/Large", spec: "Montserrat Medium 16/32, 0.5", use: "Body text, links" },
  { cls: "type-body-md", figma: "Body/Medium", spec: "Montserrat Medium 14/28, 0.25", use: "Card descriptions" },
  { cls: "type-label-lg", figma: "Label/Large", spec: "Montserrat Bold 14/20, 0.1", use: "Buttons, nav links" },
  { cls: "type-label-lg-semibold", figma: "(extra)", spec: "Montserrat SemiBold 14/20, 0.1", use: "Chips, badges" },
  { cls: "type-label-md", figma: "Label/Medium", spec: "Montserrat Bold 12/16, 0.5", use: "Meta info, dates" },
  { cls: "type-label-sm", figma: "Label/Small", spec: "Montserrat Bold 11/16", use: "Fine print" },
  { cls: "type-caption", figma: "Caption", spec: "Montserrat Regular 11/16", use: "Credits, captions" },
];

function TypographyPage() {
  return (
    <div className="flex flex-col gap-2xs p-xl">
      <h1 className="type-headline-lg text-primary">Typography</h1>
      <p className="mb-lg type-body-md text-secondary">
        One class per text style, e.g. <code>className="type-title-lg"</code>. Headings use Oswald, everything else
        Montserrat.
      </p>
      {styles.map((s) => (
        <div
          key={s.cls}
          className="grid grid-cols-1 items-baseline gap-xs border-t border-subtle py-lg lg:grid-cols-[260px_1fr]"
        >
          <div>
            <p className="type-label-lg text-primary">{s.cls}</p>
            <p className="type-caption text-tertiary">
              {s.figma} · {s.spec}
            </p>
            <p className="type-caption text-tertiary">{s.use}</p>
          </div>
          <p className={`${s.cls} text-primary`}>Free tech solutions for nonprofits</p>
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
