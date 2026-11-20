import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import {
  EmptyState,
  ErrorIcon,
  FilterChip,
  Footer,
  Header,
  layout,
  ProjectCard,
  sp,
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

  const grid = { display: "grid", width: "100%", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, justifyItems: "center", gap: sp.xl } as const;

  return (
    <Box sx={{ bgcolor: "ds.bg.surface" }}>
      {state === "loading" && (
        <LinearProgress aria-label="Loading projects" sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10 }} />
      )}
      <Header activeHref="/projects" />
      <Box
        component="main"
        sx={{
          mx: "auto",
          display: "flex",
          maxWidth: layout.contentWidth,
          flexDirection: "column",
          alignItems: "center",
          gap: sp["2xl"],
          px: { xs: sp.md, lg: 0 },
          pt: sp["2xl"],
          pb: sp["5xl"],
        }}
      >
        <Typography variant="displayLarge" component="h1" color="ds.text.primary" sx={{ textAlign: "center" }}>
          Projects
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: sp.lg }}>
          {statuses.map((s) => (
            <FilterChip key={s.value} label={s.label} selected={filter.includes(s.value)} onClick={() => toggle(s.value)} />
          ))}
        </Box>
        {state === "error" ? (
          <EmptyState
            tone="error"
            icon={<ErrorIcon />}
            title="We couldn't load projects"
            description="Check your connection and try again. If it keeps happening, we're probably fixing it."
            action={
              <Button variant="contained" startIcon={<RefreshIcon />} onClick={retry}>
                Try again
              </Button>
            }
          />
        ) : state === "loading" ? (
          <>
            <Typography variant="headlineSmall" component="h2" sx={visuallyHidden}>
              Loading projects
            </Typography>
            <Box sx={grid}>
              {[0, 1, 2, 3].map((i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </Box>
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
            <Typography variant="headlineSmall" component="h2" sx={visuallyHidden}>
              All projects
            </Typography>
            <Box sx={grid}>
              {visible.map((p) => (
                <ProjectCard key={p.title} {...p} imageSrc={p.image} imageAlt={`${p.title} image`} imageFit={p.fit} />
              ))}
            </Box>
          </>
        )}
      </Box>
      <Footer />
    </Box>
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
