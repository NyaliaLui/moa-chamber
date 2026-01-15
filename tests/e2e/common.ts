import { Page } from '@playwright/test';
import testIds from '@app/test-ids';

export { waitForLoadingState };

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
