import { describe, it, expect } from "bun:test";
import { bookingSchema } from "@/lib/utils/bookingSchema";

const validBase = {
  fullName: "Иван Иванов",
  phone: "+79787776655",
  email: "ivan@example.com",
  accommodationType: "domik-6-8" as const,
  checkIn: "2025-06-10",
  checkOut: "2025-06-12",
  guests: 2,
  activities: [],
  comment: "",
};

describe("bookingSchema", () => {
  it("проходит валидацию для корректных данных", () => {
    const r = bookingSchema.safeParse(validBase);
    expect(r.success).toBe(true);
  });

  it("отклоняет короткое имя", () => {
    const r = bookingSchema.safeParse({ ...validBase, fullName: "И" });
    expect(r.success).toBe(false);
  });

  it("отклоняет неверный email", () => {
    const r = bookingSchema.safeParse({ ...validBase, email: "wrong" });
    expect(r.success).toBe(false);
  });

  it("отклоняет неверный формат телефона", () => {
    const r = bookingSchema.safeParse({ ...validBase, phone: "abc" });
    expect(r.success).toBe(false);
  });

  it("отклоняет 1 ночь (минимум 2)", () => {
    const r = bookingSchema.safeParse({
      ...validBase,
      checkIn: "2025-06-10",
      checkOut: "2025-06-11",
    });
    expect(r.success).toBe(false);
  });

  it("принимает разные форматы телефона +7", () => {
    const variants = [
      "+7 (978) 777-66-55",
      "8 978 777 66 55",
      "79787776655",
    ];
    variants.forEach((phone) => {
      const r = bookingSchema.safeParse({ ...validBase, phone });
      expect(r.success).toBe(true);
    });
  });

  it("отклоняет неизвестный тип размещения", () => {
    const r = bookingSchema.safeParse({
      ...validBase,
      accommodationType: "invalid" as never,
    });
    expect(r.success).toBe(false);
  });
});
