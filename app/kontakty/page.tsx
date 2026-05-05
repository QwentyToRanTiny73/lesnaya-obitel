import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты и как добраться",
  description:
    "Контакты базы отдыха Лесная Обитель. Краснокаменка, ЮБК, Крым. Как добраться из Ялты — около 20 минут. Телефон, Telegram, WhatsApp.",
};

export default function KontaktyPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Связь</p>
          <h1 className="section-title text-4xl md:text-5xl">Контакты</h1>
          <p className="font-inter text-sand/60 text-sm mt-6">
            Краснокаменка, Ялтинский район, Республика Крым
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Контактная информация */}
            <div>
              <div className="mb-12">
                <p className="section-subtitle">Связаться с нами</p>
                <h2 className="section-title text-2xl mb-8">Напишите или позвоните</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-gold text-lg mt-0.5">☎</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-gold mb-1">Телефон</p>
                      <a href="tel:+79787776655" className="font-georgia text-cream text-xl hover:text-gold transition-colors">
                        +7 (978) 777-66-55
                      </a>
                      <p className="font-inter text-xs text-sand/40 mt-1">Управляющий — Денис</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-gold text-lg mt-0.5">✉</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-gold mb-1">Email</p>
                      <a href="mailto:info@lesnaya-obitel.ru" className="font-georgia text-cream hover:text-gold transition-colors">
                        info@lesnaya-obitel.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-gold text-lg mt-0.5">✈</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-gold mb-1">Telegram</p>
                      <a href="https://t.me/lesnaya_obitel" target="_blank" rel="noopener noreferrer" className="font-georgia text-cream hover:text-gold transition-colors">
                        @lesnaya_obitel
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-gold text-lg mt-0.5">◎</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-gold mb-1">WhatsApp</p>
                      <a href="https://wa.me/79787776655" target="_blank" rel="noopener noreferrer" className="font-georgia text-cream hover:text-gold transition-colors">
                        +7 (978) 777-66-55
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Как добраться */}
              <div>
                <p className="section-subtitle">Маршрут</p>
                <h2 className="section-title text-2xl mb-6">Как добраться</h2>
                <div className="space-y-4">
                  <div className="bg-forest/10 border border-forest/30 p-6">
                    <p className="font-inter text-xs tracking-widest uppercase text-gold mb-2">Из Ялты</p>
                    <p className="font-inter text-sand/70 text-sm leading-relaxed">
                      ~20 минут на автомобиле. Трасса Ялта–Гурзуф, поворот на Краснокаменку.
                      Координаты уточним при подтверждении бронирования.
                    </p>
                  </div>
                  <div className="bg-forest/10 border border-forest/30 p-6">
                    <p className="font-inter text-xs tracking-widest uppercase text-gold mb-2">Из Симферополя</p>
                    <p className="font-inter text-sand/70 text-sm leading-relaxed">
                      ~1,5 часа по трассе Симферополь–Ялта. Далее по маршруту через Гурзуф.
                    </p>
                  </div>
                  <div className="bg-forest/10 border border-forest/30 p-6">
                    <p className="font-inter text-xs tracking-widest uppercase text-gold mb-2">Трансфер</p>
                    <p className="font-inter text-sand/70 text-sm leading-relaxed">
                      Организуем трансфер из аэропорта Симферополя или Ялты по запросу.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div>
              <p className="section-subtitle">Расположение</p>
              <h2 className="section-title text-2xl mb-6">На карте</h2>
              {/* Яндекс Карты embed — iframe */}
              <div className="bg-forest/20 border border-forest/30 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <p className="font-inter text-sand/40 text-sm mb-4">
                    Краснокаменка, Ялтинский район, Крым
                  </p>
                  <a
                    href="https://yandex.ru/maps/?pt=34.18,44.55&z=14&l=map"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2 px-6 inline-block"
                  >
                    Открыть на Яндекс.Картах
                  </a>
                </div>
              </div>

              <div className="mt-8 bg-forest/10 border border-forest/30 p-6">
                <p className="font-inter text-xs tracking-widest uppercase text-gold mb-4">
                  Рядом с нами
                </p>
                <ul className="space-y-2 font-inter text-sm text-sand/60">
                  <li>· Скала Красный Камень — 5 мин пешком</li>
                  <li>· Гурзуф — 10 мин на авто</li>
                  <li>· Ялта — 20 мин на авто</li>
                  <li>· Море — 15 мин на авто</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
