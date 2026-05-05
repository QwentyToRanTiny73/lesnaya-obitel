/**
 * Генерирует статический PDF прайс-листа в /public/prays.pdf
 * перед билдом — чтобы ссылка работала на GitHub Pages.
 *
 * Запускается автоматически в скрипте `build` пакета.
 */
import PDFDocument from "pdfkit";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public");
const outPath = join(outDir, "prays.pdf");

const prices = (await import(join(root, "lib/data/prices.json"), { assert: { type: "json" } })).default;

const COLORS = {
  forestDark: "#1A3A2A",
  gold: "#C8963E",
  cream: "#F5F0E8",
  sand: "#E8DCC8",
  text: "#2C2C2C",
  muted: "#888888",
};

const fmt = (n) => (n == null ? "—" : new Intl.NumberFormat("ru-RU").format(n) + " RUB");

mkdirSync(outDir, { recursive: true });

const doc = new PDFDocument({
  size: "A4",
  margin: 50,
  info: { Title: "Price list — Lesnaya Obitel", Author: "Lesnaya Obitel" },
});

const chunks = [];
doc.on("data", (c) => chunks.push(c));
const done = new Promise((resolve) => doc.on("end", resolve));

// === Cover ===
doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.forestDark);
doc.fillColor(COLORS.gold).fontSize(10).font("Helvetica");
doc.text("LESNAYA OBITEL", 50, 80, { characterSpacing: 4 });
doc.fillColor(COLORS.cream).fontSize(36).font("Helvetica-Bold");
doc.text("Lesnaya Obitel", 50, 200);
doc.fillColor(COLORS.gold).fontSize(20).font("Helvetica");
doc.text("Price list", 50, 250);
doc.fillColor(COLORS.sand).fontSize(11).font("Helvetica-Oblique");
doc.text("Wine that grew here.", 50, 320);
doc.text("Silence that cannot be brought.", 50, 340);
doc.fontSize(9).font("Helvetica").fillColor(COLORS.cream);
doc.text("Krasnokamenka, South coast of Crimea", 50, 760);
doc.fillColor(COLORS.gold).text("info@lesnaya-obitel.ru  +7 (978) 777-66-55", 50, 775);

// === Accommodation ===
doc.addPage();
header(doc, "Accommodation");
let y = 110;
doc.fillColor(COLORS.muted).fontSize(8).font("Helvetica");
doc.text("Type", 50, y);
doc.text("Off-season", 280, y, { width: 80, align: "right" });
doc.text("Season", 360, y, { width: 80, align: "right" });
doc.text("Peak", 440, y, { width: 80, align: "right" });
y += 15;
doc.moveTo(50, y).lineTo(545, y).strokeColor(COLORS.gold).lineWidth(0.5).stroke();
y += 15;

prices.accommodation.forEach((item) => {
  doc.fillColor(COLORS.text).fontSize(11).font("Helvetica-Bold");
  doc.text(item.type, 50, y, { width: 220 });
  doc.fillColor(COLORS.muted).fontSize(8).font("Helvetica");
  doc.text(item.capacity, 50, y + 14, { width: 220 });
  doc.text(item.note || "", 50, y + 26, { width: 220 });
  doc.fillColor(COLORS.text).fontSize(11).font("Helvetica");
  doc.text(fmt(item.offseason), 280, y, { width: 80, align: "right" });
  doc.text(fmt(item.season), 360, y, { width: 80, align: "right" });
  doc.fillColor(COLORS.gold).font("Helvetica-Bold");
  doc.text(item.peak ? fmt(item.peak) : "—", 440, y, { width: 80, align: "right" });
  y += 50;
  doc.moveTo(50, y).lineTo(545, y).strokeColor("#dddddd").lineWidth(0.5).stroke();
  y += 10;
});

// Breakfasts
if (y > 600) doc.addPage();
sub(doc, "Breakfasts", y > 600 ? 110 : y + 20);
let y2 = y > 600 ? 150 : y + 60;
prices.breakfasts.forEach((item) => {
  doc.fillColor(COLORS.text).fontSize(11).font("Helvetica-Bold");
  doc.text(item.format, 50, y2, { width: 200 });
  doc.fillColor(COLORS.muted).fontSize(9).font("Helvetica");
  doc.text(item.composition, 50, y2 + 14, { width: 350 });
  doc.fillColor(COLORS.gold).fontSize(11).font("Helvetica-Bold");
  const price = "extraGuest" in item && item.extraGuest
    ? fmt(item.extraGuest)
    : `${fmt(item.extraGuestMin)} – ${fmt(item.extraGuestMax)}`;
  doc.text(price, 400, y2, { width: 145, align: "right" });
  y2 += 40;
});

// Aquazone + Tastings
doc.addPage();
header(doc, "Aqua zone");
let y3 = 110;
prices.aquazone.forEach((item) => {
  doc.fillColor(COLORS.text).fontSize(11).font("Helvetica-Bold");
  doc.text(item.tariff, 50, y3, { width: 200 });
  doc.fillColor(COLORS.muted).fontSize(9).font("Helvetica");
  doc.text(item.time, 50, y3 + 14);
  doc.fillColor(COLORS.gold).fontSize(11).font("Helvetica-Bold");
  const price = item.priceMin === item.priceMax
    ? `${fmt(item.priceMin)} ${item.unit.replace("₽", "")}`
    : `${fmt(item.priceMin)} – ${fmt(item.priceMax)}`;
  doc.text(price, 350, y3, { width: 195, align: "right" });
  y3 += 40;
});

sub(doc, "Tastings", y3 + 20);
let y4 = y3 + 60;
prices.degustations.forEach((item) => {
  doc.fillColor(COLORS.text).fontSize(11).font("Helvetica-Bold");
  doc.text(item.format, 50, y4, { width: 200 });
  doc.fillColor(COLORS.muted).fontSize(9).font("Helvetica");
  doc.text(item.composition, 50, y4 + 14, { width: 300 });
  doc.fillColor(COLORS.gold).fontSize(11).font("Helvetica-Bold");
  const price = !item.priceMax || item.priceMin === item.priceMax
    ? fmt(item.priceMin)
    : `${fmt(item.priceMin)} – ${fmt(item.priceMax)}`;
  doc.text(price, 350, y4, { width: 195, align: "right" });
  y4 += 40;
});

doc.fillColor(COLORS.muted).fontSize(8).font("Helvetica-Oblique");
doc.text("Indicative prices. Valid from October 2024. Confirm at booking.", 50, 780, {
  width: 495,
  align: "center",
});

doc.end();
await done;
writeFileSync(outPath, Buffer.concat(chunks));
console.log(`PDF generated: ${outPath} (${Buffer.concat(chunks).length} bytes)`);

function header(d, title) {
  d.rect(0, 0, d.page.width, 70).fill(COLORS.forestDark);
  d.fillColor(COLORS.gold).fontSize(8).font("Helvetica");
  d.text("LESNAYA OBITEL", 50, 28, { characterSpacing: 3 });
  d.fillColor(COLORS.cream).fontSize(16).font("Helvetica-Bold");
  d.text(title, 50, 42);
}

function sub(d, title, y) {
  d.fillColor(COLORS.gold).fontSize(8).font("Helvetica");
  d.text(title.toUpperCase(), 50, y, { characterSpacing: 2 });
  d.moveTo(50, y + 14).lineTo(545, y + 14).strokeColor(COLORS.gold).lineWidth(0.5).stroke();
}
