/**
 * Sylvan Cartography — exemplar primum.
 * A3 portrait. Финальная огранка: рукотворная зыбь линий,
 * выверенная иерархия шёпота и единственный громкий жест — мотто.
 */
import PDFDocument from "pdfkit";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "sylvan-cartography.pdf");

const PAGE_W = 297 * 2.83465;
const PAGE_H = 420 * 2.83465;

const COL = {
  bg: "#152C20",
  goldHi: "#D4A853",
  gold: "#C8963E",
  goldMid: "#A07A30",
  goldFaint: "#6A5326",
  goldGhost: "#3F3318",
  cream: "#EFE6D2",
  sand: "#A99A78",
  sandFaint: "#6E6549",
};

const doc = new PDFDocument({
  size: [PAGE_W, PAGE_H],
  margin: 0,
  info: {
    Title: "Sylvan Cartography — exemplar primum",
    Author: "ex collectione LO",
    Subject: "Krasnokamenka, Tauria meridionalis",
    Keywords: "cartographia silentii, hectaria septem",
  },
});

doc.registerFont("serif", "C:/Windows/Fonts/georgia.ttf");
doc.registerFont("serif-italic", "C:/Windows/Fonts/georgiai.ttf");
doc.registerFont("serif-bold", "C:/Windows/Fonts/georgiab.ttf");

const chunks = [];
doc.on("data", (c) => chunks.push(c));
const done = new Promise((r) => doc.on("end", r));

// ─────────────────────────────────────────────────────────────────────
// 1. ПОЛЕ
// ─────────────────────────────────────────────────────────────────────
doc.rect(0, 0, PAGE_W, PAGE_H).fill(COL.bg);

// Тончайшая «бумажная» зыбь — рассеянные точки, имитирующие зерно
const seedRand = mulberry(0x4f3210);
for (let i = 0; i < 1800; i++) {
  const x = seedRand() * PAGE_W;
  const y = seedRand() * PAGE_H;
  const r = seedRand() * 0.35;
  doc.circle(x, y, r).fillOpacity(0.35).fill(COL.goldGhost);
}
doc.fillOpacity(1);

// Рамка
const margin = 56;
const inner = {
  x: margin,
  y: margin,
  w: PAGE_W - margin * 2,
  h: PAGE_H - margin * 2,
};

doc.rect(inner.x, inner.y, inner.w, inner.h)
  .lineWidth(0.35).strokeColor(COL.goldFaint).stroke();

const off = 9;
doc.rect(inner.x + off, inner.y + off, inner.w - off * 2, inner.h - off * 2)
  .lineWidth(0.2).strokeColor(COL.goldGhost).stroke();

// Угловые засечки — короткие, аккуратные
const cornerLen = 11;
[
  [inner.x + off, inner.y + off, 1, 1],
  [inner.x + inner.w - off, inner.y + off, -1, 1],
  [inner.x + off, inner.y + inner.h - off, 1, -1],
  [inner.x + inner.w - off, inner.y + inner.h - off, -1, -1],
].forEach(([x, y, dx, dy]) => {
  doc.moveTo(x, y).lineTo(x + dx * cornerLen, y).lineWidth(0.6).strokeColor(COL.gold).stroke();
  doc.moveTo(x, y).lineTo(x, y + dy * cornerLen).lineWidth(0.6).strokeColor(COL.gold).stroke();
});

// Регистрационные кресты-приводки на углах внешней рамки — едва видимые
[
  [inner.x - 14, inner.y - 14],
  [inner.x + inner.w + 14, inner.y - 14],
  [inner.x - 14, inner.y + inner.h + 14],
  [inner.x + inner.w + 14, inner.y + inner.h + 14],
].forEach(([x, y]) => {
  const r = 4.5;
  doc.moveTo(x - r, y).lineTo(x + r, y).lineWidth(0.3).strokeColor(COL.goldGhost).stroke();
  doc.moveTo(x, y - r).lineTo(x, y + r).lineWidth(0.3).strokeColor(COL.goldGhost).stroke();
  doc.circle(x, y, 2.5).lineWidth(0.3).strokeColor(COL.goldGhost).stroke();
});

