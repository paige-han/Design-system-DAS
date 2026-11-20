import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ArrowForwardIcon } from "../../icons";
import { sp } from "../../mui/sx";

/**
 * Buttons are plain MUI `<Button>`. Their look comes from the theme, so this is exactly the
 * code to write on the site.
 *
 * | Figma ("Button-dark")        | Code                                              | Use on |
 * | ---                          | ---                                               | --- |
 * | Filled, dark green           | `<Button variant="contained">`                    | light backgrounds |
 * | Filled, yellow               | `<Button variant="contained" color="secondary">`  | dark backgrounds ("Support us") |
 * | Elevated                     | `<Button variant="elevated">`                     | dark backgrounds (footer "Sign up") |
 * | Outlined                     | `<Button variant="outlined">`                     | inside cards ("Learn more") |
 *
 * A link that looks like a button: add `href` and MUI renders an `<a>`.
 * While a form sends: `loading` shows a spinner, blocks clicks and keeps the label.
 */
const meta = {
  title: "Basics/Button",
  component: Button,
  args: { children: "Apply to volunteer", variant: "contained" },
  argTypes: {
    variant: { control: "inline-radio", options: ["contained", "elevated", "outlined"] },
    color: { control: "inline-radio", options: ["primary", "secondary"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const OnDark: Story = {
  args: { color: "secondary", children: "Partner with us" },
  globals: { backgrounds: { value: "dark" } },
};

export const Elevated: Story = {
  args: { variant: "elevated", children: "Sign up" },
  globals: { backgrounds: { value: "dark" } },
};

export const Outlined: Story = {
  args: { variant: "outlined", children: "Learn more →" },
};

export const WithIcon: Story = {
  args: { startIcon: <ArrowForwardIcon />, children: "See projects" },
};

export const AsLink: Story = {
  args: { href: "/volunteer", children: "Volunteer with us" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Submit" },
};

/** While a form is sending: spinner, clicks blocked, label unchanged. */
export const Loading: Story = { args: { loading: true, children: "Sign up" } };

/** Every variant side by side, on the background each is meant for. */
export const AllVariants: Story = {
  parameters: { layout: "fullscreen" },
  render: () => {
    const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: sp.md, p: sp["2xl"] } as const;
    return (
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <Box sx={{ ...row, bgcolor: "ds.bg.default" }}>
          <Button variant="contained">Apply to volunteer</Button>
          <Button variant="contained" startIcon={<ArrowForwardIcon />}>
            See projects
          </Button>
          <Button variant="contained" disabled>
            Submit
          </Button>
          <Button variant="outlined">Learn more →</Button>
        </Box>
        <Box sx={{ ...row, bgcolor: "ds.bg.brandStrong" }}>
          <Button variant="contained" color="secondary">
            Partner with us
          </Button>
          <Button variant="contained" color="secondary" startIcon={<ArrowForwardIcon />}>
            See projects
          </Button>
          <Button variant="contained" color="secondary" disabled>
            Submit
          </Button>
          <Button variant="elevated">Sign up</Button>
        </Box>
      </Box>
    );
  },
};
