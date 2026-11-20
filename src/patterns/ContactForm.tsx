import { useEffect, useRef, useState, type FormEvent } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CheckboxField } from "../components/CheckboxField";
import { TextField } from "../components/TextField";
import { focusRing, rd, sp } from "../mui/sx";

/**
 * ContactForm: the pattern for any multi-field form (partner request, volunteer interest,
 * contact us). Example content; the live site doesn't have this form yet.
 *
 * On submit with mistakes:
 *   1. An error summary appears at the top, lists every problem, and takes focus,
 *      so screen-reader and keyboard users hear what to fix.
 *   2. Each item links to its field; each field shows its own message.
 * On success the form is replaced by a confirmation that says what happens next.
 */
export interface ContactFormValues {
  name: string;
  email: string;
  organization: string;
  message: string;
  consent: boolean;
}

export interface ContactFormProps {
  onSend: (values: ContactFormValues) => Promise<void>;
}

type Errors = Partial<Record<keyof ContactFormValues, string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: ContactFormValues): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name";
  if (!v.email.trim()) e.email = "Enter your email address";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter an email address like name@example.org";
  if (!v.message.trim()) e.message = "Tell us how we can help";
  if (!v.consent) e.consent = "Check this box so we can reply to you";
  return e;
}

const ids: Record<keyof ContactFormValues, string> = {
  name: "contact-name",
  email: "contact-email",
  organization: "contact-org",
  message: "contact-message",
  consent: "contact-consent",
};

export function ContactForm({ onSend }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>({ name: "", email: "", organization: "", message: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "failed">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  // Bumped on each submit that finds errors; moves focus to the summary right after it renders.
  const [errorSubmits, setErrorSubmits] = useState(0);
  useEffect(() => {
    if (errorSubmits) summaryRef.current?.focus();
  }, [errorSubmits]);

  const set = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setErrorSubmits((n) => n + 1);
      return;
    }
    setStatus("sending");
    try {
      await onSend(values);
      setStatus("success");
    } catch {
      setStatus("failed");
    }
  }

  const formWidth = { width: "100%", maxWidth: 560 };

  if (status === "success") {
    return (
      <Alert severity="success" role="status" sx={formWidth}>
        <AlertTitle>Thanks, we got your message</AlertTitle>A Digital Aid Seattle volunteer will reply to {values.email} within a week.
      </Alert>
    );
  }

  const errorList = Object.entries(errors) as [keyof ContactFormValues, string][];

  return (
    <Box component="form" noValidate onSubmit={submit} sx={{ ...formWidth, display: "flex", flexDirection: "column", gap: sp.lg }}>
      {errorList.length > 0 && (
        <Box
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: sp.xs,
            borderRadius: rd.md,
            borderLeft: "4px solid",
            borderColor: "ds.border.error",
            bgcolor: "ds.bg.errorSubtle",
            p: sp.md,
            ...focusRing(),
          }}
        >
          <Typography id="error-summary-title" variant="titleMedium" component="p" color="ds.text.primary">
            Please fix {errorList.length === 1 ? "this" : `these ${errorList.length} things`}
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: sp.lg, display: "flex", flexDirection: "column", gap: sp["2xs"] }}>
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <Link href={`#${ids[key]}`} variant="bodyMedium" sx={{ color: "ds.text.error", textDecorationColor: "currentColor" }}>
                  {msg}
                </Link>
              </li>
            ))}
          </Box>
        </Box>
      )}
      {status === "failed" && (
        <Alert severity="error">
          <AlertTitle>We couldn't send your message</AlertTitle>
          Something went wrong on our end. Your answers are still here; please try again.
        </Alert>
      )}

      <TextField id={ids.name} label="Name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
      <TextField
        id={ids.email}
        label="Email address"
        type="email"
        autoComplete="email"
        helperText="We'll only use this to reply to you."
        value={values.email}
        onChange={(e) => set("email", e.target.value)}
        error={errors.email}
      />
      <TextField
        id={ids.organization}
        label="Organization"
        optional
        autoComplete="organization"
        value={values.organization}
        onChange={(e) => set("organization", e.target.value)}
      />
      <TextField
        id={ids.message}
        label="How can we help?"
        multiline
        rows={5}
        value={values.message}
        onChange={(e) => set("message", e.target.value)}
        error={errors.message}
      />
      <CheckboxField
        id={ids.consent}
        label="I agree to be contacted about this request"
        checked={values.consent}
        onChange={(e) => set("consent", e.target.checked)}
        error={errors.consent}
      />
      <div>
        <Button type="submit" variant="contained" loading={status === "sending"}>
          Send message
        </Button>
      </div>
    </Box>
  );
}