// ─────────────────────────────────────────────────────────────────────
// 2. ВЕРХНЯЯ ПОЛОСА — ТИТУЛ
// ─────────────────────────────────────────────────────────────────────
const HEAD_Y = inner.y + 56;

// Двойная горизонталь
doc.moveTo(inner.x + 70, HEAD_Y).lineTo(inner.x + inner.w - 70, HEAD_Y)
  .lineWidth(0.4).strokeColor(COL.goldMid).stroke();
doc.moveTo(inner.x + 110, HEAD_Y + 3).lineTo(inner.x + inner.w - 110, HEAD_Y + 3)
  .lineWidth(0.18).strokeColor(COL.goldGhost).stroke();

doc.font("serif-italic").fontSize(7.5).fillColor(COL.sand);
doc.text("tabvla I", inner.x + 70, HEAD_Y - 13, { width: 80, align: "left", characterSpacing: 1.5 });

doc.font("serif").fontSize(11).fillColor(COL.cream);
doc.text("SILVA · MEMORIA · SILENTIVM", 0, HEAD_Y - 14, {
  width: PAGE_W, align: "center", characterSpacing: 5,
});

doc.font("serif-italic").fontSize(7.5).fillColor(COL.sand);
doc.text("MMXXIV", inner.x + inner.w - 150, HEAD_Y - 13, {
  width: 80, align: "right", characterSpacing: 1.5,
});

doc.font("serif-italic").fontSize(8.5).fillColor(COL.goldHi);
doc.text(
  "ex observationibus septem hectarium  ·  Tauria meridionalis",
  0, HEAD_Y + 12, { width: PAGE_W, align: "center" }
);

