import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for MCP server
 * This configures how the Playwright MCP server handles screenshots,
 * browser settings, and other automation behaviors.
 */
export default defineConfig({
  // Directory for screenshots taken by the MCP server
  snapshotDir: "./screenshots",

  // Directory for test artifacts (if running actual tests)
  outputDir: "./test-results",

  // Use headless mode for MCP server
  use: {
    // Base URL for the application
    baseURL: "http://localhost:3000",

    // Screenshot configuration
    screenshot: {
      mode: "off", // MCP server handles screenshots manually
      fullPage: false,
    },

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Collect trace for debugging (disabled for MCP server performance)
    trace: "off",

    // Video recording (disabled for MCP server)
    video: "off",
  },

  // Projects configuration (browser types)
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Web server configuration (optional - for auto-starting dev server)
  // Uncomment if you want Playwright to auto-start your dev server
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
