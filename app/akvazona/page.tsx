import type { Metadata } from "next";
import prices from "@/lib/data/prices.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Аквазона",
  description:
    "Финская баня, бассейн с подогревом, комната отдыха на 6 человек. Работают круглый год. Дневной и вечерний тарифы. Банный ритуал по запросу.",
};

const aquaFeatures = [
  { icon: "♨️", title: "Финская баня", desc: "Традиционная сауна. Работает круглый год. Жар, берёза, тишина." },
  { icon: "🏊", title: "Бассейн с подогревом", desc: "Подогреваемый бассейн под открытым небом. Круглый год, в том числе зимой." },
  { icon: "🛋️", title: "Комната отдыха", desc: "На 6 человек. Диваны, чай, отдых между заходами." },
];

export default function AkvazonaPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Отдых</p>
          <h1 className="section-title text-4xl md:text-5xl">Аквазона</h1>
          <p className="font-inter text-sand/60 text-sm leading-relaxed mt-6 max-w-xl mx-auto">
            Баня, бассейн, комната отдыха. Бронируется отдельно — по часовому тарифу.
            Работают круглый год. Для гостей базы приоритет при бронировании.
          </p>
        </div>
      </section>

      {/* Объекты */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-forest/30">
            {aquaFeatures.map((item) => (
              <div key={item.title} className="bg-forest-dark p-10 text-center hover:bg-forest/10 transition-colors">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-georgia text-cream text-xl mb-3">{item.title}</h3>
                <p className="font-inter text-sand/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-16 px-6 bg-forest/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="section-subtitle">Стоимость</p>
            <h2 className="section-title text-3xl">Тарифы</h2>
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
                  <tr key={i} className="border-b border-forest/20 hover:bg-forest/5 transition-colors">
                    <td className="font-georgia text-cream py-5 pr-6">{item.tariff}</td>
                    <td className="font-inter text-sand/60 text-sm py-5 pr-6">{item.time}</td>
                    <td className="font-georgia text-gold text-right py-5 whitespace-nowrap">
                      {item.priceMin === item.priceMax
                        ? `${new Intl.NumberFormat("ru-RU").format(item.priceMin)} ${item.unit}`
                        : `${new Intl.NumberFormat("ru-RU").format(item.priceMin)}–${new Intl.NumberFormat("ru-RU").format(item.priceMax)} ${item.unit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-inter text-xs text-sand/40 mt-6 text-center">
            Минимальный заказ — 3 часа. Бронирование через администратора.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-forest-dark">
        <div className="max-w-xl mx-auto">
          <p className="font-georgia italic text-sand/60 text-lg mb-8">
            Зимой в бассейне под снегом — особый опыт.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+79787776655" className="btn-primary text-xs px-8 py-3">
              Забронировать баню
            </a>
            <Link href="/bron" className="btn-secondary text-xs px-8 py-3">
              Добавить к проживанию
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
