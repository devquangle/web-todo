import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import TodoService from "../../src/services/todo.service";

describe("TodoService", () => {
  let todoService;

  // Khởi tạo service và mock fetch trước mỗi test case
  beforeEach(() => {
    todoService = new TodoService();
    global.fetch = vi.fn();
  });

  // Dọn dẹp mock sau mỗi test case
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // =====================================================
  // FETCH DATA - KIỂM THỬ CHỨC NĂNG LẤY DANH SÁCH TODO
  // =====================================================

  // TC001: Lấy danh sách công việc thành công
  it("TC001 - fetchData success", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "Task 1" }],
    });

    const data = await todoService.fetchData();

    expect(data.length).toBe(1);
  });

  // TC002: API trả về danh sách rỗng
  it("TC002 - fetchData empty list", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const data = await todoService.fetchData();

    expect(data).toEqual([]);
  });

  // TC003: API trả về lỗi server
  it("TC003 - fetchData server error", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    await expect(todoService.fetchData()).rejects.toThrow();
  });

  // TC004: Xử lý lỗi mất kết nối mạng
  it("TC004 - fetchData network error", async () => {
    fetch.mockRejectedValue(new Error("Network"));

    await expect(todoService.fetchData()).rejects.toThrow("Network");
  });

  // TC005: API trả về nhiều bản ghi
  it("TC005 - fetchData multiple records", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{}, {}, {}],
    });

    const data = await todoService.fetchData();

    expect(data.length).toBe(3);
  });

  // =====================================================
  // VALIDATE - KIỂM THỬ CHỨC NĂNG KIỂM TRA DỮ LIỆU
  // =====================================================

  // TC006: Không được để trống tiêu đề
  it("TC006 - title required", async () => {
    const errors = await todoService.validate({
      title: "",
    });

    expect(errors).toContain("Title is required.");
  });

  // TC007: Tiêu đề null hoặc undefined
  it("TC007 - title null", async () => {
    const errors = await todoService.validate({});

    expect(errors).toContain("Title is required.");
  });

  // TC008: Tiêu đề chỉ chứa khoảng trắng
  it("TC008 - title spaces", async () => {
    const errors = await todoService.validate({
      title: "   ",
    });

    expect(errors).toContain("Title is required.");
  });

  // TC009: Tiêu đề hợp lệ
  it("TC009 - valid title", async () => {
    vi.spyOn(todoService, "fetchData").mockResolvedValue([]);

    const errors = await todoService.validate({
      title: "Task A",
    });

    expect(errors.length).toBe(0);
  });

  // TC010: Tiêu đề bị trùng
  it("TC010 - duplicate title", async () => {
    vi.spyOn(todoService, "fetchData").mockResolvedValue([
      { id: 1, title: "Task A" },
    ]);

    const errors = await todoService.validate({
      title: "Task A",
    });

    expect(errors).toContain("Title already exists.");
  });

  // TC011: Kiểm tra trùng không phân biệt chữ hoa thường
  it("TC011 - duplicate ignore case", async () => {
    vi.spyOn(todoService, "fetchData").mockResolvedValue([
      { id: 1, title: "TASK A" },
    ]);

    const errors = await todoService.validate({
      title: "task a",
    });

    expect(errors).toContain("Title already exists.");
  });

  // TC012: Cho phép cập nhật chính bản ghi hiện tại
  it("TC012 - update same record", async () => {
    vi.spyOn(todoService, "fetchData").mockResolvedValue([
      { id: 1, title: "Task A" },
    ]);

    const errors = await todoService.validate({
      id: 1,
      title: "Task A",
    });

    expect(errors.length).toBe(0);
  });

  // TC013: So sánh sau khi trim khoảng trắng
  it("TC013 - trim title", async () => {
    vi.spyOn(todoService, "fetchData").mockResolvedValue([
      { id: 1, title: "Task A" },
    ]);

    const errors = await todoService.validate({
      title: " Task A ",
    });

    expect(errors).toContain("Title already exists.");
  });

  // TC014: Tiêu đề không trùng
  it("TC014 - unique title", async () => {
    vi.spyOn(todoService, "fetchData").mockResolvedValue([
      { id: 1, title: "Task A" },
    ]);

    const errors = await todoService.validate({
      title: "Task B",
    });

    expect(errors.length).toBe(0);
  });

  // TC015: Lỗi khi đọc dữ liệu trong validate
  it("TC015 - validate fetchData error", async () => {
    vi.spyOn(todoService, "fetchData").mockRejectedValue(
      new Error("DB Error")
    );

    await expect(
      todoService.validate({
        title: "Task",
      })
    ).rejects.toThrow("DB Error");
  });

  // =====================================================
  // ADD - KIỂM THỬ CHỨC NĂNG THÊM TODO
  // =====================================================

  // TC016: Thêm công việc thành công
  it("TC016 - add success", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, title: "Task" }),
    });

    const data = await todoService.add({
      title: "Task",
    });

    expect(data.id).toBe(1);
  });

  // TC017: Dữ liệu không hợp lệ khi thêm
  it("TC017 - add validation error", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([
      "Title is required.",
    ]);

    await expect(todoService.add({})).rejects.toThrow(
      "Title is required."
    );
  });

  // TC018: Server lỗi khi thêm dữ liệu
  it("TC018 - add server error", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockResolvedValue({
      ok: false,
    });

    await expect(
      todoService.add({
        title: "Task",
      })
    ).rejects.toThrow();
  });

  // TC019: Lỗi mạng khi thêm dữ liệu
  it("TC019 - add network error", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockRejectedValue(new Error("Network"));

    await expect(
      todoService.add({
        title: "Task",
      })
    ).rejects.toThrow("Network");
  });

  // TC020: Kiểm tra dữ liệu trả về sau khi thêm
  it("TC020 - add return object", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 99 }),
    });

    const data = await todoService.add({
      title: "Task",
    });

    expect(data.id).toBe(99);
  });

  // =====================================================
  // EDIT - KIỂM THỬ LẤY CHI TIẾT TODO
  // =====================================================

  // TC021: Lấy chi tiết thành công
  it("TC021 - edit success", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    const data = await todoService.edit(1);

    expect(data.id).toBe(1);
  });

  // TC022: Server lỗi khi lấy chi tiết
  it("TC022 - edit server error", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    await expect(todoService.edit(1)).rejects.toThrow();
  });

  // TC023: Lỗi mạng khi lấy chi tiết
  it("TC023 - edit network error", async () => {
    fetch.mockRejectedValue(new Error("Network"));

    await expect(todoService.edit(1)).rejects.toThrow("Network");
  });

  // =====================================================
  // UPDATE - KIỂM THỬ CẬP NHẬT TODO
  // =====================================================

  // TC024: Cập nhật thành công
  it("TC024 - update success", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    const data = await todoService.update(1, {
      title: "New Task",
    });

    expect(data.id).toBe(1);
  });

  // TC025: Dữ liệu cập nhật không hợp lệ
  it("TC025 - update validation error", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue(["Duplicate"]);

    await expect(todoService.update(1, {})).rejects.toThrow(
      "Duplicate"
    );
  });

  // TC026: Server lỗi khi cập nhật
  it("TC026 - update server error", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockResolvedValue({
      ok: false,
    });

    await expect(
      todoService.update(1, {
        title: "Task",
      })
    ).rejects.toThrow();
  });

  // TC027: Lỗi mạng khi cập nhật
  it("TC027 - update network error", async () => {
    vi.spyOn(todoService, "validate").mockResolvedValue([]);

    fetch.mockRejectedValue(new Error("Network"));

    await expect(
      todoService.update(1, {
        title: "Task",
      })
    ).rejects.toThrow("Network");
  });

  // =====================================================
  // DELETE - KIỂM THỬ XÓA TODO
  // =====================================================

  // TC028: Xóa thành công
  it("TC028 - delete success", async () => {
    fetch.mockResolvedValue({
      ok: true,
    });

    const result = await todoService.delete(1);

    expect(result).toBe(true);
  });

  // TC029: Server lỗi khi xóa
  it("TC029 - delete server error", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    await expect(todoService.delete(1)).rejects.toThrow();
  });

  // TC030: Lỗi mạng khi xóa
  it("TC030 - delete network error", async () => {
    fetch.mockRejectedValue(new Error("Network"));

    await expect(todoService.delete(1)).rejects.toThrow("Network");
  });
});