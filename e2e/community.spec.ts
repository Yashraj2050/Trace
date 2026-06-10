import { test, expect } from '@playwright/test';

test.describe('Community Flow', () => {
  test('Community redirects to login if unauthenticated', async ({ page }) => {
    await page.goto('/community');
    await expect(page).toHaveURL(/.*login/);
  });
});
