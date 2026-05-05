export type Season = "offseason" | "season" | "peak";

export type AccommodationType = "apartamenty" | "domik-4" | "domik-6-8" | "vsya-baza";

const prices: Record<AccommodationType, Record<Season, number | null>> = {
  apartamenty: { offseason: 20000, season: 25000, peak: 30000 },
  "domik-4": { offseason: 11000, season: 13000, peak: 13000 },
  "domik-6-8": { offseason: 15000, season: 17000, peak: 20000 },
  "vsya-baza": { offseason: 150000, season: 200000, peak: 280000 },
};

export function getSeason(date: Date): Season {
  const month = date.getMonth() + 1;
  if (month === 7 || month === 8) return "peak";
  if (month === 6 || month === 9) return "season";
  return "offseason";
}

export function getPricePerNight(type: AccommodationType, season: Season): number {
  return prices[type][season] ?? prices[type]["season"] ?? 0;
}

export function calculateTotalPrice(
  type: AccommodationType,
  checkIn: Date,
  checkOut: Date
): number {
  let total = 0;
  const current = new Date(checkIn);
  while (current < checkOut) {
    const season = getSeason(current);
    total += getPricePerNight(type, season);
    current.setDate(current.getDate() + 1);
  }
  return total;
}

export function getNights(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export const accommodationLabels: Record<AccommodationType, string> = {
  apartamenty: "Апартаменты",
  "domik-4": "Четырёхместный домик",
  "domik-6-8": "Шести-восьмиместный домик",
  "vsya-baza": "Аренда всей базы",
};
