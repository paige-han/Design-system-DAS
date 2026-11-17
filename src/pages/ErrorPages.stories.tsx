import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorState, Footer, Header } from "../index";

/** Whole-page errors, with the live site's copy. */
function ErrorPage({ kind }: { kind: "404" | "500" }) {
  return (
    <div className="bg-surface-alt">
      <Header />
      <main>
        <div className="bg-brand-strong py-3xl text-center">
          <h1 className="type-display-lg text-on-dark">{kind === "404" ? "Page Not Found" : "Oops!"}</h1>
        </div>
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
    </div>
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
