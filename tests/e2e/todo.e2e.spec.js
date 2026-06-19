import { test, expect } from "@playwright/test";

test.describe("TODO", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/todo.html");
  });

  // Kiểm tra khi để trống
  // test("TC001: BỎ TRỐNG TITLE", async ({ page }) => {
  //   await page.fill("#taskName", "");

  //   await page.click("#btn-submit-todo");

  //   await expect(page.locator("#errorTaskName")).toContainText(
  //     "Title is required.",
  //   );
  // });

  // test("TC002: NHẠP TITLE ĐÃ TỒN TẠI", async ({ page }) => {
  //   await page.fill("#taskName", "Chay E2E");

  //   await page.click("#btn-submit-todo");

  //   await expect(page.locator("#errorTaskName")).toContainText(
  //     "Title already exists.",
  //   );
  // });
  // test("TC003: NHẠP TITLE ĐÚNG ", async ({ page }) => {
  //   await page.fill("#taskName", "Chay E2E 000");
  //   await page.click("#btn-submit-todo");

  //   await expect(page.locator("#errorTaskName")).toContainText("");
  // });

  // test("TC004: DELETE TODO", async ({ page }) => {
  //   const firstRow = page.locator("tbody tr").first();

  //   const deleteButton = firstRow.locator('button[id^="btn-delete-"]');

  //   await expect(deleteButton).toBeVisible();

  //   // Lấy id từ button
  //   const buttonId = await deleteButton.getAttribute("id");
  //   const todoId = buttonId.replace("btn-delete-", "");

  //   const deleteRequestPromise = page.waitForRequest(
  //     (request) =>
  //       request.method() === "DELETE" &&
  //       request.url().includes(`/todos/${todoId}`),
  //   );

  //   await deleteButton.click();

  //   const confirmButton = page.locator("#confirm-delete-btn");

  //   await expect(confirmButton).toBeVisible();

  //   await confirmButton.click();

  //   await deleteRequestPromise;

  //   await expect(page.locator(`#btn-delete-${todoId}`)).toHaveCount(0);
  // });

  // test("TC005: EDIT TODO TITLE BỎ TRỐNG", async ({ page }) => {
  //   const id = "p_NhJjLE8Bk";

  //   await page.click(`#btn-edit-${id}`);
  //   await page.fill("#taskName", "");
  //   await page.click("#btn-submit-todo");

  //   await expect(page.locator("#errorTaskName")).toContainText(
  //     "Title is required.",
  //   );
  // });
  // test("TC006: EDIT TODO TITLE HỢP LỆ", async ({ page }) => {
  //   const row = page.locator("tbody tr").first();

  //   const oldTitle = (await row.locator(".task-text").textContent())?.trim();

  //   await row.locator('button[id^="btn-edit-"]').click();

  //   const newTitle = `${oldTitle} Updated`;

  //   await page.fill("#taskName", newTitle);
  //   await page.click("#btn-submit-todo");

  //   await expect(
  //     page.locator("tbody tr").first().locator(".task-text"),
  //   ).toContainText(newTitle);
  // });

  // test("TC007: EDIT TODO TITLE TỒN TẠI", async ({ page }) => {
  //   const firstRow = page.locator("tbody tr").first();
  //   const lastRow = page.locator("tbody tr").last();

  //   // Lấy title dòng cuối
  //   const existedTitle = (
  //     await lastRow.locator(".task-text").textContent()
  //   )?.trim();

  //   // Click sửa dòng đầu
  //   await firstRow.locator('button[id^="btn-edit-"]').click();

  //   // Nhập title đã tồn tại
  //   await page.fill("#taskName", existedTitle || "");

  //   await page.click("#btn-submit-todo");

  //   // Verify lỗi
  //   await expect(page.locator("#errorTaskName")).toContainText(
  //     "Title already exists.",
  //   );
  // });
  test("TC008: EDIT TODO TITLE == Title Click", async ({ page }) => {
    const firstRow = page.locator("tbody tr").first();

    const existedTitle = (
      await firstRow.locator(".task-text").textContent()
    )?.trim();

    await firstRow.locator('button[id^="btn-edit-"]').click();

    const inputValue = await page.inputValue("#taskName");

    expect(inputValue).toBe(existedTitle);
  });
});
