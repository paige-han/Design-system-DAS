# Digital Aid Seattle Design System

A code-first component library for the Digital Aid Seattle website, designed by prompt with Claude Code
and previewed in Storybook.

## Get started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run storybook
```

Storybook opens at http://localhost:6006.

Published Storybook (after GitHub Pages is turned on): https://paige-han.github.io/design-system/

## Where things live

| What | Where |
| --- | --- |
| Design tokens (colors, type, radius, spacing, breakpoints) | `src/tokens/tokens.css` |
| Components | `src/components/<Name>/` |
| Rules Claude follows | `CLAUDE.md` |
| `/new-component` command | `.claude/commands/new-component.md` |

## The loop

1. Keep Storybook running in one window.
2. Open Claude Code in this folder and describe what you want.
3. Watch Storybook update, then refine in words.

Prompts to try first:
- "Add a small size to Button: 32px tall with 16px side padding. Add it to the stories."
- "Add an outline variant to Button for secondary actions on light backgrounds."
- `/new-component Filter chip: a 32px pill toggle with selected and unselected states`
