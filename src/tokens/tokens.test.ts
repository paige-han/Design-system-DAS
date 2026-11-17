/**
 * Guards against drift: tokens.ts (used by the MUI theme) must match tokens.css (used by Storybook).
 * If this fails, update both files to the same value.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { color, elevation, primitives, radius, spacing } from "./tokens";

const css = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");
const vars = new Map<string, string>();
for (const m of css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) vars.set(m[1], m[2].trim());

function resolve(name: string, seen = new Set<string>()): string {
  const raw = vars.get(name);
  if (raw === undefined) throw new Error(`--${name} is missing from tokens.css`);
  const ref = raw.match(/^var\(--([a-z0-9-]+)\)$/);
  if (!ref) return raw.toLowerCase();
  if (seen.has(name)) throw new Error(`circular token --${name}`);
  seen.add(name);
  return resolve(ref[1], seen);
}
const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

describe("tokens.ts matches tokens.css", () => {
  it("primitives", () => {
    for (const [family, steps] of Object.entries(primitives))
      for (const [step, value] of Object.entries(steps))
        expect(resolve(`color-${family}-${step}`), `${family}/${step}`).toBe(value);
  });

  it("semantic colors", () => {
    for (const [group, names] of Object.entries(color))
      for (const [name, value] of Object.entries(names))
        expect(resolve(`${group}-color-${kebab(name)}`), `${group}/${name}`).toBe(value);
  });

  it("spacing", () => {
    for (const [name, px] of Object.entries(spacing)) expect(resolve(`spacing-${name}`)).toBe(`${px}px`);
  });

  it("radius", () => {
    for (const [name, px] of Object.entries(radius)) expect(resolve(`radius-${name}`)).toBe(`${px}px`);
  });

  it("elevation", () => {
    for (const [name, value] of Object.entries(elevation)) {
      const cssName = name === "dark2" ? "shadow-elevation-dark-2" : `shadow-elevation-${name}`;
      expect(resolve(cssName)).toBe(value);
    }
  });
});
