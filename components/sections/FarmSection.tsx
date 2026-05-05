const farmItems = [
  { emoji: "🐔", label: "Куры, гуси, утки, цесарки" },
  { emoji: "🥚", label: "Свежие яйца каждое утро" },
  { emoji: "🥩", label: "Мясо и домашние заготовки" },
  { emoji: "🫙", label: "Компоты и варенье из садовых ягод" },
  { emoji: "🦪", label: "Устрицы с «Причала 12» (по заказу)" },
  { emoji: "🥨", label: "Фермерские чипсы из мяса" },
];

export default function FarmSection() {
  return (
    <section className="py-24 px-6 bg-forest-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle">Ферма</p>
            <h2 className="section-title">
              Всё, что на столе —<br />
              <span className="text-gold">выращено здесь</span>
            </h2>
            <p className="font-inter text-sand/60 text-sm leading-relaxed mt-6 mb-8">
              На территории базы — небольшая ферма. Птица, свиньи, огород.
              Яйца с утра приносят к завтраку. Мясо готовят из того, что есть.
              Устрицы — с нашей фермы на Донузлаве.
            </p>
            <p className="font-inter text-sand/50 text-sm leading-relaxed">
              Это не маркетинг «фермерское». Это просто так устроена жизнь здесь.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-forest/30">
            {farmItems.map((item, i) => (
              <div
                key={i}
                className="bg-forest-dark p-6 hover:bg-forest/10 transition-colors"
              >
                <div className="text-2xl mb-3">{item.emoji}</div>
                <p className="font-inter text-sand/70 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