// ─────────────────────────────────────────────────────────────────────
// 3. КАРТУШИ ПО БОКАМ — координаты и элементы
// ─────────────────────────────────────────────────────────────────────
function cartouche(x, y, w, lines) {
  const pad = 11;
  const lh = 12;
  const h = lines.length * lh + pad * 2;

  // тонкая внешняя обводка
  doc.rect(x, y, w, h).lineWidth(0.3).strokeColor(COL.goldFaint).stroke();
  // внутренняя двойная
  const ix = 4;
  doc.rect(x + ix, y + ix, w - ix * 2, h - ix * 2)
    .lineWidth(0.15).strokeColor(COL.goldGhost).stroke();

  // ромбики на 4 углах
  [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(([px, py]) => {
    doc.save();
    doc.translate(px, py).rotate(45);
    doc.rect(-1.6, -1.6, 3.2, 3.2).fill(COL.gold);
    doc.restore();
  });

  lines.forEach((line, i) => {
    const yy = y + pad + i * lh;
    if (line.k === "title") {
      doc.font("serif").fontSize(7).fillColor(COL.cream);
      doc.text(line.t, x + pad, yy, { width: w - pad * 2, align: "left", characterSpacing: 3 });
    } else if (line.k === "italic") {
      doc.font("serif-italic").fontSize(7.5).fillColor(COL.goldHi);
      doc.text(line.t, x + pad, yy, { width: w - pad * 2, align: "left" });
    } else if (line.k === "rule") {
      doc.moveTo(x + pad, yy + 3).lineTo(x + w - pad, yy + 3)
        .lineWidth(0.2).strokeColor(COL.goldGhost).stroke();
    } else {
      doc.font("serif").fontSize(7).fillColor(COL.sand);
      doc.text(line.t, x + pad, yy, { width: w - pad * 2, align: "left" });
    }
  });
}

cartouche(inner.x + 70, HEAD_Y + 60, 160, [
  { k: "title", t: "COORDINATA" },
  { k: "rule" },
  { k: "italic", t: "44° 33′ N" },
  { k: "italic", t: "34° 18′ E" },
  { k: "plain",  t: "altitvdo · 380 m" },
  { k: "plain",  t: "exspositio · meridiana" },
]);

cartouche(inner.x + inner.w - 70 - 160, HEAD_Y + 60, 160, [
  { k: "title", t: "ELEMENTA" },
  { k: "rule" },
  { k: "italic", t: "silva · pinea" },
  { k: "italic", t: "petra · rvbra" },
  { k: "italic", t: "fons · perennis" },
  { k: "italic", t: "vitis · cvltivatior" },
]);

// ─────────────────────────────────────────────────────────────────────
// 4. ЦЕНТРАЛЬНАЯ ФИГУРА — топографический контур (рукотворный)
// ─────────────────────────────────────────────────────────────────────
const cx = PAGE_W / 2;
const cy = PAGE_H * 0.50;

// Радиус с асимметричной модуляцией; тонкая «дрожь» по точкам имитирует руку.
function isolineRadius(t, layer, jitter) {
  const base = 88 + layer * 17.5;
  const wob =
    Math.sin(t * 3.0) * (11.5 - layer * 0.35) +
    Math.sin(t * 4.7 + layer * 0.7) * (5.6 - layer * 0.18) +
    Math.cos(t * 2.1 + layer * 1.3) * (7.2 - layer * 0.28) +
    Math.sin(t * 7.3 + layer * 0.4) * (1.8 - layer * 0.05);
  return base + wob + jitter;
}

const LAYERS = 16;
for (let layer = LAYERS - 1; layer >= 0; layer--) {
  const tone =
    layer < 2 ? COL.goldHi
    : layer < 5 ? COL.gold
    : layer < 9 ? COL.goldMid
    : layer < 13 ? COL.goldFaint
    : COL.goldGhost;
  const lw = layer < 2 ? 0.6 : layer < 5 ? 0.45 : layer < 9 ? 0.35 : 0.25;

  doc.strokeColor(tone).lineWidth(lw);

  // у каждого слоя своя «псевдо-случайность», но детерминированная.
  const rand = mulberry(0x9a + layer * 31);
  const segments = 540;
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const jitter = (rand() - 0.5) * 0.9;
    const r = isolineRadius(t, layer, jitter);
    const x = cx + Math.cos(t) * r;
    const y = cy + Math.sin(t) * r * 0.78;
    if (i === 0) doc.moveTo(x, y);
    else doc.lineTo(x, y);
  }
  doc.stroke();
}

// «Печать» вершины: тончайшая шестигранная розетка вокруг точки
const APEX_R = 5.2;
doc.lineWidth(0.45).strokeColor(COL.goldHi);
for (let k = 0; k < 6; k++) {
  const a = (k / 6) * Math.PI * 2;
  const ax = cx + Math.cos(a) * APEX_R;
  const ay = cy + Math.sin(a) * APEX_R * 0.78;
  doc.moveTo(cx, cy).lineTo(ax, ay).stroke();
}
doc.circle(cx, cy, 1.8).fill(COL.cream);
doc.circle(cx, cy, APEX_R + 1).lineWidth(0.35).strokeColor(COL.goldMid).stroke();

// ─────────────────────────────────────────────────────────────────────
// 5. СЕМЬ STATIO
// ─────────────────────────────────────────────────────────────────────
const stations = [
  { n: "STATIO·I",    s: "fons",       a: -Math.PI / 2 - 0.12 },
  { n: "STATIO·II",   s: "vitis",      a: -Math.PI / 2 + 0.78 },
  { n: "STATIO·III",  s: "lacvs",      a: -Math.PI / 2 + 1.74 },
  { n: "STATIO·IV",   s: "qvercvs",    a: -Math.PI / 2 + 2.62 },
  { n: "STATIO·V",    s: "via",        a: -Math.PI / 2 + 3.48 },
  { n: "STATIO·VI",   s: "petra",      a: -Math.PI / 2 + 4.32 },
  { n: "STATIO·VII",  s: "silentivm",  a: -Math.PI / 2 + 5.30 },
];

