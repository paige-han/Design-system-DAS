import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ErrorState, Footer, Header, sp } from "../index";

/** Whole-page errors, with the live site's copy. */
function ErrorPage({ kind }: { kind: "404" | "500" }) {
  return (
    <Box sx={{ bgcolor: "ds.bg.surfaceAlt" }}>
      <Header />
      <main>
        <Box sx={{ bgcolor: "ds.bg.brandStrong", py: sp["3xl"], textAlign: "center" }}>
          <Typography variant="displayLarge" component="h1" color="ds.text.onDark">
            {kind === "404" ? "Page Not Found" : "Oops!"}
          </Typography>
        </Box>
        {kind === "404" ? (
          <ErrorState
            code="404"
            title="We can't find that page"
            description="Unfortunately, the page you are trying to access could not be located. Please return to our home page to continue your journey."
          />
        ) : (
          <ErrorState
            code="500"
            title="System Error"
            description="Something went wrong. Please head back to our home page to continue your journey."
          />
        )}
      </main>
      <Footer />
    </Box>
  );
}

const meta = {
  title: "Pages/Error pages",
  component: ErrorPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof ErrorPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const NotFound404: Story = { args: { kind: "404" }, globals: { viewport: { value: "large" } } };
export const SystemError500: Story = { args: { kind: "500" }, globals: { viewport: { value: "large" } } };
export const NotFoundMobile: Story = { args: { kind: "404" }, globals: { viewport: { value: "small" } } };
