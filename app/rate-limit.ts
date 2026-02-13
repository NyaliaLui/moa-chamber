import { RateLimiterMemory } from 'rate-limiter-flexible';

// Global rate limiter: 100 requests per minute per IP
export const globalLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

// Form submission rate limiter: 5 submissions per 15 minutes per IP
export const formSubmissionLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60,
});

export function getClientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
