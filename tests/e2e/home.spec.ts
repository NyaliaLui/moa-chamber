import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('Home Page', () => {
  const PATH = '/';

  test.skip('look and feel - highlights', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.HOME_PAGE.HIGHLIGHTS),
      //TODO(@NyaliaLui): Need to figure out how to get CI
      // to look at the correct path for the screenshot image.
    ).toHaveScreenshot('home-highlights.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });

  test.skip('navigation - "Our Initiatives" navigates to "Projects" page', async ({
    page,
  }) => {
    await page.goto(PATH);

    await page.getByTestId(testIds.HOME_PAGE.OUR_INITIATIVES_CTA).click();

    await expect(
      await page.getByTestId(testIds.PROJECTS_PAGE.HEADER),
    ).toBeVisible();
  });
});
