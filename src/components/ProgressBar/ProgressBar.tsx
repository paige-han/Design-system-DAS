/**
 * ProgressBar: a thin bar across the top of the page while a page's data loads.
 * Same job as the site's LinearProgress overlay. For content areas, prefer Skeleton.
 */
export interface ProgressBarProps {
  /** Read by screen readers, e.g. "Loading projects". */
  label?: string;
  className?: string;
}

export function ProgressBar({ label = "Loading", className = "" }: ProgressBarProps) {
  return (
    <div role="progressbar" aria-label={label} className={`relative h-1 w-full overflow-hidden bg-subtle ${className}`}>
      <div className="absolute inset-y-0 w-1/3 bg-action animate-progress motion-reduce:left-0 motion-reduce:w-full motion-reduce:animate-none motion-reduce:opacity-60" />
    </div>
  );
}
