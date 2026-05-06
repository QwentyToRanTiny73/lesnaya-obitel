/**
 * Лесная Обитель · Style Guide PDF
 * A3 портрет, 2 страницы. Палитра + типографика на стр. 1, компоненты на стр. 2.
 */
import PDFDocument from "pdfkit";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "style-guide.pdf");

const PAGE_W = 297 * 2.83465;
const PAGE_H = 420 * 2.83465;

const C = {
  bg:        "#F7F5F0",
  surface:   "#E8E4D9",
  moss:      "#7A8B6E",
  moss700:   "#586850",
  moss300:   "#B8C2A8",
  sage:      "#9CAF88",
  pforest:   "#B8C5B0",
  beige:     "#C4B5A0",
  ink:       "#3D3D3D",
  inkSoft:   "#6B6B6B",
  inkMute:   "#9A9A9A",
  gold:      "#C8963E",
  amber:     "#D4A853",
  rose:      "#D9A6A6",
  ruby:      "#9C3838",
  success:   "#8FA88A",
  warning:   "#D4C5A5",
  error:     "#C49A8A",
};

const doc = new PDFDocument({
  size: [PAGE_W, PAGE_H],
  margin: 0,
  info: {
    Title: "Лесная Обитель · Style Guide v1.0",
    Author: "Лесная Обитель",
    Subject: "Дизайн-система · Pantone-inspired",
  },
});

doc.registerFont("display", "C:/Windows/Fonts/georgiab.ttf");
doc.registerFont("display-italic", "C:/Windows/Fonts/georgiaz.ttf");
doc.registerFont("display-regular", "C:/Windows/Fonts/georgia.ttf");
doc.registerFont("body", "C:/Windows/Fonts/arial.ttf");
doc.registerFont("body-bold", "C:/Windows/Fonts/arialbd.ttf");
doc.registerFont("italic", "C:/Windows/Fonts/georgiai.ttf");

const chunks = [];
doc.on("data", (c) => chunks.push(c));
const done = new Promise((r) => doc.on("end", r));

// ════════════════════════════════════════════════════════════════
// Страница 1 — Палитра + Типографика
// ════════════════════════════════════════════════════════════════
doc.rect(0, 0, PAGE_W, PAGE_H).fill(C.bg);

// Шапка
const M = 56;
doc.rect(M, M, PAGE_W - M * 2, 100).fill(C.surface);
doc.fillColor(C.moss).font("body").fontSize(10);
doc.text("ЛЕСНАЯ ОБИТЕЛЬ · STYLE GUIDE v1.0", M + 24, M + 24, { characterSpacing: 4 });

doc.fillColor(C.ink).font("display").fontSize(44);
doc.text("Дизайн-система", M + 24, M + 44);

doc.fillColor(C.moss700).font("italic").fontSize(13);
doc.text("Тишина, которую не привозят.", M + 24, M + 105);

// Раздел: цвета
let y = M + 200;
section(doc, "01 · Цветовая палитра", y);
y += 50;

// Primary group
swatchGroup(doc, "Primary · Pantone-inspired", y, [
  { token: "moss",     hex: C.moss,     pantone: "5625 C", note: "primary" },
  { token: "sage",     hex: C.sage,     pantone: "5777 C", note: "secondary" },
  { token: "pforest",  hex: C.pforest,  pantone: "7499 C", note: "tertiary" },
  { token: "beige",    hex: C.beige,    pantone: "7527 C", note: "warm beige" },
]);
y += 130;

// Surface
swatchGroup(doc, "Surface", y, [
  { token: "cream",    hex: C.bg,       pantone: "—",      note: "background" },
  { token: "surface",  hex: C.surface,  pantone: "—",      note: "secondary surface" },
  { token: "moss-700", hex: C.moss700,  pantone: "5625 dk", note: "primary hover" },
  { token: "moss-300", hex: C.moss300,  pantone: "—",      note: "borders" },
]);
y += 130;

