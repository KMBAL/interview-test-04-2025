import { defineConfig, devices } from '@playwright/test';

const ENV = 'local'; // Default to 'staging'

const baseURLs: { [key: string]: string } = {
  local: 'http://localhost:8000',
};

export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: false,
  
  reporter: 'html',
  use: {
   
    trace: 'on-first-retry',
    headless : false,
    baseURL: baseURLs[ENV],
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Uncomment and enable target browsers.

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

     // Test against mobile viewports. 
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    //Test against branded browsers.
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },*/
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: 'docker compose build && docker compose up',
  },
});
