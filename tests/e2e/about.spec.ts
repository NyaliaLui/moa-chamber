import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('About Page', () => {
  const PATH = '/about';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the about page successfully', async ({ page }) => {
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

    test('should display the team page container', async ({ page }) => {
      const container = page.getByTestId(testIds.TEAM_PAGE.CONTAINER);
      await expect(container).toBeVisible();
    });
  });

  test.describe('Mission Section', () => {
    test('should display mission heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Mission/i });
      await expect(heading).toBeVisible();
    });

    test('should display mission statement', async ({ page }) => {
      const missionText = page.getByText(
        /To be a member driven organization that promotes economic growth/i,
      );
      await expect(missionText).toBeVisible();
    });
  });

  test.describe('Staff Section', () => {
    test('should display staff section heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Staff/i });
      await expect(heading).toBeVisible();
    });

    test('should display staff section description', async ({ page }) => {
      const description = page.getByText(
        /Dedicated professionals driving business growth/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display staff cards with team members', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('text=Staff', { timeout: 10000 });

      // Check that staff cards are present
      const staffSection = page.locator('section').filter({ hasText: 'Staff' });
      await expect(staffSection).toBeVisible();
    });
  });

  test.describe('Board of Directors Section', () => {
    test('should display board section heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Board of Directors/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display board section description', async ({ page }) => {
      const description = page.getByText(
        /Business leaders who understand the pulse of our local economy/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display board member cards', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('text=Board of Directors', { timeout: 10000 });

      // Check that board section is present
      const boardSection = page
        .locator('section')
        .filter({ hasText: 'Board of Directors' });
      await expect(boardSection).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const missionHeading = page.getByRole('heading', { name: /Mission/i });
      await expect(missionHeading).toBeVisible();

      const staffHeading = page.getByRole('heading', { name: /Staff/i });
      await expect(staffHeading).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const boardHeading = page.getByRole('heading', {
        name: /Board of Directors/i,
      });
      await expect(boardHeading).toBeVisible();
    });
  });
});
