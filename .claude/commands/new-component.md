Create a new design-system component: $ARGUMENTS

Steps:
1. Read CLAUDE.md and src/tokens/tokens.css. List the existing components in src/components/.
2. If an existing component already covers this, say so and propose a new variant instead.
3. Build the component in src/components/<Name>/ following the structure in CLAUDE.md,
   using only tokens and composing existing components where possible.
4. Write stories: one per variant, the key states, and an AllVariants story.
5. Run `npm run build-storybook` and fix any errors.
6. Reply briefly: what you built, which stories to open, and any tokens you added.
