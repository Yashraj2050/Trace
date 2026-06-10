import { test, expect } from '@playwright/test';

test.describe('Upload Flow', () => {
  test('Upload redirects to login if unauthenticated', async ({ page }) => {
    await page.goto('/upload');
    await expect(page).toHaveURL(/.*login/);
  });
});
