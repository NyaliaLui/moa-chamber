import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';
import { waitForLoadingState } from './common';

test.describe('Directory Page', () => {
  const PATH = '/directory';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
    await waitForLoadingState(page);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the directory page successfully', async ({ page }) => {
      await expect(page).toHaveURL(PATH);
      await expect(page).toHaveTitle(
        /Promoting economic growth and a progressive community/i,
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
  });

  test.describe('Directory Header Section', () => {
    test('should display directory page heading', async ({ page }) => {
      const heading = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(/Our Members/i);
    });

    test('should display directory page description', async ({ page }) => {
      const description = page.getByText(
        /Discover local businesses that drive our community's economic strength and collaboration/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('Member Cards Section', () => {
    test('should display member cards list', async ({ page }) => {
      const memberList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(memberList).toBeVisible();
    });

    test('should display at least one member card', async ({ page }) => {
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const count = await memberCards.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should display member card images', async ({ page }) => {
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const count = await memberCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has an image
      for (let i = 0; i < count; i++) {
        const image = memberCards.nth(i).locator('img');
        await expect(image).toBeVisible();
      }
    });

    test('should display member names', async ({ page }) => {
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const count = await memberCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has a name (h3 element)
      for (let i = 0; i < count; i++) {
        const nameElement = memberCards.nth(i).locator('h3');
        await expect(nameElement).toBeVisible();
      }
    });

    test('should display member addresses', async ({ page }) => {
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const count = await memberCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has an address
      for (let i = 0; i < count; i++) {
        const addressElement = memberCards.nth(i).locator('.text-sm');
        await expect(addressElement).toBeVisible();
      }
    });

    test('should display "Find out more" CTA on each card', async ({
      page,
    }) => {
      const ctaElements = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CTA,
      );
      const count = await ctaElements.count();

      expect(count).toBeGreaterThan(0);

      // Check that each CTA is visible
      for (let i = 0; i < count; i++) {
        await expect(ctaElements.nth(i)).toBeVisible();
        await expect(ctaElements.nth(i)).toHaveText(/Find out more/i);
      }
    });

    test('should have clickable member cards', async ({ page }) => {
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const count = await memberCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card is a link
      for (let i = 0; i < count; i++) {
        const href = await memberCards.nth(i).getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toContain('/directory/');
      }
    });
  });

  test.describe('CTA Section', () => {
    test('should display CTA heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Join the Chamber/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display CTA description', async ({ page }) => {
      const description = page.getByText(
        /Unlock opportunities for your business and connect with local entrepreneurs/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display "Apply now" button', async ({ page }) => {
      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await expect(applyButton).toBeVisible();
      await expect(applyButton).toHaveAttribute('href', '/join');
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to member detail page when clicking a member card', async ({
      page,
    }) => {
      const memberCard = page
        .getByTestId(testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER)
        .first();
      await memberCard.click();

      // Should navigate to a directory slug page
      await expect(page).toHaveURL(/\/directory\/.+/);
    });

    test('should navigate to join page when clicking "Apply now" button', async ({
      page,
    }) => {
      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await applyButton.click();
      await expect(page).toHaveURL('/join');
    });
  });

  test.describe('Grid Layout', () => {
    test('should display member cards in grid layout', async ({ page }) => {
      const memberList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(memberList).toBeVisible();

      // Check that the grid has proper classes
      const classes = await memberList.getAttribute('class');
      expect(classes).toContain('grid');
    });

    test('should display correct grid columns on different viewports', async ({
      page,
    }) => {
      const memberList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      const classes = await memberList.getAttribute('class');

      // Check for responsive grid classes
      expect(classes).toContain('grid-cols-1'); // Mobile
      expect(classes).toContain('lg:grid-cols-3'); // Tablet and Desktop
    });
  });

  test.describe('Responsive Design', () => {
    test('should display all components correctly on mobile viewport', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Header and Footer
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      await expect(header).toBeVisible();
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(footer).toBeVisible();

      // Page heading and description
      const heading = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(/Our Members/i);
      const description = page.getByText(
        /Discover local businesses that drive our community's economic strength and collaboration/i,
      );
      await expect(description).toBeVisible();

      // Member cards list
      const memberList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(memberList).toBeVisible();

      // At least one member card with required elements
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const cardCount = await memberCards.count();
      expect(cardCount).toBeGreaterThan(0);

      const firstCard = memberCards.first();
      const cardImage = firstCard.locator('img');
      await expect(cardImage).toBeVisible();
      const cardName = firstCard.locator('h3');
      await expect(cardName).toBeVisible();
      const cardAddress = firstCard.locator('.text-sm');
      await expect(cardAddress).toBeVisible();

      const ctaElements = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CTA,
      );
      await expect(ctaElements.first()).toBeVisible();
      await expect(ctaElements.first()).toHaveText(/Find out more/i);

      // CTA section
      const ctaHeading = page.getByRole('heading', {
        name: /Join the Chamber/i,
      });
      await expect(ctaHeading).toBeVisible();
      const ctaDescription = page.getByText(
        /Unlock opportunities for your business and connect with local entrepreneurs/i,
      );
      await expect(ctaDescription).toBeVisible();
      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await expect(applyButton).toBeVisible();
      await expect(applyButton).toHaveAttribute('href', '/join');
    });

    test('should display all components correctly on tablet viewport', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1024, height: 768 });

      // Header and Footer
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      await expect(header).toBeVisible();
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(footer).toBeVisible();

      // Page heading and description
      const heading = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(/Our Members/i);
      const description = page.getByText(
        /Discover local businesses that drive our community's economic strength and collaboration/i,
      );
      await expect(description).toBeVisible();

      // Member cards list
      const memberList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(memberList).toBeVisible();

      // At least one member card with required elements
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const cardCount = await memberCards.count();
      expect(cardCount).toBeGreaterThan(0);

      const firstCard = memberCards.first();
      const cardImage = firstCard.locator('img');
      await expect(cardImage).toBeVisible();
      const cardName = firstCard.locator('h3');
      await expect(cardName).toBeVisible();
      const cardAddress = firstCard.locator('.text-sm');
      await expect(cardAddress).toBeVisible();

      const ctaElements = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CTA,
      );
      await expect(ctaElements.first()).toBeVisible();
      await expect(ctaElements.first()).toHaveText(/Find out more/i);

      // CTA section
      const ctaHeading = page.getByRole('heading', {
        name: /Join the Chamber/i,
      });
      await expect(ctaHeading).toBeVisible();
      const ctaDescription = page.getByText(
        /Unlock opportunities for your business and connect with local entrepreneurs/i,
      );
      await expect(ctaDescription).toBeVisible();
      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await expect(applyButton).toBeVisible();
      await expect(applyButton).toHaveAttribute('href', '/join');
    });

    test('should display all components correctly on desktop viewport', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Header and Footer
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      await expect(header).toBeVisible();
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(footer).toBeVisible();

      // Page heading and description
      const heading = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(/Our Members/i);
      const description = page.getByText(
        /Discover local businesses that drive our community's economic strength and collaboration/i,
      );
      await expect(description).toBeVisible();

      // Member cards list
      const memberList = page.getByTestId(testIds.PROJECTS_PAGE.PROJECT_LIST);
      await expect(memberList).toBeVisible();

      // At least one member card with required elements
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const cardCount = await memberCards.count();
      expect(cardCount).toBeGreaterThan(0);

      const firstCard = memberCards.first();
      const cardImage = firstCard.locator('img');
      await expect(cardImage).toBeVisible();
      const cardName = firstCard.locator('h3');
      await expect(cardName).toBeVisible();
      const cardAddress = firstCard.locator('.text-sm');
      await expect(cardAddress).toBeVisible();

      const ctaElements = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CTA,
      );
      await expect(ctaElements.first()).toBeVisible();
      await expect(ctaElements.first()).toHaveText(/Find out more/i);

      // CTA section
      const ctaHeading = page.getByRole('heading', {
        name: /Join the Chamber/i,
      });
      await expect(ctaHeading).toBeVisible();
      const ctaDescription = page.getByText(
        /Unlock opportunities for your business and connect with local entrepreneurs/i,
      );
      await expect(ctaDescription).toBeVisible();
      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await expect(applyButton).toBeVisible();
      await expect(applyButton).toHaveAttribute('href', '/join');
    });
  });

  test.describe('Content Validation', () => {
    test('should have at least one member', async ({ page }) => {
      const memberCards = page.getByTestId(
        testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER,
      );
      const count = await memberCards.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.getByTestId(testIds.PROJECTS_PAGE.HEADER);
      await expect(h1).toBeVisible();

      // Verify it's an h1 element
      const tagName = await h1.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('h1');
    });
  });
});