stations.forEach((st) => {
  const rOuter = 270;
  const rInner = 244;
  const sx = cx + Math.cos(st.a) * rOuter;
  const sy = cy + Math.sin(st.a) * rOuter * 0.78;
  const tx = cx + Math.cos(st.a) * rInner;
  const ty = cy + Math.sin(st.a) * rInner * 0.78;

  // тонкая жилка от изоплеты к маркеру
  doc.moveTo(tx, ty).lineTo(sx, sy)
    .lineWidth(0.3).strokeColor(COL.goldMid).stroke();

  // маркер: ажурный крест в круге
  const k = 2.8;
  doc.moveTo(sx - k, sy).lineTo(sx + k, sy)
    .lineWidth(0.55).strokeColor(COL.gold).stroke();
  doc.moveTo(sx, sy - k).lineTo(sx, sy + k)
    .lineWidth(0.55).strokeColor(COL.gold).stroke();
  doc.circle(sx, sy, 3.4).lineWidth(0.4).strokeColor(COL.goldHi).stroke();

  // подпись с правильной ориентацией к центру
  const labelOff = 12;
  const labelX = sx + Math.cos(st.a) * labelOff;
  const labelY = sy + Math.sin(st.a) * labelOff;
  const align = Math.cos(st.a) > 0.05 ? "left" : Math.cos(st.a) < -0.05 ? "right" : "center";
  const lboxW = 78;
  const lboxX =
    align === "left" ? labelX
    : align === "right" ? labelX - lboxW
    : labelX - lboxW / 2;

  doc.font("serif").fontSize(6.3).fillColor(COL.cream);
  doc.text(st.n, lboxX, labelY - 8, { width: lboxW, align, characterSpacing: 1.5 });

  doc.font("serif-italic").fontSize(6.5).fillColor(COL.goldHi);
  doc.text(st.s, lboxX, labelY - 0.5, { width: lboxW, align });
});

// ─────────────────────────────────────────────────────────────────────
// 6. ШКАЛА — мерило тишины
// ─────────────────────────────────────────────────────────────────────
const scaleY = cy + 290;
const scaleW = 220;
const scaleX = cx - scaleW / 2;

// Двойная линия
doc.moveTo(scaleX, scaleY).lineTo(scaleX + scaleW, scaleY)
  .lineWidth(0.6).strokeColor(COL.goldHi).stroke();
doc.moveTo(scaleX, scaleY + 2.2).lineTo(scaleX + scaleW, scaleY + 2.2)
  .lineWidth(0.25).strokeColor(COL.goldFaint).stroke();

for (let i = 0; i <= 7; i++) {
  const x = scaleX + (i / 7) * scaleW;
  const major = i === 0 || i === 7;
  const tickLen = major ? 7.5 : 4;
  doc.moveTo(x, scaleY).lineTo(x, scaleY - tickLen)
    .lineWidth(major ? 0.7 : 0.4).strokeColor(COL.gold).stroke();

  doc.font("serif").fontSize(6).fillColor(COL.sand);
  doc.text(String(i), x - 6, scaleY + 6, { width: 12, align: "center" });
}

doc.font("serif-italic").fontSize(7).fillColor(COL.goldHi);
doc.text("hectaria · silentii mensvra", scaleX, scaleY + 20, {
  width: scaleW, align: "center",
});

// ─────────────────────────────────────────────────────────────────────
// 7. ГЛОССАРИЙ
// ─────────────────────────────────────────────────────────────────────
const glossY = scaleY + 56;
const glossW = 380;
const glossX = cx - glossW / 2;

doc.font("serif").fontSize(7).fillColor(COL.cream);
doc.text("GLOSSARIVM", 0, glossY, {
  width: PAGE_W, align: "center", characterSpacing: 4,
});

