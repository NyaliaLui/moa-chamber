import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';
import { isCIEnv } from '@app/utils/ci';

test.describe('Team Page', () => {
  const { isCI, msg } = isCIEnv();
  test.skip(isCI, msg);

  const PATH = '/team';

  test('look and feel - team', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.TEAM_PAGE.TEAM_MEMBERS),
    ).toHaveScreenshot('team-members.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });
});
