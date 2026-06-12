export default class TodoService {
  #URL_API_TODO = "http://localhost:3000/todos";

  // 1. LẤY DANH SÁCH CÔNG VIỆC
  async fetchData() {
    try {
      const resp = await fetch(this.#URL_API_TODO);

      if (!resp.ok) {
        throw new Error("Không thể tải danh sách công việc!");
      }

      return await resp.json();
    } catch (error) {
      console.error("Lỗi fetch:", error);
      throw error;
    }
  }

  // 2. THÊM CÔNG VIỆC
  async add(newTodo) {
    try {
      const errors = await this.validate(newTodo);

      if (errors.length > 0) {
        throw new Error(errors[0]);
      }

      const resp = await fetch(this.#URL_API_TODO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!resp.ok) {
        throw new Error("Lỗi server khi thêm công việc!");
      }

      return await resp.json();
    } catch (error) {
      console.error("Lỗi add:", error);
      throw error;
    }
  }

  // 3. LẤY CHI TIẾT CÔNG VIỆC
  async edit(id) {
    try {
      const resp = await fetch(`${this.#URL_API_TODO}/${id}`);

      if (!resp.ok) {
        throw new Error("Lỗi server khi lấy chi tiết công việc!");
      }

      return await resp.json();
    } catch (error) {
      console.error("Lỗi edit:", error);
      throw error;
    }
  }

  // 4. CẬP NHẬT CÔNG VIỆC
  async update(id, request) {
    try {
      const errors = await this.validate({
        ...request,
        id,
      });

      if (errors.length > 0) {
        throw new Error(errors[0]);
      }

      const resp = await fetch(`${this.#URL_API_TODO}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!resp.ok) {
        throw new Error("Lỗi server khi cập nhật công việc!");
      }

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

      if (!resp.ok) {
        throw new Error("Lỗi server khi xóa công việc!");
      }

      return true;
    } catch (error) {
      console.error("Lỗi delete:", error);
      throw error;
    }
  }

  // 6. VALIDATE
  async validate(request) {
    const errors = [];

    const title = request?.title?.trim();

    if (!title) {
      errors.push("Title is required.");
      return errors;
    }

    const data = await this.fetchData();

    const existed = data.some(
      (todo) =>
        todo.id !== request.id &&
        todo?.title?.trim()?.toLowerCase() === title.toLowerCase()
    );

    if (existed) {
      errors.push("Title already exists.");
    }

    return errors;
  }
}