import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import TodoService from "../../src/services/todo.service";
import dbData from "../../db.json";
describe("Test plan Load todo và trình diễn dạng danh sách", () => {
  let todoService;

  beforeEach(() => {
    todoService = new TodoService();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
  it("Load dữ liệu các todo ", async () => {
    const mockTodos = dbData.todos;

    // 3. Ép fetch trả về mảng này
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockTodos),
    });
    // 2. Gọi hàm fetchData thực tế từ service
    const data = await todoService.fetchData();

    console.log(data);

    // 3. Kiểm tra dữ liệu trả về có phải là một mảng không rỗng
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(0);

    // 4. Kiểm tra phần tử đầu tiên (hoặc tìm phần tử id: "1") xem completed có đúng là true hay không
    const completedTodo = data.find(
      (todo) => todo.id === "1" && todo.title === "Hoc html ss",
    );

    expect(completedTodo).toBeDefined();
    expect(completedTodo.completed).toBe(false);
  });
});
