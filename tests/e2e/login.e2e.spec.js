import { test, expect } from "@playwright/test";

test.describe("Kiểm thử chức năng đăng nhập", () => {
  
  // 1. Đi tới trang đăng nhập trước mỗi bài test
  test.beforeEach(async ({ page }) => {
    await page.goto("src/pages/login.html");
  });

  test("Hiển thị thông báo lỗi khi email và password để trống", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    // 2. Để trống trường và nhấn submit
    await page.fill("#email", "");
    await page.fill("#password", "");
    await page.click("#login-button");

    // 3. Kiểm tra trực tiếp bằng Locator Assertion (Bỏ hoàn toàn biến trung gian)
    await expect(page.locator("#statusBox")).toContainText("Error: Validation failed.");
    await expect(page.locator("#emailError")).toHaveText("Email is required.");
    await expect(page.locator("#passwordError")).toHaveText("Password is required.");
  });

  test("Hiển thị thông báo lỗi khi email không đúng định dạng", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    // 2. Nhập email sai định dạng và password hợp lệ
    await page.fill("#email", "invalid-email-format@gmail");
    await page.fill("#password", "validPassword123");
    await page.click("#login-button");

    // 3. Khẳng định kết quả
    await expect(page.locator("#statusBox")).toContainText("Error: Validation failed.");
    await expect(page.locator("#emailError")).toHaveText("Invalid email format.");
    await expect(page.locator("#passwordError")).toHaveText("");
  });

  test("Hiển thị thông báo lỗi khi password dưới 6 ký tự", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    // 2. Nhập email hợp lệ và password ngắn
    await page.fill("#email", "test@example.com");
    await page.fill("#password", "123");
    await page.click("#login-button");

    // 3. Khẳng định kết quả
    await expect(page.locator("#statusBox")).toContainText("Error: Validation failed.");
    await expect(page.locator("#emailError")).toHaveText("");
    await expect(page.locator("#passwordError")).toHaveText("Password must be at least 6 characters long.");
  });

  test("Hiển thị thông báo lỗi khi email hoặc password không đúng", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();
    // 2. Nhập email và password sai
    await page.fill("#email", "test@example.com");
    await page.fill("#password", "wrongpassword");
    await page.click("#login-button");

    // 3. Khẳng định kết quả
    await expect(page.locator("#statusBox")).toContainText("Error: Invalid email or password.");
    await expect(page.locator("#emailError")).toHaveText("");
    await expect(page.locator("#passwordError")).toHaveText("");
  });

  test("Đăng nhập thành công với email và password hợp lệ", async ({ page }) => {
    await expect(page.locator("#form-login")).toBeVisible();

    // 2. Nhập thông tin hợp lệ
    await page.fill("#email", "alice@gmail.com");
    await page.fill("#password", "password123");
    await page.click("#login-button");

    // 3. Khẳng định kết quả đăng nhập thành công
    await expect(page.locator("#statusBox")).toContainText("Success: Login successful.");
    await expect(page.locator("#emailError")).toHaveText("");
    await expect(page.locator("#passwordError")).toHaveText("");
  });

});