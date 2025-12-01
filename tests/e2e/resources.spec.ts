import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Resources Page', () => {
  const PATH = '/resources';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the resources page successfully', async ({ page }) => {
      await expect(page).toHaveURL(PATH);
      await expect(page).toHaveTitle(/MOA Chamber/i);
    });

    test('should display the header', async ({ page }) => {
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      await expect(header).toBeVisible();
    });

    test('should display the footer', async ({ page }) => {
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(footer).toBeVisible();
    });

    test('should display the resources container', async ({ page }) => {
      const container = page.getByTestId(testIds.RESOURCES.CONTAINER);
      await expect(container).toBeVisible();
    });
  });

  test.describe('Page Header Section', () => {
    test('should display main heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display page description', async ({ page }) => {
      const description = page.getByText(
        /Explore the hidden gems and landmarks that tell the story/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display resources heading container', async ({ page }) => {
      const headingContainer = page.getByTestId(testIds.RESOURCES.HEADING);
      await expect(headingContainer).toBeVisible();
    });
  });

  test.describe('Cultural Landmarks Section', () => {
    test('should display culture tabs', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      // Look for tab buttons
      const tabs = page.locator('[data-testid^="culture-tab-"]');
      const count = await tabs.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should display at least one culture tab', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const tabs = page.locator('[data-testid^="culture-tab-"]');
      const count = await tabs.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should have first tab active by default', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const firstTab = page.locator('[data-testid^="culture-tab-"]').first();
      const classes = await firstTab.getAttribute('class');

      expect(classes).toContain('bg-gray-300');
    });

    test('should switch tabs when clicked', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const tabs = page.locator('[data-testid^="culture-tab-"]');
      const count = await tabs.count();

      if (count > 1) {
        const secondTab = tabs.nth(1);
        await secondTab.click();

        // Check that second tab is now active
        const classes = await secondTab.getAttribute('class');
        expect(classes).toContain('bg-gray-300');
      }
    });

    test('should display culture box', async ({ page }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      await expect(cultureBox).toBeVisible();
    });

    test('should display culture box heading', async ({ page }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const heading = cultureBox.locator('h2');

      await expect(heading).toBeVisible();
    });

    test('should display culture box description', async ({ page }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const description = cultureBox.locator('p');

      await expect(description).toBeVisible();
    });

    test('should display culture box image', async ({ page }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const image = cultureBox.locator('img');

      await expect(image).toBeVisible();
    });

    test('should display culture box CTA button', async ({ page }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const button = cultureBox.locator('a[href]');

      await expect(button).toBeVisible();
    });

    test('should have clickable CTA button with href', async ({ page }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const button = cultureBox.locator('a[href]');

      const href = await button.getAttribute('href');
      expect(href).toBeTruthy();
    });

    test('should update culture box content when switching tabs', async ({
      page,
    }) => {
      await page.waitForLoadState('networkidle');

      const tabs = page.locator('[data-testid^="culture-tab-"]');
      const count = await tabs.count();

      if (count > 1) {
        const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
        const heading = cultureBox.locator('h2');

        // Get initial heading text
        const initialText = await heading.textContent();

        // Click second tab
        await tabs.nth(1).click();

        // Wait for content to update
        await page.waitForTimeout(500);

        // Get new heading text
        const newText = await heading.textContent();

        // Content should be different
        expect(newText).not.toBe(initialText);
      }
    });

    test('should display culture box in grid layout', async ({ page }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const classes = await cultureBox.getAttribute('class');

      expect(classes).toContain('grid');
      expect(classes).toContain('lg:grid-cols-2');
    });

    test('should have proper border styling on culture box', async ({
      page,
    }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const classes = await cultureBox.getAttribute('class');

      expect(classes).toContain('border-b');
      expect(classes).toContain('border-l');
      expect(classes).toContain('border-r');
      expect(classes).toContain('bg-gray-300');
    });
  });

  test.describe('Historical Businesses Section', () => {
    test('should display businesses section heading', async ({ page }) => {
      const businessesHeading = page.getByTestId(
        testIds.RESOURCES.BUSINESSES_HEADING,
      );
      await expect(businessesHeading).toBeVisible();
    });

    test('should display businesses section title', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Influencial businesses and organizations/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display businesses section description', async ({ page }) => {
      const description = page.getByText(
        /Discover the establishments with a history of supporting our community/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display at least one business card', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      // Business cards have cursor-pointer class
      const businessCards = page.locator('.cursor-pointer');
      const count = await businessCards.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should display business card names', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const count = await businessCards.count();

      expect(count).toBeGreaterThan(0);

      // Each card should have a name (h3)
      for (let i = 0; i < count; i++) {
        const nameElement = businessCards.nth(i).locator('h3');
        await expect(nameElement).toBeVisible();
      }
    });

    test('should display business card descriptions', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const count = await businessCards.count();

      expect(count).toBeGreaterThan(0);

      // Each card should have a description
      for (let i = 0; i < count; i++) {
        const description = businessCards.nth(i).locator('p');
        await expect(description.first()).toBeVisible();
      }
    });

    test('should display business card website links', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const count = await businessCards.count();

      expect(count).toBeGreaterThan(0);

      // Each card should have a website link
      for (let i = 0; i < count; i++) {
        const link = businessCards.nth(i).locator('a');
        await expect(link).toBeVisible();

        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });

    test('should have first business selected by default', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const firstCard = businessCards.first();
      const firstCardInner = firstCard.locator('div').first();

      const classes = await firstCardInner.getAttribute('class');
      expect(classes).toContain('bg-gray-300');
    });

    test('should display business image', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      // Look for the business image in the right column (lg:col-span-2)
      const imageContainer = page.locator('.lg\\:col-span-2');
      const image = imageContainer.locator('img');

      await expect(image).toBeVisible();
    });

    test('should switch business when clicking on a card', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const count = await businessCards.count();

      if (count > 1) {
        // Get initial image src
        const imageContainer = page.locator('.lg\\:col-span-2');
        const image = imageContainer.locator('img');
        const initialSrc = await image.getAttribute('src');

        // Click second business card
        await businessCards.nth(1).click();

        // Wait for image to update
        await page.waitForTimeout(500);

        // Get new image src
        const newSrc = await image.getAttribute('src');

        // Image should be different
        expect(newSrc).not.toBe(initialSrc);
      }
    });

    test('should update selected state when clicking business card', async ({
      page,
    }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const count = await businessCards.count();

      if (count > 1) {
        const secondCard = businessCards.nth(1);
        await secondCard.click();

        // Wait for state to update
        await page.waitForTimeout(500);

        // Check that second card is now selected
        const secondCardInner = secondCard.locator('div').first();
        const classes = await secondCardInner.getAttribute('class');
        expect(classes).toContain('bg-gray-300');
      }
    });

    test('should have website links that open in new tab', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const firstCard = businessCards.first();
      const link = firstCard.locator('a');

      const target = await link.getAttribute('target');
      const rel = await link.getAttribute('rel');

      expect(target).toBe('_blank');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });

    test('should display business grid layout', async ({ page }) => {
      const grid = page.getByTestId(testIds.RESOURCES.BUSINESS_BOX);
      await expect(grid).toBeVisible();

      const classes = await grid.getAttribute('class');
      expect(classes).toContain('lg:grid-cols-3');
    });

    test('should have hover effect on business cards', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const firstCard = businessCards.first();

      const classes = await firstCard.getAttribute('class');
      expect(classes).toContain('hover:scale-105');
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
    test('should navigate to join page when clicking "Apply now" button', async ({
      page,
    }) => {
      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await applyButton.click();
      await expect(page).toHaveURL('/join');
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();

      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      await expect(cultureBox).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();

      const businessesHeading = page.getByTestId(
        testIds.RESOURCES.BUSINESSES_HEADING,
      );
      await expect(businessesHeading).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const heading = page.getByRole('heading', {
        name: /Discover community treasures/i,
      });
      await expect(heading).toBeVisible();

      // Culture box should be in 2-column grid on desktop
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      await expect(cultureBox).toBeVisible();
    });
  });

  test.describe('Content Validation', () => {
    test('should have at least one cultural landmark tab', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const tabs = page.locator('[data-testid^="culture-tab-"]');
      const count = await tabs.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should have at least one historical business', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const count = await businessCards.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();

      const h2Headings = page.locator('h2');
      const count = await h2Headings.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have descriptive alt text for culture box image', async ({
      page,
    }) => {
      const cultureBox = page.getByTestId(testIds.RESOURCES.CULTURE_BOX);
      const image = cultureBox.locator('img');

      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
    });

    test('should have descriptive alt text for business image', async ({
      page,
    }) => {
      await page.waitForLoadState('networkidle');

      const imageContainer = page.locator('.lg\\:col-span-2');
      const image = imageContainer.locator('img');

      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
    });
  });

  test.describe('Interactive Elements', () => {
    test('should have clickable tabs', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const tabs = page.locator('[data-testid^="culture-tab-"]');
      const firstTab = tabs.first();

      // Tab should be a button
      const tagName = await firstTab.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('button');
    });

    test('should have clickable business cards', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const businessCards = page.locator('.cursor-pointer');
      const firstCard = businessCards.first();

      const classes = await firstCard.getAttribute('class');
      expect(classes).toContain('cursor-pointer');
    });
  });
});
