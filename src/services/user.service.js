export class UserService {
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

  async fetchUsers(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Chỉ validate 1 lần duy nhất tại đây khi vừa nhận dữ liệu từ API
      return this.validateArray(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      return null; // Trả về null để phân biệt giữa "Lỗi API/Validate" và "Mảng rỗng hợp lệ"
    }
  }

  validateArray(data) {
    // 1. Kiểm tra nếu data không phải là một mảng
    if (!Array.isArray(data)) {
      console.warn("Dữ liệu không phải là một mảng:", data);
      return null;
    }

    // 2. Nếu là mảng rỗng thì vẫn là hợp lệ (Ví dụ: hệ thống chưa có user nào)
    if (data.length === 0) {
      return [];
    }

    // 3. Kiểm tra các thuộc tính bắt buộc của user (Đã đồng bộ với hàm render HTML)
    const isValidArray = data.every((user) => {
      return (
        user &&
        typeof user === "object" &&
        "id" in user &&
        typeof user.id === "number" &&
        "name" in user &&
        typeof user.name === "string" &&
        "username" in user && // Đã đổi từ phone thành username cho đúng với lúc render
        typeof user.username === "string" &&
        "email" in user &&
        typeof user.email === "string"
      );
    });

    if (!isValidArray) {
      console.warn(
        "Dữ liệu chứa phần tử không phải là người dùng hợp lệ.",
        data,
      );
      return null; // Trả về null vì dữ liệu bị sai cấu trúc nghiêm trọng
    }

    return data;
  }

  async loadData(apiUrl) {
    const data = await this.fetchUsers(apiUrl);

    if (data === null) {
      return `<tr><td colspan="3" class="text-danger text-center font-weight-bold">Không thể tải dữ liệu hoặc dữ liệu không hợp lệ.</td></tr>`;
    }

    if (data.length === 0) {
      return `<tr><td colspan="3" class="text-muted text-center">Không có người dùng nào trong danh sách.</td></tr>`;
    }

    let html = "";
    data.forEach((user) => {
      html += `
      <tr>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
      </tr>
    `;
    });

    return html;
  }
  addUser(user) {
    this.users.push(user);
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  getUserByEmail(email) {
    return this.users.find((user) => user.email === email) || null;
  }

  getAllUsers() {
    return this.users;
  }

  updateUserStatus(id, status) {
    const user = this.getUserById(id);
    if (user) {
      user.status = status;
    }
  }

  deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  findUserByEmailAndPassword(email, password) {
    return (
      this.users.find(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.status === "active",
      ) || null
    );
  }
}
