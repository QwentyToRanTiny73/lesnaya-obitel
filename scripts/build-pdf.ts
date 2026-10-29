/**
 * PDF-прайс → public/prays.pdf. Запускается автоматически перед сборкой (prebuild).
 * Данные — те же JSON, что и на сайте, поэтому прайс и сайт не расходятся.
 *
 * Шрифты Fontsource разбиты по алфавитам (кириллица, латиница, latin-ext с ₽),
 * а pdfkit не умеет подбирать запасной шрифт. Поэтому текст режется на отрезки
 * по алфавиту и каждый печатается своим файлом одной и той же гарнитуры.
 */
import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { join } from "node:path";
import domiki from "../src/data/domiki.json";
import prices from "../src/data/prices.json";
import activities from "../src/data/activities.json";
import breakfasts from "../src/data/breakfasts.json";
import { site, fullAddress } from "../src/data/site";
import { formatPrice, seasonLabels, seasonMonths, type Season } from "../src/lib/price";

const root = join(import.meta.dir, "..");
const fontDir = (pkg: string) => join(root, "node_modules/@fontsource", pkg, "files");

type Family = "display" | "sans" | "sansMedium";
type Subset = "cyrillic" | "latin" | "latin-ext";
const fontFiles: Record<Family, (s: Subset) => string> = {
  display: (s) => join(fontDir("playfair-display"), `playfair-display-${s}-400-normal.woff`),
  sans: (s) => join(fontDir("inter"), `inter-${s}-400-normal.woff`),
  sansMedium: (s) => join(fontDir("inter"), `inter-${s}-500-normal.woff`),
};

const C = {
  deep: "#13241b",
  gold: "#b8925a",
  goldLight: "#d2b47c",
  ink: "#1e2a22",
  muted: "#565c52",
  line: "#ddd2be",
  ivory: "#f2ece1",
};

const PAGE = { w: 595.28, h: 841.89, m: 48 };
const CONTENT_W = PAGE.w - PAGE.m * 2;

const doc = new PDFDocument({
  size: "A4",
  margin: 0,
  info: { Title: `Прайс-лист — ${site.name}`, Author: site.name },
});
for (const fam of Object.keys(fontFiles) as Family[]) {
  for (const s of ["cyrillic", "latin", "latin-ext"] as Subset[]) {
    doc.registerFont(`${fam}-${s}`, fontFiles[fam](s));
  }
}

function subsetOf(ch: string): Subset {
  const cp = ch.codePointAt(0)!;
  if ((cp >= 0x0400 && cp <= 0x04ff) || cp === 0x2116) return "cyrillic";
  if ((cp >= 0x0100 && cp <= 0x024f) || (cp >= 0x20a0 && cp <= 0x20c0 && cp !== 0x20ac) || cp === 0x2113) return "latin-ext";
  return "latin";
}

// Служебные символы веб-типографики, которых нет в шрифтовых файлах
const clean = (s: string) => s.replace(/⁠/g, "").replace(/ /g, " ");

function runs(text: string, family: Family): { font: string; text: string }[] {
  const out: { font: string; text: string }[] = [];
  for (const ch of clean(text)) {
    // В кириллическом файле только буквы: пробелы, цифры и знаки — из латинского.
    // Знака ₽ нет в Playfair — он всегда печатается Inter.
    const fam = ch === "₽" && family === "display" ? "sans" : family;
    const font = `${fam}-${subsetOf(ch)}`;
    const last = out[out.length - 1];
    if (last && last.font === font) last.text += ch;
    else out.push({ font, text: ch });
  }
  return out;
}

function measure(text: string, family: Family, size: number, spacing = 0): number {
  return runs(text, family).reduce(
    (w, r) => w + doc.font(r.font).fontSize(size).widthOfString(r.text, { characterSpacing: spacing }) + spacing,
    0,
  );
}

