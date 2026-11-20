import { useState, type FormEvent } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { TextInput } from "../components/TextInput";
import { sp } from "../mui/sx";

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

  const alertWidth = { width: "100%", maxWidth: { lg: 464 } };

  return (
    <Box
      component="section"
      aria-labelledby="newsletter-heading"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { lg: "flex-start" },
        justifyContent: { lg: "space-between" },
        gap: sp.xl,
        bgcolor: "ds.bg.brandStrong",
        px: { xs: sp.md, lg: sp["4xl"] },
        py: sp["3xl"],
      }}
    >
      <Box sx={showLabel ? { display: "flex", flexDirection: "column", gap: sp["2xs"] } : visuallyHidden}>
        <Typography id="newsletter-heading" variant="headlineMedium" component="h2" color="ds.text.onDark">
          Stay Connected!
        </Typography>
        <Typography variant="bodyLarge" color="ds.text.onDark">
          Sign up for our newsletter
        </Typography>
      </Box>

      {status === "success" ? (
        <Alert severity="success" role="status" sx={alertWidth}>
          <AlertTitle>You're subscribed</AlertTitle>
          Thanks for signing up. Look for our next newsletter in your inbox.
        </Alert>
      ) : (
        <Box sx={{ display: "flex", width: { xs: "100%", lg: "auto" }, flexDirection: "column", gap: sp.md }}>
          {status === "failed" && (
            <Alert severity="error" sx={alertWidth}>
              <AlertTitle>We couldn't sign you up</AlertTitle>
              Something went wrong on our end. Please try again in a few minutes.
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={submit}
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "flex-start" }, gap: sp.md }}
          >
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
              sx={{ width: { xs: "100%", md: 400 } }}
            />
            <Button type="submit" variant="elevated" loading={status === "sending"}>
              Sign up
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