// разделитель — три точки
const dotsY = glossY + 12;
[-8, 0, 8].forEach((d) => {
  doc.circle(cx + d, dotsY, 0.6).fill(COL.gold);
});

const glossEntries = [
  ["fons", "место, где земля отдаёт воду без просьбы"],
  ["vitis", "лоза, пережившая больше зим, чем хозяин"],
  ["petra rvbra", "массив, по которому отбивают часы тени"],
  ["silentivm", "величина, обратная числу прибывших"],
];

glossEntries.forEach((entry, i) => {
  const yy = glossY + 22 + i * 13;
  doc.font("serif-italic").fontSize(7).fillColor(COL.goldHi);
  doc.text(entry[0], glossX, yy, { width: 100, align: "right" });
  doc.font("serif").fontSize(7).fillColor(COL.sand);
  doc.text("· " + entry[1], glossX + 106, yy, {
    width: glossW - 106, align: "left",
  });
});

// ─────────────────────────────────────────────────────────────────────
// 8. ДЕВИЗ — единственный громкий жест
// ─────────────────────────────────────────────────────────────────────
const motoY = inner.y + inner.h - 132;

// Орнаментальный разделитель
const sepW = 220;
doc.moveTo(cx - sepW / 2, motoY).lineTo(cx - 8, motoY)
  .lineWidth(0.4).strokeColor(COL.gold).stroke();
doc.moveTo(cx + 8, motoY).lineTo(cx + sepW / 2, motoY)
  .lineWidth(0.4).strokeColor(COL.gold).stroke();

// Орнамент-розетка в центре
doc.save();
doc.translate(cx, motoY);
doc.rotate(45);
doc.rect(-2, -2, 4, 4).fill(COL.gold);
doc.restore();
doc.circle(cx, motoY, 0.9).fill(COL.bg);

// Девиз — тонкий курсивный антиквенный шрифт
doc.font("serif-italic").fontSize(14).fillColor(COL.cream);
doc.text("Vinum quod hic crevit.", 0, motoY + 18, {
  width: PAGE_W, align: "center",
});
doc.text("Silentivm quod non advehitur.", 0, motoY + 39, {
  width: PAGE_W, align: "center",
});

// Подстрочник
doc.font("serif-italic").fontSize(8).fillColor(COL.sand);
doc.text("Вино, которое росло здесь.", 0, motoY + 65, {
  width: PAGE_W, align: "center",
});
doc.text("Тишина, которую не привозят.", 0, motoY + 78, {
  width: PAGE_W, align: "center",
});

// ─────────────────────────────────────────────────────────────────────
// 9. АТРИБУЦИЯ
// ─────────────────────────────────────────────────────────────────────
const footY = inner.y + inner.h - 28;

doc.moveTo(inner.x + 70, footY - 14).lineTo(inner.x + inner.w - 70, footY - 14)
  .lineWidth(0.25).strokeColor(COL.goldGhost).stroke();

doc.font("serif-italic").fontSize(6.5).fillColor(COL.sandFaint);
doc.text("ex collectione · LO", inner.x + 70, footY - 8, {
  width: 200, align: "left",
});

doc.font("serif").fontSize(6.5).fillColor(COL.sand);
doc.text("EXEMPLAR PRIMVM", 0, footY - 8, {
  width: PAGE_W, align: "center", characterSpacing: 5,
});

doc.font("serif-italic").fontSize(6.5).fillColor(COL.sandFaint);
doc.text("Krasnokamenka · Tauria", inner.x + inner.w - 270, footY - 8, {
  width: 200, align: "right",
});

// ─────────────────────────────────────────────────────────────────────
// Финал
// ─────────────────────────────────────────────────────────────────────
doc.end();
await done;
writeFileSync(out, Buffer.concat(chunks));
console.log(`Canvas → ${out} (${Buffer.concat(chunks).length} bytes, A3)`);

// Детерминированный псевдо-рандом — чтобы каждый запуск выдавал тот же лист.
function mulberry(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
