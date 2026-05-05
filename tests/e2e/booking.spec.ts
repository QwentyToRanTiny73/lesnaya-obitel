import { test, expect } from "@playwright/test";

test.describe("Форма бронирования", () => {
  test("форма видна и обязательные поля валидируются", async ({ page }) => {
    await page.goto("/bron");
    await expect(page.getByTestId("booking-form")).toBeVisible();

    // Пытаемся отправить пустую форму — должны увидеть ошибки валидации
    await page.getByRole("button", { name: /Отправить заявку/i }).click();
    await expect(page.locator("text=Укажите имя и фамилию")).toBeVisible();
  });

  test("успешная отправка формы → /bron/success", async ({ page }) => {
    await page.goto("/bron");

    // Создаём даты на 2+ ночи
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 30);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 3);
    const fmt = (d: Date) => d.toISOString().split("T")[0];

    await page.fill('input[type="text"]', "Иван Иванов");
    await page.fill('input[type="tel"]', "+7 978 777-66-55");
    await page.fill('input[type="email"]', "ivan@example.com");
    await page.fill('input[type="date"] >> nth=0', fmt(checkIn));
    await page.fill('input[type="date"] >> nth=1', fmt(checkOut));

    await page.getByRole("button", { name: /Отправить заявку/i }).click();
    await expect(page).toHaveURL(/\/bron\/success/, { timeout: 10000 });
  });
});
