// CHỈNH SỬA: Thêm đuôi .js vào câu lệnh import để trình duyệt chạy được thuần
import { ResponseError, ResponseSuccess } from "./responsedata.js";

/**
 * Hàm kiểm tra tính hợp lệ của dữ liệu đăng nhập (Validation)
 */
export function validateLoginRequest(request) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Kiểm tra Email
  if (!request.email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(request.email)) {
    errors.email = "Invalid email format.";
  }

  // Kiểm tra Password
  if (!request.password) {
    errors.password = "Password is required.";
  } else if (request.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  // Nếu có ít nhất 1 lỗi, trả về ResponseError kèm danh sách lỗi
  if (Object.keys(errors).length > 0) {
    return ResponseError("Validation failed", errors);
  }

  // Nếu không có lỗi, trả về trạng thái thành công
  return ResponseSuccess("Validation successful");
}

/**
 * Lớp dịch vụ xử lý logic Đăng nhập
 */
export class LoginService {
  // Constructor nhận vào instance của UserService
  constructor(userService) {
    this.userService = userService;
  }

  login(request) {
    const validationResult = validateLoginRequest(request);

    if (!validationResult.success) {
      return ResponseError("Validation failed.", validationResult.data);
    }

    const user = this.userService.findUserByEmailAndPassword(
      request.email,
      request.password,
    );

    if (!user) {
      return ResponseError("Invalid email or password.");
    }

    const userToStore = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = crypto.randomUUID();
    const refreshToken = crypto.randomUUID();

    localStorage.setItem("user", JSON.stringify(userToStore));

    localStorage.setItem("accessToken", accessToken);

    localStorage.setItem("refreshToken", refreshToken);
    window.updateCartFavoriteVisibility();
    window.initUserDropdown();
    return ResponseSuccess("Login successful.", {
      accessToken,
      refreshToken,
    });
  }
}
