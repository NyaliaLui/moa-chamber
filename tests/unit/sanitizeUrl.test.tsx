import {
  sanitizeText,
  sanitizeUrl,
  validateEmail,
  validateHandle,
  validatePhone,
  validateSlug,
} from '@app/sanitize';

describe('sanitizeUrl', () => {
  describe('allows safe URLs', () => {
    it('allows https URLs', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
    });

    it('allows http URLs', () => {
      expect(sanitizeUrl('http://example.com')).toBe('http://example.com');
    });

    it('allows mailto URLs', () => {
      expect(sanitizeUrl('mailto:user@example.com')).toBe(
        'mailto:user@example.com',
      );
    });

    it('allows relative URLs', () => {
      expect(sanitizeUrl('/path/to/page')).toBe('/path/to/page');
    });

    it('allows URLs with paths and query strings', () => {
      expect(sanitizeUrl('https://example.com/path?q=search')).toBe(
        'https://example.com/path?q=search',
      );
    });

    it('allows URLs with fragments', () => {
      expect(sanitizeUrl('https://example.com/page#section')).toBe(
        'https://example.com/page#section',
      );
    });

    it('allows URLs with ports', () => {
      expect(sanitizeUrl('https://example.com:8080')).toBe(
        'https://example.com:8080',
      );
    });
  });

  describe('blocks dangerous protocols', () => {
    it('blocks javascript: protocol', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBe('');
    });

    it('blocks javascript: with mixed case', () => {
      expect(sanitizeUrl('JaVaScRiPt:alert(1)')).toBe('');
    });

    it('blocks javascript: with leading spaces', () => {
      expect(sanitizeUrl('  javascript:alert(1)')).toBe('');
    });

    it('blocks javascript: with encoded characters', () => {
      expect(sanitizeUrl('javascript:alert(document.cookie)')).toBe('');
    });

    it('blocks data: protocol', () => {
      expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('');
    });

    it('blocks vbscript: protocol', () => {
      expect(sanitizeUrl('vbscript:MsgBox("XSS")')).toBe('');
    });

    it('blocks ftp: protocol', () => {
      expect(sanitizeUrl('ftp://example.com/file')).toBe('');
    });

    it('blocks file: protocol', () => {
      expect(sanitizeUrl('file:///etc/passwd')).toBe('');
    });

    it('blocks blob: protocol', () => {
      expect(sanitizeUrl('blob:https://example.com/uuid')).toBe('');
    });
  });

  describe('handles edge cases', () => {
    it('returns empty string for null', () => {
      expect(sanitizeUrl(null as unknown as string)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(sanitizeUrl(undefined as unknown as string)).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(sanitizeUrl('')).toBe('');
    });

    it('returns empty string for whitespace-only string', () => {
      expect(sanitizeUrl('   ')).toBe('');
    });

    it('returns empty string for non-URL non-relative strings', () => {
      expect(sanitizeUrl('not-a-url')).toBe('');
    });

    it('trims whitespace before checking', () => {
      expect(sanitizeUrl('  https://example.com  ')).toBe(
        'https://example.com',
      );
    });
  });

  describe('XSS bypass attempts', () => {
    it('blocks javascript: with tab characters', () => {
      expect(sanitizeUrl('java\tscript:alert(1)')).toBe('');
    });

    it('blocks javascript: with newline characters', () => {
      expect(sanitizeUrl('java\nscript:alert(1)')).toBe('');
    });

    it('blocks javascript: disguised with URL encoding in protocol', () => {
      // Browsers may decode %6A to 'j', but URL constructor handles this
      expect(sanitizeUrl('javascript:alert(1)')).toBe('');
    });

    it('blocks javascript: with HTML entities', () => {
      expect(sanitizeUrl('&#106;avascript:alert(1)')).toBe('');
    });

    it('blocks data: URI with base64 payload', () => {
      expect(
        sanitizeUrl(
          'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
        ),
      ).toBe('');
    });
  });
});

