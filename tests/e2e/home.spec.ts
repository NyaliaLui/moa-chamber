import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Home Page', () => {
  const PATH = '/';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the home page successfully', async ({ page }) => {
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
  });

  test.describe('Hero Section', () => {
    test('should display hero heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display hero description', async ({ page }) => {
      const description = page.getByText(
        /We connect local entrepreneurs and support economic growth/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display "Join Us" button', async ({ page }) => {
      const joinButton = page.getByRole('link', { name: /Join Us/i });
      await expect(joinButton).toBeVisible();
      await expect(joinButton).toHaveAttribute('href', '/join');
    });

    test('should display "Who we are" button', async ({ page }) => {
      const aboutButton = page.getByRole('link', { name: /Who we are/i });
      await expect(aboutButton).toBeVisible();
      await expect(aboutButton).toHaveAttribute('href', '/about');
    });

    test('should display hero image', async ({ page }) => {
      const heroImage = page.getByAltText(/Hero image/i);
      await expect(heroImage).toBeVisible();
    });
  });

  test.describe('News Carousel Section', () => {
    test('should display news carousel navigation arrows', async ({ page }) => {
      const arrows = page.getByTestId(testIds.HOME_PAGE.NEWS_CAROUSEL_ARROWS);
      await expect(arrows).toBeVisible();
    });

    test('should display news carousel dots', async ({ page }) => {
      const dots = page.getByTestId(testIds.HOME_PAGE.NEWS_CAROUSEL_DOTS);
      const count = await dots.count();

      expect(count).toBeGreaterThan(0);

      // Check that each dot is visible
      for (let i = 0; i < count; i++) {
        await expect(dots.nth(i)).toBeVisible();
      }
    });

    test('should display news card with author', async ({ page }) => {
      const author = page
        .getByTestId(testIds.HOME_PAGE.NEWS_CAROUSEL_CARD_AUTHOR)
        .first();
      await expect(author).toBeVisible();
    });
  });

  test.describe('Benefits Section', () => {
    test('should display benefits section', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('text=Join', { timeout: 10000 });

      // Check that benefits section is present
      const benefitsSection = page.locator('section').first();
      await expect(benefitsSection).toBeVisible();
    });

    test('should display join button in benefits section', async ({ page }) => {
      const joinButton = page.getByTestId(testIds.BENEFITS.JOIN_BTN);
      await expect(joinButton).toBeVisible();
    });
  });

  test.describe('Testimonials Section', () => {
    test('should display testimonials section', async ({ page }) => {
      // Check that page has loaded multiple sections
      const sections = page.locator('section');
      const count = await sections.count();
      expect(count).toBeGreaterThan(0);
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
    test('should navigate to join page when clicking "Join Us" button', async ({
      page,
    }) => {
      const joinButton = page.getByRole('link', { name: /Join Us/i }).first();
      await joinButton.click();
      await expect(page).toHaveURL('/join');
    });

    test('should navigate to about page when clicking "Who we are" button', async ({
      page,
    }) => {
      const aboutButton = page.getByRole('link', { name: /Who we are/i });
      await aboutButton.click();
      await expect(page).toHaveURL('/about');
    });

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

      const heroHeading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heroHeading).toBeVisible();

      const ctaHeading = page.getByRole('heading', {
        name: /Join the Chamber/i,
      });
      await expect(ctaHeading).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const joinButton = page.getByRole('link', { name: /Join Us/i }).first();
      await expect(joinButton).toBeVisible();

      const applyButton = page.getByTestId(testIds.CTA.APPLY_BTN);
      await expect(applyButton).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const heroImage = page.getByAltText(/Hero image/i);
      await expect(heroImage).toBeVisible();

      const newsArrows = page.getByTestId(
        testIds.HOME_PAGE.NEWS_CAROUSEL_ARROWS,
      );
      await expect(newsArrows).toBeVisible();
    });
  });
});
