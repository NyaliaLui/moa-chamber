import { RateLimiterMemory } from 'rate-limiter-flexible';

const globalPoints = parseInt(
  process.env.RATE_LIMIT_GLOBAL_POINTS || '100',
  10,
);
const formPoints = parseInt(process.env.RATE_LIMIT_FORM_POINTS || '5', 10);

// Global rate limiter: requests per minute per IP
export const globalLimiter = new RateLimiterMemory({
  points: globalPoints,
  duration: 60,
});

// Form submission rate limiter: submissions per 15 minutes per IP
export const formSubmissionLimiter = new RateLimiterMemory({
  points: formPoints,
  duration: 15 * 60,
});

export function getClientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
