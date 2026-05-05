import { describe, it, expect } from "bun:test";
import {
  getSeason,
  getPricePerNight,
  calculateTotalPrice,
  getNights,
  formatPrice,
} from "@/lib/utils/price";

describe("price utils", () => {
  describe("getSeason", () => {
    it("определяет июль и август как пик", () => {
      expect(getSeason(new Date("2025-07-15"))).toBe("peak");
      expect(getSeason(new Date("2025-08-01"))).toBe("peak");
    });
    it("определяет июнь и сентябрь как сезон", () => {
      expect(getSeason(new Date("2025-06-10"))).toBe("season");
      expect(getSeason(new Date("2025-09-30"))).toBe("season");
    });
    it("определяет октябрь–май как несезон", () => {
      expect(getSeason(new Date("2025-01-15"))).toBe("offseason");
      expect(getSeason(new Date("2025-10-20"))).toBe("offseason");
      expect(getSeason(new Date("2025-12-31"))).toBe("offseason");
    });
  });

  describe("getPricePerNight", () => {
    it("Апартаменты: несезон 20000, сезон 25000, пик 30000", () => {
      expect(getPricePerNight("apartamenty", "offseason")).toBe(20000);
      expect(getPricePerNight("apartamenty", "season")).toBe(25000);
      expect(getPricePerNight("apartamenty", "peak")).toBe(30000);
    });
    it("4-местный: несезон 11000, сезон 13000", () => {
      expect(getPricePerNight("domik-4", "offseason")).toBe(11000);
      expect(getPricePerNight("domik-4", "season")).toBe(13000);
    });
    it("6-8-местный: несезон 15000, сезон 17000, пик 20000", () => {
      expect(getPricePerNight("domik-6-8", "offseason")).toBe(15000);
      expect(getPricePerNight("domik-6-8", "season")).toBe(17000);
      expect(getPricePerNight("domik-6-8", "peak")).toBe(20000);
    });
    it("вся база: несезон 150000, сезон 200000, пик 280000", () => {
      expect(getPricePerNight("vsya-baza", "offseason")).toBe(150000);
      expect(getPricePerNight("vsya-baza", "season")).toBe(200000);
      expect(getPricePerNight("vsya-baza", "peak")).toBe(280000);
    });
  });

  describe("calculateTotalPrice", () => {
    it("2 ночи в несезон, 6-8 местный = 30000", () => {
      const total = calculateTotalPrice(
        "domik-6-8",
        new Date("2025-01-10"),
        new Date("2025-01-12")
      );
      expect(total).toBe(30000);
    });
    it("3 ночи в пиковый сезон апартаменты = 90000", () => {
      const total = calculateTotalPrice(
        "apartamenty",
        new Date("2025-07-10"),
        new Date("2025-07-13")
      );
      expect(total).toBe(90000);
    });
    it("корректно считает на стыке сезонов: июнь→июль", () => {
      const total = calculateTotalPrice(
        "domik-6-8",
        new Date("2025-06-30"),
        new Date("2025-07-02")
      );
      // 30 июня — сезон (17000), 1 июля — пик (20000)
      expect(total).toBe(37000);
    });
  });

  describe("getNights", () => {
    it("корректно считает количество ночей", () => {
      expect(getNights(new Date("2025-01-10"), new Date("2025-01-12"))).toBe(2);
      expect(getNights(new Date("2025-01-10"), new Date("2025-01-17"))).toBe(7);
    });
  });

  describe("formatPrice", () => {
    it("форматирует с пробелом-разделителем и ₽", () => {
      const formatted = formatPrice(15000);
      expect(formatted).toContain("₽");
      expect(formatted).toMatch(/15.000/);
    });
  });
});
