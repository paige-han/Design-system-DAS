/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = import.meta.dirname;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [{
      // Plain unit tests in Node (e.g. tokens.test.ts)
      extends: true,
      test: { name: 'unit', include: ['src/**/*.test.ts'], environment: 'node' }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          // PLAYWRIGHT_CHROMIUM_PATH is optional: point it at an installed Chrome when Playwright's own
          // browser can't be downloaded. Leave it unset normally.
          provider: playwright({
            launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined },
          }),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
