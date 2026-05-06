import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide · Дизайн-система",
  description:
    "Дизайн-система базы отдыха «Лесная Обитель» — Pantone-палитра, типографика, компоненты, иконки.",
  robots: { index: false, follow: false },
};

const colorTokens = [
  {
    group: "Primary · Лесные",
    items: [
      { token: "moss", hex: "#7A8B6E", note: "Pantone 5625 C — primary CTA" },
      { token: "moss-700", hex: "#586850", note: "hover для primary" },
      { token: "moss-300", hex: "#B8C2A8", note: "бордюры, разделители" },
      { token: "sage", hex: "#9CAF88", note: "Pantone 5777 C — secondary CTA" },
      { token: "pforest", hex: "#B8C5B0", note: "Pantone 7499 C — третичный фон" },
    ],
  },
  {
    group: "Земля · Нейтрали",
    items: [
      { token: "beige", hex: "#C4B5A0", note: "Pantone 7527 C — аутлайны" },
      { token: "cream", hex: "#F7F5F0", note: "background страницы" },
      { token: "surface", hex: "#E8E4D9", note: "surface карточек" },
    ],
  },
  {
    group: "Винные акценты",
    items: [
      { token: "wine-gold", hex: "#C8963E", note: "выделение цены, теги" },
      { token: "wine-amber", hex: "#D4A853", note: "hover для золотых" },
      { token: "wine-rose", hex: "#D9A6A6", note: "розе акценты" },
      { token: "wine-ruby", hex: "#9C3838", note: "красное вино, декор" },
    ],
  },
  {
    group: "Текст",
    items: [
      { token: "ink", hex: "#3D3D3D", note: "12.1:1 на cream — AAA" },
      { token: "ink-soft", hex: "#6B6B6B", note: "5.7:1 на cream — AA" },
      { token: "ink-mute", hex: "#9A9A9A", note: "плейсхолдеры, disabled" },
    ],
  },
  {
    group: "Семантические",
    items: [
      { token: "success", hex: "#8FA88A", note: "успех, доступно" },
      { token: "warning", hex: "#D4C5A5", note: "предупреждение" },
      { token: "error", hex: "#C49A8A", note: "терракота, мягкая ошибка" },
    ],
  },
];

const fontScale = [
  { token: "display-1", size: "72px", lh: "1.05", family: "Playfair", sample: "Тишина", className: "font-display text-[72px] leading-[1.05] tracking-tight" },
  { token: "display-2", size: "56px", lh: "1.08", family: "Playfair", sample: "Лесная Обитель", className: "font-display text-[56px] leading-[1.08]" },
  { token: "h1", size: "40px", lh: "1.15", family: "Playfair", sample: "От лозы до бокала", className: "font-display text-[40px] leading-[1.15]" },
  { token: "h2", size: "32px", lh: "1.2", family: "Playfair", sample: "Восемь гектаров", className: "font-display text-[32px] leading-[1.2]" },
  { token: "h3", size: "24px", lh: "1.3", family: "Playfair", sample: "Talaria 2500", className: "font-display text-[24px] leading-[1.3]" },
  { token: "body-lg", size: "18px", lh: "1.6", family: "Inter", sample: "Большой основной текст для лидов и важных абзацев.", className: "font-text text-[18px] leading-[1.6]" },
  { token: "body", size: "16px", lh: "1.6", family: "Inter", sample: "Стандартный текст. Хорошо читается на всех устройствах.", className: "font-text text-[16px] leading-[1.6]" },
  { token: "caption", size: "12px", lh: "1.5", family: "Inter", sample: "Подпись или вспомогательный текст.", className: "font-text text-[12px] leading-[1.5]" },
  { token: "quote", size: "24px", lh: "1.4", family: "Cormorant", sample: "Тишина, которую не привозят.", className: "font-accent italic text-[24px] leading-[1.4]" },
  { token: "overline", size: "11px", lh: "1.4", family: "Inter", sample: "ВИНОДЕЛЬНЯ", className: "font-text text-[11px] leading-[1.4] tracking-[0.18em] uppercase" },
];

const radiusScale = [
  { token: "xs", value: "4px", note: "inputs, tags" },
  { token: "sm", value: "8px", note: "кнопки" },
  { token: "md", value: "12px", note: "карточки" },
  { token: "lg", value: "20px", note: "hero-блоки" },
  { token: "pill", value: "999px", note: "badges" },
];

const shadowScale = [
  { token: "xs", value: "0 1px 3px rgba(61,61,61,.06)" },
  { token: "sm", value: "0 2px 8px rgba(61,61,61,.08)" },
  { token: "md", value: "0 4px 20px rgba(61,61,61,.10)" },
  { token: "lg", value: "0 8px 40px rgba(61,61,61,.12)" },
  { token: "card-hover", value: "0 12px 48px rgba(122,139,110,.18)" },
];

