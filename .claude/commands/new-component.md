Create a new design-system component: $ARGUMENTS

Steps:
1. Read CLAUDE.md, src/tokens/tokens.ts and src/mui/theme.ts. List the existing components in src/components/.
2. If an existing component or a plain MUI part (styled by the theme) already covers this, say so and
   propose a new variant instead.
3. Build the component in src/components/<Name>/ following the structure in CLAUDE.md,
   built from MUI (Box, Card, Typography, Button …) with tokens via sx ("ds.*" colors, sp, rd),
   composing existing components where possible.
4. Write stories: one per variant, the key states, and an AllVariants story.
5. Run `npm test` and `npm run build-storybook` and fix any errors.
6. Reply briefly: what you built, which stories to open, and any tokens you added.
