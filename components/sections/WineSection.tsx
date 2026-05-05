import wines from "@/lib/data/wines.json";
import Link from "next/link";

const wineTypeColor: Record<string, string> = {
  red: "bg-red-900/30 text-red-300 border-red-900/50",
  rose: "bg-pink-900/30 text-pink-300 border-pink-900/50",
  white: "bg-amber-900/30 text-amber-200 border-amber-800/50",
};

const wineTypeLabel: Record<string, string> = {
  red: "Красное",
  rose: "Розовое",
  white: "Белое",
};

export default function WineSection() {
  return (
    <section className="py-24 px-6 bg-forest/5">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="section-subtitle">Наши вина</p>
          <h2 className="section-title">
            Вино, которое<br />
            <span className="text-gold">росло здесь</span>
          </h2>
          <p className="font-inter text-sand/60 text-sm leading-relaxed mt-4">
            Партия из Новозаведённого. Виноградники, которые работают без спешки.
            Урожай, который дозревает — а не торопится.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-forest/20">
          {wines.map((wine) => (
            <div
              key={wine.id}
              className="bg-forest-dark p-8 hover:bg-forest/10 transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`text-xs font-inter tracking-widest uppercase px-3 py-1 border rounded-sm ${wineTypeColor[wine.type]}`}
                >
                  {wineTypeLabel[wine.type]}
                </span>
              </div>
              <h3 className="font-georgia italic text-cream text-xl mb-2 group-hover:text-gold transition-colors">
                {wine.name}
              </h3>
              <p className="font-inter text-gold/70 text-xs tracking-wide mb-4">
                {wine.profile}
              </p>
              <p className="font-inter text-sand/60 text-sm leading-relaxed mb-4">
                {wine.description}
              </p>
              <div className="border-t border-forest/30 pt-4">
                <p className="font-inter text-xs text-sand/40">
                  <span className="text-sand/60">К столу:</span> {wine.pairing}
                </p>
                <p className="font-inter text-xs text-sand/40 mt-1">
                  <span className="text-sand/60">Температура:</span> {wine.temperature}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/degustacii" className="btn-primary text-xs">
            Записаться на дегустацию
          </Link>
        </div>
      </div>
    </section>
  );
}
