/**
 * Lớp dịch vụ quản lý danh sách và dữ liệu người dùng
 */
export class UserService {
  // Khởi tạo mảng dữ liệu cứng (Mock Data) đóng vai trò như một Database thu nhỏ
  users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@gmail.com",
      password: "password123",
      status: "active",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      password: "password456",
      status: "inactive",
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      password: "password789",
      status: "active",
    },
  ];

  /**
   * Thêm một người dùng mới vào hệ thống
   */
  addUser(user) {
    this.users.push(user);
  }

  /**
   * Tìm kiếm người dùng dựa trên ID
   */
  getUserById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  /**
   * Tìm kiếm người dùng dựa trên địa chỉ Email
   */
  getUserByEmail(email) {
    return this.users.find((user) => user.email === email) || null;
  }

  /**
   * Lấy ra toàn bộ danh sách người dùng hiện tại
   */
  getAllUsers() {
    return this.users;
  }

  /**
   * Cập nhật trạng thái hoạt động của người dùng (active hoặc inactive)
   */
  updateUserStatus(id, status) {
    const user = this.getUserById(id);
    if (user) {
      user.status = status;
    }
  }

  /**
   * Xóa một người dùng khỏi danh sách bằng ID
   */
  deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  /**
   * Tìm kiếm tài khoản trùng khớp cả email, password và bắt buộc phải đang hoạt động (active)
   * Hàm này phục vụ trực tiếp cho logic đăng nhập của LoginService
   */
  findUserByEmailAndPassword(email, password) {
    return (
      this.users.find(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.status === "active"
      ) || null
    );
  }
}