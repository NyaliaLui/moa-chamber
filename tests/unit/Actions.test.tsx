import {
  ValidationError,
  sanitizeString,
  validateRequired,
  validateEmail,
  validatePhone,
  validateNumeric,
} from '@app/components/Join/validation';

describe('ValidationError', () => {
  it('creates an error with status 400', () => {
    const error = new ValidationError('Test error');
    expect(error.status).toBe(400);
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ValidationError');
  });

  it('is an instance of Error', () => {
    const error = new ValidationError('Test');
    expect(error).toBeInstanceOf(Error);
  });
});

describe('sanitizeString', () => {
  describe('handles null and undefined', () => {
    it('returns empty string for null', () => {
      expect(sanitizeString(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(sanitizeString(undefined)).toBe('');
    });
  });

  describe('trims whitespace', () => {
    it('trims leading whitespace', () => {
      expect(sanitizeString('  hello')).toBe('hello');
    });

    it('trims trailing whitespace', () => {
      expect(sanitizeString('hello  ')).toBe('hello');
    });

    it('trims both leading and trailing whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
    });

    it('preserves internal whitespace', () => {
      expect(sanitizeString('hello world')).toBe('hello world');
    });
  });

  describe('removes HTML tags', () => {
    it('removes simple HTML tags', () => {
      expect(sanitizeString('<p>hello</p>')).toBe('hello');
    });

    it('removes script tags', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('alertxss');
    });

    it('removes tags with attributes', () => {
      expect(sanitizeString('<div class="test">content</div>')).toBe('content');
    });

    it('removes self-closing tags', () => {
      expect(sanitizeString('before<br/>after')).toBe('beforeafter');
    });

    it('removes nested tags', () => {
      expect(sanitizeString('<div><span>text</span></div>')).toBe('text');
    });
  });

  describe('removes dangerous characters', () => {
    it('removes angle brackets', () => {
      expect(sanitizeString('a<bc')).toBe('abc');
      expect(sanitizeString('ab>c')).toBe('abc');
    });

    it('removes single quotes', () => {
      expect(sanitizeString("it's a test")).toBe('its a test');
    });

    it('removes double quotes', () => {
      expect(sanitizeString('say "hello"')).toBe('say hello');
    });

    it('removes backticks', () => {
      expect(sanitizeString('code `here`')).toBe('code here');
    });

    it('removes semicolons', () => {
      expect(sanitizeString('a;b;c')).toBe('abc');
    });

    it('removes parentheses', () => {
      expect(sanitizeString('func()')).toBe('func');
    });

    it('removes curly braces', () => {
      expect(sanitizeString('obj{key}')).toBe('objkey');
    });

    it('removes multiple dangerous characters', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('alertxss');
    });
  });

  describe('handles various input types', () => {
    it('converts numbers to strings', () => {
      expect(sanitizeString(123)).toBe('123');
    });

    it('converts booleans to strings', () => {
      expect(sanitizeString(true)).toBe('true');
    });

    it('handles empty string', () => {
      expect(sanitizeString('')).toBe('');
    });

    it('handles strings with only whitespace', () => {
      expect(sanitizeString('   ')).toBe('');
    });
  });

  describe('preserves safe characters', () => {
    it('preserves alphanumeric characters', () => {
      expect(sanitizeString('abc123')).toBe('abc123');
    });

    it('preserves hyphens', () => {
      expect(sanitizeString('first-name')).toBe('first-name');
    });

    it('preserves periods', () => {
      expect(sanitizeString('example.com')).toBe('example.com');
    });

    it('preserves at symbols', () => {
      expect(sanitizeString('user@example.com')).toBe('user@example.com');
    });

    it('preserves hash symbols', () => {
      expect(sanitizeString('Suite #5')).toBe('Suite #5');
    });

    it('preserves slashes', () => {
      expect(sanitizeString('2/B')).toBe('2/B');
    });

    it('preserves plus signs', () => {
      expect(sanitizeString('+1-555-1234')).toBe('+1-555-1234');
    });
  });
});

describe('validateRequired', () => {
  it('does not throw for non-empty string', () => {
    expect(() => validateRequired('value', 'field')).not.toThrow();
  });

  it('throws ValidationError for empty string', () => {
    expect(() => validateRequired('', 'business name')).toThrow(
      ValidationError,
    );
    expect(() => validateRequired('', 'business name')).toThrow(
      'Invalid input data: business name is required',
    );
  });

  it('throws ValidationError for whitespace-only string', () => {
    expect(() => validateRequired('   ', 'contact name')).toThrow(
      ValidationError,
    );
    expect(() => validateRequired('   ', 'contact name')).toThrow(
      'Invalid input data: contact name is required',
    );
  });

  it('includes field name in error message', () => {
    expect(() => validateRequired('', 'address')).toThrow(
      'Invalid input data: address is required',
    );
  });

  it('accepts strings with leading/trailing whitespace that have content', () => {
    expect(() => validateRequired('  value  ', 'field')).not.toThrow();
  });
});

