/**
 * ProcessSteps: a numbered list of steps.
 *
 * Figma mapping: "Process Step" (one row each: green 22px number + body/large text),
 * e.g. the "How to volunteer" steps.
 */
export interface ProcessStepsProps {
  steps: string[];
  className?: string;
}

export function ProcessSteps({ steps, className = "" }: ProcessStepsProps) {
  return (
    <ol className={`flex flex-col gap-2 ${className}`}>
      {steps.map((step, i) => (
        <li key={step} className="flex items-baseline">
          <span className="w-10 shrink-0 type-title-lg text-icon" aria-hidden="true">
            {i + 1}.
          </span>
          <span className="type-body-lg text-on-surface">{step}</span>
        </li>
      ))}
    </ol>
  );
}
