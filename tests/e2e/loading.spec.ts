import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Loading State', () => {
  const PATH = '/';
  test('should display loading state while content is loading', async ({
    page,
  }) => {
    await page.goto(PATH);

    // Check that the loading state container is visible
    const loadingContainer = page.getByTestId(testIds.LOADING_STATE.CONTAINER);
    await expect(loadingContainer).toBeVisible();

    // Check that the loading text is displayed
    const loadingText = page.getByTestId(testIds.LOADING_STATE.TEXT);
    await expect(loadingText).toBeVisible();
    await expect(loadingText).toHaveText('Loading ...');

    // Wait for loading state to disappear
    await loadingContainer.waitFor({ state: 'detached' });
  });
});
