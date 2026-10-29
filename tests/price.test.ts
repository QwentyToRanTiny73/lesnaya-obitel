import { describe, expect, it } from "bun:test";
import {
  calculateTotal,
  formatPrice,
  getNights,
  getPricePerNight,
  getSeason,
  minNightsFor,
  parseDate,
  pluralNights,
} from "../src/lib/price";

const d = (s: string) => parseDate(s)!;

describe("сезоны", () => {
  it("июль и август — пик", () => {
    expect(getSeason(d("2026-07-01"))).toBe("peak");
    expect(getSeason(d("2026-08-31"))).toBe("peak");
  });
  it("июнь и сентябрь — сезон", () => {
    expect(getSeason(d("2026-06-15"))).toBe("season");
    expect(getSeason(d("2026-09-30"))).toBe("season");
  });
  it("октябрь — май — несезон", () => {
    expect(getSeason(d("2026-10-01"))).toBe("offseason");
    expect(getSeason(d("2026-05-31"))).toBe("offseason");
  });
});

describe("цена ночи", () => {
  it("берётся из domiki.json", () => {
    expect(getPricePerNight("apartamenty", "peak")).toBe(30000);
    expect(getPricePerNight("domik-6-8", "season")).toBe(17000);
    expect(getPricePerNight("vsya-baza", "offseason")).toBe(150000);
  });
  it("без пикового тарифа действует сезонный", () => {
    expect(getPricePerNight("domik-4", "peak")).toBe(13000);
  });
});

describe("итог", () => {
  it("каждая ночь — по своему сезону (стык июня и июля)", () => {
    // 30 июня — сезон 17 000, 1 июля — пик 20 000
    expect(calculateTotal("domik-6-8", d("2026-06-30"), d("2026-07-02"))).toBe(37000);
  });
  it("3 ночи в пик в апартаментах", () => {
    expect(calculateTotal("apartamenty", d("2026-07-10"), d("2026-07-13"))).toBe(90000);
  });
  it("ночи считаются без сдвига часового пояса", () => {
    expect(getNights(d("2026-03-28"), d("2026-03-30"))).toBe(2);
  });
  it("минимум ночей: вся база — 3, остальное — 2", () => {
    expect(minNightsFor("vsya-baza")).toBe(3);
    expect(minNightsFor("domik-4")).toBe(2);
  });
});

describe("форматирование", () => {
  it("рубли с неразрывными пробелами", () => {
    expect(formatPrice(150000)).toBe("150 000 ₽");
  });
  it("склонение ночей", () => {
    expect([1, 2, 5, 11, 21, 22, 25].map(pluralNights)).toEqual(["ночь", "ночи", "ночей", "ночей", "ночь", "ночи", "ночей"]);
  });
  it("некорректная дата → null", () => {
    expect(parseDate("31.12.2026")).toBeNull();
  });
});
