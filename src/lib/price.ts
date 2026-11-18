import domiki from "../data/domiki.json";
import holidays from "../data/holidays.json";

export type Season = "offseason" | "season" | "peak";
export type AccommodationId = "apartamenty" | "domik-4" | "domik-6-8" | "vsya-baza";

export const seasonLabels: Record<Season, string> = {
  offseason: "Несезон",
  season: "Сезон",
  peak: "Пик",
};

export const seasonMonths: Record<Season, string> = {
  offseason: "октябрь — май",
  season: "июнь, сентябрь",
  peak: "июль — август",
};

export function getAccommodation(id: AccommodationId) {
  const item = domiki.find((d) => d.id === id);
  if (!item) throw new Error(`Неизвестный тип размещения: ${id}`);
  return item;
}

export function isAccommodationId(value: unknown): value is AccommodationId {
  return typeof value === "string" && domiki.some((d) => d.id === value);
}

/** «2025-07-14» → локальная дата без сдвига часового пояса. */
export function parseDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** «MM-DD» для сравнения дат внутри года */
const monthDay = (date: Date) =>
  `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** Праздник, на который попадает дата (holidays.json). Период может переходить через Новый год. */
export function getHoliday(date: Date) {
  const md = monthDay(date);
  return holidays.find((h) => (h.from <= h.to ? md >= h.from && md <= h.to : md >= h.from || md <= h.to));
}

/** Пояснение для страниц: «Новогодние праздники (30.12–08.01) и …» */
export const holidayNote = holidays
  .map((h) => `${h.label.toLowerCase()} (${h.from.split("-").reverse().join(".")}–${h.to.split("-").reverse().join(".")})`)
  .join(" и ");

export function getSeason(date: Date): Season {
  const holiday = getHoliday(date);
  if (holiday) return holiday.season as Season;
  const month = date.getMonth() + 1;
  if (month === 7 || month === 8) return "peak";
  if (month === 6 || month === 9) return "season";
  return "offseason";
}

/** Цена ночи; если у типа нет пикового тарифа — действует сезонный. */
export function getPricePerNight(id: AccommodationId, season: Season): number {
  const p = getAccommodation(id).prices;
  return p[season] ?? p.season;
}

export function getNights(checkIn: Date, checkOut: Date): number {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000);
}

/** Сумма по ночам: каждая ночь считается по своему сезону. */
export function calculateTotal(id: AccommodationId, checkIn: Date, checkOut: Date): number {
  let total = 0;
  const night = new Date(checkIn);
  while (night < checkOut) {
    total += getPricePerNight(id, getSeason(night));
    night.setDate(night.getDate() + 1);
  }
  return total;
}

export function minNightsFor(id: AccommodationId): number {
  const item = getAccommodation(id) as { minNights?: number };
  return item.minNights ?? 2;
}

/** Цена с человека за сутки при полной загрузке, вверх до десятков рублей */
export function perPerson(price: number, capacity: number): number {
  return Math.ceil(price / capacity / 10) * 10;
}

export function formatPrice(value: number): string {
  // Узкий неразрывный пробел как разделитель разрядов
  return `${value.toLocaleString("ru-RU").replace(/\s/g, " ")} ₽`;
}

export function pluralNights(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "ночь";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "ночи";
  return "ночей";
}
