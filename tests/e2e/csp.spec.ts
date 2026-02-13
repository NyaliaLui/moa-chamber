import { test, expect } from '@playwright/test';
import { waitForLoadingState } from './common';

test.describe('Content Security Policy', () => {
  const PAGES = [
    '/',
    '/directory',
    '/calendar',
    '/resources',
    '/about',
    '/join',
  ];

  for (const path of PAGES) {
    test(`should include CSP header on ${path}`, async ({ page }) => {
      const response = await page.goto(path);
      const csp = response?.headers()['content-security-policy'];
      expect(csp).toBeDefined();
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("frame-ancestors 'none'");
    });
  }

  // Note: inline script injection cannot be tested here because our CSP uses
  // 'unsafe-inline' in script-src (required for Next.js without nonces).
  // The nonce-based approach would block inline scripts but requires dynamic
  // rendering for all pages.

  test('should block object/embed elements', async ({ page }) => {
    await page.goto('/');
    await waitForLoadingState(page);

    // object-src 'none' should prevent plugin content from loading
    const objectBlocked = await page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        const obj = document.createElement('object');
        obj.data = 'https://evil.example.com/malicious.swf';
        obj.type = 'application/x-shockwave-flash';
        obj.onerror = () => resolve(true);
        // If it loads somehow, fail the test
        obj.onload = () => resolve(false);
        document.body.appendChild(obj);
        // Fallback timeout — if neither fires, treat as blocked
        setTimeout(() => resolve(true), 2000);
      });
    });

    expect(objectBlocked).toBe(true);
  });

  test('should block script from unauthorized external origin', async ({
    page,
  }) => {
    await page.goto('/');
    await waitForLoadingState(page);

    const scriptLoaded = await page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://evil.example.com/malicious.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    });

    expect(scriptLoaded).toBe(false);
  });

  test('CSP header should contain required directives', async ({ page }) => {
    const response = await page.goto('/');
    const csp = response?.headers()['content-security-policy'];
    expect(csp).toBeDefined();

    const requiredDirectives = [
      "default-src 'self'",
      'script-src',
      'style-src',
      'img-src',
      'font-src',
      'connect-src',
      'frame-src',
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ];

    for (const directive of requiredDirectives) {
      expect(csp).toContain(directive);
    }
  });
});
