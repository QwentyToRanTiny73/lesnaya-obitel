const trustItems = [
  {
    icon: "◈",
    title: "Закрытая территория",
    description: "Посторонних нет. Только вы и те, кого вы привезли.",
  },
  {
    icon: "◈",
    title: "Минимум 2 ночи",
    description: "Нет суеты. Вы приезжаете — и остаётесь.",
  },
  {
    icon: "◈",
    title: "Всё своё",
    description: "Вино, ферма, лес. Ничего привозного.",
  },
  {
    icon: "◈",
    title: "8 гектаров леса",
    description: "Тишина не как опция — как основной продукт.",
  },
];

export default function TrustBlock() {
  return (
    <section className="py-24 px-6 bg-forest-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">Почему выбирают нас</p>
          <h2 className="section-title">
            Не база отдыха —<br />
            <span className="text-gold">частное пространство</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-forest/30">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="bg-forest-dark p-10 text-center group hover:bg-forest/10 transition-colors duration-300"
            >
              <div className="text-gold text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-georgia text-cream text-lg mb-3">{item.title}</h3>
              <p className="font-inter text-sand/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
