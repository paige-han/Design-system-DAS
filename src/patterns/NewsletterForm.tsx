import { useState, type FormEvent } from "react";
import { Alert, Button, TextInput } from "../index";

/**
 * NewsletterForm: the "Stay Connected!" sign-up from the site footer, with every state.
 *
 *   idle → (Sign up) → invalid email: message under the field, focus stays in the field
 *                    → sending: button spinner, field locked
 *                    → success: the form is replaced by a success message
 *                    → failed: error alert above the form, what they typed is kept
 *
 * Validation runs on submit. After the first error it re-checks as they type, so the
 * message disappears as soon as the address is fixed.
 */
export interface NewsletterFormProps {
  /** Sends the address. Resolve on success, reject on failure. */
  onSubscribe: (email: string) => Promise<void>;
  /** Show the "Stay Connected!" heading. */
  showLabel?: boolean;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "failed";

export function NewsletterForm({ onSubscribe, showLabel = true }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const validate = (value: string) =>
    !value.trim() ? "Enter your email address" : EMAIL.test(value.trim()) ? "" : "Enter an email address like name@example.org";

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    const message = validate(email);
    setError(message);
    if (message) return;
    setStatus("sending");
    try {
      await onSubscribe(email.trim());
      setStatus("success");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="flex flex-col gap-xl bg-brand-strong px-md py-3xl lg:flex-row lg:items-start lg:justify-between lg:px-4xl"
    >
      <div className={showLabel ? "flex flex-col gap-2xs" : "sr-only"}>
        <h2 id="newsletter-heading" className="type-headline-md text-on-dark">
          Stay Connected!
        </h2>
        <p className="type-body-lg text-on-dark">Sign up for our newsletter</p>
      </div>

      {status === "success" ? (
        <Alert tone="success" title="You're subscribed" className="w-full lg:w-[464px]">
          Thanks for signing up. Look for our next newsletter in your inbox.
        </Alert>
      ) : (
        <div className="flex w-full flex-col gap-md lg:w-auto">
          {status === "failed" && (
            <Alert tone="error" title="We couldn't sign you up" className="lg:w-[464px]">
              Something went wrong on our end. Please try again in a few minutes.
            </Alert>
          )}
          <form noValidate onSubmit={submit} className="flex flex-col gap-md md:flex-row md:items-start">
            <TextInput
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched) setError(validate(e.target.value));
              }}
              error={error || undefined}
              onDark
              readOnly={status === "sending"}
              className="w-full md:w-[400px]"
            />
            <Button type="submit" variant="elevated" loading={status === "sending"}>
              Sign up
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}
