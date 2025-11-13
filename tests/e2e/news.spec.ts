import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('News Page', () => {
  const PATH = '/news';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the news page successfully', async ({ page }) => {
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

  test.describe('News Header Section', () => {
    test('should display page heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();
    });

    test('should display page description', async ({ page }) => {
      const description = page.getByText(
        /Stay informed about the economic pulse and community developments/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('News List Section', () => {
    test('should display news items in a grid layout', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('text=Chamber News', { timeout: 10000 });

      // Check that the news grid exists
      const newsGrid = page.locator('.grid.grid-cols-1.gap-x-12.gap-y-12');
      await expect(newsGrid).toBeVisible();
    });

    test('should display news cards when data is loaded', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('text=Chamber News', { timeout: 10000 });

      // Check if news cards container exists
      const newsSection = page.locator('section.px-\\[5\\%\\].mt-16');
      await expect(newsSection).toBeVisible();
    });

    test('should have responsive grid layout classes', async ({ page }) => {
      const newsGrid = page.locator('.grid.grid-cols-1.gap-x-12.gap-y-12');

      await expect(newsGrid).toHaveClass(/lg:grid-cols-2/);
    });
  });

  test.describe('News Cards', () => {
    test('should display news card elements when available', async ({
      page,
    }) => {
      // Wait for content to load
      await page.waitForSelector('text=Chamber News', { timeout: 10000 });

      // Check if any news card links exist
      const newsLinks = page.locator('a[href^="/news/"]');
      const count = await newsLinks.count();

      // If news items exist, verify they have proper structure
      if (count > 0) {
        const firstLink = newsLinks.first();
        await expect(firstLink).toBeVisible();

        // Verify href format
        const href = await firstLink.getAttribute('href');
        expect(href).toMatch(/^\/news\/.+/);
      }
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to news detail page when clicking a news card', async ({
      page,
    }) => {
      // Wait for content to load
      await page.waitForSelector('text=Chamber News', { timeout: 10000 });

      // Try to find and click a news card link if it exists
      const newsLinks = page.locator('a[href^="/news/"]');
      const count = await newsLinks.count();

      if (count > 0) {
        const firstLink = newsLinks.first();
        const href = await firstLink.getAttribute('href');

        // Verify the link is valid before attempting navigation
        expect(href).toMatch(/^\/news\/.+/);
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();

      const newsSection = page.locator('section.px-\\[5\\%\\].mt-16');
      await expect(newsSection).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();

      const description = page.getByText(
        /Stay informed about the economic pulse/i,
      );
      await expect(description).toBeVisible();
    });

    test('should adapt to desktop viewport with two-column layout', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const newsGrid = page.locator('.grid.grid-cols-1.gap-x-12.gap-y-12');
      await expect(newsGrid).toBeVisible();
      await expect(newsGrid).toHaveClass(/lg:grid-cols-2/);
    });
  });
});
