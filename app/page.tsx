import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TrustBlock from "@/components/sections/TrustBlock";
import BookingWidget from "@/components/sections/BookingWidget";
import WineSection from "@/components/sections/WineSection";
import FarmSection from "@/components/sections/FarmSection";
import Link from "next/link";
import domiki from "@/lib/data/domiki.json";

export const metadata: Metadata = {
  title: "Лесная Обитель — Эко-база у скалы Красный Камень, Краснокаменка, Крым",
  description:
    "Закрытая частная эко-база отдыха у Красного Камня. Домики в лесу, дегустации крымского вина и устриц, аквазона, ферма. Краснокаменка, ЮБК.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "TouristAttraction"],
  name: "Лесная Обитель",
  description: "Закрытая частная эко-база отдыха премиум-класса у скалы Красный Камень",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Краснокаменка",
    addressRegion: "Крым",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.55,
    longitude: 34.18,
  },
  numberOfRooms: 15,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Завтрак включён", value: true },
    { "@type": "LocationFeatureSpecification", name: "Бассейн", value: true },
    { "@type": "LocationFeatureSpecification", name: "Финская баня", value: true },
  ],
};

export default function HomePage() {
  const featuredDomiki = domiki.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />
      <TrustBlock />
      <BookingWidget />

      {/* Домики — превью */}
      <section className="py-24 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-subtitle">Размещение</p>
            <h2 className="section-title">
              Пятнадцать домиков.<br />
              <span className="text-gold">Одна территория.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-forest/20">
            {featuredDomiki.map((domik) => (
              <Link
                key={domik.id}
                href={`/domiki/${domik.slug}`}
                className="bg-forest-dark p-8 hover:bg-forest/10 transition-colors group block"
              >
                <p className="font-inter text-xs tracking-widest uppercase text-gold/70 mb-3">
                  {domik.highlight}
                </p>
                <h3 className="font-georgia text-cream text-xl mb-3 group-hover:text-gold transition-colors">
                  {domik.title}
                </h3>
                <p className="font-inter text-sand/50 text-sm leading-relaxed mb-6 line-clamp-3">
                  {domik.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-georgia text-gold text-2xl">
                    {new Intl.NumberFormat("ru-RU").format(domik.prices.offseason)} ₽
                  </span>
                  <span className="font-inter text-sand/40 text-xs">/сут в несезон</span>
                </div>
                <p className="font-inter text-xs text-gold/60 mt-3 group-hover:text-gold transition-colors">
                  Подробнее →
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/domiki" className="btn-primary text-xs">
              Все варианты размещения
            </Link>
          </div>
        </div>
      </section>

      <WineSection />
      <FarmSection />

      {/* CTA финальный */}
      <section className="py-24 px-6 bg-forest/10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-georgia italic text-sand/60 text-xl mb-6">
            Семь гектаров леса ждут.
          </p>
          <h2 className="section-title text-4xl md:text-5xl mb-8">
            Приехать и остаться
          </h2>
          <Link href="/bron" className="btn-secondary text-sm px-12 py-4 inline-block">
            Забронировать
          </Link>
        </div>
      </section>
    </>
  );
}
