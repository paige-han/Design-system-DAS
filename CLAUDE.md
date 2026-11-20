# Digital Aid Seattle Design System: rules for Claude

This repo is the design system for the Digital Aid Seattle website (digitalaidseattle.org). The person working here is a
designer who designs by prompt. Storybook is their canvas. Code is the source of truth, not Figma.

## Stack
- React + TypeScript, **MUI v6** (same as the website, digital-aid-seattle-website), Emotion, Storybook (Vite).
- No Tailwind. Style with MUI components and the `sx` prop.
- Run Storybook with `npm run storybook` (http://localhost:6006).

## How styling works
- `src/tokens/tokens.ts` is the **single source** of every style value. Names mirror the Figma
  Foundations variables (Website Prototype file, node 2009:9282): `color/bg/brand` → `color.bg.brand`.
- `src/mui/theme.ts` turns tokens into the MUI theme. The theme also holds the look of every base
  MUI part (Button, Chip, Card, ListItem, form fields, Checkbox, Alert, Skeleton, LinearProgress),
  so plain MUI code looks right on the site with no extra styling.
- Storybook wraps every story in `<ThemeProvider theme={theme}>` (`.storybook/preview.tsx`).

## Hard rules
1. **Tokens only.** Never hard-code a hex color, rgba() or a one-off font style. A unit test
   (`src/tokens/tokens.test.ts`) fails if a file in components/, patterns/ or pages/ contains a color
   literal. If a value is missing, add it to `tokens.ts` first (mark it "Extra" if it isn't in Figma) and say so.
2. **Colors** go through the palette, as strings in `sx`: `bgcolor: "ds.bg.surface"`,
   `color: "ds.text.secondary"`, `borderColor: "ds.border.subtle"`. Groups and names:
   - `ds.bg.*`: default, subtle, surface, surfaceAlt, brand, brandStrong, inverse, accent, accentSubtle,
     highlight, action, actionPressed, actionOnDark, stateLayer (use with `alpha()`), plus extras
     statusActive, statusUnderEvaluation, statusCompleted, successSubtle, errorSubtle.
   - `ds.text.*`: primary, secondary, tertiary, brand, onDark, onAccent, error, action, onAction.
   - `ds.border.*`: default, subtle, strong, brand, onSurface, error.
   - `ds.icon.*`: default, onDark, accent.
   Inside the theme file (where strings aren't resolved), import `color` from tokens.ts.
   Never use primitives (`primitives.green[500]`) in components. Don't use MUI's `text.secondary`:
   on this site it means light text on dark (kept for compatibility); use `ds.text.onDark` or `ds.text.secondary`.
3. **Text** uses one Typography variant: `displayLarge`, `displayMedium` (= Figma Display/Small, 45),
   `headlineLarge|Medium|Small`, `titleLarge|Medium`, `bodyLarge|Medium`, `labelLarge|Medium|Small`,
   `labelLargeSemibold` (extra: chips, badges), `caption`. Set `component` for the right HTML tag
   (`<Typography variant="titleLarge" component="h3">`). Don't set font size/weight/line-height by hand.
4. **Spacing** uses `sp` from `src/mui/sx.ts`: `sx={{ p: sp.lg, gap: sp.md }}`. Scale: 2xs 4, xs 8, sm 12,
   md 16, lg 24, xl 32, 2xl 40 (`sp["2xl"]`), 3xl 64, 4xl 80, 5xl 120. (`sp` converts to MUI's 8px unit.)
5. **Radius** uses `rd`: `borderRadius: rd.md` (none 0, xs 4, sm 8, md 12, lg 16, xl 28, full).
   Never a bare number (MUI multiplies it). **Shadows**: `boxShadow: 1–4` = Figma Elevation 1–4;
   `Card` has Elevation 1 by default. **Content width**: `maxWidth: layout.contentWidth` (880).
6. **Use MUI parts directly** for base pieces, styled by the theme. Don't wrap them or restyle them in sx:
   - Buttons: `<Button variant="contained">` (green), `variant="contained" color="secondary"` (yellow, on dark),
     `variant="elevated"` (on dark), `variant="outlined"`. `href` makes a link; `loading` while sending.
   - `<Alert severity="success|error|info">` + `<AlertTitle>`; pass `role="status"` for success/info.
   - `<Skeleton>`, `<LinearProgress aria-label="…">`, `<Card>`, `<Chip>`, `<IconButton>`.
   If a base part needs a new look, change the theme (a variant or style override), not one usage.
7. **Reuse before you create.** Check `src/components/` and the MUI parts above. Compose new sections and
   pages from what exists. Only create a component when nothing fits, and say why.
8. **Responsive by default.** Small (<600), Medium (600–960), Large (960+). Mobile-first responsive
   values: `sx={{ flexDirection: { xs: "column", md: "row" }, px: { xs: sp.md, lg: 0 } }}`.
9. **Accessible by default.** Semantic HTML (`component="section"`, headings in order), visible focus
   (`...focusRing()` from sx.ts, `focusRing(true)` on dark), contrast of at least 4.5:1, `aria-label` on icon-only
   controls, `visuallyHidden` from `@mui/utils` for screen-reader-only text.

## Component structure
Each component lives in `src/components/<Name>/` with:
- `<Name>.tsx`: the component, built from MUI (`Box`, `Card`, `Typography`, `Button` …), with a doc comment
  that maps it to its Figma name. Accept an optional `sx` prop and merge it with `withSx(ownStyles, sx)`.
- `<Name>.stories.tsx`: one story per variant, plus Disabled/other states, plus an `AllVariants` story.
- `index.ts`: re-exports. Also export it from `src/index.ts`.

Story titles: `Foundations/…`, `Basics/…`, `Forms/…`, `Feedback/…`, `Cards/…`, `Sections/…`,
`Patterns/…`, `Pages/…`, `For developers/…`. Stories for plain MUI parts (Button, Alert, ProgressBar,
Skeleton) show the MUI code to use.

## What exists today
- Foundations: Colors, Typography, Spacing, Radius, Elevation (all read from tokens.ts)
- Basics: Button (MUI), Logo, IconBadge, StatusBadge (CMS values "Active" | "Under Evaluation" | "Completed",
  shown as Active / Evaluating / Completed), FilterChip (MUI Chip; selected = filled yellow + check, as on the site),
  ListItem (MUI ListItem; icon or picture), ProcessSteps, TextInput (footer pill; `onDark` for errors on dark)
- Forms: TextField (label above, helper, error, optional, multiline), CheckboxField
- Feedback: Alert (MUI), ProgressBar (MUI LinearProgress), Skeleton (MUI) + ProjectCardSkeleton,
  EmptyState (neutral or error tone), ErrorState (404/500 page body)
- Cards (all MUI Card): IconCard, FeatureCard, ProjectCard, EventCard, TeamCard, VolunteerPositionCard, HighlightCard
- Sections: Header (desktop + mobile menu), Footer
- Patterns: NewsletterForm, ContactForm (src/patterns/), with "Patterns/Guidelines"
- Pages: Projects (ready, loading, no matches, load error), 404 and 500
- Icons: `src/icons` (Material Symbols Outlined + GitHub + LinkedIn) as MUI SvgIcons:
  `<MedalIcon sx={{ fontSize: 40 }} />`. Add new ones from `@material-symbols/svg-400` the same way.
  Figma layer "monitoring_FILL0_wght400_GRAD0_opsz40" = symbol `monitoring`.

## Forms and states
- Follow "Patterns/Guidelines" in Storybook for validation timing, the error summary, message wording and which
  state component to use.
- Every new form or stateful pattern gets one story per state, with a `play` function that drives it
  (type, click, expect). Those stories run as tests.

## Not designed yet (ask the designer before inventing)
- Header mobile menu panel; EventCard mobile layout (currently stacks the image on top)
- FilterChip selected look follows the live site (filled yellow), not Figma
- LinkedIn URL in the Footer is a guess; confirm the real one
- `text/error` uses an extra `red/600` (#BA1A1A) because the guide's red/500 is 4.47:1 on white. Update Figma to match
- Extras not in Figma yet: status badge colors, successSubtle, errorSubtle, labelLargeSemibold
- Coral primitives exist in the Figma guide but nothing uses them yet; ask what they are for

## Figma (optional)
Token source: Figma "Website Prototype" (file key `V0ljatb5XtWttcwXtFL3mL`), page "Design System",
frame "Foundations". The older style guide: file key `vs1l6ERmi4AqYjxBBK9gDJ`. If the Figma MCP is
connected, you may read a node to match a component exactly, but the result must still use tokens from this repo.

## Testing
- `npm test` runs the tokens-only guard (unit) and renders every story in a real browser (Vitest + Playwright)
  with axe accessibility checks. Accessibility violations FAIL the test (`a11y.test: "error"` in
  `.storybook/preview.tsx`). Fix the cause; don't turn the check off.
- GitHub runs the same tests on every push (`.github/workflows/test.yml`).

## After every change
- Make sure `npm test` and `npm run build-storybook` both succeed.
- In your reply, tell the designer which story to look at, and name any token you added.