// Wine
swatchGroup(doc, "Винные акценты", y, [
  { token: "gold",     hex: C.gold,     pantone: "—",      note: "accents" },
  { token: "amber",    hex: C.amber,    pantone: "—",      note: "hover" },
  { token: "rose",     hex: C.rose,     pantone: "—",      note: "rosé tag" },
  { token: "ruby",     hex: C.ruby,     pantone: "—",      note: "red wine" },
]);
y += 130;

// Semantic
swatchGroup(doc, "Семантические", y, [
  { token: "success",  hex: C.success,  pantone: "—",      note: "успех" },
  { token: "warning",  hex: C.warning,  pantone: "—",      note: "soft gold" },
  { token: "error",    hex: C.error,    pantone: "—",      note: "терракота" },
  { token: "ink",      hex: C.ink,      pantone: "—",      note: "12.1:1 на cream" },
]);
y += 150;

// Типографика
section(doc, "02 · Типографика", y);
y += 50;

// 3 гарнитуры
typeShowcase(doc, y, [
  { family: "display",  label: "Display · Playfair Display", sample: "Лесная Обитель", size: 36 },
  { family: "body",     label: "Body · Inter",                sample: "От лозы до бокала.", size: 16 },
  { family: "italic",   label: "Accent · Cormorant Garamond", sample: "Тишина, которую не привозят.", size: 22 },
]);

// Футер
doc.fillColor(C.inkMute).font("body").fontSize(9);
doc.text("design-system/STYLE_GUIDE.md  ·  app/style-guide/", M, PAGE_H - M - 15);
doc.fillColor(C.moss).fontSize(9);
doc.text("01 / 02", PAGE_W - M - 60, PAGE_H - M - 15, { width: 60, align: "right" });

// ════════════════════════════════════════════════════════════════
// Страница 2 — Spacing, Radius, Shadows, Components
// ════════════════════════════════════════════════════════════════
doc.addPage();
doc.rect(0, 0, PAGE_W, PAGE_H).fill(C.bg);

// Шапка
doc.rect(M, M, PAGE_W - M * 2, 60).fill(C.surface);
doc.fillColor(C.moss).font("body").fontSize(10);
doc.text("СТРАНИЦА 02 — СИСТЕМА", M + 24, M + 22, { characterSpacing: 4 });
doc.fillColor(C.ink).font("display").fontSize(20);
doc.text("Spacing · Radius · Shadows · Components", M + 24, M + 36);

let y2 = M + 100;

// Spacing
section(doc, "03 · 8-pt сетка", y2);
y2 += 36;
const spacing = [
  ["xs",  4],  ["sm",  8],  ["md", 16], ["lg", 24],
  ["xl", 32],  ["2xl", 48], ["3xl", 64], ["4xl", 96],
];
spacing.forEach((s, i) => {
  const yy = y2 + i * 22;
  doc.fillColor(C.inkSoft).font("body").fontSize(9);
  doc.text(s[0], M + 24, yy, { width: 40 });
  doc.fillColor(C.inkMute).fontSize(8);
  doc.text(`${s[1]} px`, M + 64, yy, { width: 50 });
  doc.rect(M + 120, yy + 2, s[1] * 2, 8).fill(C.moss);
});
y2 += spacing.length * 22 + 30;

// Border radius
section(doc, "04 · Border radius", y2);
y2 += 36;
const radii = [
  { token: "xs",   value: 4,   note: "inputs" },
  { token: "sm",   value: 8,   note: "buttons" },
  { token: "md",   value: 12,  note: "cards" },
  { token: "lg",   value: 20,  note: "hero" },
  { token: "pill", value: 999, note: "chips" },
];
radii.forEach((r, i) => {
  const x = M + 24 + i * 96;
  const w = r.token === "pill" ? 90 : 70;
  doc.roundedRect(x, y2, w, 60, Math.min(r.value, 30)).fill(C.moss300);
  doc.fillColor(C.ink).font("body-bold").fontSize(9);
  doc.text(r.token, x, y2 + 70, { width: w, align: "center" });
  doc.fillColor(C.inkMute).font("body").fontSize(8);
  doc.text(r.value === 999 ? "999px" : `${r.value} px`, x, y2 + 82, { width: w, align: "center" });
});
y2 += 110;

