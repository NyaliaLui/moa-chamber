import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('News Page', () => {
  const PATH = '/news';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the news page successfully', async ({ page }) => {
      await expect(page).toHaveURL(PATH);
      await expect(page).toHaveTitle(/MOA Chamber/i);
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

  test.describe('News Page Header Section', () => {
    test('should display news page heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();
    });

    test('should display news page description', async ({ page }) => {
      const description = page.getByText(
        /Stay informed about the economic pulse and community developments/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('News Cards Section', () => {
    test('should display at least one news card', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const count = await newsCards.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should display news card images', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const count = await newsCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has an image
      for (let i = 0; i < count; i++) {
        const image = newsCards.nth(i).locator('img');
        await expect(image).toBeVisible();
      }
    });

    test('should display news card headings', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const count = await newsCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has a heading (h3 element)
      for (let i = 0; i < count; i++) {
        const heading = newsCards.nth(i).locator('h3');
        await expect(heading).toBeVisible();
      }
    });

    test('should display news card descriptions', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const count = await newsCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has a description (p element)
      for (let i = 0; i < count; i++) {
        const description = newsCards.nth(i).locator('p').first();
        await expect(description).toBeVisible();
      }
    });

    test('should display read time on each card', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const count = await newsCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has read time
      for (let i = 0; i < count; i++) {
        const readTime = newsCards.nth(i).getByText(/min read/i);
        await expect(readTime).toBeVisible();
      }
    });

    test('should display "Read more" CTA on each card', async ({ page }) => {
      const ctaElements = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CTA);
      const count = await ctaElements.count();

      expect(count).toBeGreaterThan(0);

      // Check that each CTA is visible
      for (let i = 0; i < count; i++) {
        await expect(ctaElements.nth(i)).toBeVisible();
        await expect(ctaElements.nth(i)).toHaveText(/Read more/i);
      }
    });

    test('should have clickable "Read more" links', async ({ page }) => {
      const ctaElements = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CTA);
      const count = await ctaElements.count();

      expect(count).toBeGreaterThan(0);

      // Check that each CTA is a link with proper href
      for (let i = 0; i < count; i++) {
        const href = await ctaElements.nth(i).getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toContain('/news/');
      }
    });

    test('should display chevron icon on "Read more" button', async ({
      page,
    }) => {
      const ctaElements = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CTA);
      const firstCta = ctaElements.first();

      // Check for chevron icon
      const chevron = firstCta.locator('svg');
      await expect(chevron).toBeVisible();
    });
  });

  test.describe('Grid Layout', () => {
    test('should display news cards in grid layout', async ({ page }) => {
      const newsGrid = page.locator('.grid.grid-cols-1');
      await expect(newsGrid.first()).toBeVisible();

      // Check for responsive grid class
      const classes = await newsGrid.first().getAttribute('class');
      expect(classes).toContain('lg:grid-cols-2');
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to news detail page when clicking "Read more"', async ({
      page,
    }) => {
      const firstCta = page
        .getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CTA)
        .first();
      await firstCta.click();

      // Should navigate to a news slug page
      await expect(page).toHaveURL(/\/news\/.+/);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();

      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      await expect(newsCards.first()).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();

      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      await expect(newsCards.first()).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();

      // News cards should be in 2-column grid on desktop
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const count = await newsCards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Content Validation', () => {
    test('should have at least one news article', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const count = await newsCards.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.getByRole('heading', { name: /Chamber News/i });
      await expect(h1).toBeVisible();

      // Verify it's an h1 element
      const tagName = await h1.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('h1');
    });

    test('should have descriptive alt text for images', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const firstCard = newsCards.first();
      const image = firstCard.locator('img');

      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
    });
  });

  test.describe('Image Display', () => {
    test('should display images with aspect-square class', async ({ page }) => {
      const newsCards = page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER);
      const firstCard = newsCards.first();
      const image = firstCard.locator('img');

      const classes = await image.getAttribute('class');
      expect(classes).toContain('aspect-square');
      expect(classes).toContain('object-cover');
    });
  });
});
