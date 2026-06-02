
import { test, expect } from "@playwright/test";

test.describe("Login", () => {

  // Truy cập trang đăng nhập trước mỗi test case
  test.beforeEach(async ({ page }) => {
    await page.goto("src/pages/login.html");
  });

  // Kiểm tra khi để trống email và mật khẩu
  test("Empty email and password", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    await page.fill("#email", "");
    await page.fill("#password", "");
    await page.click("#login-button");

    await expect(page.locator("#statusBox"))
      .toContainText("Error: Validation failed.");

    await expect(page.locator("#emailError"))
      .toHaveText("Email is required.");

    await expect(page.locator("#passwordError"))
      .toHaveText("Password is required.");
  });

  // Kiểm tra khi email sai định dạng
  test("Invalid email format", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    await page.fill("#email", "invalid-email-format@gmail");
    await page.fill("#password", "validPassword123");
    await page.click("#login-button");

    await expect(page.locator("#statusBox"))
      .toContainText("Error: Validation failed.");

    await expect(page.locator("#emailError"))
      .toHaveText("Invalid email format.");
  });

  // Kiểm tra khi mật khẩu ít hơn 6 ký tự
  test("Password less than 6 characters", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    await page.fill("#email", "test@example.com");
    await page.fill("#password", "123");
    await page.click("#login-button");

    await expect(page.locator("#statusBox"))
      .toContainText("Error: Validation failed.");

    await expect(page.locator("#passwordError"))
      .toHaveText("Password must be at least 6 characters long.");
  });

  // Kiểm tra khi email hoặc mật khẩu không chính xác
  test("Invalid credentials", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    await page.fill("#email", "test@example.com");
    await page.fill("#password", "wrongpassword");
    await page.click("#login-button");

    await expect(page.locator("#statusBox"))
      .toContainText("Error: Invalid email or password.");
  });

  // Kiểm tra đăng nhập thành công
  test("Successful login", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    await page.fill("#email", "alice@gmail.com");
    await page.fill("#password", "password123");
    await page.click("#login-button");

    await expect(page.locator("#statusBox"))
      .toContainText("Success: Login successful.");
  });

});
