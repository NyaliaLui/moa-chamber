import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';
import { isCIEnv } from '@app/utils/ci';

test.describe('News Page', () => {
  const { isCI, msg } = isCIEnv();
  test.skip(isCI, msg);

  const PATH = '/news';

  test('look and feel - news', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.NEWS_PAGE.NEWS_LIST),
    ).toHaveScreenshot('news-list.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });

  test('look and feel - "News" navigates to "News Details"', async ({
    page,
  }) => {
    await page.goto(PATH);

    await page.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CTA).first().click();

    await expect(
      await page.getByTestId(testIds.NEWS_DETAILS_PAGE.CONTAINER),
    ).toBeVisible();
    await expect(
      await page.getByTestId(testIds.NEWS_DETAILS_PAGE.CONTAINER),
    ).toHaveScreenshot('news-details.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });
});
