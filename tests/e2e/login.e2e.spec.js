import { test, expect } from "@playwright/test";

// Mô tả nhóm các bài test liên quan đến trang đăng nhập
test.describe("Login Page", () => {
  test("should display error for empty email and password", async ({
    page,
  }) => {
    await page.goto("/login.html");
        await expect(
      page.locator("#form_login")
    ).toBeVisible();

    await expect(
      page.locator("#email")
    ).toBeVisible();

    await expect(
      page.locator("#password")
    ).toBeVisible();

    await expect(
      page.locator("#login-button")
    ).toBeVisible();

    await page.fill("#email", "");
    await page.fill("#password", "");
    await page.click("#login-button");

    const emailError = await page.textContent("#emailError");
    const passwordError = await page.textContent("#passwordError");

    await expect(emailError).toBe("Email is required.");
    await expect(passwordError).toBe("Password is required.");
  });
});
