import type { ReactNode } from "react";
import { ButtonLink } from "../Button";

/**
 * ErrorState: the body of a whole-page error (404 Page not found, 500 System error).
 * Same content as the site's ErrorComponent: title, explanation, "Back Home".
 * The large code replaces the PNG illustration until a new one is designed.
 *
 * Not in the Figma guide yet.
 */
export interface ErrorStateProps {
  /** Large decorative code, e.g. "404". Hidden from screen readers. */
  code?: string;
  title: string;
  description: ReactNode;
  /** Defaults to a "Back home" button linking to "/". */
  action?: ReactNode;
  className?: string;
}

export function ErrorState({ code, title, description, action, className = "" }: ErrorStateProps) {
  return (
    <section
      className={`mx-auto flex w-full max-w-content flex-col items-center gap-2xl px-md py-4xl lg:flex-row lg:justify-between lg:px-0 ${className}`}
    >
      <div className="flex max-w-[418px] flex-col items-center gap-xl text-center lg:items-start lg:text-left">
        <h2 className="type-headline-lg text-primary">{title}</h2>
        <p className="type-body-lg text-secondary">{description}</p>
        {action ?? <ButtonLink href="/">Back home</ButtonLink>}
      </div>
      {code && (
        <p aria-hidden="true" className="select-none font-display text-[160px] leading-none font-medium text-brand lg:text-[220px]">
          {code}
        </p>
      )}
    </section>
  );
}
