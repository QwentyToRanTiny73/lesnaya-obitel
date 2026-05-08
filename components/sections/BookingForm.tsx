"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  bookingSchema,
  type BookingData,
  activityOptions,
  accommodationCapacity,
} from "@/lib/utils/bookingSchema";
import {
  accommodationLabels,
  type AccommodationType,
  calculateTotalPrice,
  getNights,
  formatPrice,
  getSeason,
} from "@/lib/utils/price";

const TELEGRAM_USERNAME = "lesnaya_obitel";
const CONTACT_EMAIL = "info@lesnaya-obitel.ru";

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultType = (searchParams.get("type") as AccommodationType) || "domik-6-8";
  const defaultCheckIn = searchParams.get("checkIn") || "";
  const defaultCheckOut = searchParams.get("checkOut") || "";
  const defaultGuests = Number(searchParams.get("guests")) || 2;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      accommodationType: defaultType,
      checkIn: defaultCheckIn,
      checkOut: defaultCheckOut,
      guests: defaultGuests,
      activities: [],
      consent: false as unknown as true,
    },
  });

  const watched = watch();

  // Расчёт стоимости в реальном времени
  const priceInfo = (() => {
    if (!watched.checkIn || !watched.checkOut || !watched.accommodationType) return null;
    const ci = new Date(watched.checkIn);
    const co = new Date(watched.checkOut);
    if (co <= ci) return null;
    const nights = getNights(ci, co);
    if (nights < 2) return null;
    const total = calculateTotalPrice(watched.accommodationType, ci, co);
    return { nights, total, season: getSeason(ci) };
  })();

  /**
   * Формирует текстовое сообщение для письма / Telegram.
   */
  const buildMessage = (data: BookingData) => {
    const ci = new Date(data.checkIn);
    const co = new Date(data.checkOut);
    const nights = getNights(ci, co);
    const total = calculateTotalPrice(data.accommodationType, ci, co);
    const acts = data.activities && data.activities.length
      ? data.activities.map((id) => activityOptions.find((a) => a.id === id)?.label || id).join(", ")
      : "—";

    return [
      "Заявка на бронирование — Лесная Обитель",
      "",
      `Имя: ${data.fullName}`,
      `Телефон: ${data.phone}`,
      `Email: ${data.email}`,
      "",
      `Размещение: ${accommodationLabels[data.accommodationType]}`,
      `Заезд: ${data.checkIn}`,
      `Выезд: ${data.checkOut}`,
      `Ночей: ${nights}`,
      `Гостей: ${data.guests}`,
      "",
      `Расчёт: ${formatPrice(total)} (без активностей)`,
      `Активности: ${acts}`,
      "",
      data.comment ? `Комментарий: ${data.comment}` : "",
    ]
      .filter((s) => s !== undefined)
      .join("\n");
  };

  const onSubmit = async (data: BookingData) => {
    setSubmitting(true);
    setServerError(null);

    const message = buildMessage(data);

    try {
      // 1) Если есть API-роут (на dev/Vercel) — пробуем отправить туда
      if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_STATIC_MODE) {
        try {
          const res = await fetch("/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (res.ok) {
            router.push("./success/");
            return;
          }
        } catch {
          // fallthrough на клиентскую отправку
        }
      }

      // 2) Fallback — Telegram-ссылка с предзаполненным текстом + mailto
      const tgUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
      const mailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Заявка на бронирование"
      )}&body=${encodeURIComponent(message)}`;

      // Открываем Telegram в новой вкладке
      window.open(tgUrl, "_blank", "noopener,noreferrer");
      // И сразу тригерим mailto в текущей вкладке как страховку
      window.location.href = mailUrl;

      // Перенаправляем на страницу успеха
      setTimeout(() => router.push("./success/"), 800);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Ошибка отправки");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" data-testid="booking-form">
      {/* Контактные данные */}
      <div>
        <p className="font-inter text-xs tracking-widest uppercase text-gold mb-4">1. Контакты</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-inter text-xs text-sand/60 mb-2">Имя и фамилия *</label>
            <input
              type="text"
              {...register("fullName")}
              className="input-field"
              placeholder="Иван Иванов"
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1 font-inter">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="block font-inter text-xs text-sand/60 mb-2">Телефон *</label>
            <input
              type="tel"
              {...register("phone")}
              className="input-field"
              placeholder="+7 (___) ___-__-__"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1 font-inter">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="block font-inter text-xs text-sand/60 mb-2">Email *</label>
            <input
              type="email"
              {...register("email")}
              className="input-field"
              placeholder="vy@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 font-inter">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Размещение */}
      <div>
        <p className="font-inter text-xs tracking-widest uppercase text-gold mb-4">2. Размещение</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block font-inter text-xs text-sand/60 mb-2">Тип *</label>
            <select {...register("accommodationType")} className="input-field">
              {(Object.entries(accommodationLabels) as [AccommodationType, string][]).map(
                ([val, label]) => (
                  <option key={val} value={val} className="bg-forest-dark">
                    {label}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="block font-inter text-xs text-sand/60 mb-2">Заезд *</label>
            <input
              type="date"
              {...register("checkIn")}
              className="input-field"
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.checkIn && (
              <p className="text-red-400 text-xs mt-1 font-inter">{errors.checkIn.message}</p>
            )}
          </div>
          <div>
            <label className="block font-inter text-xs text-sand/60 mb-2">Выезд *</label>
            <input
              type="date"
              {...register("checkOut")}
              className="input-field"
              min={watched.checkIn || new Date().toISOString().split("T")[0]}
            />
            {errors.checkOut && (
              <p className="text-red-400 text-xs mt-1 font-inter">{errors.checkOut.message}</p>
            )}
          </div>
        </div>
        <div className="mt-4 max-w-xs">
          <label className="block font-inter text-xs text-sand/60 mb-2">
            Гостей * <span className="text-sand/65 text-[10px]">
              (макс {accommodationCapacity[watched.accommodationType] ?? 8})
            </span>
          </label>
          <input
            type="number"
            {...register("guests", { valueAsNumber: true })}
            className="input-field"
            min={1}
            max={accommodationCapacity[watched.accommodationType] ?? 8}
          />
          {errors.guests && (
            <p className="text-red-400 text-xs mt-1 font-inter">{errors.guests.message}</p>
          )}
        </div>
      </div>

      {/* Активности */}
      <div>
        <p className="font-inter text-xs tracking-widest uppercase text-gold mb-4">3. Активности (по желанию)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {activityOptions.map((act) => (
            <label
              key={act.id}
              className="flex items-center gap-3 p-3 border border-forest/30 hover:border-gold/40 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={act.id}
                {...register("activities")}
                className="accent-gold"
              />
              <span className="font-inter text-sm text-sand/70">{act.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Комментарий */}
      <div>
        <p className="font-inter text-xs tracking-widest uppercase text-gold mb-4">4. Комментарий</p>
        <textarea
          {...register("comment")}
          rows={4}
          className="input-field resize-none"
          placeholder="Особые пожелания, аллергии, дни рождения, что важно знать заранее"
        />
      </div>

      {/* Расчёт стоимости */}
      {priceInfo && (
        <div className="bg-forest/10 border border-gold/30 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-inter text-xs tracking-widest uppercase text-gold mb-2">
                Предварительный расчёт
              </p>
              <p className="font-inter text-sand/60 text-sm">
                {priceInfo.nights}{" "}
                {priceInfo.nights === 1
                  ? "ночь"
                  : priceInfo.nights < 5
                  ? "ночи"
                  : "ночей"}{" "}
                · {accommodationLabels[watched.accommodationType]}
              </p>
            </div>
            <div className="text-right">
              <p className="font-georgia text-gold text-3xl">{formatPrice(priceInfo.total)}</p>
              <p className="font-inter text-xs text-sand/65">+ выбранные активности</p>
            </div>
          </div>
        </div>
      )}

      {/* Согласие на обработку персональных данных — 152-ФЗ */}
      <div className="border border-forest/30 bg-forest/10 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("consent")}
            className="accent-wine-gold mt-1 flex-shrink-0"
          />
          <span className="font-inter text-xs text-sand/70 leading-relaxed">
            Я согласен(на) на обработку персональных данных в соответствии с{" "}
            <Link
              href="/politika-konfidencialnosti"
              target="_blank"
              className="text-wine-amber hover:underline"
            >
              политикой конфиденциальности
            </Link>{" "}
            и Федеральным законом № 152-ФЗ.
          </span>
        </label>
        {errors.consent && (
          <p className="text-red-400 text-xs mt-2 font-inter">{errors.consent.message}</p>
        )}
      </div>

      {serverError && (
        <div className="border border-red-900/40 bg-red-900/10 text-red-300 p-4 font-inter text-sm">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-secondary text-sm px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Отправка…" : "Отправить заявку"}
        </button>
        <p className="font-inter text-xs text-sand/65 mt-4">
          Откроется Telegram и почта с готовым текстом. Свяжемся для подтверждения.
        </p>
      </div>
    </form>
  );
}
