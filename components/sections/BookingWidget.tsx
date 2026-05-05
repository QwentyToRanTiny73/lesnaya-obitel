"use client";

import { useState } from "react";
import Link from "next/link";
import { accommodationLabels, type AccommodationType } from "@/lib/utils/price";

export default function BookingWidget() {
  const [type, setType] = useState<AccommodationType>("domik-6-8");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const buildBookingUrl = () => {
    const params = new URLSearchParams({
      type,
      checkIn,
      checkOut,
      guests: String(guests),
    });
    return `/bron?${params.toString()}`;
  };

  return (
    <section className="py-20 px-6 bg-forest/10 border-y border-forest/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-subtitle">Бронирование</p>
          <h2 className="section-title">Выбрать даты</h2>
          <p className="font-inter text-sand/50 text-sm mt-2">
            Минимум 2 ночи · Заезд с 14:00 · Выезд до 12:00
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-forest/30">
          <div className="bg-forest-dark p-6">
            <label className="block font-inter text-xs tracking-widest uppercase text-gold mb-3">
              Тип
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as AccommodationType)}
              className="input-field text-sm"
            >
              {(Object.entries(accommodationLabels) as [AccommodationType, string][]).map(
                ([val, label]) => (
                  <option key={val} value={val} className="bg-forest-dark">
                    {label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="bg-forest-dark p-6">
            <label className="block font-inter text-xs tracking-widest uppercase text-gold mb-3">
              Заезд
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-field text-sm"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="bg-forest-dark p-6">
            <label className="block font-inter text-xs tracking-widest uppercase text-gold mb-3">
              Выезд
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-field text-sm"
              min={checkIn || new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="bg-forest-dark p-6">
            <label className="block font-inter text-xs tracking-widest uppercase text-gold mb-3">
              Гостей
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 border border-forest/60 text-cream hover:border-gold transition-colors text-sm"
              >
                −
              </button>
              <span className="font-inter text-cream text-lg w-8 text-center">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(80, guests + 1))}
                className="w-8 h-8 border border-forest/60 text-cream hover:border-gold transition-colors text-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href={buildBookingUrl()}
            className="btn-secondary text-sm px-12 py-4 inline-block"
          >
            Проверить доступность
          </Link>
        </div>
      </div>
    </section>
  );
}
