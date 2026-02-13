/**
 * Strips HTML tags from text content returned by Wix CMS.
 * Preserves normal punctuation (quotes, parentheses, etc.) since the output
 * is rendered as React text nodes which are automatically escaped.
 */
export function sanitizeText(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitizes a URL to prevent javascript: and other dangerous protocol injections.
 * Returns the URL unchanged if it uses a safe protocol, or an empty string otherwise.
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmed = url.trim();
  if (trimmed === '') {
    return '';
  }

  try {
    const parsed = new URL(trimmed);
    const safeProtocols = ['http:', 'https:', 'mailto:'];
    if (!safeProtocols.includes(parsed.protocol)) {
      return '';
    }
    return trimmed;
  } catch {
    // Allow relative URLs (e.g. "/path/to/page") — they're same-origin and safe
    if (trimmed.startsWith('/')) {
      return trimmed;
    }
    return '';
  }
}

/**
 * Validates an email address format. Returns the sanitized email if valid,
 * or the fallback value otherwise.
 */
export function validateEmail(value: string, fallback: string): string {
  const cleaned = sanitizeText(value);
  if (!cleaned) return fallback;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
    return cleaned;
  }
  return fallback;
}

/**
 * Validates a phone number format. Returns the sanitized phone if valid,
 * or the fallback value otherwise.
 */
export function validatePhone(value: string, fallback: string): string {
  const cleaned = sanitizeText(value);
  if (!cleaned) return fallback;
  if (/^[\d\s\-+().]*$/.test(cleaned)) {
    return cleaned;
  }
  return fallback;
}

/**
 * Validates a URL slug (used in route paths like /directory/[slug]).
 * Only allows alphanumeric characters, hyphens, and underscores.
 * Returns the fallback if the slug contains unexpected characters.
 */
export function validateSlug(value: string, fallback: string): string {
  const cleaned = sanitizeText(value);
  if (!cleaned) return fallback;
  if (/^[a-zA-Z0-9_-]+$/.test(cleaned)) {
    return cleaned;
  }
  return fallback;
}

/**
 * Validates a social media handle/username.
 * Only allows alphanumeric characters, hyphens, underscores, and periods.
 * Returns the fallback if the handle contains unexpected characters.
 */
export function validateHandle(value: string, fallback: string): string {
  const cleaned = sanitizeText(value);
  if (!cleaned) return fallback;
  if (/^[a-zA-Z0-9_.\-]+$/.test(cleaned)) {
    return cleaned;
  }
  return fallback;
}
