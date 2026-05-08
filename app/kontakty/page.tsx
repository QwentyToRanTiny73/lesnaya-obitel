import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты и как добраться",
  description:
    "Контакты базы отдыха Лесная Обитель. Краснокаменка, ЮБК, Крым. Как добраться из Ялты — около 20 минут. Телефон, Telegram, Max.",
};

const PHONE_RAW = "+79785905650";
const PHONE_DISPLAY = "+7 (978) 590-56-50";
const TG_USERNAME = "CaDi1440";

const cianUrl =
  "https://krym.cian.ru/rent/suburban/327153966/";
const avitoUrl =
  "https://www.avito.ru/yalta/doma_dachi_kottedzhi/2-k._taunhaus_55_m_7602383662?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing_seller";

export default function KontaktyPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Связь</p>
          <h1 className="section-title text-4xl md:text-5xl">Контакты</h1>
          <p className="font-inter text-sand/60 text-sm mt-6">
            улица имени Исмаила Гаспринского, 33<br />
            пгт Краснокаменка · муниципальный округ Ялта · Республика Крым
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
                    <span className="text-wine-gold text-lg mt-0.5">☎</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-1">Телефон</p>
                      <a href={`tel:${PHONE_RAW}`} className="font-georgia text-cream text-xl hover:text-wine-amber transition-colors">
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-wine-gold text-lg mt-0.5">✈</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-1">Telegram</p>
                      <a href={`https://t.me/${TG_USERNAME}`} target="_blank" rel="noopener noreferrer" className="font-georgia text-cream hover:text-wine-amber transition-colors">
                        @{TG_USERNAME}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-wine-gold text-lg mt-0.5">◎</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-1">Max</p>
                      <a href={`tel:${PHONE_RAW}`} className="font-georgia text-cream hover:text-wine-amber transition-colors">
                        {PHONE_DISPLAY}
                      </a>
                      <p className="font-inter text-xs text-sand/65 mt-1">Российский мессенджер Max</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-wine-gold text-lg mt-0.5">✉</span>
                    <div>
                      <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-1">Email</p>
                      <a href="mailto:info@lesnaya-obitel.ru" className="font-georgia text-cream hover:text-wine-amber transition-colors">
                        info@lesnaya-obitel.ru
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Объявления */}
              <div className="mb-12">
                <p className="section-subtitle">Также мы здесь</p>
                <h2 className="section-title text-2xl mb-6">Размещения на агрегаторах</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={cianUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-forest/15 border border-forest/40 p-5 hover:border-gold transition-colors group"
                  >
                    <p className="font-inter text-xs tracking-widest uppercase text-gold mb-2">Циан</p>
                    <p className="font-georgia text-cream group-hover:text-gold-light transition-colors">
                      Объявление в Крыму →
                    </p>
                  </a>
                  <a
                    href={avitoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-forest/15 border border-forest/40 p-5 hover:border-gold transition-colors group"
                  >
                    <p className="font-inter text-xs tracking-widest uppercase text-gold mb-2">Авито</p>
                    <p className="font-georgia text-cream group-hover:text-gold-light transition-colors">
                      Таунхаус 55 м² в Ялте →
                    </p>
                  </a>
                </div>
              </div>

              {/* Как добраться */}
              <div>
                <p className="section-subtitle">Маршрут</p>
                <h2 className="section-title text-2xl mb-6">Как добраться</h2>
                <div className="space-y-4">
                  <div className="bg-forest/10 border border-forest/30 p-6">
                    <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-2">Из Ялты</p>
                    <p className="font-inter text-sand/70 text-sm leading-relaxed">
                      ~20 минут на автомобиле. Трасса Ялта–Гурзуф, поворот на
                      Краснокаменку. Точные координаты пришлём при подтверждении
                      бронирования.
                    </p>
                  </div>
                  <div className="bg-forest/10 border border-forest/30 p-6">
                    <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-2">Из Симферополя</p>
                    <p className="font-inter text-sand/70 text-sm leading-relaxed">
                      ~1,5 часа по трассе Симферополь–Ялта. Далее по маршруту через Гурзуф.
                    </p>
                  </div>
                  <div className="bg-forest/10 border border-forest/30 p-6">
                    <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-2">Трансфер</p>
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
              <div className="bg-forest/20 border border-forest/30 aspect-video flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="font-inter text-sand/50 text-sm mb-1">
                    ул. имени Исмаила Гаспринского, 33
                  </p>
                  <p className="font-inter text-sand/65 text-xs mb-4">
                    пгт Краснокаменка, МО Ялта, Крым
                  </p>
                  <a
                    href="https://yandex.ru/maps/?text=Краснокаменка%20Гаспринского%2033&z=15&l=map"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2 px-6 inline-block"
                  >
                    Открыть на Яндекс.Картах
                  </a>
                </div>
              </div>

              <div className="mt-8 bg-forest/10 border border-forest/30 p-6">
                <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-4">
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
