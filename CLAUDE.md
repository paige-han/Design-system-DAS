# Digital Aid Seattle Design System: rules for Claude

This repo is the design system for the Digital Aid Seattle website (digitalaidseattle.org). The person working here is a
designer who designs by prompt. Storybook is their canvas. Code is the source of truth, not Figma.

## Stack
- React + TypeScript, Tailwind CSS v4, Storybook (Vite).
- Run Storybook with `npm run storybook` (http://localhost:6006).

## Hard rules
1. **Tokens only.** Every color, font size, radius, shadow and spacing value comes from
   `src/tokens/tokens.css`. Token names mirror the Figma variables on the Foundations page
   (Website Prototype file, node 2009:9282). Never hard-code hex values, px sizes or arbitrary
   Tailwind values like `bg-[#123456]`. If a needed value is missing, add a token first and say so.
2. **Colors: semantic classes only.** Figma `color/<group>/<name>` becomes:
   - Background `bg-<name>`: `bg-default`, `bg-subtle`, `bg-surface`, `bg-surface-alt`, `bg-brand`,
     `bg-brand-strong`, `bg-inverse`, `bg-accent`, `bg-accent-subtle`, `bg-highlight`, `bg-action`,
     `bg-action-pressed`, `bg-action-on-dark`, `bg-state-layer/<opacity>` (e.g. `/24`).
   - Text `text-<name>`: `primary`, `secondary`, `tertiary`, `brand`, `on-dark`, `on-accent`,
     `error`, `action`, `on-action`.
   - Border `border-<name>` (focus rings: `outline-<name>`): `default`, `subtle`, `strong`,
     `brand`, `on-surface`, `error`.
   - Icon `icon-<name>` (SVG fill: `fill-<name>`): `default`, `on-dark`, `accent`.
   Never use primitives (`green-500`, `neutral-200`) in components; they only define the tokens.
   Tailwind's default palette is switched off, so `bg-white`, `text-gray-500` etc. don't exist.
   Extras not in the Figma guide (avoid unless needed): `bg-status-active|under-evaluation|completed`.
2b. **Text uses one type class**: `type-display-lg|sm`, `type-headline-lg|md|sm`, `type-title-lg|md`,
   `type-body-lg|md`, `type-label-lg|md|sm`, `type-caption` (+ extra `type-label-lg-semibold`).
   Don't combine font-size, weight and line-height classes by hand.
2c. **Spacing uses the named scale** for padding, margin and gap: `2xs` 4, `xs` 8, `sm` 12, `md` 16,
   `lg` 24, `xl` 32, `2xl` 40, `3xl` 64, `4xl` 80, `5xl` 120 (e.g. `p-lg`, `gap-md`, `mt-xl`).
   Off-scale one-offs may use the 4px base unit (`gap-1.5`). Note: named spacing also applies to
   `w-`/`max-w-` (`max-w-lg` = 24px), so use `max-w-content` or explicit sizes for widths.
2d. **Radius**: `rounded-none|xs|sm|md|lg|xl|full` (0/4/8/12/16/28/9999). Cards `md`, inputs `xl`,
   buttons and badges `full`. **Elevation**: `shadow-elevation-1|2|3|4` (+ extra
   `shadow-elevation-dark-2`). Desktop content width: `max-w-content` (880px).
3. **Reuse before you create.** Before building anything, check `src/components/`. Compose
   new sections and pages from existing components. Only create a new component when nothing
   fits, and say why.
4. **Responsive by default.** Everything must work at Small (<600px), Medium (600–960px) and
   Large (960px+). Write mobile-first: base classes for Small, `md:` for Medium, `lg:` for Large.
5. **Accessible by default.** Use semantic HTML, a visible `focus-visible` style, text contrast of at least
   4.5:1, and an `aria-label` on icon-only controls.

## Component structure
Each component lives in `src/components/<Name>/` with:
- `<Name>.tsx`: the component, with a doc comment that maps it to its Figma name.
- `<Name>.stories.tsx`: one story per variant, plus Disabled/other states, plus an
  `AllVariants` story showing everything side by side.
- `index.ts`: re-exports.

Story titles: `Foundations/…` for tokens, `Basics/…` for small pieces (Button, Chip, Logo),
`Cards/…` for cards, `Sections/…` for page sections (Header, Footer), `Pages/…` for full pages.

Every new component is also exported from `src/index.ts`.

## What exists today
- Foundations: Colors, Typography, Spacing, Radius, Elevation
- Basics: Button (primary, onDark, elevated, outlined), Logo, TextInput (with error state), FilterChip,
  StatusBadge (CMS values "Active" | "Under Evaluation" | "Completed", shown as Active / Evaluating / Completed),
  IconBadge, ListItem (icon or picture), ProcessSteps
- Cards: IconCard (Figma Card 1 w/ Icon, Card 2, Card 3), FeatureCard (Card 1 w Icon LA),
  ProjectCard, EventCard, TeamCard (Card 1 w, Mobile Team Card), VolunteerPositionCard,
  HighlightCard (Figma "Testimonial Card")
- Sections: Header (desktop + mobile menu), Footer
- Pages: Projects (example composed only from the above)
- Icons: `src/icons` (Material Symbols Outlined + GitHub + LinkedIn). Add new ones from
  `@material-symbols/svg-400` the same way. Figma layer names tell you the symbol name,
  e.g. "monitoring_FILL0_wght400_GRAD0_opsz40" = `monitoring`.

## Not designed yet (ask the designer before inventing)
- FilterChip selected state, Header mobile menu panel
- EventCard mobile layout (currently stacks the image on top)
- LinkedIn URL in the Footer is a guess; confirm the real one
- `text/error` uses an extra `red/600` (#BA1A1A) because the guide's red/500 is 4.47:1 on white
  (needs 4.5:1). Update the Figma guide to match, or pick another error text color
- Coral primitives exist in the Figma guide but nothing uses them yet; ask what they are for

## Figma (optional)
Token source: Figma "Website Prototype" (file key `V0ljatb5XtWttcwXtFL3mL`), page "Design System",
frame "Foundations". The older style guide is in Figma (file key `vs1l6ERmi4AqYjxBBK9gDJ`; components on page
"Style Guide & Components", current screens on page "Current Prototype"). If the Figma MCP is
connected, you may read a node there to match an existing component exactly, but the result
must still use tokens from this repo.

## Forms and states
- Forms: TextField (visible label, helper, error, optional, multiline), Checkbox, Button `loading`,
  ButtonLink (button look, renders <a>). TextInput is only the footer pill; pass `onDark` on dark backgrounds.
- Feedback: Alert (success/error/info, stays on the page), Skeleton + ProjectCardSkeleton, ProgressBar,
  EmptyState (neutral or error tone), ErrorState (404/500 page body).
- Patterns live in src/patterns/ (NewsletterForm, ContactForm). Follow "Patterns/Guidelines" in
  Storybook for validation timing, error summary, message wording and which state component to use.
- Every new form or stateful pattern gets one story per state, with a `play` function that drives it
  (type, click, expect). Those stories run as tests.
- Feedback backgrounds `bg-success-subtle` and `bg-error-subtle` are not in the Figma guide yet.

## MUI theme (for the website)
- The website (digital-aid-seattle-website) is built with **MUI v6**, not Tailwind.
  `src/mui/theme.ts` turns our tokens into an MUI theme the site can drop in; see the
  "For developers / MUI theme" page in Storybook.
- `src/tokens/tokens.ts` is the JavaScript copy of `tokens.css`. When you change a token,
  change BOTH files; `src/tokens/tokens.test.ts` fails if they disagree.
- Any new component should be designed so it can be built with MUI (Card, Button, Chip, Box, Stack …).

## Testing
- `npm test` runs the token drift test and renders every story in a real browser (Vitest + Playwright) and runs axe
  accessibility checks. Accessibility violations FAIL the test (`a11y.test: "error"` in
  `.storybook/preview.ts`). Fix the cause (contrast, heading order, labels); don't turn the check off.
- GitHub runs the same tests on every push (`.github/workflows/test.yml`).
- `npm run test:watch` re-runs tests while you work.

## After every change
- Make sure `npm test` and `npm run build-storybook` both succeed.
- In your reply, tell the designer which story to look at, and name any token you added.
