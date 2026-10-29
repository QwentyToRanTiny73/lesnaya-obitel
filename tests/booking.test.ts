import { describe, expect, it } from "bun:test";
import { buildMessage, validateBooking, type BookingInput } from "../src/lib/booking";

const today = new Date(2026, 4, 1); // 1 мая 2026
const valid: BookingInput = {
  fullName: "Анна Смирнова",
  phone: "+7 (978) 590-56-50",
  email: "",
  accommodation: "domik-6-8",
  checkIn: "2026-06-10",
  checkOut: "2026-06-13",
  guests: 4,
  activities: ["ebikes", "degustacia"],
  comment: "Будем с собакой",
  consent: true,
};
const check = (patch: Partial<BookingInput>) => validateBooking({ ...valid, ...patch }, today);

describe("валидация заявки", () => {
  it("корректная заявка проходит", () => {
    expect(check({})).toEqual({});
  });
  it("разные форматы российского телефона", () => {
    for (const phone of ["+79785905650", "8 978 590 56 50", "79785905650", "+7 978 590-56-50"]) {
      expect(check({ phone }).phone).toBeUndefined();
    }
  });
  it("плохой телефон и пустое имя", () => {
    const e = check({ phone: "12345", fullName: " " });
    expect(e.phone).toBeDefined();
    expect(e.fullName).toBeDefined();
  });
  it("почта необязательна, но проверяется, если указана", () => {
    expect(check({ email: "" }).email).toBeUndefined();
    expect(check({ email: "anna@" }).email).toBeDefined();
  });
  it("минимум 2 ночи, для всей базы — 3", () => {
    expect(check({ checkOut: "2026-06-11" }).checkOut).toBe("Минимум 2 ночи");
    expect(check({ accommodation: "vsya-baza", guests: 20, checkOut: "2026-06-12" }).checkOut).toBe("Минимум 3 ночи");
  });
  it("заезд в прошлом отклоняется", () => {
    expect(check({ checkIn: "2026-04-20", checkOut: "2026-04-23" }).checkIn).toBeDefined();
  });
  it("вместимость: 8 в шести-восьмиместном — да, 9 — нет; 5 в четырёхместном — нет", () => {
    expect(check({ guests: 8 }).guests).toBeUndefined();
    expect(check({ guests: 9 }).guests).toBe("В этом размещении — до 8 гостей");
    expect(check({ accommodation: "domik-4", guests: 5 }).guests).toBeDefined();
  });
  it("без согласия на обработку данных — нельзя", () => {
    expect(check({ consent: false }).consent).toBeDefined();
  });
  it("неизвестное размещение", () => {
    expect(check({ accommodation: "dacha" }).accommodation).toBeDefined();
  });
});

describe("текст заявки", () => {
  const msg = buildMessage(valid, { ebikes: "Электробайки Talaria TL2500", degustacia: "Дегустация вина" });
  it("содержит размещение, даты, ночи, сумму и контакты", () => {
    expect(msg).toContain("Домик на 6–8 гостей");
    expect(msg).toContain("10 июня 2026");
    expect(msg).toContain("3 ночи");
    expect(msg).toContain("51 000 ₽"); // 3 × 17 000, сезон
    expect(msg).toContain("Анна Смирнова, +7 (978) 590-56-50");
  });
  it("активности — названиями, а не кодами", () => {
    expect(msg).toContain("Электробайки Talaria TL2500, Дегустация вина");
    expect(msg).not.toContain("ebikes");
  });
  it("без неразрывных пробелов — текст вставляется в мессенджер чисто", () => {
    expect(msg).not.toMatch(/[  ]/);
  });
});
