import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Calendar Page', () => {
  const PATH = '/calendar';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the calendar page successfully', async ({ page }) => {
      await expect(page).toHaveURL(PATH);
      await expect(page).toHaveTitle(/MOA/i);
    });

    test('should display the header', async ({ page }) => {
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      await expect(header).toBeVisible();
    });

    test('should display the footer', async ({ page }) => {
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Calendar Header Section', () => {
    test('should display calendar heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Chamber Calendar/i });
      await expect(heading).toBeVisible();
    });

    test('should display calendar description', async ({ page }) => {
      const description = page.getByText(
        /Discover opportunities that drive business growth and community engagement/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('Google Calendar Embed', () => {
    test('should display the embedded Google Calendar iframe', async ({
      page,
    }) => {
      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
    });

    test('should have correct iframe dimensions', async ({ page }) => {
      const iframe = page.locator('iframe');
      await expect(iframe).toHaveAttribute('width', '100%');
      await expect(iframe).toHaveAttribute('height', '600');
    });

    test('should have valid Google Calendar src', async ({ page }) => {
      const iframe = page.locator('iframe');
      const src = await iframe.getAttribute('src');
      expect(src).toContain('calendar.google.com');
    });

    test('should have borderless iframe', async ({ page }) => {
      const iframe = page.locator('iframe');
      await expect(iframe).toHaveClass(/border-0/);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByRole('heading', { name: /Chamber Calendar/i });
      await expect(heading).toBeVisible();

      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByRole('heading', { name: /Chamber Calendar/i });
      await expect(heading).toBeVisible();

      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
    });

    test('should maintain calendar width on desktop viewport', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
      await expect(iframe).toHaveAttribute('width', '100%');
    });
  });
});
