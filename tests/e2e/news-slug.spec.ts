import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('News Details Page', () => {
  // Note: You'll need to replace this with an actual slug from your test data
  const TEST_SLUG = 'pancake-feed-october-2025';
  const PATH = `/news/${TEST_SLUG}`;

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the news details page successfully', async ({ page }) => {
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

    test('should display the news details container', async ({ page }) => {
      const container = page.getByTestId(testIds.NEWS_DETAILS_PAGE.CONTAINER);
      await expect(container).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should display back to posts link', async ({ page }) => {
      const backLink = page.getByRole('link', { name: /Back to posts/i });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/news');
    });

    test('should navigate back to news page when clicking back link', async ({
      page,
    }) => {
      await page.getByRole('link', { name: /Back to posts/i }).click();
      await expect(page).toHaveURL(/\/news$/);
    });
  });

  test.describe('Article Content', () => {
    test('should display read time indicator', async ({ page }) => {
      const readTime = page.getByText(/min read/i);
      await expect(readTime).toBeVisible();
    });

    test('should display article title', async ({ page }) => {
      const title = page.locator('h1');
      await expect(title).toBeVisible();
    });

    test('should display published date section', async ({ page }) => {
      const publishedLabel = page.getByText('Published on');
      await expect(publishedLabel).toBeVisible();

      // Check that there's a formatted date displayed
      const dateElement = publishedLabel
        .locator('..')
        .getByText(/\d{1,2}\s+\w+\s+\d{4}/);
      await expect(dateElement).toBeVisible();
    });

    test('should display article long description', async ({ page }) => {
      const prose = page.locator('.prose');
      await expect(prose).toBeVisible();
    });

    test('should display placeholder images', async ({ page }) => {
      // Main hero image
      const heroImage = page
        .locator('img[alt="Relume placeholder image"]')
        .first();
      await expect(heroImage).toBeVisible();
    });
  });

  test.describe('Author Information', () => {
    test('should display author section with avatar', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('.prose', { timeout: 10000 });

      // Look for author info section after the HR divider
      const authorSection = page.locator('div.flex.items-center.gap-4');
      await expect(authorSection).toBeVisible();
    });

    test('should display author name', async ({ page }) => {
      await page.waitForSelector('.prose', { timeout: 10000 });

      // Author name should be in a semibold paragraph
      const authorName = page.locator('p.font-semibold');
      await expect(authorName.first()).toBeVisible();
    });
  });

  test.describe('Gallery Section', () => {
    test('should display gallery images if available', async ({ page }) => {
      // Gallery is optional, so we check if it exists
      const gallery = page.locator('.container.pt-16.gap-8');

      // If gallery exists, check it's visible
      const galleryCount = await gallery.count();
      if (galleryCount > 0) {
        await expect(gallery).toBeVisible();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const backLink = page.getByRole('link', { name: /Back to posts/i });
      await expect(backLink).toBeVisible();

      const title = page.locator('h1');
      await expect(title).toBeVisible();

      const readTime = page.getByText(/min read/i);
      await expect(readTime).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const container = page.getByTestId(testIds.NEWS_DETAILS_PAGE.CONTAINER);
      await expect(container).toBeVisible();

      const prose = page.locator('.prose');
      await expect(prose).toBeVisible();
    });
  });
});
