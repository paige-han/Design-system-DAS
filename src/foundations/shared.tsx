import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { sp } from "../mui/sx";

/** Page frame shared by the Foundations pages. */
export function FoundationPage({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: sp["2xl"], p: sp.xl }}>
      <header>
        <Typography variant="headlineLarge" component="h1" color="ds.text.primary">
          {title}
        </Typography>
        <Typography variant="bodyMedium" color="ds.text.secondary">
          {intro}
        </Typography>
      </header>
      {children}
    </Box>
  );
}

export const Code = ({ children }: { children: ReactNode }) => (
  <Box component="code" sx={{ fontFamily: "ui-monospace, monospace", fontSize: "0.9em" }}>
    {children}
  </Box>
);
