// Add Playwright test code here
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:4200');
  const title = page.locator('h1');
  await expect(title).toHaveText('Welcome to todo-list-app!');
});
