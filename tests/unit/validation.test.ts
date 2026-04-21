import {
  ValidationError,
  sanitizeString,
  validateRequired,
  validateEmail,
  validatePhone,
  validateWebsite,
  validateNumeric,
} from '@app/components/Join/validation';

describe('sanitizeString', () => {
  it('returns empty string for null', () => {
    expect(sanitizeString(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(sanitizeString(undefined)).toBe('');
  });

  it('strips script tags, keeping inner text', () => {
    expect(sanitizeString('<script>alert(1)</script>')).not.toContain(
      '<script>',
    );
  });

  it('returns plain strings unchanged', () => {
    expect(sanitizeString('hello world')).toBe('hello world');
  });
});

describe('validateRequired', () => {
  it('throws for empty string', () => {
    expect(() => validateRequired('', 'field')).toThrow(ValidationError);
  });

  it('throws for whitespace-only string', () => {
    expect(() => validateRequired('   ', 'field')).toThrow(ValidationError);
  });

  it('passes for non-empty string', () => {
    expect(() => validateRequired('value', 'field')).not.toThrow();
  });
});

describe('validateEmail', () => {
  it('passes for empty string (optional field)', () => {
    expect(() => validateEmail('')).not.toThrow();
  });

  it('passes for valid email', () => {
    expect(() => validateEmail('user@example.com')).not.toThrow();
  });

  it('throws for missing @', () => {
    expect(() => validateEmail('userexample.com')).toThrow(ValidationError);
  });

  it('throws for missing domain', () => {
    expect(() => validateEmail('user@')).toThrow(ValidationError);
  });
});

describe('validatePhone', () => {
  it('passes for empty string (optional field)', () => {
    expect(() => validatePhone('')).not.toThrow();
  });

  it('passes for valid phone formats', () => {
    expect(() => validatePhone('555-123-4567')).not.toThrow();
    expect(() => validatePhone('+1 (555) 123-4567')).not.toThrow();
  });

  it('throws for invalid characters', () => {
    expect(() => validatePhone('555abc1234')).toThrow(ValidationError);
  });
});

describe('validateWebsite', () => {
  it('passes for empty string (optional field)', () => {
    expect(() => validateWebsite('')).not.toThrow();
  });

  it('passes for domain without protocol', () => {
    expect(() => validateWebsite('example.com')).not.toThrow();
  });

  it('passes for https URL', () => {
    expect(() => validateWebsite('https://example.com')).not.toThrow();
  });

  it('passes for http URL with subdomain and path', () => {
    expect(() => validateWebsite('http://sub.example.org/path')).not.toThrow();
  });

  it('throws for plain text without TLD', () => {
    expect(() => validateWebsite('not a url')).toThrow(ValidationError);
  });

  it('throws for domain without TLD', () => {
    expect(() => validateWebsite('example')).toThrow(ValidationError);
  });

  it('throws for non-http protocol', () => {
    expect(() => validateWebsite('ftp://example.com')).toThrow(ValidationError);
  });
});

describe('validateNumeric', () => {
  it('passes for integer string', () => {
    expect(() => validateNumeric('5', 'field')).not.toThrow();
  });

  it('passes for decimal with up to 2 places', () => {
    expect(() => validateNumeric('10.50', 'field')).not.toThrow();
  });

  it('throws for non-numeric string', () => {
    expect(() => validateNumeric('abc', 'field')).toThrow(ValidationError);
  });

  it('throws for more than 2 decimal places', () => {
    expect(() => validateNumeric('1.123', 'field')).toThrow(ValidationError);
  });

  it('passes for empty string (optional field)', () => {
    expect(() => validateNumeric('', 'field')).not.toThrow();
  });
});
