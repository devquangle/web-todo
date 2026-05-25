import { describe, expect, it } from "vitest";
import { validateEmail } from "../../src/services/login.service.js";

describe("validateEmail", () => {
  it("should return an error message for empty email", () => {
    expect(validateEmail("")).toBe("Email is required.");
  });


});

// describe("validatePassword", () => {
//   it("should return an error message for empty password", () => {
//     expect(validatePassword("")).toBe("Password is required.");
//   });
// });