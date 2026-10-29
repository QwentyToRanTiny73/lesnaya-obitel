import {
  type AccommodationId,
  calculateTotal,
  formatPrice,
  getAccommodation,
  getNights,
  isAccommodationId,
  minNightsFor,
  parseDate,
  pluralNights,
} from "./price";

export interface BookingInput {
  fullName: string;
  phone: string;
  email: string;
  accommodation: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  activities: string[];
  comment: string;
  consent: boolean;
}

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

const PHONE_RE = /^(\+7|7|8)?[\s(-]*\d{3}[\s)-]*\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateBooking(input: BookingInput, today = new Date()): BookingErrors {
  const errors: BookingErrors = {};

  if (input.fullName.trim().length < 2) errors.fullName = "Как к вам обращаться?";
  if (!PHONE_RE.test(input.phone.trim())) errors.phone = "Проверьте номер — нужен российский, 10 цифр после +7";
  if (input.email.trim() && !EMAIL_RE.test(input.email.trim())) errors.email = "Проверьте адрес почты";

  if (!isAccommodationId(input.accommodation)) {
    errors.accommodation = "Выберите размещение";
    return errors;
  }
  const id = input.accommodation;
  const capacity = getAccommodation(id).capacity;

  const checkIn = parseDate(input.checkIn);
  const checkOut = parseDate(input.checkOut);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (!checkIn) errors.checkIn = "Выберите дату заезда";
  else if (checkIn < startOfToday) errors.checkIn = "Дата заезда уже прошла";

  if (!checkOut) errors.checkOut = "Выберите дату выезда";
  else if (checkIn && getNights(checkIn, checkOut) < minNightsFor(id)) {
    const min = minNightsFor(id);
    errors.checkOut = `Минимум ${min} ${pluralNights(min)}`;
  }

  if (!Number.isInteger(input.guests) || input.guests < 1) errors.guests = "Сколько вас будет?";
  else if (input.guests > capacity) errors.guests = `В этом размещении — до ${capacity} гостей`;

  if (!input.consent) errors.consent = "Нужно согласие на обработку персональных данных";

  return errors;
}

/** Итог брони или null, если даты ещё не выбраны корректно. */
export function quote(id: AccommodationId, checkInStr: string, checkOutStr: string) {
  const checkIn = parseDate(checkInStr);
  const checkOut = parseDate(checkOutStr);
  if (!checkIn || !checkOut) return null;
  const nights = getNights(checkIn, checkOut);
  if (nights < 1) return null;
  return { nights, total: calculateTotal(id, checkIn, checkOut) };
}

const fmtDate = (s: string) => {
  const d = parseDate(s);
  return d ? d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }) : s;
};

/** Текст заявки, который гость отправляет в Telegram или Max. */
export function buildMessage(input: BookingInput, activityLabels: Record<string, string>): string {
  const id = input.accommodation as AccommodationId;
  const q = quote(id, input.checkIn, input.checkOut);
  const acts = input.activities.map((a) => activityLabels[a] ?? a);

  return [
    "Здравствуйте! Хочу забронировать в «Лесной Обители».",
    "",
    `Размещение: ${getAccommodation(id).title}`,
    `Даты: ${fmtDate(input.checkIn)} — ${fmtDate(input.checkOut)}` +
      (q ? ` (${q.nights} ${pluralNights(q.nights)})` : ""),
    `Гостей: ${input.guests}`,
    q ? `Предварительно: ${formatPrice(q.total)} за проживание` : null,
    acts.length ? `Интересует: ${acts.join(", ")}` : null,
    input.comment.trim() ? `Комментарий: ${input.comment.trim()}` : null,
    "",
    `${input.fullName.trim()}, ${input.phone.trim()}` + (input.email.trim() ? `, ${input.email.trim()}` : ""),
  ]
    .filter((line) => line !== null)
    .join("\n")
    .replace(/ | /g, " ");
}
