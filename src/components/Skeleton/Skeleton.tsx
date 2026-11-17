/**
 * Skeleton: a grey placeholder shaped like the content that is loading.
 * Use it where content will appear (cards, lists), so the page doesn't jump when it arrives.
 * Pulses gently; stays still for people who turn off motion.
 */
export interface SkeletonProps {
  /** Size and shape with classes, e.g. "h-6 w-3/4" or "aspect-square w-full". */
  className?: string;
  /** "text" lines get small rounding, "block" for images, "pill" for badges and buttons. */
  shape?: "text" | "block" | "pill";
}

const shapes = { text: "rounded-xs", block: "rounded-sm", pill: "rounded-full" };

export function Skeleton({ className = "", shape = "text" }: SkeletonProps) {
  return (
    <div aria-hidden="true" className={`animate-pulse bg-state-layer/16 motion-reduce:animate-none ${shapes[shape]} ${className}`} />
  );
}

/** ProjectCardSkeleton: ProjectCard's layout while projects load. */
export function ProjectCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex w-full max-w-[420px] flex-col gap-5 rounded-md border-3 border-on-surface bg-surface p-xl shadow-elevation-1 ${className}`}
    >
      <Skeleton shape="block" className="aspect-square w-full" />
      <Skeleton className="h-7 w-2/3" />
      <div className="flex items-start justify-between gap-md">
        <div className="flex w-1/2 flex-col gap-md pt-2.5">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton shape="pill" className="h-10 w-24" />
      </div>
      <div className="flex flex-col gap-xs">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
