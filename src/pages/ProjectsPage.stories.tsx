import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  EmptyState,
  ErrorIcon,
  FilterChip,
  Footer,
  Header,
  ProgressBar,
  ProjectCard,
  ProjectCardSkeleton,
  RefreshIcon,
  SearchOffIcon,
  type ProjectStatus,
} from "../index";
import { partnerLogo, projectPhoto } from "../stories/placeholders";

const projects: {
  title: string; partner: string; programArea: string; status: ProjectStatus; dates: string; description: string;
  image: string; fit?: "cover";
}[] = [
  { title: "Seattle Humane Society", partner: "City of Bellevue", programArea: "Program Areas", status: "Active",
    dates: "Jun 12 – Nov 1", image: partnerLogo("Partner"),
    description: "Founded in 1897, Seattle Humane proudly promotes the human-animal bond by saving and serving pets in need." },
  { title: "CiviForm", partner: "City of Seattle", programArea: "Program Areas", status: "Under Evaluation",
    dates: "Apr 2 – Aug 10", image: partnerLogo("Partner"),
    description: "A simpler way to access government services. CiviForm makes it easier for residents to find and apply for public assistance programs." },
  { title: "The Cadre", partner: "City of Seattle", programArea: "Nonprofit Support", status: "Active",
    dates: "Ongoing", image: projectPhoto("Project"), fit: "cover",
    description: "Digital Aid Seattle works with Seattle-based nonprofits to create free digital solutions for their needs." },
  { title: "ClearViction App", partner: "City of Seattle", programArea: "Legal Aid", status: "Completed",
    dates: "Jan 1 – Feb 15", image: projectPhoto("Project"), fit: "cover",
    description: "Digital Aid Seattle works with Seattle-based nonprofits to create free digital solutions for their needs." },
];

const statuses: { label: string; value: ProjectStatus }[] = [
  { label: "Active", value: "Active" },
  { label: "Evaluating", value: "Under Evaluation" },
  { label: "Completed", value: "Completed" },
];

type LoadState = "ready" | "loading" | "error";

interface ProjectsPageProps {
  /** Where loading the projects stands. */
  state?: LoadState;
  /** Filters already selected when the page opens. */
  initialFilter?: ProjectStatus[];
  /** Projects to show (defaults to the sample set). */
  data?: typeof projects;
}

/** An example page built only from design-system components. Filters, "Clear filters" and "Try again" work. */
function ProjectsPage({ state: initialState = "ready", initialFilter = [], data = projects }: ProjectsPageProps) {
  const [filter, setFilter] = useState<ProjectStatus[]>(initialFilter);
  const [state, setState] = useState<LoadState>(initialState);
  const toggle = (s: ProjectStatus) =>
    setFilter((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  const visible = filter.length ? data.filter((p) => filter.includes(p.status)) : data;
  const retry = () => {
    setState("loading");
    setTimeout(() => setState("ready"), 1200);
  };

  return (
    <div className="bg-surface">
      {state === "loading" && <ProgressBar label="Loading projects" className="fixed top-0 z-10" />}
      <Header activeHref="/projects" />
      <main className="mx-auto flex max-w-content flex-col items-center gap-2xl px-md pt-2xl pb-5xl lg:px-0">
        <h1 className="type-display-lg text-center text-primary">Projects</h1>
        <div className="flex flex-wrap justify-center gap-lg">
          {statuses.map((s) => (
            <FilterChip key={s.value} label={s.label} selected={filter.includes(s.value)} onClick={() => toggle(s.value)} />
          ))}
        </div>
        {state === "error" ? (
          <EmptyState
            tone="error"
            icon={<ErrorIcon />}
            title="We couldn't load projects"
            description="Check your connection and try again. If it keeps happening, we're probably fixing it."
            action={
              <Button icon={<RefreshIcon />} onClick={retry}>
                Try again
              </Button>
            }
          />
        ) : state === "loading" ? (
          <>
            <h2 className="sr-only">Loading projects</h2>
            <div className="grid w-full grid-cols-1 justify-items-center gap-xl md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          </>
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<SearchOffIcon />}
            title="No matching projects"
            description="Try removing a filter to see more projects."
            action={
              <Button variant="outlined" onClick={() => setFilter([])}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <h2 className="sr-only">All projects</h2>
            <div className="grid w-full grid-cols-1 justify-items-center gap-xl md:grid-cols-2">
              {visible.map((p) => (
                <ProjectCard key={p.title} {...p} imageSrc={p.image} imageAlt={`${p.title} image`} imageFit={p.fit} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

const meta = {
  title: "Pages/Projects",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
} satisfies Meta<typeof ProjectsPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = { globals: { viewport: { value: "large" } } };
export const Mobile: Story = { globals: { viewport: { value: "small" } } };

/** First load: top progress bar plus card-shaped skeletons. */
export const Loading: Story = { args: { state: "loading" }, globals: { viewport: { value: "large" } } };

/** Filters hide everything. "Clear filters" brings the projects back. */
export const NoMatches: Story = {
  args: { initialFilter: ["Completed"], data: projects.filter((p) => p.status !== "Completed") },
  globals: { viewport: { value: "large" } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByRole("heading", { name: "No matching projects" })).toBeVisible();
    await userEvent.click(c.getByRole("button", { name: "Clear filters" }));
    await expect(c.getAllByRole("article").length).toBeGreaterThan(0);
  },
};

/** Loading failed. "Try again" reloads (simulated). */
export const LoadError: Story = { args: { state: "error" }, globals: { viewport: { value: "large" } } };
