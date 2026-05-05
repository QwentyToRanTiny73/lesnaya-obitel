import type { Metadata } from "next";
import prices from "@/lib/data/prices.json";
import PriceCalculator from "@/components/sections/PriceCalculator";

export const metadata: Metadata = {
  title: "Прайс-лист",
  description:
    "Полный прайс-лист базы отдыха Лесная Обитель: проживание по сезонам, аквазона, дегустации, активности, завтраки. Скачать PDF.",
};

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export default function PraysPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Стоимость</p>
          <h1 className="section-title text-4xl md:text-5xl">Прайс-лист</h1>
          <p className="font-inter text-sand/60 text-sm mt-6 max-w-xl mx-auto mb-8">
            Все цены на проживание, аквазону, дегустации, активности и питание.
            Действуют с октября 2024 года.
          </p>
          <a href="/prays.pdf" className="btn-secondary text-xs px-8 py-3 inline-block">
            ↓ Скачать PDF
          </a>
        </div>
      </section>

      {/* Сезоны */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-subtitle">Сезонность</p>
            <h2 className="section-title text-3xl">Три сезона</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-forest/30">
            {Object.entries(prices.seasons).map(([, season]) => (
              <div key={season.label} className="bg-forest-dark p-8">
                <h3 className="font-georgia text-cream text-xl mb-2">{season.label}</h3>
                <p className="font-inter text-xs tracking-widest uppercase text-gold mb-3">
                  {season.months}
                </p>
                <p className="font-inter italic text-sand/60 text-sm">{season.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Проживание */}
      <section className="py-16 px-6 bg-forest/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-subtitle">Проживание</p>
            <h2 className="section-title text-3xl">Цены за сутки</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-forest/40">
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Тип</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Гостей</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-right py-4 pr-6">Несезон</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-right py-4 pr-6">Сезон</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-right py-4">Пик</th>
                </tr>
              </thead>
              <tbody>
                {prices.accommodation.map((item, i) => (
                  <tr key={i} className="border-b border-forest/20 hover:bg-forest/5 transition-colors">
                    <td className="py-5 pr-6">
                      <div className="font-georgia text-cream">{item.type}</div>
                      <div className="font-inter text-xs text-sand/40 mt-1">{item.note}</div>
                    </td>
                    <td className="font-inter text-sand/60 text-sm py-5 pr-6">{item.capacity}</td>
                    <td className="font-georgia text-sand/80 text-right py-5 pr-6">{fmt(item.offseason)} ₽</td>
                    <td className="font-georgia text-sand/80 text-right py-5 pr-6">{fmt(item.season)} ₽</td>
                    <td className="font-georgia text-gold text-right py-5">{item.peak ? `${fmt(item.peak)} ₽` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Калькулятор */}
      <PriceCalculator />

      {/* Завтраки */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-subtitle">Питание</p>
            <h2 className="section-title text-3xl">Завтраки</h2>
            <p className="font-inter text-sand/50 text-sm mt-2">
              Включены в стоимость проживания. Цены ниже — для дополнительных гостей.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-forest/40">
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Формат</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Состав</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-right py-4">Доп. гость</th>
                </tr>
              </thead>
              <tbody>
                {prices.breakfasts.map((item, i) => (
                  <tr key={i} className="border-b border-forest/20">
                    <td className="font-georgia text-cream py-5 pr-6">{item.format}</td>
                    <td className="font-inter text-sand/60 text-sm py-5 pr-6">{item.composition}</td>
                    <td className="font-georgia text-gold text-right py-5 whitespace-nowrap">
                      {"extraGuest" in item && item.extraGuest
                        ? `${fmt(item.extraGuest)} ${item.unit}`
                        : `${fmt(item.extraGuestMin!)}–${fmt(item.extraGuestMax!)} ${item.unit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Аквазона */}
      <section className="py-16 px-6 bg-forest/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-subtitle">Аквазона</p>
            <h2 className="section-title text-3xl">Баня и бассейн</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-forest/40">
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Тариф</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Время</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-right py-4">Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {prices.aquazone.map((item, i) => (
                  <tr key={i} className="border-b border-forest/20">
                    <td className="font-georgia text-cream py-5 pr-6">{item.tariff}</td>
                    <td className="font-inter text-sand/60 text-sm py-5 pr-6">{item.time}</td>
                    <td className="font-georgia text-gold text-right py-5 whitespace-nowrap">
                      {item.priceMin === item.priceMax
                        ? `${fmt(item.priceMin)} ${item.unit}`
                        : `${fmt(item.priceMin)}–${fmt(item.priceMax)} ${item.unit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Дегустации */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-subtitle">Дегустации</p>
            <h2 className="section-title text-3xl">Вино, устрицы, пиво</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-forest/40">
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Формат</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-left py-4 pr-6">Состав</th>
                  <th className="font-inter text-xs tracking-widest uppercase text-gold text-right py-4">Цена</th>
                </tr>
              </thead>
              <tbody>
                {prices.degustations.map((item, i) => (
                  <tr key={i} className="border-b border-forest/20">
                    <td className="font-georgia text-cream py-5 pr-6">{item.format}</td>
                    <td className="font-inter text-sand/60 text-sm py-5 pr-6">{item.composition}</td>
                    <td className="font-georgia text-gold text-right py-5 whitespace-nowrap">
                      {!item.priceMax || item.priceMin === item.priceMax
                        ? `${fmt(item.priceMin)} ${item.unit}`
                        : `${fmt(item.priceMin)}–${fmt(item.priceMax)} ${item.unit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-forest/5">
        <p className="font-georgia italic text-sand/60 text-lg mb-6">
          Цены могут изменяться. Уточняйте при бронировании.
        </p>
        <a href="/prays.pdf" className="btn-primary text-xs px-8 py-3 inline-block">
          ↓ Скачать прайс-лист в PDF
        </a>
      </section>
    </div>
  );
}
