"use client";

import { useState, useMemo } from "react";
import {
  calculateTotalPrice,
  formatPrice,
  getNights,
  getSeason,
  type AccommodationType,
  accommodationLabels,
} from "@/lib/utils/price";

const included: Record<AccommodationType, string[]> = {
  apartamenty: ["Завтрак", "Smart TV", "Wi-Fi", "Комплимент при заезде", "Джакузи"],
  "domik-4": ["Завтрак", "Smart TV", "Wi-Fi"],
  "domik-6-8": ["Завтрак", "Smart TV", "Wi-Fi"],
  "vsya-baza": ["Вся территория", "15 объектов", "Аквазона", "Менеджер"],
};

export default function PriceCalculator() {
  const [type, setType] = useState<AccommodationType>("domik-6-8");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const result = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const ci = new Date(checkIn);
    const co = new Date(checkOut);
    if (co <= ci) return null;
    const nights = getNights(ci, co);
    if (nights < 2) return { error: "Минимальный срок — 2 ночи" };
    const total = calculateTotalPrice(type, ci, co);
    const season = getSeason(ci);
    const seasonLabel = { offseason: "Несезон", season: "Сезон", peak: "Пик" }[season];
    return { total, nights, season: seasonLabel, error: null };
  }, [type, checkIn, checkOut]);

  return (
    <section className="py-24 px-6 bg-forest/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-subtitle">Расчёт стоимости</p>
          <h2 className="section-title">Посчитать поездку</h2>
        </div>

        <div className="card-forest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block font-inter text-xs tracking-widest uppercase text-gold mb-2">
                Размещение
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
            <div>
              <label className="block font-inter text-xs tracking-widest uppercase text-gold mb-2">
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
            <div>
              <label className="block font-inter text-xs tracking-widest uppercase text-gold mb-2">
                Выезд
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="input-field text-sm"
                min={checkIn}
              />
            </div>
          </div>

          {result && (
            <div className="border-t border-forest/40 pt-6 mt-6">
              {result.error ? (
                <p className="text-center font-inter text-sand/60 text-sm">{result.error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-inter text-sm text-sand/60">Ночей:</span>
                      <span className="font-georgia text-cream text-lg">{result.nights}</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-inter text-sm text-sand/60">Сезон:</span>
                      <span className="font-inter text-sand/80 text-sm">{result.season}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-t border-forest/40 pt-3 mt-3">
                      <span className="font-inter text-sm text-gold uppercase tracking-widest">Итого:</span>
                      <span className="font-georgia text-gold text-2xl">{formatPrice(result.total!)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-inter text-xs tracking-widest uppercase text-gold mb-3">
                      Включено:
                    </p>
                    <ul className="space-y-1">
                      {included[type].map((item) => (
                        <li key={item} className="font-inter text-sm text-sand/60 flex items-center gap-2">
                          <span className="text-gold text-xs">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {!result && (
            <p className="text-center font-inter text-sand/65 text-sm py-4">
              Выберите даты для расчёта стоимости
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
