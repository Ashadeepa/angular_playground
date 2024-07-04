// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: '', // Ensure this is the directory where your test file is located
  testMatch: 'todo-list-e2e.spec.ts', // Match the specific file exactly
  testIgnore: 'todo-list-app.component.spec.ts', // Ignore the Angular test file
};

export default config;
