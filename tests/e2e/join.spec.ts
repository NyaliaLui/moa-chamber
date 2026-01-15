import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';
import { waitForLoadingState, VIEWPORTS } from './common';

test.describe('Join Page', () => {
  const PATH = '/join';

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
    await waitForLoadingState(page);
  });

  test.describe('Page Load and Structure', () => {
    test('should load the join page successfully', async ({ page }) => {
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

  test.describe('Page Header Section', () => {
    test('should display main heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Grow your business/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display page description', async ({ page }) => {
      const description = page.getByText(
        /Join the Meriden\/Ozawkie Area Chamber of Commerce and unlock powerful opportunities/i,
      );
      await expect(description).toBeVisible();
    });
  });

  test.describe('Benefits Section', () => {
    test('should display all four benefit cards', async ({ page }) => {
      // Check for benefit cards by their unique messages
      const benefit1 = page.getByText(
        /Promote your business through Chamber activities/i,
      );
      const benefit2 = page.getByText(
        /Enhance your network of key business contacts/i,
      );
      const benefit3 = page.getByText(
        /Develop our community through meaningful service/i,
      );
      const benefit4 = page.getByText(
        /Support the creation of strong local businesses/i,
      );

      await expect(benefit1).toBeVisible();
      await expect(benefit2).toBeVisible();
      await expect(benefit3).toBeVisible();
      await expect(benefit4).toBeVisible();
    });

    test('should display benefit icons', async ({ page }) => {
      // Check for icons (4 benefit cards should have icons)
      const icons = page.locator('svg.size-12').first();
      await expect(icons).toBeVisible();
    });

    test('should display benefits in grid layout', async ({ page }) => {
      const benefitsGrid = page.locator('.grid.grid-cols-1');
      await expect(benefitsGrid.first()).toBeVisible();

      // Check for responsive grid classes
      const classes = await benefitsGrid.first().getAttribute('class');
      expect(classes).toContain('lg:grid-cols-4');
    });
  });

  test.describe('Membership Form Section', () => {
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

    test('should display all required form fields', async ({ page }) => {
      // Business name field
      const businessField = page.locator('#business');
      await expect(businessField).toBeVisible();

      // Contact name field
      const contactField = page.locator('#contact');
      await expect(contactField).toBeVisible();

      // Business address field
      const addressField = page.locator('#address');
      await expect(addressField).toBeVisible();

      // Number of employees field
      const employeesField = page.locator('#employees');
      await expect(employeesField).toBeVisible();
    });

    test('should display all optional form fields', async ({ page }) => {
      // Phone field
      const phoneField = page.locator('#phone');
      await expect(phoneField).toBeVisible();

      // Email field
      const emailField = page.locator('#email');
      await expect(emailField).toBeVisible();

      // Website field
      const websiteField = page.locator('#website');
      await expect(websiteField).toBeVisible();

      // Referral field
      const referralField = page.locator('#referral');
      await expect(referralField).toBeVisible();

      // Donation field
      const donationField = page.locator('#donation');
      await expect(donationField).toBeVisible();
    });

    test('should display contact role radio buttons', async ({ page }) => {
      const ownerRadio = page.locator('#owner');
      const managerRadio = page.locator('#manager');

      await expect(ownerRadio).toBeVisible();
      await expect(managerRadio).toBeVisible();

      // Owner should be checked by default
      await expect(ownerRadio).toBeChecked();
    });

    test('should display required field indicators', async ({ page }) => {
      // Check for asterisks indicating required fields
      const requiredIndicators = page.locator('span.text-red-400');
      const count = await requiredIndicators.count();

      expect(count).toBeGreaterThanOrEqual(5); // Business, Contact, Role, Address, Employees
    });

    test('should display submit button', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: /Submit/i });
      await expect(submitButton).toBeVisible();
    });

    test('should have proper form field labels', async ({ page }) => {
      const businessLabel = page.getByText(/Business name/i);
      const contactLabel = page.getByText(/Contact name/i);
      const addressLabel = page.getByText(/Business address/i);
      const phoneLabel = page.getByText(/Phone number/i);
      const emailLabel = page.locator('label[for="email"]');
      const websiteLabel = page.getByText(/Website/i);

      await expect(businessLabel).toBeVisible();
      await expect(contactLabel).toBeVisible();
      await expect(addressLabel).toBeVisible();
      await expect(phoneLabel).toBeVisible();
      await expect(emailLabel).toBeVisible();
      await expect(websiteLabel).toBeVisible();
    });

    test('should have placeholders for certain fields', async ({ page }) => {
      const addressField = page.locator('#address');
      const phoneField = page.locator('#phone');
      const emailField = page.locator('#email');
      const websiteField = page.locator('#website');

      const addressPlaceholder = await addressField.getAttribute('placeholder');
      const phonePlaceholder = await phoneField.getAttribute('placeholder');
      const emailPlaceholder = await emailField.getAttribute('placeholder');
      const websitePlaceholder = await websiteField.getAttribute('placeholder');

      expect(addressPlaceholder).toBeTruthy();
      expect(phonePlaceholder).toBeTruthy();
      expect(emailPlaceholder).toBeTruthy();
      expect(websitePlaceholder).toBeTruthy();
    });
  });

  test.describe('Form Validation', () => {
    test('should require business name', async ({ page }) => {
      const businessField = page.locator('#business');
      const isRequired = await businessField.getAttribute('required');

      expect(isRequired).not.toBeNull();
    });

    test('should require contact name', async ({ page }) => {
      const contactField = page.locator('#contact');
      const isRequired = await contactField.getAttribute('required');

      expect(isRequired).not.toBeNull();
    });

    test('should require business address', async ({ page }) => {
      const addressField = page.locator('#address');
      const isRequired = await addressField.getAttribute('required');

      expect(isRequired).not.toBeNull();
    });

    test('should require number of employees', async ({ page }) => {
      const employeesField = page.locator('#employees');
      const isRequired = await employeesField.getAttribute('required');

      expect(isRequired).not.toBeNull();
    });

    test('should validate email field type', async ({ page }) => {
      const emailField = page.locator('#email');
      const fieldType = await emailField.getAttribute('type');

      expect(fieldType).toBe('email');
    });

    test('should validate phone field type', async ({ page }) => {
      const phoneField = page.locator('#phone');
      const fieldType = await phoneField.getAttribute('type');

      expect(fieldType).toBe('tel');
    });

    test('should validate website field type', async ({ page }) => {
      const websiteField = page.locator('#website');
      const fieldType = await websiteField.getAttribute('type');

      expect(fieldType).toBe('text');
    });

    test('should allow radio button selection', async ({ page }) => {
      const ownerRadio = page.locator('#owner');
      const managerRadio = page.locator('#manager');

      // Owner is checked by default
      await expect(ownerRadio).toBeChecked();

      // Click manager radio
      await managerRadio.click();
      await expect(managerRadio).toBeChecked();
      await expect(ownerRadio).not.toBeChecked();
    });
  });

  test.describe('Form Interaction', () => {
    test('should be able to fill out the form', async ({ page }) => {
      await page.locator('#business').fill('Test Business');
      await page.locator('#contact').fill('John Doe');
      await page.locator('#address').fill('123 Test St, Meriden, KS 66512');
      await page.locator('#phone').fill('(785) 555-1234');
      await page.locator('#email').fill('test@example.com');
      await page.locator('#website').fill('https://example.com');
      await page.locator('#employees').fill('3');
      await page.locator('#referral').fill('Jane Smith');
      await page.locator('#donation').fill('25.00');

      // Verify values are filled
      await expect(page.locator('#business')).toHaveValue('Test Business');
      await expect(page.locator('#contact')).toHaveValue('John Doe');
      await expect(page.locator('#address')).toHaveValue(
        '123 Test St, Meriden, KS 66512',
      );
      await expect(page.locator('#phone')).toHaveValue('(785) 555-1234');
      await expect(page.locator('#email')).toHaveValue('test@example.com');
      await expect(page.locator('#website')).toHaveValue('https://example.com');
      await expect(page.locator('#employees')).toHaveValue('3');
      await expect(page.locator('#referral')).toHaveValue('Jane Smith');
      await expect(page.locator('#donation')).toHaveValue('25.00');
    });

    test('should disable form fields while submitting', async ({ page }) => {
      // Fill required fields
      await page.locator('#business').fill('Test Business');
      await page.locator('#contact').fill('John Doe');
      await page.locator('#address').fill('123 Test St, Meriden, KS 66512');
      await page.locator('#employees').fill('2');

      // Mock the form submission to take longer
      await page.route('**/api/**', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await route.fulfill({ status: 200, body: '{}' });
      });

      // Submit form
      const submitButton = page.getByRole('button', { name: /Submit/i });
      await submitButton.click();

      // Check that button text changes to "Submitting..."
      await expect(submitButton).toHaveText(/Submitting.../i);
    });
  });

  test.describe('Questions Section', () => {
    test('should display questions section heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Questions\?/i });
      await expect(heading).toBeVisible();
    });

    test('should display questions section description', async ({ page }) => {
      const description = page.getByText(
        /We are here to answer your membership questions/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display email contact section', async ({ page }) => {
      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      await expect(emailHeading).toBeVisible();

      // There are two email links, the first one is from this page and
      // the second is from the footer.
      const emailLink = page
        .getByRole('link', {
          name: /meridenozawkieareachamber@gmail.com/i,
        })
        .first();
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveAttribute(
        'href',
        'mailto:meridenozawkieareachamber@gmail.com',
      );
    });

    test('should display phone contact section', async ({ page }) => {
      const phoneHeading = page.getByRole('heading', { name: /^Phone$/i });
      await expect(phoneHeading).toBeVisible();

      const phoneNumber = page.getByText(/\(785\) 817-5979/i);
      await expect(phoneNumber).toBeVisible();
    });

    test('should display office contact section', async ({ page }) => {
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
      // Check for SVG icons in contact section
      const emailIcon = page.locator('svg.size-12').nth(4); // After the 4 benefit icons
      await expect(emailIcon).toBeVisible();
    });

    test('should display all three contact methods', async ({ page }) => {
      const emailHeading = page.getByRole('heading', { name: /^Email$/i });
      const phoneHeading = page.getByRole('heading', { name: /^Phone$/i });
      const officeHeading = page.getByRole('heading', { name: /^Office$/i });

      await expect(emailHeading).toBeVisible();
      await expect(phoneHeading).toBeVisible();
      await expect(officeHeading).toBeVisible();
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
        name: /Grow your business/i,
      });
      await expect(heading).toBeVisible();
      const description = page.getByText(
        /Join the Meriden\/Ozawkie Area Chamber of Commerce and unlock powerful opportunities/i,
      );
      await expect(description).toBeVisible();

      // All four benefit cards
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

      // Form section
      const formHeading = page.getByRole('heading', { name: /Join us/i });
      await expect(formHeading).toBeVisible();
      await expect(
        page.getByText(/Complete your chamber membership application/i),
      ).toBeVisible();

      // All form fields
      await expect(page.locator('#business')).toBeVisible();
      await expect(page.locator('#contact')).toBeVisible();
      await expect(page.locator('#owner')).toBeVisible();
      await expect(page.locator('#manager')).toBeVisible();
      await expect(page.locator('#address')).toBeVisible();
      await expect(page.locator('#employees')).toBeVisible();
      await expect(page.locator('#phone')).toBeVisible();
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('#website')).toBeVisible();
      await expect(page.locator('#referral')).toBeVisible();
      await expect(page.locator('#donation')).toBeVisible();
      await expect(page.getByRole('button', { name: /Submit/i })).toBeVisible();

      // Questions section
      await expect(
        page.getByRole('heading', { name: /Questions\?/i }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Email$/i }),
      ).toBeVisible();
      await expect(
        page
          .getByRole('link', {
            name: /meridenozawkieareachamber@gmail.com/i,
          })
          .first(),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Phone$/i }),
      ).toBeVisible();
      await expect(page.getByText(/\(785\) 817-5979/i)).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Office$/i }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /3675 74th St, Meriden, KS 66512/i }),
      ).toBeVisible();
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
        name: /Grow your business/i,
      });
      await expect(heading).toBeVisible();
      const description = page.getByText(
        /Join the Meriden\/Ozawkie Area Chamber of Commerce and unlock powerful opportunities/i,
      );
      await expect(description).toBeVisible();

      // All four benefit cards
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

      // Form section
      const formHeading = page.getByRole('heading', { name: /Join us/i });
      await expect(formHeading).toBeVisible();
      await expect(
        page.getByText(/Complete your chamber membership application/i),
      ).toBeVisible();

      // All form fields
      await expect(page.locator('#business')).toBeVisible();
      await expect(page.locator('#contact')).toBeVisible();
      await expect(page.locator('#owner')).toBeVisible();
      await expect(page.locator('#manager')).toBeVisible();
      await expect(page.locator('#address')).toBeVisible();
      await expect(page.locator('#employees')).toBeVisible();
      await expect(page.locator('#phone')).toBeVisible();
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('#website')).toBeVisible();
      await expect(page.locator('#referral')).toBeVisible();
      await expect(page.locator('#donation')).toBeVisible();
      await expect(page.getByRole('button', { name: /Submit/i })).toBeVisible();

      // Questions section
      await expect(
        page.getByRole('heading', { name: /Questions\?/i }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Email$/i }),
      ).toBeVisible();
      await expect(
        page
          .getByRole('link', {
            name: /meridenozawkieareachamber@gmail.com/i,
          })
          .first(),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Phone$/i }),
      ).toBeVisible();
      await expect(page.getByText(/\(785\) 817-5979/i)).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Office$/i }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /3675 74th St, Meriden, KS 66512/i }),
      ).toBeVisible();
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
        name: /Grow your business/i,
      });
      await expect(heading).toBeVisible();
      const description = page.getByText(
        /Join the Meriden\/Ozawkie Area Chamber of Commerce and unlock powerful opportunities/i,
      );
      await expect(description).toBeVisible();

      // All four benefit cards
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

      // Form section
      const formHeading = page.getByRole('heading', { name: /Join us/i });
      await expect(formHeading).toBeVisible();
      await expect(
        page.getByText(/Complete your chamber membership application/i),
      ).toBeVisible();

      // All form fields
      await expect(page.locator('#business')).toBeVisible();
      await expect(page.locator('#contact')).toBeVisible();
      await expect(page.locator('#owner')).toBeVisible();
      await expect(page.locator('#manager')).toBeVisible();
      await expect(page.locator('#address')).toBeVisible();
      await expect(page.locator('#employees')).toBeVisible();
      await expect(page.locator('#phone')).toBeVisible();
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('#website')).toBeVisible();
      await expect(page.locator('#referral')).toBeVisible();
      await expect(page.locator('#donation')).toBeVisible();
      await expect(page.getByRole('button', { name: /Submit/i })).toBeVisible();

      // Questions section
      await expect(
        page.getByRole('heading', { name: /Questions\?/i }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Email$/i }),
      ).toBeVisible();
      await expect(
        page
          .getByRole('link', {
            name: /meridenozawkieareachamber@gmail.com/i,
          })
          .first(),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Phone$/i }),
      ).toBeVisible();
      await expect(page.getByText(/\(785\) 817-5979/i)).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /^Office$/i }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /3675 74th St, Meriden, KS 66512/i }),
      ).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper form labels associated with inputs', async ({
      page,
    }) => {
      const businessLabel = page.locator('label[for="business"]');
      const contactLabel = page.locator('label[for="contact"]');
      const addressLabel = page.locator('label[for="address"]');

      await expect(businessLabel).toBeVisible();
      await expect(contactLabel).toBeVisible();
      await expect(addressLabel).toBeVisible();
    });

    test('should have clickable labels for radio buttons', async ({ page }) => {
      const ownerLabel = page.locator('label[for="owner"]');
      const managerLabel = page.locator('label[for="manager"]');

      await expect(ownerLabel).toBeVisible();
      await expect(managerLabel).toBeVisible();

      // Click label should select radio button
      await managerLabel.click();
      const managerRadio = page.locator('#manager');
      await expect(managerRadio).toBeChecked();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h2Headings = page.locator('h2');
      const count = await h2Headings.count();

      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Link Functionality', () => {
    test('should have working email link', async ({ page }) => {
      const emailLink = page
        .getByRole('link', {
          name: /meridenozawkieareachamber@gmail.com/i,
        })
        .first();

      const href = await emailLink.getAttribute('href');
      expect(href).toContain('mailto:');
    });

    test('should have working office location link', async ({ page }) => {
      const officeLink = page.getByRole('link', {
        name: /3675 74th St, Meriden, KS 66512/i,
      });

      const href = await officeLink.getAttribute('href');
      expect(href).toContain('maps.app.goo.gl');
    });
  });
});
