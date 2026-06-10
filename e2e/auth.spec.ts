import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('Login Page renders and validates empty submission', async ({ page }) => {
    await page.goto('/login');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Trace/);

    // Verify main form elements
    const emailInput = page.getByPlaceholder(/operator@trace.network/i);
    const passwordInput = page.getByPlaceholder(/••••••••••••/i);
    const submitButton = page.getByRole('button', { name: /Authenticate/i });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Empty submit should trigger HTML5 validation or application error state
    await submitButton.click();
    
    // We expect the browser or React to keep focus on the required input
    // Just verifying the page doesn't crash or redirect
    await expect(page).toHaveURL(/\/login/);
  });

  test('Signup Page renders correctly', async ({ page }) => {
    await page.goto('/signup');
    
    await expect(page.getByPlaceholder(/Jane Smith/i)).toBeVisible();
    await expect(page.getByPlaceholder(/operator@trace.network/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Initialize Node/i })).toBeVisible();
  });
});