describe('validateEmail', () => {
  describe('accepts valid email formats', () => {
    it('accepts standard email format', () => {
      expect(() => validateEmail('user@example.com')).not.toThrow();
    });

    it('accepts email with subdomain', () => {
      expect(() => validateEmail('user@mail.example.com')).not.toThrow();
    });

    it('accepts email with numbers', () => {
      expect(() => validateEmail('user123@example.com')).not.toThrow();
    });

    it('accepts email with dots in local part', () => {
      expect(() => validateEmail('first.last@example.com')).not.toThrow();
    });

    it('accepts email with plus sign', () => {
      expect(() => validateEmail('user+tag@example.com')).not.toThrow();
    });

    it('accepts empty string (optional field)', () => {
      expect(() => validateEmail('')).not.toThrow();
    });
  });

  describe('rejects invalid email formats', () => {
    it('rejects email without @ symbol', () => {
      expect(() => validateEmail('userexample.com')).toThrow(ValidationError);
      expect(() => validateEmail('userexample.com')).toThrow(
        'Invalid input data: email format is invalid',
      );
    });

    it('rejects email without domain', () => {
      expect(() => validateEmail('user@')).toThrow(ValidationError);
    });

    it('rejects email without local part', () => {
      expect(() => validateEmail('@example.com')).toThrow(ValidationError);
    });

    it('rejects email without TLD', () => {
      expect(() => validateEmail('user@example')).toThrow(ValidationError);
    });

    it('rejects email with spaces', () => {
      expect(() => validateEmail('user @example.com')).toThrow(ValidationError);
    });

    it('rejects email with multiple @ symbols', () => {
      expect(() => validateEmail('user@@example.com')).toThrow(ValidationError);
    });
  });
});

describe('validatePhone', () => {
  describe('accepts valid phone formats', () => {
    it('accepts digits only', () => {
      expect(() => validatePhone('5551234567')).not.toThrow();
    });

    it('accepts phone with dashes', () => {
      expect(() => validatePhone('555-123-4567')).not.toThrow();
    });

    it('accepts phone with parentheses', () => {
      expect(() => validatePhone('(555) 123-4567')).not.toThrow();
    });

    it('accepts phone with plus sign', () => {
      expect(() => validatePhone('+1-555-123-4567')).not.toThrow();
    });

    it('accepts phone with periods', () => {
      expect(() => validatePhone('555.123.4567')).not.toThrow();
    });

    it('accepts phone with spaces', () => {
      expect(() => validatePhone('555 123 4567')).not.toThrow();
    });

    it('accepts empty string (optional field)', () => {
      expect(() => validatePhone('')).not.toThrow();
    });
  });

  describe('rejects invalid phone formats', () => {
    it('rejects phone with letters', () => {
      expect(() => validatePhone('555-ABC-1234')).toThrow(ValidationError);
      expect(() => validatePhone('555-ABC-1234')).toThrow(
        'Invalid input data: phone format is invalid',
      );
    });

    it('rejects phone with special characters', () => {
      expect(() => validatePhone('555@123#4567')).toThrow(ValidationError);
    });

    it('rejects phone with exclamation mark', () => {
      expect(() => validatePhone('555-123-4567!')).toThrow(ValidationError);
    });
  });
});

describe('validateNumeric', () => {
  describe('accepts valid numeric values', () => {
    it('accepts single digit', () => {
      expect(() => validateNumeric('5', 'employees')).not.toThrow();
    });

    it('accepts multiple digits', () => {
      expect(() => validateNumeric('123', 'employees')).not.toThrow();
    });

    it('accepts zero', () => {
      expect(() => validateNumeric('0', 'donation')).not.toThrow();
    });

    it('accepts large numbers', () => {
      expect(() => validateNumeric('999999', 'amount')).not.toThrow();
    });

    it('accepts empty string (optional field)', () => {
      expect(() => validateNumeric('', 'donation')).not.toThrow();
    });
  });

  describe('rejects non-numeric values', () => {
    it('rejects letters', () => {
      expect(() => validateNumeric('abc', 'employees')).toThrow(
        ValidationError,
      );
      expect(() => validateNumeric('abc', 'employees')).toThrow(
        'Invalid input data: employees must be an integer or dollar amount',
      );
    });

    it('rejects mixed alphanumeric', () => {
      expect(() => validateNumeric('12a', 'donation')).toThrow(ValidationError);
    });

    it('accepts dollar amounts with up to 2 decimal places', () => {
      expect(() => validateNumeric('12.5', 'amount')).not.toThrow();
      expect(() => validateNumeric('12.50', 'amount')).not.toThrow();
      expect(() => validateNumeric('0.99', 'amount')).not.toThrow();
    });

    it('rejects more than 2 decimal places', () => {
      expect(() => validateNumeric('12.555', 'amount')).toThrow(
        ValidationError,
      );
    });

    it('rejects negative numbers', () => {
      expect(() => validateNumeric('-5', 'employees')).toThrow(ValidationError);
    });

    it('rejects numbers with spaces', () => {
      expect(() => validateNumeric('1 2', 'amount')).toThrow(ValidationError);
    });

    it('rejects numbers with commas', () => {
      expect(() => validateNumeric('1,000', 'amount')).toThrow(ValidationError);
    });

    it('includes field name in error message', () => {
      expect(() => validateNumeric('abc', 'donation amount')).toThrow(
        'Invalid input data: donation amount must be an integer or dollar amount',
      );
    });
  });
});
