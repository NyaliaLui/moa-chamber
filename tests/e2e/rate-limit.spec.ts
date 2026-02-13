import { test, expect } from '@playwright/test';

// These tests run against a dedicated server on port 3001 that has
// RATE_LIMIT_GLOBAL_POINTS=3 so the limit is triggered quickly.
// Each test uses a unique x-forwarded-for IP to get its own bucket.
const RATE_LIMIT_BASE_URL = 'http://127.0.0.1:3001';
const RATE_LIMIT = 3;

test.describe('Rate Limiting', () => {
  test('should allow requests within the global rate limit', async ({
    playwright,
  }) => {
    const context = await playwright.request.newContext({
      baseURL: RATE_LIMIT_BASE_URL,
      extraHTTPHeaders: { 'x-forwarded-for': '10.200.0.1' },
    });

    try {
      const response = await context.get('/');
      expect(response.status()).not.toBe(429);
    } finally {
      await context.dispose();
    }
  });

  test('should return 429 when global rate limit is exceeded', async ({
    playwright,
  }) => {
    const context = await playwright.request.newContext({
      baseURL: RATE_LIMIT_BASE_URL,
      extraHTTPHeaders: { 'x-forwarded-for': '10.200.0.2' },
    });

    try {
      for (let i = 0; i < RATE_LIMIT; i++) {
        await context.get('/');
      }

      const response = await context.get('/');
      expect(response.status()).toBe(429);
    } finally {
      await context.dispose();
    }
  });

  test('429 response should include Retry-After header', async ({
    playwright,
  }) => {
    const context = await playwright.request.newContext({
      baseURL: RATE_LIMIT_BASE_URL,
      extraHTTPHeaders: { 'x-forwarded-for': '10.200.0.3' },
    });

    try {
      for (let i = 0; i < RATE_LIMIT; i++) {
        await context.get('/');
      }

      const response = await context.get('/');
      expect(response.status()).toBe(429);
      expect(response.headers()['retry-after']).toBe('60');
    } finally {
      await context.dispose();
    }
  });

  test('429 response body should be "Too Many Requests"', async ({
    playwright,
  }) => {
    const context = await playwright.request.newContext({
      baseURL: RATE_LIMIT_BASE_URL,
      extraHTTPHeaders: { 'x-forwarded-for': '10.200.0.4' },
    });

    try {
      for (let i = 0; i < RATE_LIMIT; i++) {
        await context.get('/');
      }

      const response = await context.get('/');
      expect(response.status()).toBe(429);
      expect(await response.text()).toBe('Too Many Requests');
    } finally {
      await context.dispose();
    }
  });
});