function drawLine(text: string, x: number, y: number, family: Family, size: number, color: string, spacing = 0) {
  let cx = x;
  doc.fillColor(color);
  for (const r of runs(text, family)) {
    doc.font(r.font).fontSize(size).text(r.text, cx, y, { lineBreak: false, characterSpacing: spacing });
    cx += doc.widthOfString(r.text, { characterSpacing: spacing }) + spacing;
  }
}

interface TextOpts {
  family?: Family;
  size?: number;
  color?: string;
  width?: number;
  align?: "left" | "right" | "center";
  lineGap?: number;
  spacing?: number;
}

/** Текст с переносом по словам. Возвращает высоту блока. */
function text(str: string, x: number, y: number, o: TextOpts = {}): number {
  const { family = "sans", size = 10, color = C.ink, width = CONTENT_W, align = "left", lineGap = 3 } = o;
  const sp = o.spacing ?? 0;
  const words = str.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (measure(candidate, family, size, sp) > width && line) {
      lines.push(line);
      line = w;
    } else line = candidate;
  }
  if (line) lines.push(line);
  const lh = size + lineGap;
  lines.forEach((l, i) => {
    const lw = measure(l, family, size, sp);
    const lx = align === "right" ? x + width - lw : align === "center" ? x + (width - lw) / 2 : x;
    drawLine(l, lx, y + i * lh, family, size, color, sp);
  });
  return lines.length * lh;
}

let y = 0;

function header(first: boolean) {
  const h = first ? 210 : 56;
  doc.rect(0, 0, PAGE.w, h).fill(C.deep);
  if (first) {
    text("КРАСНОКАМЕНКА · ЮЖНЫЙ БЕРЕГ КРЫМА", PAGE.m, 44, { size: 7.5, color: C.goldLight, family: "sansMedium", spacing: 1.6 });
    text(site.name, PAGE.m, 66, { family: "display", size: 38, color: C.ivory });
    text("Прайс-лист", PAGE.m, 116, { family: "display", size: 18, color: C.goldLight });
    text(site.tagline, PAGE.m, 146, { size: 10, color: "#c2baa8" });
    text(`${site.phone.display}  ·  Telegram @${site.telegram}`, PAGE.m, 176, { size: 9, color: C.ivory });
  } else {
    text(site.name, PAGE.m, 22, { family: "display", size: 14, color: C.ivory });
    text("Прайс-лист", PAGE.m, 24, { size: 9, color: C.goldLight, align: "right" });
  }
  y = h + 34;
}

function ensure(space: number) {
  if (y + space > PAGE.h - 70) {
    footer();
    doc.addPage();
    header(false);
  }
}

let pageNo = 1;
function footer() {
  doc.moveTo(PAGE.m, PAGE.h - 46).lineTo(PAGE.w - PAGE.m, PAGE.h - 46).lineWidth(0.5).strokeColor(C.line).stroke();
  text(fullAddress, PAGE.m, PAGE.h - 36, { size: 7, color: C.muted, width: CONTENT_W - 40 });
  text(String(pageNo++), PAGE.m, PAGE.h - 36, { size: 7, color: C.muted, align: "right" });
}

function section(title: string, note?: string) {
  ensure(90);
  text(title, PAGE.m, y, { family: "display", size: 18 });
  y += 26;
  if (note) y += text(note, PAGE.m, y, { size: 8.5, color: C.muted }) + 2;
  doc.moveTo(PAGE.m, y + 4).lineTo(PAGE.w - PAGE.m, y + 4).lineWidth(0.8).strokeColor(C.gold).stroke();
  y += 16;
}

