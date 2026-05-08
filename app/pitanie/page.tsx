import type { Metadata } from "next";
import breakfasts from "@/lib/data/breakfasts.json";

export const metadata: Metadata = {
  title: "Питание и завтраки",
  description:
    "Три формата завтраков включены в стоимость проживания. Лёгкий, фермерский и полный ресторанный завтрак. Продукты с собственной фермы. Лесная Обитель, Крым.",
};

export default function PitaniePage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Еда</p>
          <h1 className="section-title text-4xl md:text-5xl">Завтраки</h1>
          <p className="font-georgia italic text-sand/60 text-lg mt-6">
            Из того, что выращено здесь.
          </p>
          <p className="font-inter text-sand/50 text-sm mt-4 max-w-xl mx-auto">
            Завтрак включён в стоимость любого варианта проживания.
            Три формата — выбирайте накануне вечером.
          </p>
        </div>
      </section>

      {/* Форматы завтраков */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-forest/30">
            {breakfasts.map((item) => (
              <div key={item.id} className="bg-forest-dark p-10 hover:bg-forest/10 transition-colors">
                <div className="text-3xl mb-6">{item.icon}</div>
                <h3 className="font-georgia text-cream text-xl mb-3">{item.title}</h3>
                <p className="font-inter text-sand/60 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {item.composition.map((c) => (
                    <li key={c} className="font-inter text-sm text-sand/50 flex items-center gap-2">
                      <span className="text-gold text-xs">·</span> {c}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-forest/30 pt-4">
                  <p className="font-inter text-xs text-sand/65 mb-1">Доп. гость</p>
                  <p className="font-georgia text-gold text-lg">
                    {"extraGuestPrice" in item
                      ? `${new Intl.NumberFormat("ru-RU").format(item.extraGuestPrice as number)} ₽`
                      : `${new Intl.NumberFormat("ru-RU").format(item.extraGuestPriceMin as number)}–${new Intl.NumberFormat("ru-RU").format(item.extraGuestPriceMax as number)} ₽`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Про ферму */}
      <section className="py-16 px-6 bg-forest/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-subtitle">Откуда еда</p>
          <h2 className="section-title text-3xl mb-6">С нашей фермы</h2>
          <p className="font-inter text-sand/60 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
            На территории базы — птицеферма и огород. Куры, гуси, утки, цесарки.
            Яйца — свежие, утренние. Мясо — из того, что выращено здесь.
            Домашний хлеб — из небольшой пекарни. Варенье и компоты — с летнего урожая.
          </p>
          <p className="font-inter text-sand/65 text-xs">
            Устрицы с фермы «Причал 12» на Донузлаве — по предварительному заказу
          </p>
        </div>
      </section>
    </div>
  );
}
