import { test, expect } from '@playwright/test';

test.describe('Angular Application Tests', () => {

  test('Load the Application', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await expect(page).toHaveTitle('Angular17');
  });

  test('Navigation Test', async ({ page }) => {
    await page.goto('http://localhost:4200');
    //await page.click('text=Link to Navigate');
    await expect(page).toHaveURL('http://localhost:4200/');
    await expect(page.locator('text=Unique Text on Page')).toBeVisible();
  });

  test('Form Submission Test', async ({ page }) => {
    await page.goto('http://localhost:4200/form-page');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.click('text=Submit');
    // Assuming a success message is displayed
    await expect(page.locator('text=Success')).toBeVisible();
  });

  test('Dynamic Content Loading Test', async ({ page }) => {
    await page.goto('http://localhost:4200/dynamic-content');
    await page.click('button#load-content');
    await expect(page.locator('div#dynamic-content')).toContainText('Loaded Content');
  });

});