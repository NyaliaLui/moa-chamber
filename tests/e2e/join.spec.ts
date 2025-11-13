import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('Join Page', () => {
  const PATH = '/join';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the join page successfully', async ({ page }) => {
      await expect(page).toHaveURL(PATH);
      await expect(page).toHaveTitle(/MOA/i);
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

  test.describe('Header Section', () => {
    test('should display main heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Grow your business/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display header description', async ({ page }) => {
      const description = page.getByText(
        /Join the Meriden\/Ozawkie Area Chamber of Commerce/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('Benefits Section', () => {
    test('should display all four benefit cards', async ({ page }) => {
      await expect(
        page.getByText(/Promote your business through Chamber activities/i),
      ).toBeVisible();
      await expect(
        page.getByText(/Enhance your network of key business contacts/i),
      ).toBeVisible();
      await expect(
        page.getByText(/Develop our community through meaningful service/i),
      ).toBeVisible();
      await expect(
        page.getByText(/Support the creation of strong local businesses/i),
      ).toBeVisible();
    });

    test('should display benefits in a grid layout', async ({ page }) => {
      const benefitsGrid = page.locator(
        '.grid.grid-cols-1.items-start.gap-y-12',
      );
      await expect(benefitsGrid).toBeVisible();
    });
  });

  test.describe('Membership Form', () => {
    test('should display form heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Join us/i });
      await expect(heading).toBeVisible();
    });

    test('should display form description', async ({ page }) => {
      const description = page.getByText(
        /Complete your chamber membership application/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display business name field', async ({ page }) => {
      const businessField = page.locator('#business');
      await expect(businessField).toBeVisible();
      await expect(businessField).toHaveAttribute('required', '');
    });

    test('should display contact name field', async ({ page }) => {
      const contactField = page.locator('#contact');
      await expect(contactField).toBeVisible();
      await expect(contactField).toHaveAttribute('required', '');
    });

    test('should display contact role radio buttons', async ({ page }) => {
      const ownerRadio = page.locator('#owner');
      const managerRadio = page.locator('#manager');

      await expect(ownerRadio).toBeVisible();
      await expect(managerRadio).toBeVisible();

      // Check default selection
      await expect(ownerRadio).toBeChecked();
    });

    test('should display address field', async ({ page }) => {
      const addressField = page.locator('#address');
      await expect(addressField).toBeVisible();
      await expect(addressField).toHaveAttribute('required', '');
      await expect(addressField).toHaveAttribute(
        'placeholder',
        /555 SW Yellowbrick Rd/i,
      );
    });

    test('should display phone field', async ({ page }) => {
      const phoneField = page.locator('#phone');
      await expect(phoneField).toBeVisible();
      await expect(phoneField).toHaveAttribute('type', 'tel');
      await expect(phoneField).toHaveAttribute('required', '');
    });

    test('should display email field', async ({ page }) => {
      const emailField = page.locator('#email');
      await expect(emailField).toBeVisible();
      await expect(emailField).toHaveAttribute('type', 'email');
      await expect(emailField).toHaveAttribute('required', '');
    });

    test('should display website field', async ({ page }) => {
      const websiteField = page.locator('#website');
      await expect(websiteField).toBeVisible();
      await expect(websiteField).toHaveAttribute('type', 'url');
      await expect(websiteField).toHaveAttribute('required', '');
    });

    test('should display submit button', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /Submit/i });
      await expect(submitButton).toBeVisible();
    });

    test('should allow user to fill out the form', async ({ page }) => {
      await page.locator('#business').fill('Test Business LLC');
      await page.locator('#contact').fill('John Doe');
      await page.locator('#manager').check();
      await page.locator('#address').fill('123 Main St, Meriden, KS 66512');
      await page.locator('#phone').fill('(785) 555-1234');
      await page.locator('#email').fill('test@example.com');
      await page.locator('#website').fill('https://example.com');

      // Verify values
      await expect(page.locator('#business')).toHaveValue('Test Business LLC');
      await expect(page.locator('#contact')).toHaveValue('John Doe');
      await expect(page.locator('#manager')).toBeChecked();
      await expect(page.locator('#email')).toHaveValue('test@example.com');
    });
  });

  test.describe('Questions Section', () => {
    test('should display questions heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Questions\?/i });
      await expect(heading).toBeVisible();
    });

    test('should display questions description', async ({ page }) => {
      const description = page.getByText(
        /We are here to answer your membership questions/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display email contact info', async ({ page }) => {
      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      await expect(emailHeading).toBeVisible();

      const emailLink = page.getByRole('link', {
        name: /meridenozawkieareachamber@gmail.com/i,
      });
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveAttribute(
        'href',
        'mailto:meridenozawkieareachamber@gmail.com',
      );
    });

    test('should display phone contact info', async ({ page }) => {
      const phoneHeading = page.getByRole('heading', { name: /^Phone$/i });
      await expect(phoneHeading).toBeVisible();

      const phoneText = page.getByText(/\(785\) 817-5979/i);
      await expect(phoneText).toBeVisible();
    });

    test('should display office contact info', async ({ page }) => {
      const officeHeading = page.getByRole('heading', { name: /^Office$/i });
      await expect(officeHeading).toBeVisible();

      const officeLink = page.getByRole('link', {
        name: /3675 74th St, Meriden, KS 66512/i,
      });
      await expect(officeLink).toBeVisible();
      await expect(officeLink).toHaveAttribute(
        'href',
        'https://maps.app.goo.gl/8A8siHDuCAgQYXvP9',
      );
    });

    test('should display contact icons', async ({ page }) => {
      // Check that the section with contact info exists
      const contactSection = page
        .locator('section')
        .filter({ hasText: 'Questions?' });
      await expect(contactSection).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByRole('heading', {
        name: /Grow your business/i,
      });
      await expect(heading).toBeVisible();

      const submitButton = page.getByRole('button', { name: /Submit/i });
      await expect(submitButton).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByRole('heading', {
        name: /Grow your business/i,
      });
      await expect(heading).toBeVisible();

      const emailField = page.locator('#email');
      await expect(emailField).toBeVisible();
    });

    test('should adapt benefits grid for different viewports', async ({
      page,
    }) => {
      const benefitsGrid = page.locator(
        '.grid.grid-cols-1.items-start.gap-y-12',
      );
      await expect(benefitsGrid).toHaveClass(/md:grid-cols-2/);
      await expect(benefitsGrid).toHaveClass(/lg:grid-cols-4/);
    });
  });
});
