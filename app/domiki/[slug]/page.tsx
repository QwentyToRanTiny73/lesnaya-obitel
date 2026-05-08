import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import domiki from "@/lib/data/domiki.json";
import { formatPrice } from "@/lib/utils/price";

interface Props {
  params: { slug: string };
}

const seasonLabels = {
  offseason: "Несезон (окт–май)",
  season: "Сезон (июнь, сент)",
  peak: "Пик (июль–авг)",
};

export async function generateStaticParams() {
  return domiki.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const domik = domiki.find((d) => d.slug === params.slug);
  if (!domik) return {};
  return {
    title: domik.title,
    description: domik.description,
  };
}

export default function DomikPage({ params }: Props) {
  const domik = domiki.find((d) => d.slug === params.slug);
  if (!domik) notFound();

  return (
    <div className="pt-24">
      {/* Навигация */}
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <Link
          href="/domiki"
          className="font-inter text-xs text-sand/50 hover:text-gold transition-colors tracking-widest uppercase"
        >
          ← Все домики
        </Link>
      </div>

      {/* Шапка домика */}
      <section className="py-12 px-6 bg-forest/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Описание */}
            <div>
              <p className="font-inter text-xs tracking-widest uppercase text-gold mb-3">
                {domik.highlight}
              </p>
              <h1 className="font-georgia text-cream text-4xl md:text-5xl mb-3">
                {domik.title}
              </h1>
              <p className="font-inter text-sand/50 text-sm mb-6">{domik.subtitle}</p>
              <p className="font-inter text-sand/70 text-sm leading-relaxed mb-8">
                {domik.description}
              </p>

              <div className="mb-8">
                <p className="font-inter text-xs tracking-widest uppercase text-gold mb-3">
                  Включено в стоимость
                </p>
                <ul className="space-y-2">
                  {domik.included.map((item) => (
                    <li key={item} className="font-inter text-sm text-sand/70 flex items-center gap-2">
                      <span className="text-gold text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {domik.features && (
                <div>
                  <p className="font-inter text-xs tracking-widest uppercase text-gold mb-3">
                    Удобства
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {domik.features.map((f) => (
                      <span
                        key={f}
                        className="font-inter text-xs text-sand/60 border border-forest/40 px-3 py-1"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Цены и бронирование */}
            <div>
              <div className="bg-forest/10 border border-forest/30 p-8 mb-6">
                <p className="font-inter text-xs tracking-widest uppercase text-gold mb-6">
                  Стоимость / сутки
                </p>
                <div className="space-y-4 mb-8">
                  {(["offseason", "season", "peak"] as const).map((season) => {
                    const price = domik.prices[season];
                    if (price === null || price === undefined) return null;
                    return (
                      <div key={season} className="flex justify-between items-baseline border-b border-forest/20 pb-4">
                        <div>
                          <span className="font-inter text-sm text-cream/80 block">
                            {seasonLabels[season]}
                          </span>
                        </div>
                        <span className="font-georgia text-gold text-2xl">
                          {formatPrice(price)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {"minDays" in domik && domik.minDays && (
                  <p className="font-inter text-xs text-sand/50 mb-6">
                    Минимальный срок — {domik.minDays} ночи
                  </p>
                )}

                <Link
                  href={`/bron?type=${domik.id}`}
                  className="btn-secondary text-sm w-full text-center block py-4"
                >
                  Забронировать этот вариант
                </Link>
              </div>

              <p className="font-inter text-xs text-sand/65 text-center">
                Заезд с 14:00 · Выезд до 12:00 · Мин. 2 ночи
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
