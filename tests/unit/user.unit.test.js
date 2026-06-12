import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserService } from "../../src/services/user.service.js";

const USER_API_URL = "https://jsonplaceholder.typicode.com/users";

describe("User", (a) => {
  let userService;
  beforeEach(() => {
    userService = new UserService();
  });
  it("TEST-API-USER-001: Check URL valid", async () => {
    const data = await userService.fetchUsers(USER_API_URL);
    expect(data.length > 0);
  });
  it("TEST-API-USER-002: Check data", async () => {
    const data = await userService.fetchUsers(USER_API_URL);
    const result = userService.validateArray(data);
    expect(result).not.toBeNull();
  });
});
