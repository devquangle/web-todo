export default class TodoService {
  #URL_API_TODO = "http://localhost:3000/todos";

  constructor() {}

  // 1. LẤY DANH SÁCH CÔNG VIỆC
  async fetch() {
    try {
      const resp = await fetch(this.#URL_API_TODO);
      if (!resp.ok) throw new Error("Không thể tải danh sách công việc!");
      return await resp.json();
    } catch (error) {
      console.error("Lỗi fetch:", error);
      throw error; 
    }
  }

  // 2. THÊM CÔNG VIỆC MỚI
  async add(request) {
    const data = {
      title: request.title,
      completed: false,
    };
    try {
      const resp = await fetch(this.#URL_API_TODO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) throw new Error("Lỗi server khi thêm công việc!");
      return await resp.json(); // Trả về item vừa tạo thành công
    } catch (error) {
      console.error("Lỗi add:", error);
      throw error;
    }
  }

  // 3. LẤY CHI TIẾT 1 CÔNG VIỆC (ĐỂ SỬA)
  async edit(id) {
    try {
      const resp = await fetch(`${this.#URL_API_TODO}/${id}`);
      if (!resp.ok) throw new Error("Lỗi server khi lấy chi tiết công việc!");
      return await resp.json();
    } catch (error) {
      console.error("Lỗi edit:", error);
      throw error;
    }
  }

  // 4. CẬP NHẬT CÔNG VIỆC (PUT hoặc PATCH)
  async update(id, request) {
    try {
      const resp = await fetch(`${this.#URL_API_TODO}/${id}`, {
        method: "PUT", // Hoặc "PATCH" nếu bạn chỉ muốn cập nhật 1 vài trường
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!resp.ok) throw new Error("Lỗi server khi cập nhật công việc!");
      return await resp.json();
    } catch (error) {
      console.error("Lỗi update:", error);
      throw error;
    }
  }

  // 5. XÓA CÔNG VIỆC
  async delete(id) {
    try {
      const resp = await fetch(`${this.#URL_API_TODO}/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Lỗi server khi xóa công việc!");
      return true; // Xóa thành công trả về true
    } catch (error) {
      console.error("Lỗi delete:", error);
      throw error;
    }
  }
}