import type { ReactNode } from "react";

/**
 * EmptyState: shown where content would be, when there is none or it couldn't load.
 * Always says what happened and what the person can do next.
 *
 *   tone="neutral" → nothing to show (no matches, nothing scheduled)
 *   tone="error"   → this section failed to load; offer "Try again"
 *
 * Not in the Figma guide yet.
 */
export interface EmptyStateProps {
  /** A Material Symbol from src/icons. */
  icon: ReactNode;
  /** Short, plain statement: "No matching projects". */
  title: string;
  /** One or two sentences: why, and what to do. */
  description?: ReactNode;
  /** Button that fixes it: "Clear filters", "Try again". */
  action?: ReactNode;
  tone?: "neutral" | "error";
  /** Heading level for the title, to fit the page outline. */
  headingLevel?: 2 | 3;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  tone = "neutral",
  headingLevel = 2,
  className = "",
}: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={`flex max-w-[480px] flex-col items-center gap-md px-md py-2xl text-center ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex size-16 items-center justify-center rounded-full ${
          tone === "error" ? "bg-error-subtle text-error" : "bg-subtle text-primary"
        }`}
      >
        <span className="size-8">{icon}</span>
      </span>
      <Heading className="type-headline-sm text-primary">{title}</Heading>
      {description && <p className="type-body-lg text-secondary">{description}</p>}
      {action && <div className="mt-xs">{action}</div>}
    </div>
  );
}
