import { test, expect } from "@playwright/test";

/**
 * КРИТИЧЕСКОЕ ОГРАНИЧЕНИЕ:
 * Старообрядческий храм на территории — НЕ упоминается нигде на сайте.
 * Этот тест должен проходить на каждом деплое.
 */
test.describe("Жёсткое ограничение: упоминания храма", () => {
  const pages = [
    "/",
    "/aktivnosti",
    "/domiki",
    "/degustacii",
    "/kontakty",
    "/akvazona",
    "/pitanie",
    "/bron",
    "/prays",
  ];

  for (const url of pages) {
    test(`${url} не содержит упоминаний храма`, async ({ page }) => {
      await page.goto(url);
      const content = (await page.content()).toLowerCase();
      expect(content, "найдено слово 'храм'").not.toContain("храм");
      expect(content, "найдено слово 'церковь'").not.toContain("церковь");
      expect(content, "найдено слово 'chapel'").not.toContain("chapel");
      expect(content, "найдено слово 'church'").not.toContain("church");
      expect(content, "найдено слово 'старообряд'").not.toContain("старообряд");
    });
  }
});
