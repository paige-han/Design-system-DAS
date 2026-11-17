import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, Footer, FilterChip, ProjectCard, type ProjectStatus } from "../index";
import { partnerLogo, projectPhoto } from "../stories/placeholders";

const projects: {
  title: string; partner: string; programArea: string; status: ProjectStatus; dates: string; description: string;
  image: string; fit?: "cover";
}[] = [
  { title: "Seattle Humane Society", partner: "City of Bellevue", programArea: "Program Areas", status: "active",
    dates: "Jun 12 – Nov 1", image: partnerLogo("Partner"),
    description: "Founded in 1897, Seattle Humane proudly promotes the human-animal bond by saving and serving pets in need." },
  { title: "CiviForm", partner: "City of Seattle", programArea: "Program Areas", status: "active",
    dates: "Apr 2 – Aug 10", image: partnerLogo("Partner"),
    description: "A simpler way to access government services. CiviForm makes it easier for residents to find and apply for public assistance programs." },
  { title: "The Cadre", partner: "City of Seattle", programArea: "Nonprofit Support", status: "active",
    dates: "Ongoing", image: projectPhoto("Project"), fit: "cover",
    description: "Digital Aid Seattle works with Seattle-based nonprofits to create free digital solutions for their needs." },
  { title: "ClearViction App", partner: "City of Seattle", programArea: "Legal Aid", status: "complete",
    dates: "Jan 1 – Feb 15", image: projectPhoto("Project"), fit: "cover",
    description: "Digital Aid Seattle works with Seattle-based nonprofits to create free digital solutions for their needs." },
];

const statuses: { label: string; value: ProjectStatus }[] = [
  { label: "Active", value: "active" },
  { label: "Evaluating", value: "evaluating" },
  { label: "Complete", value: "complete" },
];

/** An example page built only from design-system components. Filters work. */
function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectStatus[]>([]);
  const toggle = (s: ProjectStatus) =>
    setFilter((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  const visible = filter.length ? projects.filter((p) => filter.includes(p.status)) : projects;

  return (
    <div className="bg-surface">
      <Header activeHref="/projects" />
      <main className="mx-auto flex max-w-content flex-col items-center gap-2xl px-md pt-2xl pb-5xl lg:px-0">
        <h1 className="type-display-lg text-center text-primary">Projects</h1>
        <div className="flex flex-wrap justify-center gap-lg">
          {statuses.map((s) => (
            <FilterChip key={s.value} label={s.label} selected={filter.includes(s.value)} onClick={() => toggle(s.value)} />
          ))}
        </div>
        <h2 className="sr-only">All projects</h2>
        <div className="grid w-full grid-cols-1 justify-items-center gap-xl md:grid-cols-2">
          {visible.map((p) => (
            <ProjectCard key={p.title} {...p} imageSrc={p.image} imageAlt={`${p.title} image`} imageFit={p.fit} />
          ))}
        </div>
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
export const Desktop: StoryObj<typeof meta> = { globals: { viewport: { value: "large" } } };
export const Mobile: StoryObj<typeof meta> = { globals: { viewport: { value: "small" } } };
