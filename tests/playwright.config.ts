import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

dotenv.config({ path: path.join(process.cwd(), '..', '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,
  testDir: './',
  globalTimeout: 300000,
  expect: {
    timeout: 6000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  outputDir: 'test-results',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],
  // ['json', { outputFile: "test-results/jsonReport.json" }],
  // ['junit', { outputFile: "test-results/junitReport.xml" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    actionTimeout: 5000,
    navigationTimeout: 20000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: 'auth.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: 'DragDrop.spec.ts',
    },
    {
      name: 'draganddrop',
      testMatch: 'DragDrop.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.globalsqa.com/demo-site/draganddrop',
      },
    },
    {
      name: 'API',
      testMatch: 'tests/api/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'api/.auth/loginData.json',
        baseURL: 'https://conduit.bondaracademy.com/',
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.argv.join(' ').includes('@server')
    ? {
        command: 'npm run start',
        url: 'http://localhost:4200/',
        reuseExistingServer: !process.env.CI,
        timeout: 300 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
      }
    : undefined,
});
