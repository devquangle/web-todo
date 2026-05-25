import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30 * 1000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: false,
    screenshot: "on",
    video: "on",
    trace: "on",
  },
  reporter: [
    ["list"],
    ["html", { open: "never" }],
  ],
  webServer: {
    command: "npx http-server -p 4173 -c-1",
     port: 4173,
     reuseExistingServer: true,
     timeout: 120 * 1000,
  },
});
