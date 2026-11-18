// Вино, морепродукты и пиво: цены на месте и согласованы между собой.
import { describe, expect, it } from "bun:test";
import wines from "../src/data/wines.json";
import prices from "../src/data/prices.json";

describe("вино", () => {
  const onSale = wines.filter((w) => w.priceBottle !== null);

  it("урожай 2025 — Кокур, Мускат, Розе в продаже", () => {
    expect(onSale.map((w) => w.id)).toEqual(["kokur", "muskat", "roze"]);
  });
  it("у вин в продаже есть крепость, сахар и бокал дешевле бутылки", () => {
    for (const w of onSale) {
      expect(w.alcohol).toBeGreaterThan(0);
      expect(w.sugar).not.toBeNull();
      expect(w.priceGlass!).toBeLessThan(w.priceBottle!);
    }
  });
  it("все вина сухие (сахар до 4 г/л)", () => {
    for (const w of onSale) expect(w.sugar!).toBeLessThanOrEqual(4);
  });
});

describe("морепродукты и пиво", () => {
  it("цены — целые положительные рубли", () => {
    for (const s of [...prices.seafood, ...prices.beer]) {
      expect(Number.isInteger(s.price)).toBe(true);
      expect(s.price).toBeGreaterThan(0);
      expect(s.unit.startsWith("₽/")).toBe(true);
    }
  });
  it("крупная устрица дороже мелкой", () => {
    const [small, big] = prices.seafood.filter((s) => s.item.startsWith("Устрица"));
    expect(big.price).toBeGreaterThan(small.price);
  });
  it("сет «устрицы и вино» не дороже, чем 6 устриц и бокал по отдельности", () => {
    const oyster = prices.seafood.find((s) => s.item.startsWith("Устрица"))!.price;
    const glass = wines.find((w) => w.id === "kokur")!.priceGlass!;
    const set = prices.degustations.find((d) => d.format === "Устрицы и вино")!;
    expect(set.priceMin).toBeLessThanOrEqual(oyster * 6 + glass);
  });
});