/** Строка: название (+ пояснение) слева, цены справа в колонках. */
function row(label: string, sub: string | null, values: string[], colW = 92) {
  const labelW = CONTENT_W - colW * values.length - 8;
  const h1 = 14;
  const subH = sub ? measureBlock(sub, labelW, 8) : 0;
  const rowH = Math.max(h1 + subH, 16) + 14;
  ensure(rowH + 4);
  text(label, PAGE.m, y, { size: 10.5, family: "sansMedium", width: labelW });
  if (sub) text(sub, PAGE.m, y + h1 + 1, { size: 8, color: C.muted, width: labelW });
  values.forEach((v, i) => {
    text(v, PAGE.m + labelW + 8 + i * colW, y, { family: "display", size: 11, width: colW, align: "right" });
  });
  y += rowH;
  doc.moveTo(PAGE.m, y - 7).lineTo(PAGE.w - PAGE.m, y - 7).lineWidth(0.4).strokeColor(C.line).stroke();
}

function measureBlock(str: string, width: number, size: number) {
  const words = str.split(" ");
  let lines = 1;
  let line = "";
  for (const w of words) {
    const c = line ? `${line} ${w}` : w;
    if (measure(c, "sans", size) > width && line) {
      lines++;
      line = w;
    } else line = c;
  }
  return lines * (size + 3);
}

function colHeads(labels: string[], colW = 92) {
  const labelW = CONTENT_W - colW * labels.length - 8;
  labels.forEach((l, i) => {
    text(l.toUpperCase(), PAGE.m + labelW + 8 + i * colW, y - 4, { size: 6.5, color: C.muted, width: colW, align: "right", family: "sansMedium" });
  });
  y += 12;
}

const range = (min: number, max: number | null) =>
  !max || min === max ? formatPrice(min) : `${formatPrice(min).replace(/ ₽$/, "")}–${formatPrice(max)}`;

// ── Содержимое ────────────────────────────────────────────────
header(true);

const seasons: Season[] = ["offseason", "season", "peak"];
section("Проживание, за сутки", "Завтрак включён. Минимум 2 ночи, аренда всей базы — от 3 ночей.");
colHeads(seasons.map((s) => `${seasonLabels[s]}`));
for (const d of domiki) {
  row(
    d.title,
    `до ${d.capacity} гостей`,
    seasons.map((s) => (d.prices[s] === null ? "—" : `${d.pricePrefix ? "от " : ""}${formatPrice(d.prices[s]!)}`)),
  );
}
y += text(seasons.map((s) => `${seasonLabels[s]} — ${seasonMonths[s]}`).join("   ·   "), PAGE.m, y, { size: 8, color: C.muted }) + 18;

section("Завтраки", "Включены в проживание. Цена — для дополнительного гостя.");
for (const b of breakfasts) row(b.title, b.composition.join(", "), [b.extraGuest], 110);
y += 14;

section("Аквазона", "Финская баня, бассейн с подогревом, комната отдыха. Минимальный заказ — 3 часа.");
for (const t of prices.aquazone) row(t.tariff, t.time, [`${range(t.priceMin, t.priceMax)} ${t.unit.replace("₽", "").trim()}`.trim()], 150);
y += 14;

section("Дегустации", "18+. Чрезмерное употребление алкоголя вредит вашему здоровью.");
for (const d of prices.degustations)
  row(d.format, d.composition, [`${d.priceMax === null ? "от " : ""}${range(d.priceMin, d.priceMax)} ${d.unit.replace("₽", "").trim()}`], 150);
y += 14;

section("Активности");
for (const a of [...activities.own, ...activities.partner, ...activities.special]) {
  const note = "priceNote" in a && a.priceNote ? a.priceNote : "partner" in a && a.partner ? `партнёр: ${a.partner}` : null;
  row(a.title, note, [a.price], 150);
}
y += 10;
ensure(30);
text("Цены ориентировочные — точную стоимость подтвердим при бронировании.", PAGE.m, y, { size: 8, color: C.muted });
footer();

mkdirSync(join(root, "public"), { recursive: true });
const out = join(root, "public", "prays.pdf");
const stream = createWriteStream(out);
doc.pipe(stream);
doc.end();
await new Promise<void>((resolve) => stream.on("finish", () => resolve()));
console.log(`PDF-прайс → public/prays.pdf (${pageNo - 1} стр.)`);
