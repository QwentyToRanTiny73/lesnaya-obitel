/**
 * Проверка готовой сборки (dist/) — запускается после astro build (postbuild).
 * Ловит то, что уже однажды попадало на сайт:
 *  - внутренние ссылки мимо base (/prays.pdf вместо /lesnaya-obitel/prays.pdf) и на несуществующие файлы;
 *  - запрещённые темы и устаревшие данные (старые контакты, слоган, «7 га»…);
 *  - отсутствие ключевых страниц.
 * Любая ошибка — код выхода 1, деплой не происходит.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const dist = join(import.meta.dir, "..", "dist");
const BASE = "/lesnaya-obitel/";

const forbidden: [RegExp, string][] = [
  [/храм|церков|часовн|chapel|church|старообряд/i, "запрещённая тема (храм)"],
  [/новозавед/i, "Новозаведённое (вина — свои, с Красного Камня)"],
  [/вино,\s*которое росло/i, "удалённый слоган"],
  [/777-66-55|79787776655|t\.me\/lesnaya_obitel|wa\.me\//i, "устаревшие контакты"],
  [/info@lesnaya-obitel\.ru/i, "почта на несуществующем домене"],
  [/(?<!\d)7\s?га(?![а-яё])|семи гектар|15 домик|пятнадцать домик/i, "устаревшие цифры (сейчас 8 га, 14 домиков)"],
  [/день\s*—\s*2\s?500/i, "Talaria 2500 — это модель, а не цена"],
];

const required = [
  "index.html", "404.html", "prays.pdf", "sitemap-index.xml", "favicon.svg",
  "domiki/index.html", "aktivnosti/index.html", "degustacii/index.html", "akvazona/index.html",
  "pitanie/index.html", "prays/index.html", "kontakty/index.html", "bron/index.html",
  "politika-konfidencialnosti/index.html", "soglasie/index.html",
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const errors: string[] = [];
if (!existsSync(dist)) {
  console.error("dist/ не найден — сначала astro build");
  process.exit(1);
}

for (const f of required) if (!existsSync(join(dist, f))) errors.push(`нет файла: ${f}`);

function resolveTarget(href: string): string | null {
  const clean = decodeURI(href.split("#")[0].split("?")[0]);
  if (!clean.startsWith(BASE)) return null;
  const rel = clean.slice(BASE.length);
  const candidates = rel === "" || rel.endsWith("/") ? [join(rel, "index.html")] : [rel, join(rel, "index.html")];
  return candidates.find((c) => existsSync(join(dist, c))) ?? candidates[0];
}

const htmlFiles = walk(dist).filter((f) => f.endsWith(".html"));
for (const file of htmlFiles) {
  const name = relative(dist, file).replaceAll("\\", "/");
  const html = readFileSync(file, "utf8");
  const visible = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ");

  for (const [re, why] of forbidden) {
    const m = visible.match(re);
    if (m) errors.push(`${name}: ${why} — «${m[0]}»`);
  }

  for (const [, attr, value] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    if (!value.startsWith(BASE)) {
      errors.push(`${name}: ${attr}="${value}" идёт мимо ${BASE} — на GitHub Pages будет 404`);
      continue;
    }
    const target = resolveTarget(value);
    if (target && !existsSync(join(dist, target))) errors.push(`${name}: битая ссылка ${value}`);
  }
}

if (errors.length) {
  console.error(`\n✗ Проверка dist не пройдена (${errors.length}):\n` + errors.map((e) => `  · ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ dist проверен: ${htmlFiles.length} страниц, ссылки целы, запрещённых и устаревших данных нет`);
