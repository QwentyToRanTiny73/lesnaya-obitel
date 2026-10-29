// Контраст текста для каждого тона берётся прямо из global.css.
// Если кто-то поменяет цвет и текст станет нечитаемым — сборка упадёт.
import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(import.meta.dir, "../src/styles/global.css"), "utf8");

function luminance(hex: string): number {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function tone(name: string): Record<string, string> {
  const block = css.match(new RegExp(`\\[data-tone="${name}"\\]\\s*\\{([^}]+)\\}`));
  if (!block) throw new Error(`тон ${name} не найден в global.css`);
  return Object.fromEntries([...block[1].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
}

describe("контраст тонов ≥ 4.5:1 (WCAG AA)", () => {
  for (const name of ["ivory", "champagne", "deep"]) {
    const t = tone(name);
    for (const key of ["fg", "fg-muted", "accent"]) {
      it(`${name}: ${key} на фоне`, () => {
        expect(contrast(t[key], t.bg)).toBeGreaterThanOrEqual(4.5);
      });
      it(`${name}: ${key} на приподнятой карточке`, () => {
        expect(contrast(t[key], t.raised)).toBeGreaterThanOrEqual(4.5);
      });
    }
  }
});

describe("кнопки", () => {
  it("тёмный текст на золотой кнопке", () => {
    expect(contrast("#13241b", "#b8925a")).toBeGreaterThanOrEqual(4.5);
  });
  it("светлый текст на тёмной кнопке", () => {
    expect(contrast("#f7f2e9", "#13241b")).toBeGreaterThanOrEqual(4.5);
  });
});
