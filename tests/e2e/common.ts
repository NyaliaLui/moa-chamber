import { test, expect, Page } from '@playwright/test';
import testIds from '@app/test-ids';

export { waitForLoadingState, testPageLoadAndStructure };

export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 1024, height: 768 },
  desktop: { width: 1280, height: 800 },
};

const waitForLoadingState = async (page: Page) => {
  const loadingState = page.getByTestId(testIds.LOADING_STATE.CONTAINER);
  if (await loadingState.isVisible()) {
    await loadingState.waitFor({ state: 'detached' });
  }
};

interface PageLoadConfig {
  pageName: string;
  route: string | RegExp;
  containerTestId?: string;
  containerLabel?: string;
}

const testPageLoadAndStructure = (config: PageLoadConfig) => {
  const { pageName, route, containerTestId, containerLabel } = config;

  test.describe('Page Load and Structure', () => {
    test(`should load the ${pageName} page successfully`, async ({ page }) => {
      if (typeof route === 'string') {
        await expect(page).toHaveURL(route);
      } else {
        await expect(page).toHaveURL(route);
      }
      await expect(page).toHaveTitle(
        /Chamber of Commerce - Meriden\/Ozawkie Area/i,
      );
    });

    test('should display the header', async ({ page }) => {
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      await expect(header).toBeVisible();
    });

    test('should display the footer', async ({ page }) => {
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(footer).toBeVisible();
    });

    if (containerTestId) {
      test(`should display the ${containerLabel}`, async ({ page }) => {
        const container = page.getByTestId(containerTestId);
        await expect(container).toBeVisible();
      });
    }
  });
};
