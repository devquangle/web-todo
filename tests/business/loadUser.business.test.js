import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserService } from "../../src/services/user.service.js";

const USER_API_URL = "https://jsonplaceholder.typicode.com/users";

describe("Test plan: Test nghiệp vụ load", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  it("TEST-BUS-01: Test load dữ liệu thành công trả về đúng số hàng tr", async () => {
    const html = await userService.loadData(USER_API_URL);
    expect(html).toContain("<tr>");
    expect(html).toContain("</tr>");
    expect(html).toContain("<td>");
    expect(html).toContain("</td>");
  });

  it("TEST-BUS-02: Test lấy đủ số lượng người dùng không?", async () => {
    const html = await userService.loadData(USER_API_URL);
    const soluongTr = (html.match(/<tr>/g) || []).length;
    expect(soluongTr).toBe(10);
  });
  it("TEST-BUS-03: Đủ số lượng và thông tin", async () => {
    const html = await userService.loadData(USER_API_URL);
    expect(html).toContain("Leanne Graham");
    expect(html).toContain("Ervin Howell");
    expect(html).toContain("Clementine Bauch");

  });
});