describe('sanitizeText', () => {
  describe('strips HTML tags', () => {
    it('strips simple HTML tags', () => {
      expect(sanitizeText('<b>bold</b>')).toBe('bold');
    });

    it('strips script tags and content between them', () => {
      expect(sanitizeText('<script>alert(1)</script>')).toBe('alert(1)');
    });

    it('strips tags with attributes', () => {
      expect(sanitizeText('<div class="x">content</div>')).toBe('content');
    });

    it('strips nested tags', () => {
      expect(sanitizeText('<div><span>text</span></div>')).toBe('text');
    });

    it('strips self-closing tags', () => {
      expect(sanitizeText('before<br/>after')).toBe('beforeafter');
    });

    it('strips img tags with event handlers', () => {
      expect(sanitizeText('<img src=x onerror=alert(1)>')).toBe('');
    });
  });

  describe('preserves normal text content', () => {
    it('preserves plain text', () => {
      expect(sanitizeText('Hello World')).toBe('Hello World');
    });

    it('preserves quotes in text', () => {
      expect(sanitizeText("We're the best (since 1990)")).toBe(
        "We're the best (since 1990)",
      );
    });

    it('preserves special characters', () => {
      expect(sanitizeText('Smith & Associates')).toBe('Smith & Associates');
    });

    it('preserves email addresses', () => {
      expect(sanitizeText('contact@example.com')).toBe('contact@example.com');
    });

    it('preserves phone numbers', () => {
      expect(sanitizeText('(555) 123-4567')).toBe('(555) 123-4567');
    });

    it('preserves dollar amounts', () => {
      expect(sanitizeText('$50.00')).toBe('$50.00');
    });
  });

  describe('handles edge cases', () => {
    it('returns empty string for null', () => {
      expect(sanitizeText(null as unknown as string)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(sanitizeText(undefined as unknown as string)).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(sanitizeText('')).toBe('');
    });

    it('trims whitespace', () => {
      expect(sanitizeText('  hello  ')).toBe('hello');
    });

    it('returns empty string for non-string types', () => {
      expect(sanitizeText(123 as unknown as string)).toBe('');
    });
  });
});

describe('validateEmail', () => {
  const FALLBACK = 'default@example.com';

  it('accepts valid email', () => {
    expect(validateEmail('user@example.com', FALLBACK)).toBe(
      'user@example.com',
    );
  });

  it('accepts email with subdomain', () => {
    expect(validateEmail('user@mail.example.com', FALLBACK)).toBe(
      'user@mail.example.com',
    );
  });

  it('returns fallback for missing @', () => {
    expect(validateEmail('userexample.com', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for empty string', () => {
    expect(validateEmail('', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for null', () => {
    expect(validateEmail(null as unknown as string, FALLBACK)).toBe(FALLBACK);
  });

  it('strips HTML tags before validating', () => {
    // <b> tags stripped, remaining text is a valid email
    expect(validateEmail('<b>user</b>@example.com', FALLBACK)).toBe(
      'user@example.com',
    );
  });

  it('returns fallback for entirely invalid email after stripping', () => {
    expect(validateEmail('<script>not-an-email</script>', FALLBACK)).toBe(
      FALLBACK,
    );
  });
});

describe('validatePhone', () => {
  const FALLBACK = '(555) 000-0000';

  it('accepts digits only', () => {
    expect(validatePhone('5551234567', FALLBACK)).toBe('5551234567');
  });

  it('accepts formatted phone', () => {
    expect(validatePhone('(555) 123-4567', FALLBACK)).toBe('(555) 123-4567');
  });

  it('accepts international format', () => {
    expect(validatePhone('+1-555-123-4567', FALLBACK)).toBe('+1-555-123-4567');
  });

  it('returns fallback for letters', () => {
    expect(validatePhone('555-ABC-1234', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for script injection', () => {
    expect(validatePhone('<script>alert(1)</script>', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for empty string', () => {
    expect(validatePhone('', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for null', () => {
    expect(validatePhone(null as unknown as string, FALLBACK)).toBe(FALLBACK);
  });
});

describe('validateSlug', () => {
  const FALLBACK = 'default-slug';

  it('accepts alphanumeric slug', () => {
    expect(validateSlug('my-business-123', FALLBACK)).toBe('my-business-123');
  });

  it('accepts underscores', () => {
    expect(validateSlug('my_business', FALLBACK)).toBe('my_business');
  });

  it('returns fallback for spaces', () => {
    expect(validateSlug('my business', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for special characters', () => {
    expect(validateSlug('my/business', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for HTML injection', () => {
    expect(validateSlug('<script>alert(1)</script>', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for path traversal', () => {
    expect(validateSlug('../etc/passwd', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for empty string', () => {
    expect(validateSlug('', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for null', () => {
    expect(validateSlug(null as unknown as string, FALLBACK)).toBe(FALLBACK);
  });
});

describe('validateHandle', () => {
  const FALLBACK = 'default-handle';

  it('accepts alphanumeric handle', () => {
    expect(validateHandle('john-doe', FALLBACK)).toBe('john-doe');
  });

  it('accepts handle with periods', () => {
    expect(validateHandle('john.doe', FALLBACK)).toBe('john.doe');
  });

  it('accepts handle with underscores', () => {
    expect(validateHandle('john_doe', FALLBACK)).toBe('john_doe');
  });

  it('returns fallback for spaces', () => {
    expect(validateHandle('john doe', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for slashes', () => {
    expect(validateHandle('john/doe', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for HTML injection', () => {
    expect(validateHandle('<script>alert(1)</script>', FALLBACK)).toBe(
      FALLBACK,
    );
  });

  it('returns fallback for path traversal attempt', () => {
    expect(validateHandle('../../etc', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for empty string', () => {
    expect(validateHandle('', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for null', () => {
    expect(validateHandle(null as unknown as string, FALLBACK)).toBe(FALLBACK);
  });
});
