#!/usr/bin/env python3
"""
Генератор PDF прайс-листа для базы отдыха «Лесная Обитель».
Используется для офлайн-генерации (при подготовке релиза, рассылок).

Зависимости:
    pip install reportlab

Запуск:
    python generate_price.py [--output prays.pdf]
"""

import argparse
import json
import os
import sys
from pathlib import Path

try:
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import cm
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.platypus import (
        SimpleDocTemplate,
        Paragraph,
        Spacer,
        Table,
        TableStyle,
        PageBreak,
    )
except ImportError:
    print("Установите зависимости: pip install reportlab", file=sys.stderr)
    sys.exit(1)

# Цвета фирменного стиля
FOREST_DARK = colors.HexColor("#1A3A2A")
FOREST = colors.HexColor("#2C5F2D")
GOLD = colors.HexColor("#C8963E")
CREAM = colors.HexColor("#F5F0E8")
SAND = colors.HexColor("#E8DCC8")
TEXT = colors.HexColor("#2C2C2C")
MUTED = colors.HexColor("#888888")


def load_prices(prices_path: Path) -> dict:
    with open(prices_path, "r", encoding="utf-8") as f:
        return json.load(f)


def fmt(n) -> str:
    if n is None:
        return "—"
    return f"{n:,}".replace(",", " ") + " ₽"


def get_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Title-LO",
            fontName="Helvetica-Bold",
            fontSize=28,
            textColor=CREAM,
            alignment=0,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subtitle-LO",
            fontName="Helvetica-Oblique",
            fontSize=12,
            textColor=SAND,
            alignment=0,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section-LO",
            fontName="Helvetica-Bold",
            fontSize=16,
            textColor=FOREST_DARK,
            spaceAfter=12,
            spaceBefore=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body-LO",
            fontName="Helvetica",
            fontSize=10,
            textColor=TEXT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Caption-LO",
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Brand-LO",
            fontName="Helvetica",
            fontSize=8,
            textColor=GOLD,
        )
    )
    return styles


def cover_story(styles):
    return [
        Spacer(1, 4 * cm),
        Paragraph("LESNAYA OBITEL · ЛЕСНАЯ ОБИТЕЛЬ", styles["Brand-LO"]),
        Spacer(1, 2 * cm),
        Paragraph("Прайс-лист", styles["Title-LO"]),
        Paragraph("База отдыха у Красного Камня", styles["Subtitle-LO"]),
        Spacer(1, 1 * cm),
        Paragraph(
            "Вино, которое росло здесь.<br/>Тишина, которую не привозят.",
            ParagraphStyle(
                name="QuoteCover",
                fontName="Helvetica-Oblique",
                fontSize=11,
                textColor=GOLD,
                leading=18,
            ),
        ),
        Spacer(1, 6 * cm),
        Paragraph("Краснокаменка · ЮБК · Крым", styles["Body-LO"]),
        Paragraph(
            "info@lesnaya-obitel.ru &nbsp;&nbsp;·&nbsp;&nbsp; +7 (978) 777-66-55",
            styles["Brand-LO"],
        ),
        PageBreak(),
    ]


def build_table(headers, rows, col_widths):
    data = [headers] + rows
    table = Table(data, colWidths=col_widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST_DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), CREAM),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 9),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
                ("TOPPADDING", (0, 0), (-1, 0), 10),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 9),
                ("TEXTCOLOR", (0, 1), (-1, -1), TEXT),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F5F0E8")]),
                ("LINEBELOW", (0, 0), (-1, 0), 0.8, GOLD),
                ("ALIGN", (1, 0), (-1, -1), "LEFT"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 1), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 1), (-1, -1), 6),
            ]
        )
    )
    return table


def section_accommodation(prices, styles):
    rows = []
    for item in prices["accommodation"]:
        rows.append(
            [
                item["type"],
                item["capacity"],
                fmt(item["offseason"]),
                fmt(item["season"]),
                fmt(item.get("peak")),
            ]
        )
    return [
        Paragraph("Проживание", styles["Section-LO"]),
        Paragraph(
            "Минимальный срок проживания — 2 ночи. Завтрак включён в стоимость всех вариантов.",
            styles["Caption-LO"],
        ),
        Spacer(1, 0.4 * cm),
        build_table(
            ["Тип размещения", "Гостей", "Несезон", "Сезон", "Пик"],
            rows,
            [6 * cm, 2.5 * cm, 2.5 * cm, 2.5 * cm, 2.5 * cm],
        ),
        Spacer(1, 0.8 * cm),
    ]


