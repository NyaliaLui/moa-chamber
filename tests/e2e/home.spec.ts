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

  test.describe('Hero Section', () => {
    test('should display hero section with heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display hero description text', async ({ page }) => {
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
      const whoWeAreButton = page.getByRole('button', {
        name: /Who we are/i,
      });
      await expect(whoWeAreButton).toBeVisible();
    });

    test('should display hero image', async ({ page }) => {
      const heroImage = page.getByAltText(/Hero image/i);
      await expect(heroImage).toBeVisible();
    });
  });

  test.describe('News Carousel Section', () => {
    test('should display news carousel section', async ({ page }) => {
      const newsCarousel = page.getByTestId('news-carousel');
      await expect(newsCarousel).toBeVisible();
    });

    test('should display "Chamber News" heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Chamber News/i });
      await expect(heading).toBeVisible();
    });

    test('should display "View all" button linking to news page', async ({
      page,
    }) => {
      const viewAllButton = page.getByRole('link', { name: /View all/i });
      await expect(viewAllButton).toBeVisible();
      await expect(viewAllButton).toHaveAttribute('href', '/news');
    });

    test('should display carousel with news items', async ({ page }) => {
      const carousel = page.locator('.carousel');
      await expect(carousel).toBeVisible();
    });
  });

  test.describe('Benefits Section', () => {
    test('should display benefits section heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Benefits of Chamber Membership/i,
      });
      await expect(heading).toBeVisible();
    });

    test('should display benefits description', async ({ page }) => {
      const description = page.getByText(
        /Strategic support for local entrepreneurs and business owners/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display all three benefit cards', async ({ page }) => {
      await expect(
        page.getByText(/Amplify your business visibility/i),
      ).toBeVisible();
      await expect(
        page.getByText(/Build powerful business relationships/i),
      ).toBeVisible();
      await expect(
        page.getByText(/Contribute to community development/i),
      ).toBeVisible();
    });

    test('should display benefit card labels', async ({ page }) => {
      await expect(page.getByText('Promote')).toBeVisible();
      await expect(page.getByText('Connect')).toBeVisible();
      await expect(page.getByText('Serve')).toBeVisible();
    });

    test('should display "Join the chamber" button', async ({ page }) => {
      const joinButton = page.getByTestId('benefits-join-btn');
      await expect(joinButton).toBeVisible();
      await expect(joinButton).toHaveText(/Join the chamber/i);
    });
  });

  test.describe('Testimonials Section', () => {
    test('should display testimonials section heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: /Member stories/i });
      await expect(heading).toBeVisible();
    });

    test('should display all three testimonials', async ({ page }) => {
      // First testimonial
      await expect(
        page.getByText(
          /The chamber helped me connect with key local partners and grow my business/i,
        ),
      ).toBeVisible();
      await expect(page.getByText('Jane Doe')).toBeVisible();
      await expect(page.getByText(/Jane Consulting/i)).toBeVisible();

      // Second testimonial
      await expect(
        page.getByText(
          /Joining the chamber was the best decision for my small business networking/i,
        ),
      ).toBeVisible();
      await expect(page.getByText('John Smith')).toBeVisible();
      await expect(page.getByText(/Green Prairie Farms/i)).toBeVisible();

      // Third testimonial
      await expect(
        page.getByText(
          /The resources and support have been invaluable to our local business community/i,
        ),
      ).toBeVisible();
      await expect(page.getByText('Madison Anderson')).toBeVisible();
      await expect(page.getByText(/Anderson Hardware/i)).toBeVisible();
    });

    test('should display star ratings for all testimonials', async ({
      page,
    }) => {
      const testimonials = page.locator(
        'section:has-text("Member stories") .flex.w-full.flex-col',
      );
      const count = await testimonials.count();
      expect(count).toBe(3);
    });
  });

  test.describe('Call to Action Section', () => {
    test('should display CTA section heading', async ({ page }) => {
      const heading = page
        .locator('section')
        .filter({ hasText: 'Join the Chamber' })
        .getByRole('heading', { name: /Join the Chamber/i });
      await expect(heading).toBeVisible();
    });

    test('should display CTA description', async ({ page }) => {
      const description = page.getByText(
        /Unlock opportunities for your business and connect with local entrepreneurs/i,
      );
      await expect(description).toBeVisible();
    });

    test('should display "Apply now" button', async ({ page }) => {
      const applyButton = page.getByTestId('cta-apply-btn');
      await expect(applyButton).toBeVisible();
      await expect(applyButton).toHaveText(/Apply now/i);
    });
  });

  test.describe('Navigation', () => {
    test('navigation - "Our Initiatives" navigates to "Projects" page', async ({
      page,
    }) => {
      await page.getByTestId(testIds.HOME_PAGE.OUR_INITIATIVES_CTA).click();

      await expect(
        page.getByTestId(testIds.PROJECTS_PAGE.HEADER),
      ).toBeVisible();
    });

    test('should navigate to news page when "View all" is clicked', async ({
      page,
    }) => {
      await page.getByRole('link', { name: /View all/i }).click();
      await expect(page).toHaveURL(/\/news/);
    });

    test('should navigate to join page when hero "Join Us" is clicked', async ({
      page,
    }) => {
      await page.getByRole('link', { name: /Join Us/i }).click();
      await expect(page).toHaveURL(/\/join/);
    });
  });

  test.describe('Visual Regression', () => {
    test('look and feel - highlights', async ({ page }) => {
      await expect(
        page.getByTestId(testIds.HOME_PAGE.HIGHLIGHTS),
        //TODO(@NyaliaLui): Need to figure out how to get CI
        // to look at the correct path for the screenshot image.
      ).toHaveScreenshot('home-highlights.png', {
        mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
      });
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heading).toBeVisible();

      const newsHeading = page.getByRole('heading', {
        name: /Chamber News/i,
      });
      await expect(newsHeading).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.getByRole('heading', {
        name: /Empowering businesses in Meriden and Ozawkie/i,
      });
      await expect(heading).toBeVisible();

      const benefitsHeading = page.getByRole('heading', {
        name: /Benefits of Chamber Membership/i,
      });
      await expect(benefitsHeading).toBeVisible();
    });
  });
});