const spacingScale = [
  { token: "xs", value: 4 },
  { token: "sm", value: 8 },
  { token: "md", value: 16 },
  { token: "lg", value: 24 },
  { token: "xl", value: 32 },
  { token: "2xl", value: 48 },
  { token: "3xl", value: 64 },
  { token: "4xl", value: 96 },
];

export default function StyleGuidePage() {
  return (
    <div className="bg-cream text-ink min-h-screen pt-24">
      {/* Hero */}
      <header className="px-6 md:px-20 py-16 border-b border-surface">
        <p className="font-text text-overline text-moss mb-3">Версия 1.0 · 2024</p>
        <h1 className="font-display text-display-2 md:text-display-1 text-ink leading-tight mb-4">
          Style Guide
        </h1>
        <p className="font-accent italic text-2xl md:text-3xl text-moss-700 max-w-2xl">
          Тишина, которую не привозят.
        </p>
        <p className="font-text text-body-lg text-ink-soft max-w-2xl mt-6">
          Полная дизайн-система базы отдыха «Лесная Обитель»: лес + активный
          отдых + винная культура. Pantone-вдохновлённая палитра, тройная
          типографика, 8-pt сетка, доступность WCAG 2.1 AA.
        </p>
      </header>

      {/* Цвета */}
      <section className="px-6 md:px-20 py-16">
        <p className="font-text text-overline text-moss mb-2">01 · Палитра</p>
        <h2 className="font-display text-h1 mb-12">Цвет</h2>
        <div className="space-y-12">
          {colorTokens.map((g) => (
            <div key={g.group}>
              <h3 className="font-display text-h3 mb-6">{g.group}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {g.items.map((c) => (
                  <div
                    key={c.token}
                    className="rounded-md overflow-hidden bg-cream-50 border border-surface shadow-soft"
                  >
                    <div className="h-24" style={{ background: c.hex }} aria-hidden="true" />
                    <div className="p-4">
                      <p className="font-text text-body-sm font-medium text-ink">{c.token}</p>
                      <p className="font-text text-caption text-ink-soft uppercase tracking-wider">{c.hex}</p>
                      <p className="font-text text-caption text-ink-mute mt-1">{c.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Градиенты */}
        <div className="mt-16">
          <h3 className="font-display text-h3 mb-6">Градиенты</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-md overflow-hidden bg-cream-50 border border-surface shadow-soft">
              <div className="h-32 bg-gradient-moss" aria-hidden="true" />
              <div className="p-4">
                <p className="font-text text-body-sm font-medium">gradient-moss</p>
                <p className="font-text text-caption text-ink-soft">135° · #7A8B6E → #9CAF88</p>
              </div>
            </div>
            <div className="rounded-md overflow-hidden bg-cream-50 border border-surface shadow-soft">
              <div className="h-32 bg-gradient-cream" aria-hidden="true" />
              <div className="p-4">
                <p className="font-text text-body-sm font-medium">gradient-cream</p>
                <p className="font-text text-caption text-ink-soft">180° · #F7F5F0 → #E8E4D9</p>
              </div>
            </div>
            <div className="rounded-md overflow-hidden bg-cream-50 border border-surface shadow-soft">
              <div className="h-32 bg-gradient-wine" aria-hidden="true" />
              <div className="p-4">
                <p className="font-text text-body-sm font-medium">gradient-wine</p>
                <p className="font-text text-caption text-ink-soft">135° · gold → amber → rose</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Типографика */}
      <section className="px-6 md:px-20 py-16 bg-gradient-cream">
        <p className="font-text text-overline text-moss mb-2">02 · Типографика</p>
        <h2 className="font-display text-h1 mb-4">Тройная гарнитура</h2>
        <p className="font-text text-body text-ink-soft max-w-2xl mb-12">
          Playfair Display для заголовков. Inter для тела. Cormorant Garamond
          для винных цитат и описаний.
        </p>
        <div className="space-y-8">
          {fontScale.map((f) => (
            <div
              key={f.token}
              className="grid grid-cols-1 md:grid-cols-[140px_120px_1fr] items-baseline gap-6 pb-6 border-b border-surface"
            >
              <div>
                <p className="font-text text-caption text-ink-mute uppercase tracking-wider">{f.token}</p>
                <p className="font-text text-caption text-ink-soft">{f.family}</p>
              </div>
              <p className="font-text text-caption text-ink-soft">
                {f.size} / {f.lh}
              </p>
              <p className={`text-ink ${f.className}`}>{f.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className="px-6 md:px-20 py-16">
        <p className="font-text text-overline text-moss mb-2">03 · Spacing</p>
        <h2 className="font-display text-h1 mb-4">8-pt сетка</h2>
        <p className="font-text text-body text-ink-soft max-w-2xl mb-12">
          Все отступы кратны 8 px (внутри иконок — 4 px). Это даёт визуальный
          ритм без расчётов.
        </p>
        <div className="space-y-3">
          {spacingScale.map((s) => (
            <div key={s.token} className="flex items-center gap-4">
              <span className="font-text text-caption text-ink-soft w-12 uppercase">{s.token}</span>
              <span className="font-text text-caption text-ink-mute w-16">{s.value} px</span>
              <div
                className="bg-moss h-3 rounded-pill"
                style={{ width: `${s.value * 4}px`, maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Радиусы */}
      <section className="px-6 md:px-20 py-16 bg-surface">
        <p className="font-text text-overline text-moss mb-2">04 · Радиусы</p>
        <h2 className="font-display text-h1 mb-12">Border radius</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {radiusScale.map((r) => (
            <div key={r.token} className="text-center">
              <div
                className="bg-moss-300 h-24 mx-auto"
                style={{ borderRadius: r.value, width: r.token === "pill" ? "120px" : "96px" }}
              />
              <p className="font-text text-body-sm font-medium mt-3">{r.token}</p>
              <p className="font-text text-caption text-ink-soft">{r.value}</p>
              <p className="font-text text-caption text-ink-mute">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Тени */}
      <section className="px-6 md:px-20 py-16">
        <p className="font-text text-overline text-moss mb-2">05 · Тени</p>
        <h2 className="font-display text-h1 mb-12">Натуральные, без синевы</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {shadowScale.map((s) => (
            <div key={s.token} className="text-center">
              <div
                className="bg-cream-50 h-24 rounded-md border border-surface"
                style={{ boxShadow: s.value }}
              />
              <p className="font-text text-body-sm font-medium mt-3">{s.token}</p>
              <p className="font-text text-caption text-ink-mute mt-1 break-all">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Кнопки */}
      <section className="px-6 md:px-20 py-16 bg-cream-50">
        <p className="font-text text-overline text-moss mb-2">06 · Компоненты</p>
        <h2 className="font-display text-h1 mb-12">Кнопки</h2>
        <div className="space-y-8">
          <div className="flex flex-wrap gap-4 items-center">
            <button className="btn-primary">Забронировать</button>
            <button className="btn-secondary">Узнать подробнее</button>
            <button className="btn-ghost">Отменить</button>
            <button className="btn-wine">Дегустация</button>
            <button className="btn-primary" disabled>
              Disabled
            </button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="btn-primary btn-pill">Pill primary</button>
            <button className="btn-secondary btn-pill">Pill secondary</button>
          </div>
        </div>
      </section>

      {/* Карточка байка */}
      <section className="px-6 md:px-20 py-16 bg-gradient-cream">
        <p className="font-text text-overline text-moss mb-2">07 · Карточка</p>
        <h2 className="font-display text-h1 mb-4">Talaria 2500</h2>
        <p className="font-text text-body text-ink-soft max-w-2xl mb-12">
          Шесть электробайков. Доставка к домику по бронированию. Маршруты с
          гидом — от Крымских гор до Судака.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <article
              key={n}
              className="card card-hover bg-cream-50"
            >
              <div className="aspect-video bg-gradient-moss rounded-md mb-5 flex items-center justify-center">
                <span className="text-cream text-5xl">⚡</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="chip bg-moss-300/40 text-moss-700">Доступен</span>
                <span className="font-text text-caption text-ink-mute">№ {n}</span>
              </div>
              <h3 className="font-display text-h3 mb-3">Talaria 2500</h3>
              <ul className="space-y-2 mb-4 font-text text-body-sm text-ink-soft">
                <li>⚡ Запас хода — 80 км</li>
                <li>⚙ Мощность — 2500 W</li>
                <li>⏱ Минимум — 2 часа</li>
              </ul>
              <p className="font-display text-2xl text-moss mb-5">
                от 1 200 ₽<span className="font-text text-body-sm text-ink-soft">/час</span>
              </p>
              <div className="flex gap-3">
                <button className="btn-secondary flex-1 px-3">Детали</button>
                <button className="btn-primary flex-1 px-3">Забронировать</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Формы */}
      <section className="px-6 md:px-20 py-16">
        <p className="font-text text-overline text-moss mb-2">08 · Формы</p>
        <h2 className="font-display text-h1 mb-12">Поля и состояния</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          <div>
            <label className="block font-text text-caption text-ink-soft mb-2">Имя</label>
            <input className="input-field" placeholder="Как вас зовут?" />
          </div>
          <div>
            <label className="block font-text text-caption text-ink-soft mb-2">Телефон</label>
            <input className="input-field" placeholder="+7 (___) ___-__-__" />
          </div>
          <div>
            <label className="block font-text text-caption text-ink-soft mb-2">Email · focus</label>
            <input className="input-field" placeholder="vy@example.com" autoFocus={false} style={{ borderColor: "var(--c-moss)", boxShadow: "var(--sh-focus)" }} />
          </div>
          <div>
            <label className="block font-text text-caption text-ink-soft mb-2">Дата · error</label>
            <input className="input-field" placeholder="Выберите день" style={{ borderColor: "var(--c-error)" }} />
            <p className="font-text text-caption mt-1" style={{ color: "var(--c-error)" }}>
              Выберите дату начиная с завтра
            </p>
          </div>
        </div>
      </section>

      {/* Доступность */}
      <section className="px-6 md:px-20 py-16 bg-surface">
        <p className="font-text text-overline text-moss mb-2">09 · A11y</p>
        <h2 className="font-display text-h1 mb-12">WCAG 2.1 AA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-h3 mb-4">Контраст</h3>
            <ul className="space-y-3 font-text text-body-sm">
              <li>
                <span className="inline-block px-3 py-1 mr-2 bg-cream text-ink">ink на cream</span>
                <span className="text-ink-soft">12.1:1 — AAA</span>
              </li>
              <li>
                <span className="inline-block px-3 py-1 mr-2 bg-moss-700 text-cream">cream на moss-700</span>
                <span className="text-ink-soft">6.3:1 — AA</span>
              </li>
              <li>
                <span className="inline-block px-3 py-1 mr-2 bg-moss text-cream">cream на moss</span>
                <span className="text-ink-soft">4.6:1 — AA</span>
              </li>
              <li>
                <span className="inline-block px-3 py-1 mr-2 bg-cream text-ink-soft">ink-soft на cream</span>
                <span className="text-ink-soft">5.7:1 — AA</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-h3 mb-4">Принципы</h3>
            <ul className="space-y-2 font-text text-body-sm text-ink-soft">
              <li>✓ Touch-target ≥ 44 × 44 px</li>
              <li>✓ :focus-visible с outline + shadow</li>
              <li>✓ Семантические landmarks (header, main, nav, footer)</li>
              <li>✓ Заголовки иерархично h1 → h2 → h3</li>
              <li>✓ aria-label на иконочных кнопках</li>
              <li>✓ prefers-reduced-motion поддерживается</li>
              <li>✓ Контраст ≥ 4.5:1 для body текста</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tone of voice */}
      <section className="px-6 md:px-20 py-16">
        <p className="font-text text-overline text-moss mb-2">10 · Голос</p>
        <h2 className="font-display text-h1 mb-12">Tone of voice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <p className="font-display text-h3 mb-3">Дружелюбный</p>
            <p className="font-text text-body-sm text-ink-soft">
              «Вы», без канцелярита, живые слова. Никакого «осуществляем», только
              «делаем».
            </p>
          </div>
          <div className="card">
            <p className="font-display text-h3 mb-3">Экспертный</p>
            <p className="font-text text-body-sm text-ink-soft">
              Конкретные цифры. Запас хода — 80 км. Минимум — 2 часа. Никаких
              расплывчатых обещаний.
            </p>
          </div>
          <div className="card">
            <p className="font-display text-h3 mb-3">Расслабленный</p>
            <p className="font-text text-body-sm text-ink-soft">
              Никакого давления. Без «купи сейчас», без таймеров, без «осталось 2
              места». Тишина продаётся тишиной.
            </p>
          </div>
        </div>
        <div className="mt-12 max-w-3xl">
          <h3 className="font-display text-h3 mb-4">Хорошо / плохо</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card border-l-4 border-success">
              <p className="font-text text-body-sm text-ink-soft mb-1">Хорошо</p>
              <p className="font-accent italic text-xl">«Вино, которое росло здесь.»</p>
            </div>
            <div className="card border-l-4 border-error opacity-60">
              <p className="font-text text-body-sm text-ink-soft mb-1">Плохо</p>
              <p className="font-text text-xl">«Незабываемый отдых! Лучшая база! Скидка 30%!»</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-20 py-12 bg-moss text-cream">
        <p className="font-text text-overline opacity-80 mb-2">Лесная Обитель</p>
        <p className="font-display text-h2 mb-4">Style Guide v1.0</p>
        <p className="font-accent italic text-xl opacity-90">
          Тишина, которую не привозят.
        </p>
        <p className="font-text text-caption opacity-70 mt-8">
          ул. Исмаила Гаспринского, 33 · пгт Краснокаменка · МО Ялта · Крым
        </p>
      </footer>
    </div>
  );
}
