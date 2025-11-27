import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Resources Page', () => {
  const PATH = '/resources';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the resources page successfully', async ({ page }) => {
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

    test('should display the community resources container', async ({
      page,
    }) => {
      const container = page.getByTestId('community-resources-demo');
      await expect(container).toBeVisible();
    });
  });

  test.describe('Resources Header Section', () => {
    test('should display main heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display page description', async ({ page }) => {
      const description = page.getByText(
        /Explore the hidden gems and landmarks that tell the story/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display full description text', async ({ page }) => {
      const fullDescription = page.getByText(
        /Each location offers a unique glimpse into our community/i,
      );
      await expect(fullDescription).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();

      const description = page.getByText(
        /Explore the hidden gems and landmarks/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();

      const container = page.getByTestId('community-resources-demo');
      await expect(container).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();

      const description = page.getByText(
        /Each location offers a unique glimpse/i,
      );
      await expect(description).toBeVisible();
    });

    test('should maintain proper spacing on different viewports', async ({
      page,
    }) => {
      // Test mobile
      await page.setViewportSize({ width: 375, height: 667 });
      let headerContainer = page.locator('.mb-6');
      await expect(headerContainer).toBeVisible();

      // Test desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      headerContainer = page.locator('.mb-6');
      await expect(headerContainer).toBeVisible();
    });
  });
});
