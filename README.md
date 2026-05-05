# Лесная Обитель

Сайт частной эко-базы отдыха у скалы Красный Камень. Краснокаменка, ЮБК, Крым.

## Стек

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + кастомные CSS-переменные
- **Язык**: TypeScript
- **Формы**: react-hook-form + zod
- **Анимации**: Framer Motion
- **PDF**: pdfkit (runtime) + ReportLab (offline через Python)
- **Тестирование**: bun:test (unit) + Playwright (e2e)
- **Deploy**: Vercel

## Запуск локально

```bash
bun install
bun run dev
# открыть http://localhost:3000
```

## Скрипты

```bash
bun run dev          # dev-сервер
bun run build        # production build
bun run start        # production-сервер
bun run lint         # eslint

bun run test         # unit-тесты (bun:test, 19 тестов)
bun run test:e2e     # e2e-тесты Playwright
bun run pdf:generate # сгенерировать прайс-лист PDF (Python + ReportLab)
```

## Структура

```
app/                    # роуты Next.js (App Router)
  page.tsx              # главная
  domiki/               # /domiki + /domiki/[slug]
  aktivnosti/           # /aktivnosti
  degustacii/           # /degustacii
  akvazona/             # /akvazona
  pitanie/              # /pitanie
  kontakty/             # /kontakty
  bron/                 # /bron + /bron/success
  prays/                # /prays
  api/
    booking/route.ts    # POST /api/booking — приём заявок
    pdf/route.ts        # GET /api/pdf — скачать прайс
  sitemap.ts            # /sitemap.xml
  robots.ts             # /robots.txt

components/
  ui/                   # Navigation, Footer
  sections/             # Hero, TrustBlock, BookingWidget, BookingForm, ActivityCard и др.

lib/
  data/                 # JSON-данные: domiki, wines, activities, prices, breakfasts
  utils/
    price.ts            # утилиты ценообразования + сезонность
    bookingSchema.ts    # zod-схема валидации формы

scripts/
  generate_price.py     # офлайн-генерация PDF прайс-листа на Python (ReportLab)

tests/
  unit/                 # bun:test, 19 тестов (price.ts + bookingSchema.ts)
  e2e/                  # Playwright: navigation, booking, restrictions
```

## Критические ограничения

**Старообрядческий храм на территории НЕ упоминается нигде на сайте.** Это
жёсткое ограничение, проверяется автоматически через `tests/e2e/restrictions.spec.ts`.
Тест проходится по всем страницам и ищет слова: `храм`, `церковь`, `chapel`,
`church`, `старообряд`. Любое упоминание ломает билд.

## Деплой на GitHub Pages (текущий)

Сайт развёрнут как статический экспорт Next.js. Все API-маршруты заменены
на клиентскую логику:

- **Форма бронирования** — открывает Telegram-чат с готовым текстом и
  параллельно `mailto:` на info@lesnaya-обитель.ru. Никаких токенов на клиенте,
  никаких приватных эндпоинтов.
- **PDF-прайс** — пред-сгенерирован скриптом `scripts/prebuild-pdf.mjs` в
  `public/prays.pdf` перед билдом.

### Как развернуть

1. Создать репозиторий на GitHub и запушить туда содержимое `lesnaya-obitel/`.
2. В **Settings → Pages → Source** выбрать **GitHub Actions**.
3. Запушить в `main` — workflow `.github/workflows/deploy.yml` сам:
   - установит Bun
   - запустит `bun test tests/unit`
   - соберёт статический экспорт с правильным `basePath`
   - опубликует на Pages

URL по умолчанию: `https://<username>.github.io/<repo>/`

### Свой домен

В `Settings → Pages → Custom domain` добавить домен и положить
`public/CNAME` с одной строкой — именем домена.

При своём домене **убрать** `basePath` — переменная `GITHUB_REPOSITORY`
должна быть пустой или содержать `<user>.github.io`. В workflow это можно
сделать через `env`.

## Деплой на Vercel (альтернатива)

### Через GitHub + Vercel UI

1. Залить проект в GitHub.
2. На vercel.com подключить репозиторий — Next.js определится автоматически.
3. В Project Settings → Environment Variables добавить:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_YANDEX_MAPS_KEY`
   - `NEXT_PUBLIC_BASE_URL`
4. Подключить домен через Settings → Domains.

### Через Vercel CLI

```bash
bunx vercel login        # OAuth-флоу через браузер
bunx vercel              # preview-деплой
bunx vercel --prod       # production-деплой
```

Или с токеном (для CI/CD):

```bash
VERCEL_TOKEN=xxx bunx vercel --prod --token=$VERCEL_TOKEN
```

## Переменные окружения

Все ключи опциональны: при отсутствии заявки уходят только в server-логи.
См. `.env.example`.

## PDF-прайс

Доступен двумя путями:

1. **Runtime** (всегда актуальный): `GET /api/pdf` — генерируется на лету
   через pdfkit из `lib/data/prices.json`.
2. **Offline** (для рассылок и печати): `python scripts/generate_price.py
   --output prays.pdf` — использует ReportLab, поддерживает русский текст
   из коробки.

## Тон и текстовая часть

Тихий, уверенный, глубокий. Никаких восклицательных знаков, никаких
«незабываемых отдыхов» и «лучших баз». Все тексты — на русском.

«Вино, которое росло здесь. Тишина, которую не привозят.»
