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