def section_breakfasts(prices, styles):
    rows = []
    for item in prices["breakfasts"]:
        if "extraGuest" in item and item["extraGuest"]:
            price = fmt(item["extraGuest"])
        else:
            price = f"{fmt(item['extraGuestMin'])} – {fmt(item['extraGuestMax'])}"
        rows.append([item["format"], item["composition"], price])
    return [
        Paragraph("Завтраки", styles["Section-LO"]),
        Paragraph("Завтрак включён в стоимость проживания. Цены — для дополнительных гостей.", styles["Caption-LO"]),
        Spacer(1, 0.4 * cm),
        build_table(
            ["Формат", "Состав", "Доп. гость"],
            rows,
            [4 * cm, 9 * cm, 3 * cm],
        ),
        Spacer(1, 0.8 * cm),
    ]


def section_aquazone(prices, styles):
    rows = []
    for item in prices["aquazone"]:
        if item["priceMin"] == item["priceMax"]:
            price = f"{fmt(item['priceMin'])} {item['unit'].replace('₽', '').strip()}"
        else:
            price = f"{fmt(item['priceMin'])} – {fmt(item['priceMax'])}"
        rows.append([item["tariff"], item["time"], price])
    return [
        Paragraph("Аквазона", styles["Section-LO"]),
        Paragraph("Финская баня и бассейн с подогревом — круглый год. Минимальный заказ — 3 часа.", styles["Caption-LO"]),
        Spacer(1, 0.4 * cm),
        build_table(
            ["Тариф", "Время", "Стоимость"],
            rows,
            [5 * cm, 5 * cm, 6 * cm],
        ),
        Spacer(1, 0.8 * cm),
    ]


def section_degustations(prices, styles):
    rows = []
    for item in prices["degustations"]:
        if not item.get("priceMax") or item["priceMin"] == item["priceMax"]:
            price = fmt(item["priceMin"])
        else:
            price = f"{fmt(item['priceMin'])} – {fmt(item['priceMax'])}"
        rows.append([item["format"], item["composition"], price])
    return [
        Paragraph("Дегустации", styles["Section-LO"]),
        Paragraph("Вина из Новозаведённого, устрицы с фермы «Причал 12», крафтовое пиво.", styles["Caption-LO"]),
        Spacer(1, 0.4 * cm),
        build_table(
            ["Формат", "Состав", "Цена / чел"],
            rows,
            [4 * cm, 9 * cm, 3 * cm],
        ),
        Spacer(1, 0.8 * cm),
    ]


def cover_canvas(canvas, doc):
    """Закрашиваем обложку тёмно-зелёным цветом."""
    if doc.page == 1:
        canvas.saveState()
        canvas.setFillColor(FOREST_DARK)
        canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
        canvas.restoreState()


def main():
    parser = argparse.ArgumentParser(description="Генерация прайс-листа Лесной Обители в PDF")
    parser.add_argument(
        "--output",
        "-o",
        default="lesnaya-obitel-prays.pdf",
        help="Путь к выходному PDF",
    )
    parser.add_argument(
        "--data",
        default=None,
        help="Путь к JSON с ценами (по умолчанию — lib/data/prices.json)",
    )
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent
    prices_path = Path(args.data) if args.data else project_root / "lib" / "data" / "prices.json"

    if not prices_path.exists():
        print(f"Файл цен не найден: {prices_path}", file=sys.stderr)
        sys.exit(1)

    prices = load_prices(prices_path)
    styles = get_styles()

    output_path = Path(args.output)
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        title="Прайс-лист — Лесная Обитель",
        author="Лесная Обитель",
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
    )

    story = []
    story.extend(cover_story(styles))
    story.extend(section_accommodation(prices, styles))
    story.extend(section_breakfasts(prices, styles))
    story.append(PageBreak())
    story.extend(section_aquazone(prices, styles))
    story.extend(section_degustations(prices, styles))
    story.append(Spacer(1, 1 * cm))
    story.append(
        Paragraph(
            "<i>Все цены ориентировочные. Действуют с октября 2024. Уточняйте при бронировании.</i>",
            styles["Caption-LO"],
        )
    )

    doc.build(story, onFirstPage=cover_canvas, onLaterPages=cover_canvas)
    print(f"PDF создан: {output_path.resolve()}")


if __name__ == "__main__":
    main()