// Shadows
section(doc, "05 · Тени", y2);
y2 += 36;
const shadows = [
  { token: "xs", opacity: 0.06, offset: 1,  blur: 3 },
  { token: "sm", opacity: 0.08, offset: 2,  blur: 8 },
  { token: "md", opacity: 0.10, offset: 4,  blur: 20 },
  { token: "lg", opacity: 0.12, offset: 8,  blur: 40 },
  { token: "card-hover", opacity: 0.18, offset: 12, blur: 48, tint: C.moss },
];
shadows.forEach((s, i) => {
  const x = M + 24 + i * 96;
  // tень — простой прямоугольник со смещением
  doc.fillOpacity(s.opacity).rect(x + 2, y2 + s.offset, 70, 60).fill(s.tint || C.ink);
  doc.fillOpacity(1).rect(x, y2, 70, 60).fill("#ffffff");
  doc.lineWidth(0.4).strokeColor(C.surface).rect(x, y2, 70, 60).stroke();
  doc.fillColor(C.ink).font("body-bold").fontSize(9);
  doc.text(s.token, x, y2 + 70, { width: 70, align: "center" });
  doc.fillColor(C.inkMute).font("body").fontSize(8);
  doc.text(`${s.offset}/${s.blur}/${Math.round(s.opacity * 100)}%`, x, y2 + 82, { width: 70, align: "center" });
});
y2 += 110;

// Buttons
section(doc, "06 · Кнопки", y2);
y2 += 36;
button(doc, M + 24,  y2, "Забронировать",   "primary");
button(doc, M + 184, y2, "Узнать подробнее", "secondary");
button(doc, M + 372, y2, "Отменить",         "ghost");
button(doc, M + 504, y2, "Дегустация",       "wine");
y2 += 60;

// Card mockup
section(doc, "07 · Карточка байка", y2);
y2 += 36;
cardBike(doc, M + 24,  y2, "Talaria 2500", "от 1 200 ₽");
cardBike(doc, M + 264, y2, "Talaria 2500", "от 1 200 ₽");
cardBike(doc, M + 504, y2, "Talaria 2500", "от 1 200 ₽");

// Footer
doc.fillColor(C.inkMute).font("body").fontSize(9);
doc.text("design-system/STYLE_GUIDE.md  ·  app/style-guide/", M, PAGE_H - M - 15);
doc.fillColor(C.moss).fontSize(9);
doc.text("02 / 02", PAGE_W - M - 60, PAGE_H - M - 15, { width: 60, align: "right" });

doc.end();
await done;
writeFileSync(out, Buffer.concat(chunks));
console.log(`Style guide PDF → ${out} (${Buffer.concat(chunks).length} bytes, A3 × 2 pages)`);

// ── helpers ─────────────────────────────────────────────────────
function section(d, title, y) {
  d.fillColor(C.moss).font("body").fontSize(9);
  d.text(title.split(" · ")[0], M, y, { width: 50, characterSpacing: 2 });
  d.fillColor(C.ink).font("display").fontSize(22);
  d.text(title.split(" · ")[1] || title, M + 50, y - 6);
  d.moveTo(M, y + 24).lineTo(PAGE_W - M, y + 24).lineWidth(0.5).strokeColor(C.moss300).stroke();
}

