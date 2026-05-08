import type { Metadata } from "next";
import wines from "@/lib/data/wines.json";
import prices from "@/lib/data/prices.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Дегустации и ферма",
  description:
    "Дегустации крымских вин, устриц с фермы Причал 12, крафтового пива. Комбо-вечера. Ферма с птицей и домашними продуктами. Лесная Обитель, Краснокаменка.",
};

const wineTypeColor: Record<string, string> = {
  red: "border-red-900/40",
  rose: "border-pink-800/40",
  white: "border-amber-800/40",
};

export default function DegustaciiPage() {
  return (
    <div className="pt-24">
      {/* Шапка */}
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Вино и ферма</p>
          <h1 className="section-title text-4xl md:text-5xl">Дегустации</h1>
          <p className="font-georgia italic text-sand/60 text-lg mt-6">
            Вино из Новозаведённого. Устрицы с Донузлава.<br />
            Пиво с характером.
          </p>
        </div>
      </section>

      {/* Вина */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-subtitle">Наши вина</p>
            <h2 className="section-title text-3xl">Партия из Новозаведённого</h2>
            <p className="font-inter text-sand/50 text-sm mt-3 max-w-2xl">
              Виноградники в Краснодарском крае. Урожай, который дозревает.
              Вина, которые рассказывают о месте.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-forest/20">
            {wines.map((wine) => (
              <div
                key={wine.id}
                className={`bg-forest-dark p-8 border-t-2 ${wineTypeColor[wine.type]} hover:bg-forest/10 transition-colors`}
              >
                <h3 className="font-georgia italic text-cream text-xl mb-2">{wine.name}</h3>
                <p className="font-inter text-gold/70 text-xs tracking-wide mb-4">{wine.profile}</p>
                <p className="font-inter text-sand/60 text-sm leading-relaxed mb-4">
                  {wine.description}
                </p>
                <p className="font-inter text-xs text-sand/65">
                  <span className="text-sand/60">Подача:</span> {wine.temperature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форматы дегустаций */}
      <section className="py-16 px-6 bg-forest/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-subtitle">Форматы</p>
            <h2 className="section-title text-3xl">Что попробовать</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-forest/40">
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">
                    Формат
                  </th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">
                    Состав
                  </th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-right py-4">
                    Цена / чел
                  </th>
                </tr>
              </thead>
              <tbody>
                {prices.degustations.map((item, i) => (
                  <tr key={i} className="border-b border-forest/20 hover:bg-forest/5 transition-colors">
                    <td className="font-georgia text-cream py-5 pr-6">{item.format}</td>
                    <td className="font-inter text-sand/60 text-sm py-5 pr-6">{item.composition}</td>
                    <td className="font-georgia text-gold text-right py-5 whitespace-nowrap">
                      {item.priceMin === item.priceMax || !item.priceMax
                        ? `${new Intl.NumberFormat("ru-RU").format(item.priceMin)} ${item.unit}`
                        : `${new Intl.NumberFormat("ru-RU").format(item.priceMin)}–${new Intl.NumberFormat("ru-RU").format(item.priceMax)} ${item.unit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Запись */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title text-2xl mb-4">Записаться на дегустацию</h2>
          <p className="font-inter text-sand/50 text-sm mb-8">
            Дегустации проводятся по записи. Свяжитесь с нами удобным способом
            или укажите пожелания при бронировании.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/lesnaya_obitel" className="btn-primary text-xs px-8 py-3">
              Telegram
            </a>
            <a href="tel:+79787776655" className="btn-primary text-xs px-8 py-3">
              +7 (978) 777-66-55
            </a>
            <Link href="/bron" className="btn-secondary text-xs px-8 py-3">
              Забронировать с дегустацией
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
