import { Page } from '@playwright/test';
import testIds from '@app/test-ids';

export { waitForLoadingState };

const waitForLoadingState = async (page: Page) => {
  const loadingState = page.getByTestId(testIds.LOADING_STATE.CONTAINER);
  if (await loadingState.isVisible()) {
    await loadingState.waitFor({ state: 'detached' });
  }
};
