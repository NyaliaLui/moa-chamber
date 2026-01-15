import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';
import { waitForLoadingState, VIEWPORTS } from './common';

test.describe('Calendar Page', () => {
  const PATH = '/calendar';

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(PATH);
    await waitForLoadingState(page);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the calendar page successfully', async ({ page }) => {
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

  test.describe('Calendar Header Section', () => {
    test('should display calendar page heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Chamber Calendar/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display calendar page description', async ({ page }) => {
      const description = page.getByText(
        /Discover opportunities that drive business growth and community engagement/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('Calendar Iframe', () => {
    test('should display calendar iframe', async ({ page }) => {
      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
    });

    test('should have correct iframe attributes', async ({ page }) => {
      const iframe = page.locator('iframe');

      // Check iframe has src attribute
      const src = await iframe.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).not.toBe('');

      // Check iframe dimensions
      const width = await iframe.getAttribute('width');
      const height = await iframe.getAttribute('height');
      expect(width).toBe('100%');
      expect(height).toBe('600');

      // Check iframe has no border
      const borderClass = await iframe.getAttribute('class');
      expect(borderClass).toContain('border-0');
    });

    test('should load iframe content', async ({ page }) => {
      const iframe = page.locator('iframe');

      // Wait for iframe to be attached
      await iframe.waitFor({ state: 'attached' });

      // Verify iframe is visible
      await expect(iframe).toBeVisible();
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
      await page.setViewportSize(VIEWPORTS.mobile);

      // Header and Footer
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();

      // Page heading and description
      const heading = page.getByRole('heading', {
        name: /Chamber Calendar/i,
      });
      await expect(heading).toBeVisible();
      const description = page.getByText(
        /Discover opportunities that drive business growth and community engagement/i,
      );
      await expect(description).toBeVisible();

      // Calendar iframe with attributes
      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
      await expect(iframe).toHaveAttribute('width', '100%');
      await expect(iframe).toHaveAttribute('height', '600');
      await expect(iframe).toHaveClass(/border-0/);

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

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.tablet);

      // Header and Footer
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();

      // Page heading and description
      const heading = page.getByRole('heading', {
        name: /Chamber Calendar/i,
      });
      await expect(heading).toBeVisible();
      const description = page.getByText(
        /Discover opportunities that drive business growth and community engagement/i,
      );
      await expect(description).toBeVisible();

      // Calendar iframe with attributes
      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
      await expect(iframe).toHaveAttribute('width', '100%');
      await expect(iframe).toHaveAttribute('height', '600');
      await expect(iframe).toHaveClass(/border-0/);

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

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);

      // Header and Footer
      const header = page.getByTestId(testIds.LAYOUT.HEADER);
      const footer = page.getByTestId(testIds.LAYOUT.FOOTER);
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();

      // Page heading and description
      const heading = page.getByRole('heading', {
        name: /Chamber Calendar/i,
      });
      await expect(heading).toBeVisible();
      const description = page.getByText(
        /Discover opportunities that drive business growth and community engagement/i,
      );
      await expect(description).toBeVisible();

      // Calendar iframe with attributes
      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible();
      await expect(iframe).toHaveAttribute('width', '100%');
      await expect(iframe).toHaveAttribute('height', '600');
      await expect(iframe).toHaveClass(/border-0/);

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

    test('should maintain iframe aspect ratio across viewports', async ({
      page,
    }) => {
      const viewports = [VIEWPORTS.mobile, VIEWPORTS.tablet, VIEWPORTS.desktop];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);

        const iframe = page.locator('iframe');
        await expect(iframe).toBeVisible();

        const height = await iframe.getAttribute('height');
        expect(height).toBe('600');
      }
    });
  });

  test.describe('Content Validation', () => {
    test('should have only one iframe on the page', async ({ page }) => {
      const iframes = page.locator('iframe');
      const count = await iframes.count();

      expect(count).toBe(1);
    });

    test('should have calendar container with proper structure', async ({
      page,
    }) => {
      const section = page.getByTestId(testIds.CALENDAR.CONTAINER);
      await expect(section).toBeVisible();

      const container = section.locator('.container');
      const count = await container.count();
      expect(count).toEqual(2);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // Check for h1 heading
      const h1 = page.locator('h1').filter({ hasText: /Chamber Calendar/i });
      await expect(h1).toBeVisible();

      // Verify it's the main heading
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });
  });
});
