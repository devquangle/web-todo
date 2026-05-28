import { beforeEach, describe, expect, it } from "vitest";
import { LoginService } from "../../src/services/login.service.js";
import { UserService } from "../../src/services/user.service.js";

describe("LoginService - Login", () => {
  let userService;
  let loginService;

  // Khởi tạo service trước mỗi ca test
  beforeEach(() => {
    userService = new UserService();
    loginService = new LoginService(userService);
  });

  // Gom nhóm các bài test kiểm tra tính hợp lệ dữ liệu đầu vào
  describe("Validation Tests", () => {
    
    // 1. Case: Bỏ trống email và password
    it("should return a validation error for empty email and password", () => {
      const loginRequest = {
        email: "",
        password: "",
      };
      const result = loginService.login(loginRequest);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed.");
      expect(result.data).toEqual({
        email: "Email is required.",
        password: "Password is required.",
      });
    });

    // 2. Case: Email sai định dạng
    it("should return a validation error for invalid email format", () => {
      const loginRequest = {
        email: "invalid-email",
        password: "password123",
      };

      const result = loginService.login(loginRequest);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed.");
      expect(result.data).toEqual({
        email: "Invalid email format.",
      });
    });

    // 3. Case: Password quá ngắn
    it("should return a validation error for password that is too short", () => {
      const loginRequest = {
        email: "user@example.com",
        password: "123",
      };

      const result = loginService.login(loginRequest);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed.");
      expect(result.data).toEqual({
        password: "Password must be at least 6 characters long.",
      });
    });

  });
});