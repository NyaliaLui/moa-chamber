import { test, expect } from '@playwright/test';

test.describe('Error Pages', () => {
  test.describe('Not Found (404)', () => {
    test('should display 404 page for unknown routes', async ({ page }) => {
      await page.goto('/unknown-route-that-does-not-exist');

      const heading = page.getByRole('heading', { name: /404 Not Found/i });
      await expect(heading).toBeVisible();

      const message = page.getByText(/Something went wrong/i);
      await expect(message).toBeVisible();
    });

    test('should display 404 page for nested unknown routes', async ({
      page,
    }) => {
      await page.goto('/some/deeply/nested/unknown/route');

      const heading = page.getByRole('heading', { name: /404 Not Found/i });
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Unexpected Error', () => {
    test('should display error page when an error is thrown', async ({
      page,
    }) => {
      // Navigate to a test page that intentionally throws an error
      await page.goto('/test-error');

      // The error boundary should be displayed
      const heading = page.getByRole('heading', {
        name: /Something went wrong/i,
      });
      await expect(heading).toBeVisible();

      // The "Try again" button should be present
      const tryAgainButton = page.getByRole('button', { name: /Try again/i });
      await expect(tryAgainButton).toBeVisible();
    });

    test('should display error message when provided', async ({ page }) => {
      await page.goto('/test-error');

      const heading = page.getByRole('heading', {
        name: /Something went wrong/i,
      });
      await expect(heading).toBeVisible();

      // Check that the error message is displayed
      const errorMessage = page.getByText(/This is a test error/i);
      await expect(errorMessage).toBeVisible();
    });

    test('should display "Try again" button that resets the error boundary', async ({
      page,
    }) => {
      await page.goto('/test-error');

      // Error page should be shown
      const heading = page.getByRole('heading', {
        name: /Something went wrong/i,
      });
      await expect(heading).toBeVisible();

      // Click the "Try again" button
      const tryAgainButton = page.getByRole('button', { name: /Try again/i });
      await expect(tryAgainButton).toBeVisible();
      await tryAgainButton.click();

      // The error boundary resets, but since the page still throws,
      // it should show the error again
      await expect(heading).toBeVisible();
    });
  });
});
