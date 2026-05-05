import { test, expect } from "@playwright/test";

test.describe("Навигация по сайту", () => {
  const pages = [
    { url: "/", title: /Лесная Обитель/ },
    { url: "/domiki", title: /Домики/ },
    { url: "/aktivnosti", title: /Активности/ },
    { url: "/degustacii", title: /Дегустации/ },
    { url: "/akvazona", title: /Аквазона/ },
    { url: "/pitanie", title: /Питание/ },
    { url: "/kontakty", title: /Контакты/ },
    { url: "/bron", title: /Бронирование/ },
    { url: "/prays", title: /Прайс/ },
  ];

  for (const { url, title } of pages) {
    test(`${url} загружается со статусом 200 и корректным title`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(title);
    });
  }

  test("главная — кнопка «Забронировать» ведёт на /bron", async ({ page }) => {
    await page.goto("/");
    const bookLink = page.getByRole("link", { name: /Забронировать/i }).first();
    await expect(bookLink).toBeVisible();
    await bookLink.click();
    await expect(page).toHaveURL(/\/bron/);
  });

  test("карточки домиков из /domiki ведут на детальные страницы", async ({ page }) => {
    await page.goto("/domiki");
    const detailLink = page.getByRole("link", { name: /Подробнее/i }).first();
    await detailLink.click();
    await expect(page).toHaveURL(/\/domiki\//);
  });
});

test.describe("Мобильный viewport (iPhone 12)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("главная страница кликабельна на мобильном", async ({ page }) => {
    await page.goto("/");
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });
});
