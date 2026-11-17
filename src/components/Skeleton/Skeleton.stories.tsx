import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton, ProjectCardSkeleton } from "./Skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  globals: { backgrounds: { value: "surface" } },
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Shapes: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col gap-md">
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton shape="block" className="h-40 w-full" />
      <Skeleton shape="pill" className="h-10 w-28" />
    </div>
  ),
};
export const ProjectCardLoading: Story = { render: () => <ProjectCardSkeleton /> };
