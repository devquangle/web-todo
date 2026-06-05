import { test, expect } from "@playwright/test";

const USER_API_URL = "https://jsonplaceholder.typicode.com/users";

test.describe("Load user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("user.html");
  });

  test("T2E2-0001 ", async ({ page }) => {
    await expect(page.locator("#fetch-data-form")).toBeVisible();
    await page.fill("#fetchApi", USER_API_URL);
    await page.click("#fetch-data-btn");

    await expect(page.locator("#result")).toContainText("Load thành công.");

    const rows = page.locator("#user-table tbody tr");
    await expect(rows).toHaveCount(10);
  });
});
