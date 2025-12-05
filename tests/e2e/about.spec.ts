import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('About Page', () => {
  const PATH = '/about';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the about page successfully', async ({ page }) => {
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

    test('should display the team page container', async ({ page }) => {
      const container = page.getByTestId(testIds.TEAM_PAGE.CONTAINER);
      await expect(container).toBeVisible();
    });
  });

  test.describe('Mission Section', () => {
    test('should display mission heading', async ({ page }) => {
      const heading = page.getByText(/Mission/i);
      await expect(heading).toBeVisible();
    });

    test('should display mission statement', async ({ page }) => {
      const missionText = page.getByText(
        /To be a member driven organization that promotes economic growth/i,
      );
      await expect(missionText).toBeVisible();
    });

    test('should display complete mission statement', async ({ page }) => {
      const missionText = page.getByText(/progressive community image/i);
      await expect(missionText).toBeVisible();
    });
  });

  test.describe('Staff Section', () => {
    test('should display staff section heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /^Staff$/i });
      await expect(heading).toBeVisible();
    });

    test('should display staff section description', async ({ page }) => {
      const description = page.getByText(
        /Dedicated professionals driving business growth/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display staff cards with team members', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('text=Staff', { timeout: 10000 });

      // Check that staff cards are present
      const staffSection = page.locator('section').filter({ hasText: 'Staff' });
      await expect(staffSection).toBeVisible();

      // Check for staff card elements (images, names, roles)
      const staffImages = page.locator('img[alt]').first();
      await expect(staffImages).toBeVisible();
    });

    test('should display staff member names', async ({ page }) => {
      // Find all staff cards
      const staffCards = page.locator('div.flex.flex-col.text-center');
      const count = await staffCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has a name (h5 element)
      for (let i = 0; i < count; i++) {
        const nameElement = staffCards.nth(i).locator('h5');
        await expect(nameElement).toBeVisible();
      }
    });

    test('should display staff member roles and emails', async ({ page }) => {
      const staffCards = page.locator('div.flex.flex-col.text-center');
      const count = await staffCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has role and email (h6 elements)
      for (let i = 0; i < count; i++) {
        const h6Elements = staffCards.nth(i).locator('h6');
        const h6Count = await h6Elements.count();
        expect(h6Count).toBeGreaterThanOrEqual(2); // Role and email
      }
    });

    test('should display staff member bios', async ({ page }) => {
      const staffCards = page.locator('div.flex.flex-col.text-center');
      const count = await staffCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has a bio (p element)
      for (let i = 0; i < count; i++) {
        const bioElement = staffCards.nth(i).locator('p').first();
        await expect(bioElement).toBeVisible();
      }
    });

    test('should display social media links for staff', async ({ page }) => {
      const staffCards = page.locator('div.flex.flex-col.text-center');
      const count = await staffCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has social media links
      for (let i = 0; i < count; i++) {
        const socialLinks = staffCards.nth(i).locator('a');
        const linkCount = await socialLinks.count();
        expect(linkCount).toBeGreaterThanOrEqual(2); // LinkedIn and Twitter
      }
    });

    test('should have working LinkedIn links', async ({ page }) => {
      const linkedInLinks = page.locator('a[href*="linkedin.com"]');
      const count = await linkedInLinks.count();

      expect(count).toBeGreaterThan(0);

      // Check that each LinkedIn link has proper href
      for (let i = 0; i < count; i++) {
        const href = await linkedInLinks.nth(i).getAttribute('href');
        expect(href).toContain('linkedin.com');
      }
    });

    test('should have working Twitter/X links', async ({ page }) => {
      const twitterLinks = page.locator(
        'a[href*="twitter.com"], a[href*="x.com"]',
      );
      const count = await twitterLinks.count();

      expect(count).toBeGreaterThan(0);

      // Check that each Twitter link has proper href
      for (let i = 0; i < count; i++) {
        const href = await twitterLinks.nth(i).getAttribute('href');
        expect(href).toMatch(/twitter\.com|x\.com/);
      }
    });
  });

  test.describe('Board of Directors Section', () => {
    test('should display board section heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Board of Directors/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display board section description', async ({ page }) => {
      const description = page.getByText(
        /Business leaders who understand the pulse of our local economy/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display board member cards', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('text=Board of Directors', { timeout: 10000 });

      // Check that board section is present
      const boardSection = page
        .locator('section')
        .filter({ hasText: 'Board of Directors' });
      await expect(boardSection).toBeVisible();
    });

    test('should display board member names', async ({ page }) => {
      // Find board member cards (they have a different structure than staff)
      const boardCards = page.locator('div.flex.flex-col.items-start');
      const count = await boardCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has a name (h1 element)
      for (let i = 0; i < count; i++) {
        const nameElement = boardCards.nth(i).locator('h1');
        await expect(nameElement).toBeVisible();
      }
    });

    test('should display board member roles and employers', async ({
      page,
    }) => {
      const boardCards = page.locator('div.flex.flex-col.items-start');
      const count = await boardCards.count();

      expect(count).toBeGreaterThan(0);

      // Check that each card has role and employer (p elements)
      for (let i = 0; i < count; i++) {
        const pElements = boardCards.nth(i).locator('p');
        const pCount = await pElements.count();
        expect(pCount).toBeGreaterThanOrEqual(2); // Role and employer
      }
    });
  });

  test.describe('CTA Section', () => {
    test('should display CTA section', async ({ page }) => {
      const ctaHeading = page.getByRole('heading', {
        name: /Join the Chamber/i,
      });
      await expect(ctaHeading).toBeVisible();
    });

    test('should display "Apply now" button in CTA', async ({ page }) => {
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

      const missionHeading = page.getByText(/Mission/i);
      await expect(missionHeading).toBeVisible();

      const staffHeading = page.getByRole('heading', { name: /^Staff$/i });
      await expect(staffHeading).toBeVisible();

      const boardHeading = page.getByRole('heading', {
        name: /Board of Directors/i,
      });
      await expect(boardHeading).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const boardHeading = page.getByRole('heading', {
        name: /Board of Directors/i,
      });
      await expect(boardHeading).toBeVisible();

      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await expect(applyButton).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const missionHeading = page.getByText(/Mission/i);
      await expect(missionHeading).toBeVisible();

      // Staff cards should be in grid layout on desktop
      const staffCards = page.locator('div.flex.flex-col.text-center');
      const count = await staffCards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Content Validation', () => {
    test('should have at least one staff member', async ({ page }) => {
      const staffCards = page.locator('div.flex.flex-col.text-center');
      const count = await staffCards.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should have at least one board member', async ({ page }) => {
      const boardCards = page.locator('div.flex.flex-col.items-start');
      const count = await boardCards.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });
  });
});
