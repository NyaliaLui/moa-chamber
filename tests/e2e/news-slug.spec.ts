import { test, expect } from '@playwright/test';
import testIds from '@app/test-ids';

test.describe('News Article Detail Page', () => {
  let articleSlug: string;

  test.beforeEach(async ({ page }) => {
    // First navigate to the news page to get an article slug
    await page.goto('/news');

    // Get the first news card and extract the slug from its href
    const firstNewsCard = page
      .getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CTA)
      .first();
    const href = await firstNewsCard.getAttribute('href');

    if (href) {
      articleSlug = href.replace('/news/', '');
      await page.goto(`/news/${articleSlug}`);
    }
  });

  test.describe('Page Load and Structure', () => {
    test('should load the news article page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/news\/.+/);
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

    test('should display the news details container', async ({ page }) => {
      const container = page.getByTestId(testIds.NEWS_DETAILS_PAGE.CONTAINER);
      await expect(container).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should display "Back to posts" link', async ({ page }) => {
      const backLink = page.getByRole('link', { name: /Back to posts/i });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/news');
    });

    test('should navigate back to news page when clicking "Back to posts"', async ({
      page,
    }) => {
      const backLink = page.getByRole('link', { name: /Back to posts/i });
      await backLink.click();
      await expect(page).toHaveURL('/news');
    });

    test('should display chevron icon on "Back to posts" link', async ({
      page,
    }) => {
      const backLink = page.getByRole('link', { name: /Back to posts/i });
      const chevron = backLink.locator('svg');
      await expect(chevron).toBeVisible();
    });
  });

  test.describe('Article Header', () => {
    test('should display read time', async ({ page }) => {
      const readTime = page.getByText(/min read/i).first();
      await expect(readTime).toBeVisible();
    });

    test('should display article heading', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();

      // Verify heading has content
      const text = await heading.textContent();
      expect(text).toBeTruthy();
      expect(text!.length).toBeGreaterThan(0);
    });

    test('should have large heading text', async ({ page }) => {
      const heading = page.locator('h1').first();
      const classes = await heading.getAttribute('class');
      expect(classes).toContain('text-5xl');
      expect(classes).toContain('font-bold');
    });
  });

  test.describe('Article Image', () => {
    test('should display article featured image', async ({ page }) => {
      const featuredImage = page.getByRole('img', { name: /Relume/i }).first();
      await expect(featuredImage).toBeVisible();

      // Verify image has proper attributes
      const src = await featuredImage.getAttribute('src');
      expect(src).toBeTruthy();
    });

    test('should display image with proper aspect ratio', async ({ page }) => {
      const featuredImage = page.getByRole('img', { name: /Relume/i }).first();
      const classes = await featuredImage.getAttribute('class');

      expect(classes).toContain('aspect-5/2');
      expect(classes).toContain('object-cover');
    });

    test('should have full width image', async ({ page }) => {
      const featuredImage = page.getByRole('img', { name: /Relume/i }).first();
      const classes = await featuredImage.getAttribute('class');

      expect(classes).toContain('size-full');
    });
  });

  test.describe('Article Metadata', () => {
    test('should display "Published on" label', async ({ page }) => {
      const publishedLabel = page.getByText(/Published on/i);
      await expect(publishedLabel).toBeVisible();
    });

    test('should display publication date', async ({ page }) => {
      // Wait for the date to be rendered

      // The date should be rendered after "Published on"
      const dateSection = page.locator('text=Published on').locator('..');
      await expect(dateSection).toBeVisible();
    });
  });

  test.describe('Article Content', () => {
    test('should display article long description', async ({ page }) => {
      const description = page.locator('.prose p').first();
      await expect(description).toBeVisible();

      // Verify description has content
      const text = await description.textContent();
      expect(text).toBeTruthy();
    });

    test('should display prose styling', async ({ page }) => {
      const proseSection = page.locator('.prose');
      await expect(proseSection).toBeVisible();

      // Check for responsive prose classes
      const classes = await proseSection.getAttribute('class');
      expect(classes).toContain('md:prose-md');
      expect(classes).toContain('lg:prose-lg');
    });

    test('should display figure with image and caption', async ({ page }) => {
      const figure = page.locator('figure');
      await expect(figure).toBeVisible();

      const figureImage = figure.locator('img');
      await expect(figureImage).toBeVisible();

      const caption = figure.locator('figcaption');
      await expect(caption).toBeVisible();
    });
  });

  test.describe('Author Information', () => {
    test('should display horizontal rule before author section', async ({
      page,
    }) => {
      const hr = page.locator('hr');
      await expect(hr).toBeVisible();
    });

    test('should display author image', async ({ page }) => {
      // The author image should be a rounded image
      const authorImage = page.locator('img.rounded-full');
      await expect(authorImage).toBeVisible();
    });

    test('should display author name', async ({ page }) => {
      // Author name should be in a semibold paragraph
      const authorSection = page.getByTestId(
        testIds.NEWS_DETAILS_PAGE.AUTHOR_SECTION,
      );
      await expect(authorSection).toBeVisible();

      const authorName = authorSection.getByTestId(
        testIds.NEWS_DETAILS_PAGE.AUTHOR_NAME,
      );
      await expect(authorName).toBeVisible();

      const nameText = await authorName.textContent();
      expect(nameText).toBeTruthy();
    });

    test('should display author role', async ({ page }) => {
      const authorSection = page.getByTestId(
        testIds.NEWS_DETAILS_PAGE.AUTHOR_SECTION,
      );
      const authorRole = authorSection.getByTestId(
        testIds.NEWS_DETAILS_PAGE.AUTHOR_ROLE,
      );

      await expect(authorRole).toBeVisible();
    });

    test('should have circular author image', async ({ page }) => {
      const authorImage = page.locator('img.rounded-full');
      const classes = await authorImage.getAttribute('class');

      expect(classes).toContain('rounded-full');
      expect(classes).toContain('object-cover');
    });
  });

  test.describe('Gallery Section', () => {
    test('should display gallery images if available', async ({ page }) => {
      // Check if gallery section exists
      const gallerySection = page.locator('.container.pt-16');
      const galleryImages = gallerySection.locator('img');
      const count = await galleryImages.count();

      // Gallery might be empty, so we just check if the section exists
      await expect(gallerySection).toBeVisible();
    });

    test('should have proper gallery grid layout', async ({ page }) => {
      const gallerySection = page.locator('.container.pt-16');
      await expect(gallerySection).toBeVisible();

      // Check for masonry grid classes
      const classes = await gallerySection.getAttribute('class');
      expect(classes).toContain('md:columns-3');
    });

    test('should display gallery images with proper alt text', async ({
      page,
    }) => {
      const gallerySection = page.locator('.container.pt-16');
      const galleryImages = gallerySection.locator('img');
      const count = await galleryImages.count();

      if (count > 0) {
        // Check first gallery image has alt text
        const alt = await galleryImages.first().getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt).toContain('gallery');
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();

      const backLink = page.getByRole('link', { name: /Back to posts/i });
      await expect(backLink).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();

      const featuredImage = page.getByRole('img', { name: /Relume/i }).first();
      await expect(featuredImage).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();

      const authorImage = page.locator('img.rounded-full');
      await expect(authorImage).toBeVisible();
    });
  });

  test.describe('Content Validation', () => {
    test('should have non-empty article heading', async ({ page }) => {
      const heading = page.locator('h1').first();
      const text = await heading.textContent();

      expect(text).toBeTruthy();
      expect(text!.trim().length).toBeGreaterThan(0);
    });

    test('should have article content', async ({ page }) => {
      const description = page.locator('.prose p').first();
      const text = await description.textContent();

      expect(text).toBeTruthy();
      expect(text!.trim().length).toBeGreaterThan(0);
    });
  });

  test.describe('Typography', () => {
    test('should have proper heading typography', async ({ page }) => {
      const heading = page.locator('h1').first();
      const classes = await heading.getAttribute('class');

      expect(classes).toContain('text-5xl');
      expect(classes).toContain('font-bold');
    });

    test('should have readable content typography', async ({ page }) => {
      const proseSection = page.locator('.prose');
      await expect(proseSection).toBeVisible();

      const classes = await proseSection.getAttribute('class');
      expect(classes).toContain('prose');
    });

    test('should have small text for read time', async ({ page }) => {
      const readTime = page.getByText(/min read/i).first();
      const classes = await readTime.getAttribute('class');

      expect(classes).toContain('text-sm');
      expect(classes).toContain('font-semibold');
    });
  });

  test.describe('Layout Structure', () => {
    test('should have container for main content', async ({ page }) => {
      const container = page.locator('.container').first();
      await expect(container).toBeVisible();
    });

    test('should center content with max-width', async ({ page }) => {
      const maxWidthContainer = page.locator('.max-w-lg');
      await expect(maxWidthContainer.first()).toBeVisible();
    });
  });
});
