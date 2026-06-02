import { beforeEach, describe, expect, it ,vi} from "vitest";
import { LoginService } from "../../src/services/login.service.js";
import { UserService } from "../../src/services/user.service.js";
// 1. Giả lập môi trường trình duyệt
if (typeof window === 'undefined') {
  global.window = {};
}
window.updateCartFavoriteVisibility = vi.fn();
window.initUserDropdown = vi.fn();np
const store = new Map();

const mockStorage = {
  setItem: vi.fn((key, value) => store.set(key, value)),
  getItem: vi.fn((key) => store.get(key) || null),
  clear: vi.fn(() => store.clear()),
};

Object.defineProperty(global, "localStorage", { value: mockStorage });


describe("LoginService", () => {
  let userService;
  let loginService;

  beforeEach(() => {
    userService = new UserService();
    loginService = new LoginService(userService);
    mockStorage.clear();
  });

  describe("Validation", () => {
    // Kiểm tra trường hợp để trống email và mật khẩu
    it("should return error for empty email and password", () => {
      const result = loginService.login({ email: "", password: "" });

      expect(result.success).toBe(false);
      expect(result.data).toEqual({
        email: "Email is required.",
        password: "Password is required.",
      });
    });

    // Kiểm tra trường hợp email sai định dạng
    it("should return error when email is invalid", () => {
      const result = loginService.login({
        email: "invalid-email",
        password: "password123",
      });

      expect(result.success).toBe(false);
      expect(result.data.email).toBe("Invalid email format.");
    });

    // Kiểm tra trường hợp mật khẩu dưới 6 ký tự
    it("should return error when password is too short", () => {
      const result = loginService.login({
        email: "user@test.com",
        password: "123",
      });

      expect(result.success).toBe(false);
      expect(result.data.password).toBe(
        "Password must be at least 6 characters long.",
      );
    });
  });

  describe("Authentication", () => {
    // Kiểm tra trường hợp sai thông tin đăng nhập
    it("should return error for invalid credentials", () => {
      const result = loginService.login({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("Invalid email or password");
    });

    // Kiểm tra trường hợp đăng nhập thành công
    it("should return success for valid credentials", () => {
      const result = loginService.login({
        email: "alice@gmail.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Login successful.");
      expect(mockStorage.setItem).toHaveBeenCalled();
    });
  });
});
