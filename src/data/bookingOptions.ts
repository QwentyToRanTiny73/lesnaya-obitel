import activities from "./activities.json";

// Что можно отметить в заявке: все активности + дегустация и аквазона.
export const bookingActivities: { id: string; label: string }[] = [
  { id: "degustacia", label: "Дегустация вина" },
  { id: "banya", label: "Баня и бассейн" },
  ...activities.own.map((a) => ({ id: a.id, label: a.title })),
  ...activities.partner.map((a) => ({ id: a.id, label: a.title })),
];

export const activityLabels: Record<string, string> = Object.fromEntries(
  bookingActivities.map((a) => [a.id, a.label]),
);
