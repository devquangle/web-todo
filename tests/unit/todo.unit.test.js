import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import TodoService from "../../src/services/todo.service";

const URL_API_TODO = "http://localhost:3000/todos";

describe("Test plan ve api todo", () => {
  let todoService;

  beforeEach(() => {
    todoService = new TodoService();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  // ==========================================
  // TC001: POST THÀNH CÔNG (Giữ nguyên vì không có lỗi)
  // ==========================================
  it("TC001: Giả sử gửi request POST với dữ liệu thành công", async () => {
    const payload = {
      title: "Hoc html ss",
      completed: false,
    };
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });

    const result = await todoService.add(payload);
    expect(result).toEqual(payload);

    expect(fetch).toHaveBeenCalledWith(URL_API_TODO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });

  // ==========================================
  // TC002: POST LỖI TRỐNG TÊN (Chuyển sang try...catch)
  // ==========================================
  it("TC002: Giả sử thêm mới dữ liệu bỏ trống tên (validate thất bại)", async () => {
    const payload = {
      title: "",
      completed: false,
    };
    const expectedErrorMessage = "Title is required.";
    vi.spyOn(todoService, "validate").mockResolvedValue([expectedErrorMessage]);

    try {
      await todoService.add(payload);
      // Nếu không ném ra lỗi, ép test case này fail
      expect.fail("Hàm add đáng lẽ phải báo lỗi bỏ trống tên!");
    } catch (error) {
      // Kiểm tra xem thông báo lỗi nhận được có khớp với mong đợi không
      expect(error.message).toBe(expectedErrorMessage);
    }

    expect(fetch).not.toHaveBeenCalled();
  });

  // ==========================================
  // TC003: POST LỖI TRÙNG TÊN (Chuyển sang try...catch)
  // ==========================================
  it("TC003: Giả sử thêm mới dữ liệu bị trùng tên (validate thất bại)", async () => {
    const payload = {
      title: "Hoc html ss",
      completed: false,
    };
    const expectedErrorMessage = "Title already exists.";
    vi.spyOn(todoService, "validate").mockResolvedValue([expectedErrorMessage]);

    try {
      await todoService.add(payload);
      expect.fail("Hàm add đáng lẽ phải báo lỗi trùng tên!");
    } catch (error) {
      expect(error.message).toBe(expectedErrorMessage);
    }

    expect(fetch).not.toHaveBeenCalled();
  });

  // ==========================================
  // TC004: PUT THÀNH CÔNG (Giữ nguyên vì không có lỗi)
  // ==========================================
  it("TC004: Giả sử gửi request PUT với dữ liệu thành công", async () => {
    const id = "1";
    const payload = {
      title: "Hoc html ss",
      completed: false,
    };
    const expectedResult = { id, ...payload };

    vi.spyOn(todoService, "validate").mockResolvedValue([]);
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(expectedResult),
    });

    const result = await todoService.update(id, payload);
    expect(result).toEqual(expectedResult);

    expect(fetch).toHaveBeenCalledWith(`${URL_API_TODO}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });

  // ==========================================
  // TC005: PUT LỖI TRỐNG TÊN (Đã viết bằng try...catch)
  // ==========================================
  it("TC005: Giả sử cập nhật dữ liệu bỏ trống tên (validate thất bại)", async () => {
    const id = "1";
    const payload = {
      title: "   ",
      completed: false,
    };
    const expectedErrorMessage = "Title is required.";
    vi.spyOn(todoService, "validate").mockResolvedValue([expectedErrorMessage]);

    try {
      await todoService.update(id, payload);
      expect.fail("Hàm update đáng lẽ phải báo lỗi bỏ trống tên!");
    } catch (error) {
      expect(error.message).toBe(expectedErrorMessage);
    }

    expect(fetch).not.toHaveBeenCalled();
  });

  // ==========================================
  // TC006: PUT LỖI TRÙNG TÊN (Chuyển sang try...catch & Sửa tham số truyền vào)
  // ==========================================
  it("TC006: Giả sử cập nhật dữ liệu bị trùng tên (validate thất bại)", async () => {
    const id = "1";
    const payload = {
      title: "Hoc html ss",
      completed: false,
    };
    // Sửa lại câu thông báo lỗi cho đúng với logic trùng tên
    const expectedErrorMessage = "Title already exists."; 

    vi.spyOn(todoService, "validate").mockResolvedValue([expectedErrorMessage]);

    try {
      // 🛠️ Đã sửa: Truyền tách biệt id và payload thay vì truyền expectedResult gộp chung
      await todoService.update(id, payload);
      expect.fail("Hàm update đáng lẽ phải báo lỗi trùng tên!");
    } catch (error) {
      expect(error.message).toBe(expectedErrorMessage);
    }

    expect(fetch).not.toHaveBeenCalled();
  });
});