function swatchGroup(d, title, y, items) {
  d.fillColor(C.inkSoft).font("body-bold").fontSize(9);
  d.text(title.toUpperCase(), M + 24, y, { characterSpacing: 1.5 });
  items.forEach((sw, i) => {
    const x = M + 24 + i * 175;
    const yy = y + 18;
    d.rect(x, yy, 160, 60).fill(sw.hex);
    d.lineWidth(0.4).strokeColor(C.surface).rect(x, yy, 160, 60).stroke();
    d.fillColor(C.ink).font("body-bold").fontSize(10);
    d.text(sw.token, x, yy + 70);
    d.fillColor(C.inkSoft).font("body").fontSize(8);
    d.text(sw.hex.toUpperCase(), x, yy + 82);
    d.fillColor(C.moss).fontSize(8);
    d.text(sw.pantone, x, yy + 92);
    d.fillColor(C.inkMute).fontSize(7);
    d.text(sw.note, x, yy + 102);
  });
}

function typeShowcase(d, y, lines) {
  lines.forEach((l, i) => {
    const yy = y + i * 80;
    // лейбл
    d.fillColor(C.moss).font("body").fontSize(8);
    d.text(l.label.toUpperCase(), M + 24, yy, { characterSpacing: 1.5 });
    // образец
    d.fillColor(C.ink).font(l.family).fontSize(l.size);
    d.text(l.sample, M + 24, yy + 18);
  });
}

function button(d, x, y, text, kind) {
  const padX = 18, h = 40;
  let bg, fg, border;
  if (kind === "primary")   { bg = C.moss; fg = C.bg; border = null; }
  if (kind === "secondary") { bg = C.bg;   fg = C.moss700; border = C.moss300; }
  if (kind === "ghost")     { bg = null;   fg = C.ink; border = null; }
  if (kind === "wine")      { bg = C.gold; fg = C.bg; border = null; }
  const tw = d.font("body-bold").fontSize(11).widthOfString(text);
  const w = tw + padX * 2;
  if (bg) d.roundedRect(x, y, w, h, 8).fill(bg);
  if (border) d.lineWidth(1).strokeColor(border).roundedRect(x, y, w, h, 8).stroke();
  d.fillColor(fg).font("body-bold").fontSize(11);
  d.text(text, x, y + 12, { width: w, align: "center", characterSpacing: 0.4 });
}

function cardBike(d, x, y, title, price) {
  const w = 200, h = 230;
  // тень
  d.fillOpacity(0.08).rect(x + 2, y + 4, w, h).fill(C.ink);
  d.fillOpacity(1);
  // тело
  d.roundedRect(x, y, w, h, 12).fill("#FCFBF8");
  d.lineWidth(0.5).strokeColor(C.surface).roundedRect(x, y, w, h, 12).stroke();
  // фото-плейсхолдер с градиентом
  const grad = d.linearGradient(x, y, x + w, y + 80);
  grad.stop(0, C.moss).stop(1, C.sage);
  d.rect(x, y, w, 80).fill(grad);
  // chip
  d.roundedRect(x + 12, y + 92, 80, 18, 9).fill("#EFF1EB");
  d.fillColor(C.moss700).font("body").fontSize(8);
  d.text("Доступен", x + 12, y + 97, { width: 80, align: "center", characterSpacing: 1 });
  // title
  d.fillColor(C.ink).font("display").fontSize(16);
  d.text(title, x + 12, y + 118);
  // specs
  d.fillColor(C.inkSoft).font("body").fontSize(9);
  d.text("· Запас хода — 80 км", x + 12, y + 142);
  d.text("· Мощность — 2500 W", x + 12, y + 154);
  d.text("· Минимум — 2 часа", x + 12, y + 166);
  // price
  d.fillColor(C.moss).font("display").fontSize(16);
  d.text(price, x + 12, y + 184);
  d.fillColor(C.inkSoft).font("body").fontSize(8);
  d.text("/час", x + 80, y + 192);
  // кнопка
  d.roundedRect(x + 12, y + 208, w - 24, 14, 4).fill(C.moss);
  d.fillColor(C.bg).font("body-bold").fontSize(7);
  d.text("ЗАБРОНИРОВАТЬ", x + 12, y + 213, { width: w - 24, align: "center", characterSpacing: 1.5 });
}
