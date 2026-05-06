import { z } from "zod";

// Максимальная вместимость по типу размещения.
export const accommodationCapacity = {
  apartamenty: 6,
  "domik-4": 4,
  "domik-6-8": 8,
  "vsya-baza": 80,
} as const;

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Укажите имя и фамилию").max(100),
  phone: z
    .string()
    .min(10, "Укажите номер телефона")
    .regex(/^(\+7|7|8)?[\s(]*\d{3}[\s)]*[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/, "Неверный формат телефона"),
  email: z.string().email("Неверный email"),
  accommodationType: z.enum(["apartamenty", "domik-4", "domik-6-8", "vsya-baza"], {
    message: "Выберите тип размещения",
  }),
  checkIn: z.string().min(1, "Выберите дату заезда"),
  checkOut: z.string().min(1, "Выберите дату выезда"),
  guests: z.number().min(1, "Укажите число гостей").max(80, "Слишком много гостей"),
  activities: z.array(z.string()).optional(),
  comment: z.string().max(1000).optional(),
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку персональных данных",
  }),
})
  .refine(
    (data) => {
      const ci = new Date(data.checkIn);
      const co = new Date(data.checkOut);
      const diff = (co.getTime() - ci.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 2;
    },
    {
      message: "Минимальный срок проживания — 2 ночи",
      path: ["checkOut"],
    }
  )
  .refine(
    (data) => data.guests <= accommodationCapacity[data.accommodationType],
    {
      message: "Превышена максимальная вместимость для выбранного размещения",
      path: ["guests"],
    }
  );

export type BookingData = z.infer<typeof bookingSchema>;

export const activityOptions = [
  { id: "degustacia", label: "Дегустация вина" },
  { id: "banya", label: "Финская баня" },
  { id: "horses", label: "Конные прогулки" },
  { id: "diving", label: "Дайвинг" },
  { id: "sups", label: "Светящиеся сапы" },
  { id: "fishing", label: "Рыбалка" },
  { id: "donuzlav", label: "Тур на Донузлав" },
];
