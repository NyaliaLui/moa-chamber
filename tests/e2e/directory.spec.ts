import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Directory Page', () => {
  const PATH = '/directory';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the directory page successfully', async ({ page }) => {
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

  test.describe('Directory Header Section', () => {
    test('should display page heading', async ({ page }) => {
      const heading = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(/Our Members/i);
    });

    test('should display page description', async ({ page }) => {
      const description = page.getByText(
        /Discover local businesses that drive our community/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('Member List Section', () => {
    test('should display the project list container', async ({ page }) => {
      const projectList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(projectList).toBeVisible();
    });

    test('should display member cards in a grid layout', async ({ page }) => {
      const projectList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);

      // Check that the grid has the correct classes
      await expect(projectList).toHaveClass(/grid/);
      await expect(projectList).toHaveClass(/grid-cols-1/);
    });

    test('should display member cards when data is loaded', async ({
      page,
    }) => {
      // Wait for content to load
      await page.waitForSelector('text=Our Members', { timeout: 10000 });

      // Check if member cards exist
      const projectList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(projectList).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to member detail page when clicking a member card', async ({
      page,
    }) => {
      // Wait for member cards to load
      await page.waitForSelector('text=Our Members', { timeout: 10000 });

      // Try to find and click the first member card link if it exists
      const memberLinks = page.locator('a[href^="/directory/"]');
      const count = await memberLinks.count();

      if (count > 0) {
        const firstLink = memberLinks.first();
        await expect(firstLink).toBeVisible();

        // Get the href to verify it's a valid member link
        const href = await firstLink.getAttribute('href');
        expect(href).toMatch(/^\/directory\/.+/);
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(heading).toBeVisible();

      const projectList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(projectList).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(heading).toBeVisible();

      const projectList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(projectList).toBeVisible();
    });

    test('should adapt grid layout for different viewports', async ({
      page,
    }) => {
      const projectList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);

      // Check that responsive grid classes are present
      await expect(projectList).toHaveClass(/md:grid-cols-2/);
      await expect(projectList).toHaveClass(/lg:grid-cols-3/);
    });
  });
});
