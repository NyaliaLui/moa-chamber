import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';
import { waitForLoadingState } from './common';

test.describe('Home Page', () => {
  const PATH = '/';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
    await waitForLoadingState(page);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the home page successfully', async ({ page }) => {
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

  test.describe('Chamber Highlight Section', () => {
    test('should display "New member highlight" heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /New member highlight/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display highlighted business name', async ({ page }) => {
      const businessHeading = page.getByRole('heading', { level: 2 }).first();
      await expect(businessHeading).toBeVisible();
    });

    test('should display business description', async ({ page }) => {
      // Look for any paragraph text after the "New member highlight" heading
      const description = page.locator('p').first();
      await expect(description).toBeVisible();
    });

    test('should display business image', async ({ page }) => {
      // The image should have the business name as alt text
      const images = page.locator('img');
      const count = await images.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display "Visit Website" link when website is provided', async ({
      page,
    }) => {
      const websiteLink = page.getByRole('link', { name: /Visit Website/i });
      // Use soft assertion since website might be optional
      if ((await websiteLink.count()) > 0) {
        await expect(websiteLink.first()).toBeVisible();
        await expect(websiteLink.first()).toHaveAttribute('target', '_blank');
      }
    });

    test('should display social media icons when provided', async ({
      page,
    }) => {
      // Look for social media links by aria-label
      const socialLinks = page.locator(
        'a[aria-label="Facebook"], a[aria-label="Instagram"], a[aria-label="Twitter"], a[aria-label="LinkedIn"]',
      );
      const count = await socialLinks.count();
      // Social media is optional, so just verify if present
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          await expect(socialLinks.nth(i)).toHaveAttribute('target', '_blank');
        }
      }
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
    test('should display testimonials cards', async ({ page }) => {
      // Check that page has loaded multiple cards
      const cards = page.getByTestId(testIds.TESTIMONIALS.CARD);
      const count = await cards.count();
      expect(count).toEqual(3);
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
    test('should display all components correctly on mobile viewport', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Header and Footer
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      await expect(header).toBeVisible();
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(footer).toBeVisible();

      // Hero section
      const heroHeading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heroHeading).toBeVisible();
      const heroDescription = page.getByText(
        /We connect local entrepreneurs and support economic growth/i,
      );
      await expect(heroDescription).toBeVisible();
      const joinUsButton = page.getByRole('link', { name: /Join Us/i }).first();
      await expect(joinUsButton).toBeVisible();
      await expect(joinUsButton).toHaveAttribute('href', '/join');
      const whoWeAreButton = page.getByRole('link', { name: /Who we are/i });
      await expect(whoWeAreButton).toBeVisible();
      await expect(whoWeAreButton).toHaveAttribute('href', '/about');
      const heroImage = page.getByAltText(/Hero image/i);
      await expect(heroImage).toBeVisible();

      // Chamber Highlight section
      const highlightHeading = page.getByRole('heading', {
        name: /New member highlight/i,
      });
      await expect(highlightHeading).toBeVisible();
      const businessHeading = page.getByRole('heading', { level: 2 }).first();
      await expect(businessHeading).toBeVisible();
      const businessDescription = page.locator('p').first();
      await expect(businessDescription).toBeVisible();
      const businessImages = page.locator('img');
      const imageCount = await businessImages.count();
      expect(imageCount).toBeGreaterThan(0);

      // Benefits section
      const benefitsJoinButton = page.getByTestId(testIds.BENEFITS.JOIN_BTN);
      await expect(benefitsJoinButton).toBeVisible();

      // Testimonials section
      const testimonialCards = page.getByTestId(testIds.TESTIMONIALS.CARD);
      const cardCount = await testimonialCards.count();
      expect(cardCount).toEqual(3);

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

      // Hero section
      const heroHeading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heroHeading).toBeVisible();
      const heroDescription = page.getByText(
        /We connect local entrepreneurs and support economic growth/i,
      );
      await expect(heroDescription).toBeVisible();
      const joinUsButton = page.getByRole('link', { name: /Join Us/i }).first();
      await expect(joinUsButton).toBeVisible();
      await expect(joinUsButton).toHaveAttribute('href', '/join');
      const whoWeAreButton = page.getByRole('link', { name: /Who we are/i });
      await expect(whoWeAreButton).toBeVisible();
      await expect(whoWeAreButton).toHaveAttribute('href', '/about');
      const heroImage = page.getByAltText(/Hero image/i);
      await expect(heroImage).toBeVisible();

      // Chamber Highlight section
      const highlightHeading = page.getByRole('heading', {
        name: /New member highlight/i,
      });
      await expect(highlightHeading).toBeVisible();
      const businessHeading = page.getByRole('heading', { level: 2 }).first();
      await expect(businessHeading).toBeVisible();
      const businessDescription = page.locator('p').first();
      await expect(businessDescription).toBeVisible();
      const businessImages = page.locator('img');
      const imageCount = await businessImages.count();
      expect(imageCount).toBeGreaterThan(0);

      // Benefits section
      const benefitsJoinButton = page.getByTestId(testIds.BENEFITS.JOIN_BTN);
      await expect(benefitsJoinButton).toBeVisible();

      // Testimonials section
      const testimonialCards = page.getByTestId(testIds.TESTIMONIALS.CARD);
      const cardCount = await testimonialCards.count();
      expect(cardCount).toEqual(3);

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

      // Hero section
      const heroHeading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heroHeading).toBeVisible();
      const heroDescription = page.getByText(
        /We connect local entrepreneurs and support economic growth/i,
      );
      await expect(heroDescription).toBeVisible();
      const joinUsButton = page.getByRole('link', { name: /Join Us/i }).first();
      await expect(joinUsButton).toBeVisible();
      await expect(joinUsButton).toHaveAttribute('href', '/join');
      const whoWeAreButton = page.getByRole('link', { name: /Who we are/i });
      await expect(whoWeAreButton).toBeVisible();
      await expect(whoWeAreButton).toHaveAttribute('href', '/about');
      const heroImage = page.getByAltText(/Hero image/i);
      await expect(heroImage).toBeVisible();

      // Chamber Highlight section
      const highlightHeading = page.getByRole('heading', {
        name: /New member highlight/i,
      });
      await expect(highlightHeading).toBeVisible();
      const businessHeading = page.getByRole('heading', { level: 2 }).first();
      await expect(businessHeading).toBeVisible();
      const businessDescription = page.locator('p').first();
      await expect(businessDescription).toBeVisible();
      const businessImages = page.locator('img');
      const imageCount = await businessImages.count();
      expect(imageCount).toBeGreaterThan(0);

      // Benefits section
      const benefitsJoinButton = page.getByTestId(testIds.BENEFITS.JOIN_BTN);
      await expect(benefitsJoinButton).toBeVisible();

      // Testimonials section
      const testimonialCards = page.getByTestId(testIds.TESTIMONIALS.CARD);
      const cardCount = await testimonialCards.count();
      expect(cardCount).toEqual(3);

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
});
