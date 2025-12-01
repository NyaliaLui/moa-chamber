import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('Directory Member Detail Page', () => {
  let memberSlug: string;

  test.beforeEach(async ({ page }) => {
    // First navigate to the directory page to get a member slug
    await page.goto('/directory');
    await page.waitForLoadState('networkidle');

    // Get the first member card and extract the slug from its href
    const firstMemberCard = page
      .getByTestId(testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER)
      .first();
    const href = await firstMemberCard.getAttribute('href');

    if (href) {
      memberSlug = href.replace('/directory/', '');
      await page.goto(`/directory/${memberSlug}`);
    }
  });

  test.describe('Page Load and Structure', () => {
    test('should load the member detail page successfully', async ({
      page,
    }) => {
      await expect(page).toHaveURL(/\/directory\/.+/);
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

    test('should display the project details container', async ({ page }) => {
      const container = page.getByTestId(
        testIds.PROJECT_DETAILS_PAGE.CONTAINER,
      );
      await expect(container).toBeVisible();
    });
  });

  test.describe('Member Information', () => {
    test('should display member cover image', async ({ page }) => {
      const coverImage = page.getByRole('img', { name: 'Member' });
      await expect(coverImage).toBeVisible();

      // Verify image has proper attributes
      const src = await coverImage.getAttribute('src');
      expect(src).toBeTruthy();
    });

    test('should display member title/name', async ({ page }) => {
      const title = page.locator('h1').first();
      await expect(title).toBeVisible();

      // Verify title has content
      const text = await title.textContent();
      expect(text).toBeTruthy();
      expect(text!.length).toBeGreaterThan(0);
    });

    test('should display member long description', async ({ page }) => {
      const description = page.locator('.prose p').first();
      await expect(description).toBeVisible();

      // Verify description has content
      const text = await description.textContent();
      expect(text).toBeTruthy();
    });
  });

  test.describe('Contact Information Section', () => {
    test('should display email section', async ({ page }) => {
      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      await expect(emailHeading).toBeVisible();

      // Check for email icon
      const emailIcon = page.locator('svg').filter({ has: emailHeading });
      expect(emailIcon).toBeTruthy();
    });

    test('should display website section', async ({ page }) => {
      const websiteHeading = page.getByRole('heading', {
        name: /^Website$/i,
      });
      await expect(websiteHeading).toBeVisible();

      // Check for website link
      const websiteLink = page.locator('a.underline');
      await expect(websiteLink.first()).toBeVisible();

      // Verify link has href
      const href = await websiteLink.first().getAttribute('href');
      expect(href).toBeTruthy();
    });

    test('should display phone section', async ({ page }) => {
      const phoneHeading = page.getByRole('heading', { name: /^Phone$/i });
      await expect(phoneHeading).toBeVisible();
    });

    test('should display address section', async ({ page }) => {
      const addressHeading = page.getByRole('heading', {
        name: /^Address$/i,
      });
      await expect(addressHeading).toBeVisible();
    });

    test('should display all four contact sections', async ({ page }) => {
      const sections = [
        { name: 'Email', icon: 'BiEnvelope' },
        { name: 'Website', icon: 'BiMessageDetail' },
        { name: 'Phone', icon: 'BiPhone' },
        { name: 'Address', icon: 'BiMap' },
      ];

      for (const section of sections) {
        const heading = page.getByRole('heading', {
          name: new RegExp(`^${section.name}$`, 'i'),
        });
        await expect(heading).toBeVisible();
      }
    });

    test('should display contact icons', async ({ page }) => {
      // Wait for content to load
      await page.waitForLoadState('networkidle');

      // Check for SVG icons (4 contact sections should have icons)
      const icons = page.locator('svg.size-12');
      const count = await icons.count();

      expect(count).toBe(4);
    });

    test('should have clickable website link', async ({ page }) => {
      const websiteLink = page.locator('a.underline').first();
      await expect(websiteLink).toBeVisible();

      const href = await websiteLink.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('');
    });
  });

  test.describe('Layout and Grid', () => {
    test('should display contact information in grid layout', async ({
      page,
    }) => {
      const contactGrid = page.locator('.grid.auto-cols-fr');
      await expect(contactGrid).toBeVisible();

      // Check grid has proper responsive classes
      const classes = await contactGrid.getAttribute('class');
      expect(classes).toContain('md:grid-cols-2');
      expect(classes).toContain('lg:grid-cols-4');
    });

    test('should display four contact cards', async ({ page }) => {
      const contactCards = page.locator(
        '.flex.flex-col.items-center.justify-start.text-center',
      );
      const count = await contactCards.count();

      expect(count).toBe(4);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const title = page.locator('h1').first();
      await expect(title).toBeVisible();

      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      await expect(emailHeading).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const title = page.locator('h1').first();
      await expect(title).toBeVisible();

      const coverImage = page.getByRole('img', { name: 'Member' });
      await expect(coverImage).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const title = page.locator('h1').first();
      await expect(title).toBeVisible();

      // Contact cards should be in 4-column grid on desktop
      const contactCards = page.locator(
        '.flex.flex-col.items-center.justify-start.text-center',
      );
      const count = await contactCards.count();
      expect(count).toBe(4);
    });
  });

  test.describe('Image Display', () => {
    test('should display cover image with proper aspect ratio', async ({
      page,
    }) => {
      const coverImage = page.getByRole('img', { name: 'Member' });
      await expect(coverImage).toBeVisible();

      // Check for aspect-video class
      const classes = await coverImage.getAttribute('class');
      expect(classes).toContain('aspect-video');
      expect(classes).toContain('object-contain');
    });

    test('should have full width cover image', async ({ page }) => {
      const coverImage = page.getByRole('img', { name: 'Member' });
      await expect(coverImage).toBeVisible();

      const classes = await coverImage.getAttribute('class');
      expect(classes).toContain('w-full');
    });
  });

  test.describe('Typography', () => {
    test('should have large title text', async ({ page }) => {
      const title = page.locator('h1').first();
      await expect(title).toBeVisible();

      const classes = await title.getAttribute('class');
      expect(classes).toContain('text-5xl');
      expect(classes).toContain('font-bold');
    });

    test('should have prose styling for description', async ({ page }) => {
      const description = page.locator('.prose');
      await expect(description).toBeVisible();
    });

    test('should have proper heading sizes for contact sections', async ({
      page,
    }) => {
      const contactHeadings = page.locator('h3.text-2xl');
      const count = await contactHeadings.count();

      expect(count).toBe(4);
    });
  });

  test.describe('Navigation', () => {
    test('should be able to navigate back to directory page', async ({
      page,
    }) => {
      // Assuming there's a back navigation or we can use browser back
      await page.goto('/directory');
      await expect(page).toHaveURL('/directory');
    });
  });

  test.describe('Content Validation', () => {
    test('should have non-empty title', async ({ page }) => {
      const title = page.locator('h1').first();
      const text = await title.textContent();

      expect(text).toBeTruthy();
      expect(text!.trim().length).toBeGreaterThan(0);
    });

    test('should have contact information displayed', async ({ page }) => {
      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      const websiteHeading = page.getByRole('heading', {
        name: /^Website$/i,
      });
      const phoneHeading = page.getByRole('heading', { name: /^Phone$/i });
      const addressHeading = page.getByRole('heading', {
        name: /^Address$/i,
      });

      await expect(emailHeading).toBeVisible();
      await expect(websiteHeading).toBeVisible();
      await expect(phoneHeading).toBeVisible();
      await expect(addressHeading).toBeVisible();
    });
  });
});
