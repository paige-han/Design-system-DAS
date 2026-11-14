# Open Seattle Design System: rules for Claude

This repo is the design system for the Open Seattle website. The person working here is a
designer who designs by prompt. Storybook is their canvas. Code is the source of truth, not Figma.

## Stack
- React + TypeScript, Tailwind CSS v4, Storybook (Vite).
- Run Storybook with `npm run storybook` (http://localhost:6006).

## Hard rules
1. **Tokens only.** Every color, font size, radius, shadow and spacing value comes from
   `src/tokens/tokens.css` (exposed as Tailwind classes like `bg-primary`, `rounded-pill`).
   Never hard-code hex values, px sizes or arbitrary Tailwind values like `bg-[#123456]`.
   If a needed value is missing, add a token first and say so in your reply.
2. **Components use role colors** (`primary`, `on-primary`, `accent`, `on-accent`),
   never reference colors (`primary-20`, `secondary-92`).
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

Story titles: `Basics/…` for small pieces (Button, Chip, Icon), `Cards/…` for cards,
`Sections/…` for page sections, `Pages/…` for full pages.

## Naming
- Variant names describe purpose, not looks (`onDark`, not `yellow`).
- Keep the Figma name in the component's doc comment so designers can find it.

## Figma (optional)
The original style guide is in Figma (file key `vs1l6ERmi4AqYjxBBK9gDJ`). If the Figma MCP is
connected, you may read a node there to match an existing component exactly, but the result
must still use tokens from this repo.

## After every change
- Make sure `npm run build-storybook` succeeds.
- In your reply, tell the designer which story to look at, and name any token you added.
