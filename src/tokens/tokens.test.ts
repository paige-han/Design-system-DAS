/**
 * Keeps tokens as the only source of style values.
 * Fails if a component, pattern or page hard-codes a color, or if the theme drops a token.
 * Fix: use a token (sx={{ color: "ds.text.secondary" }}) or add the value to tokens.ts first.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { theme } from "../mui/theme";
import { color, elevation, typography } from "./tokens";

const src = fileURLToPath(new URL("..", import.meta.url));

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? files(full) : /\.tsx?$/.test(name) ? [full] : [];
  });
}

describe("components use tokens only", () => {
  const checked = ["components", "patterns", "pages"].flatMap((d) => files(join(src, d)));

  it.each(checked.map((f) => [f.slice(src.length), f]))("%s has no hard-coded colors", (_name, file) => {
    const code = readFileSync(file, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");
    expect(code.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g) ?? []).toEqual([]);
  });
});

describe("theme carries every token", () => {
  it("palette.ds is the full semantic color set", () => {
    expect(theme.palette.ds).toEqual(color);
  });
  it("shadows 1–4 are Elevation 1–4", () => {
    expect(theme.shadows.slice(1, 5)).toEqual([elevation[1], elevation[2], elevation[3], elevation[4]]);
  });
  it("Figma text styles exist as typography variants", () => {
    const { displaySmall, ...rest } = typography;
    expect(theme.typography.displayMedium).toMatchObject(displaySmall); // Figma Display/Small
    for (const [name, style] of Object.entries(rest)) {
      expect(theme.typography[name as keyof typeof theme.typography]).toMatchObject(style);
    }
  });
});
