# Лесная Обитель

Сайт частной эко-базы у скалы Красный Камень (Краснокаменка, ЮБК).
Живая версия: https://qwentytorantiny73.github.io/lesnaya-obitel/

## Стек

| Задача | Решение | Почему |
|---|---|---|
| Сайт | [Astro](https://astro.build) 7, TypeScript | Отдаёт готовый HTML, JavaScript только там, где он нужен (форма брони, калькулятор) |
| Стили | Tailwind CSS 4 + система тонов в `src/styles/global.css` | Цвет текста выводится из тона секции — светлый текст не попадёт на светлый фон |
| Шрифты | Playfair Display, Cormorant Garamond, Inter — с сайта, без Google | Не зависят от внешних сервисов |
| PDF-прайс | pdfkit, `scripts/build-pdf.ts` | Собирается из тех же данных, что и сайт |
| Тесты | `bun test`: цены, валидация, контраст палитры | Палитру нельзя сломать незаметно |
| Проверка сборки | `scripts/check-dist.ts` | Битые ссылки, устаревшие контакты и запрещённые темы не попадут на сайт |
| Хостинг | GitHub Pages через GitHub Actions | Бесплатно, деплой при каждом пуше в `main` |

## Где что менять

| Что | Файл |
|---|---|
| Телефон, Telegram, адрес, ссылки на Циан и Авито, реквизиты | `src/data/site.ts` |
| Домики и цены по сезонам | `src/data/domiki.json` |
| Активности | `src/data/activities.json` |
| Вина | `src/data/wines.json` |
| Завтраки | `src/data/breakfasts.json` |
| Аквазона и дегустации | `src/data/prices.json` |
| Цвета и шрифты | `src/styles/global.css` |

Цены везде (страницы, калькулятор, форма брони, PDF) берутся из этих файлов — достаточно поменять в одном месте.

Фотографии: положите файлы в `public/images/` и передайте путь в компонент `ArtTile` (`src="images/apartamenty.jpg"`) — художественная плитка заменится фото.

## Запуск на своём компьютере

Нужен [Bun](https://bun.sh) 1.3+.

```bash
bun install
bun run dev        # http://localhost:4321/lesnaya-obitel/
bun run test       # тесты
bun run build      # PDF + сборка в dist/ + проверка dist
bun run preview    # посмотреть собранную версию
```

## Развёртывание на GitHub Pages

Деплой полностью автоматический: каждый пуш в ветку `main` запускает `.github/workflows/deploy.yml` —
тесты → проверка типов → PDF → сборка → проверка dist → публикация. Если любой шаг падает, сайт не меняется.

Один раз в репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions** (уже включено).

Обычная правка:

```bash
git add -A
git commit -m "Обновил цены на сезон"
git push origin main
```

Через 1–2 минуты изменения на сайте. Ход сборки — во вкладке **Actions** репозитория.

### Свой домен

1. Купите домен у российского регистратора (например, `lesnaya-obitel.ru`).
2. В DNS добавьте записи `A` на адреса GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. **Settings → Pages → Custom domain** — впишите домен, включите **Enforce HTTPS**.
4. В `astro.config.mjs`: `site: "https://lesnaya-obitel.ru"`, `base: "/"`; в `scripts/check-dist.ts`: `BASE = "/"`.

### Откат

Версия до редизайна сохранена под тегом `v1-nextjs`. Вернуть любую версию: `git revert <коммит>` и пуш в `main`.
