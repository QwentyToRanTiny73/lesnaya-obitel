import { describe, it, expect } from "bun:test";
import { bookingSchema } from "@/lib/utils/bookingSchema";

const validBase = {
  fullName: "Иван Иванов",
  phone: "+79785905650",
  email: "ivan@example.com",
  accommodationType: "domik-6-8" as const,
  checkIn: "2025-06-10",
  checkOut: "2025-06-12",
  guests: 2,
  activities: [],
  comment: "",
  consent: true as const,
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

  it("принимает разные форматы телефона", () => {
    const variants = [
      "+7 (978) 590-56-50",
      "8 978 590 56 50",
      "79785905650",
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

  it("отклоняет 9 гостей в шести-восьмиместном (макс 8)", () => {
    const r = bookingSchema.safeParse({ ...validBase, guests: 9 });
    expect(r.success).toBe(false);
  });

  it("отклоняет 5 гостей в четырёхместном (макс 4)", () => {
    const r = bookingSchema.safeParse({
      ...validBase,
      accommodationType: "domik-4",
      guests: 5,
    });
    expect(r.success).toBe(false);
  });

  it("принимает 8 гостей в шести-восьмиместном", () => {
    const r = bookingSchema.safeParse({ ...validBase, guests: 8 });
    expect(r.success).toBe(true);
  });

  it("принимает 6 гостей в апартаментах", () => {
    const r = bookingSchema.safeParse({
      ...validBase,
      accommodationType: "apartamenty",
      guests: 6,
    });
    expect(r.success).toBe(true);
  });

  it("отклоняет отсутствие согласия (152-ФЗ)", () => {
    const r = bookingSchema.safeParse({ ...validBase, consent: false });
    expect(r.success).toBe(false);
  });
});
