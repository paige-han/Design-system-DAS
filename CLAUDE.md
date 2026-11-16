# Digital Aid Seattle Design System: rules for Claude

This repo is the design system for the Digital Aid Seattle website (digitalaidseattle.org). The person working here is a
designer who designs by prompt. Storybook is their canvas. Code is the source of truth, not Figma.

## Stack
- React + TypeScript, Tailwind CSS v4, Storybook (Vite).
- Run Storybook with `npm run storybook` (http://localhost:6006).

## Hard rules
1. **Tokens only.** Every color, font size, radius, shadow and spacing value comes from
   `src/tokens/tokens.css` (exposed as Tailwind classes like `bg-primary`, `rounded-pill`).
   Never hard-code hex values, px sizes or arbitrary Tailwind values like `bg-[#123456]`.
   If a needed value is missing, add a token first and say so in your reply.
2. **Components use role colors** (`primary`, `surface`, `on-surface`, `surface-dark`, `on-dark`,
   `outline`, `status-active`...), never reference colors (`primary-20`, `neutral-95`).
   The full list is in tokens.css and on the Foundations/Colors page.
2b. **Text uses one type class**: `type-display-lg`, `type-headline-lg|md|sm`, `type-title-lg|md`,
   `type-body-lg|md`, `type-label-lg|md|sm`, `type-label-lg-semibold`. Don't combine font-size,
   weight and line-height classes by hand.
2c. **Shadows and shapes**: `shadow-elevation-1|2|3`, `shadow-elevation-dark-2`;
   `rounded-sm` (8), `rounded-card` (12), `rounded-input` (28), `rounded-pill`.
   Desktop content width is `max-w-content` (880px).
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
- Foundations: Colors, Typography, Elevation
- Basics: Button (primary, onDark, elevated, outlined), Logo, TextInput, FilterChip, StatusBadge,
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
- FilterChip selected state, StatusBadge "evaluating" color, Header mobile menu panel
- EventCard mobile layout (currently stacks the image on top)
- LinkedIn URL in the Footer is a guess; confirm the real one

## Figma (optional)
The original style guide is in Figma (file key `vs1l6ERmi4AqYjxBBK9gDJ`; components on page
"Style Guide & Components", current screens on page "Current Prototype"). If the Figma MCP is
connected, you may read a node there to match an existing component exactly, but the result
must still use tokens from this repo.

## After every change
- Make sure `npm run build-storybook` succeeds.
- In your reply, tell the designer which story to look at, and name any token you added.
