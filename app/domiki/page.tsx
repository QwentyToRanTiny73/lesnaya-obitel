import type { Metadata } from "next";
import Link from "next/link";
import domiki from "@/lib/data/domiki.json";
import { formatPrice } from "@/lib/utils/price";

export const metadata: Metadata = {
  title: "Домики и апартаменты",
  description:
    "15 домиков на закрытой территории 7 га леса у Красного Камня, Краснокаменка, Крым. Апартаменты с джакузи, четырёхместные и шести-восьмиместные домики.",
};

const seasonLabels = {
  offseason: "Несезон",
  season: "Сезон",
  peak: "Пик (июль–авг)",
};

export default function DomikiPage() {
  return (
    <div className="pt-24">
      {/* Шапка */}
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Размещение</p>
          <h1 className="section-title text-4xl md:text-5xl">Домики и апартаменты</h1>
          <p className="font-inter text-sand/60 text-sm leading-relaxed mt-6 max-w-xl mx-auto">
            Пятнадцать объектов на семи гектарах. Каждый — с видом на лес или горы,
            на расстоянии от соседей. Завтрак включён во все тарифы.
          </p>
        </div>
      </section>

      {/* Список домиков */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto space-y-px">
          {domiki.map((domik) => (
            <div key={domik.id} className="bg-forest/5 border border-forest/20 p-8 md:p-10 hover:border-gold/20 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-gold/70 mb-1">
                        {domik.highlight}
                        {domik.count && ` · ${domik.count} домика`}
                      </p>
                      <h2 className="font-georgia text-cream text-2xl md:text-3xl">
                        {domik.title}
                      </h2>
                      <p className="font-inter text-sand/50 text-sm mt-1">{domik.subtitle}</p>
                    </div>
                  </div>
                  <p className="font-inter text-sand/60 text-sm leading-relaxed mb-6">
                    {domik.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {domik.included.map((item) => (
                      <span
                        key={item}
                        className="font-inter text-xs text-sand/60 border border-forest/40 px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/domiki/${domik.slug}`}
                    className="btn-primary text-xs"
                  >
                    Подробнее
                  </Link>
                </div>

                {/* Цены */}
                <div className="bg-forest-dark/50 border border-forest/20 p-6 self-start">
                  <p className="font-inter text-xs tracking-widest uppercase text-gold mb-4">
                    Стоимость / ночь
                  </p>
                  <div className="space-y-3">
                    {(["offseason", "season", "peak"] as const).map((season) => {
                      const price = domik.prices[season];
                      if (!price) return null;
                      return (
                        <div key={season} className="flex justify-between items-baseline">
                          <span className="font-inter text-xs text-sand/50">
                            {seasonLabels[season]}
                          </span>
                          <span className="font-georgia text-cream text-lg">
                            {formatPrice(price)}
                          </span>
                        </div>
                      );
                    })}
                    {"minDays" in domik && domik.minDays && (
                      <p className="font-inter text-xs text-gold/60 border-t border-forest/30 pt-3 mt-3">
                        Мин. {domik.minDays} ночи
                      </p>
                    )}
                  </div>
                  <Link href="/bron" className="btn-secondary text-xs w-full text-center mt-6 block">
                    Забронировать
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Заметка */}
      <section className="py-16 px-6 bg-forest/5 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-georgia italic text-sand/60 text-lg mb-4">
            Минимальный срок проживания — 2 ночи.
          </p>
          <p className="font-inter text-sand/40 text-sm">
            Заезд с 14:00. Выезд до 12:00. Ранний/поздний заезд — по договорённости.
          </p>
        </div>
      </section>
    </div>
  );
}
