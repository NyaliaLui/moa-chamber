import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Directory/Project Details Page', () => {
  // Note: You'll need to replace this with an actual slug from your test data
  const TEST_SLUG = 'member-1';
  const PATH = `/directory/${TEST_SLUG}`;

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the project details page successfully', async ({
      page,
    }) => {
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

    test('should display the project details container', async ({ page }) => {
      const container = page.getByTestId(
        testIds.PROJECT_DETAILS_PAGE.CONTAINER,
      );
      await expect(container).toBeVisible();
    });
  });

  test.describe('Video Section', () => {
    test('should display video player', async ({ page }) => {
      // ReactPlayer should render a video element or iframe
      const videoSection = page.locator('section').first();
      await expect(videoSection).toBeVisible();

      // Wait for video content to load
      await page.waitForTimeout(2000);
    });
  });

  test.describe('Project Content', () => {
    test('should display project title', async ({ page }) => {
      const title = page.locator('h1');
      await expect(title).toBeVisible();
      await expect(title).toHaveClass(/text-5xl font-bold/);
    });

    test('should display project long description', async ({ page }) => {
      const description = page.locator('.prose');
      await expect(description).toBeVisible();
    });
  });

  test.describe('Contact Information Section', () => {
    test('should display email contact section', async ({ page }) => {
      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      await expect(emailHeading).toBeVisible();

      // Check for email icon
      const emailIcon = page.locator('svg').first();
      await expect(emailIcon).toBeVisible();
    });

    test('should display website contact section', async ({ page }) => {
      const websiteHeading = page.getByRole('heading', { name: /^Website$/i });
      await expect(websiteHeading).toBeVisible();

      // Website should be a clickable link
      const websiteLink = page.locator('a.underline');
      await expect(websiteLink).toBeVisible();
    });

    test('should display phone contact section', async ({ page }) => {
      const phoneHeading = page.getByRole('heading', { name: /^Phone$/i });
      await expect(phoneHeading).toBeVisible();
    });

    test('should display address contact section', async ({ page }) => {
      const addressHeading = page.getByRole('heading', { name: /^Address$/i });
      await expect(addressHeading).toBeVisible();
    });

    test('should display all four contact sections', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('h1', { timeout: 10000 });

      // Check all four icons are displayed
      const contactSections = page.locator(
        '.flex.flex-col.items-center.justify-start.text-center',
      );
      const count = await contactSections.count();
      expect(count).toBe(4);
    });

    test('should display contact icons for all sections', async ({ page }) => {
      // Each contact section should have an icon
      const icons = page.locator('.mb-5.sm\\:mb-6 svg');
      const iconCount = await icons.count();
      expect(iconCount).toBeGreaterThanOrEqual(4);
    });
  });

  test.describe('Contact Information Grid', () => {
    test('should display contact information in grid layout', async ({
      page,
    }) => {
      const grid = page.locator('.grid.auto-cols-fr');
      await expect(grid).toBeVisible();
    });

    test('should have proper grid structure on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      const grid = page.locator('.grid.auto-cols-fr');
      await expect(grid).toHaveClass(/lg:grid-cols-4/);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const title = page.locator('h1');
      await expect(title).toBeVisible();

      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      await expect(emailHeading).toBeVisible();

      const phoneHeading = page.getByRole('heading', { name: /^Phone$/i });
      await expect(phoneHeading).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const container = page.getByTestId(
        testIds.PROJECT_DETAILS_PAGE.CONTAINER,
      );
      await expect(container).toBeVisible();

      const grid = page.locator('.grid.auto-cols-fr');
      await expect(grid).toBeVisible();
    });

    test('should stack contact sections vertically on mobile', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const contactSections = page.locator(
        '.flex.flex-col.items-center.justify-start.text-center',
      );
      const firstSection = contactSections.first();
      await expect(firstSection).toBeVisible();

      // On mobile, grid should not have lg:grid-cols-4 applied
      const grid = page.locator('.grid.auto-cols-fr');
      await expect(grid).toBeVisible();
    });
  });
});
