import { sanitizeString } from '@app/components/Join/validation';

/**
 * These tests verify that sanitizeString strips HTML structure and dangerous
 * characters that could enable XSS when output is rendered. Note that
 * sanitizeString output is used as React text content (not dangerouslySetInnerHTML),
 * so plain words like "alert" are harmless — the key requirement is that HTML tags,
 * quotes, backticks, parentheses, semicolons, and braces are stripped.
 */
describe('XSS sanitization bypass attempts', () => {
  describe('script injection payloads', () => {
    it('strips script tags completely', () => {
      const result = sanitizeString('<script>alert("XSS")</script>');
      expect(result).not.toContain('<script');
      expect(result).not.toContain('</script');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('strips script tags with attributes', () => {
      const result = sanitizeString(
        '<script type="text/javascript">alert(1)</script>',
      );
      expect(result).not.toContain('<script');
      expect(result).not.toContain('<');
    });

    it('strips img tag with onerror handler', () => {
      const result = sanitizeString('<img src=x onerror=alert(1)>');
      expect(result).not.toContain('<img');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('strips svg tag with onload handler', () => {
      const result = sanitizeString('<svg onload=alert(1)>');
      expect(result).not.toContain('<svg');
      expect(result).not.toContain('<');
    });

    it('strips body tag with onload handler', () => {
      const result = sanitizeString('<body onload=alert(1)>');
      expect(result).not.toContain('<body');
      expect(result).not.toContain('<');
    });

    it('strips iframe injection', () => {
      const result = sanitizeString(
        '<iframe src="javascript:alert(1)"></iframe>',
      );
      expect(result).not.toContain('<iframe');
      expect(result).not.toContain('<');
    });
  });

  describe('event handler payloads in HTML tags', () => {
    it('strips div with onclick handler', () => {
      const result = sanitizeString('<div onclick="alert(1)">click me</div>');
      expect(result).not.toContain('<div');
      expect(result).not.toContain('onclick');
      expect(result).toContain('click me');
    });

    it('strips anchor with onmouseover handler', () => {
      const result = sanitizeString('<a onmouseover="alert(1)">hover</a>');
      expect(result).not.toContain('<a');
      expect(result).not.toContain('onmouseover');
      expect(result).toContain('hover');
    });

    it('strips input with onfocus and autofocus', () => {
      const result = sanitizeString('<input onfocus=alert(1) autofocus>');
      expect(result).not.toContain('<input');
      expect(result).not.toContain('onfocus');
    });
  });

  describe('encoding bypass attempts', () => {
    it('does not produce executable HTML from entity-encoded script tag', () => {
      const result = sanitizeString(
        '&#60;script&#62;alert(1)&#60;/script&#62;',
      );
      expect(result).not.toContain('<script');
      expect(result).not.toContain('>');
    });

    it('strips mixed case script tag', () => {
      const result = sanitizeString('<ScRiPt>alert(1)</ScRiPt>');
      expect(result).not.toContain('<ScRiPt');
      expect(result).not.toContain('<');
    });

    it('strips null byte injected script tag', () => {
      const result = sanitizeString('<scr\x00ipt>alert(1)</script>');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });
  });

  describe('dangerous character removal', () => {
    it('strips parentheses to prevent function calls', () => {
      const result = sanitizeString('alert(document.cookie)');
      expect(result).not.toContain('(');
      expect(result).not.toContain(')');
    });

    it('strips backticks to prevent template literals', () => {
      const result = sanitizeString('`${alert(1)}`');
      expect(result).not.toContain('`');
    });

    it('strips curly braces to prevent object/template injection', () => {
      const result = sanitizeString('{{constructor.constructor}}');
      expect(result).not.toContain('{');
      expect(result).not.toContain('}');
    });

    it('strips semicolons to prevent statement chaining', () => {
      const result = sanitizeString('alert(1);document.cookie');
      expect(result).not.toContain(';');
    });

    it('strips double quotes', () => {
      const result = sanitizeString('" onmouseover="alert(1)"');
      expect(result).not.toContain('"');
    });

    it('strips single quotes', () => {
      const result = sanitizeString("' onclick='alert(1)'");
      expect(result).not.toContain("'");
    });

    it('strips angle brackets outside of HTML tags', () => {
      const result = sanitizeString('a < b > c');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });
  });

  describe('polyglot XSS payloads', () => {
    it('strips all dangerous characters from polyglot payload', () => {
      const payload =
        'jaVasCript:/*-/*`/*\\`/*\'/*"/**/(/* */oNcLiCk=alert() )//';
      const result = sanitizeString(payload);
      expect(result).not.toContain('`');
      expect(result).not.toContain("'");
      expect(result).not.toContain('"');
      expect(result).not.toContain('(');
      expect(result).not.toContain(')');
    });

    it('strips dangerous characters from template literal injection', () => {
      const result = sanitizeString('${alert(1)}');
      expect(result).not.toContain('{');
      expect(result).not.toContain('(');
    });

    it('strips dangerous characters from constructor chain', () => {
      const result = sanitizeString(
        "{{constructor.constructor('alert(1)')()}}",
      );
      expect(result).not.toContain('{');
      expect(result).not.toContain('}');
      expect(result).not.toContain("'");
      expect(result).not.toContain('(');
    });
  });

  describe('attribute breakout payloads', () => {
    it('strips quotes from attribute breakout attempt', () => {
      const result = sanitizeString('" onmouseover="alert(1)" data-x="');
      expect(result).not.toContain('"');
      expect(result).not.toContain('(');
    });

    it('strips single quotes from attribute breakout attempt', () => {
      const result = sanitizeString("' onclick='alert(1)' data-x='");
      expect(result).not.toContain("'");
      expect(result).not.toContain('(');
    });

    it('strips backticks from template literal breakout', () => {
      const result = sanitizeString('`${alert(1)}`');
      expect(result).not.toContain('`');
      expect(result).not.toContain('(');
    });
  });

  describe('preserves safe business content', () => {
    it('preserves business name with ampersand', () => {
      const result = sanitizeString('Smith & Associates');
      expect(result).toBe('Smith & Associates');
    });

    it('preserves address with hash', () => {
      const result = sanitizeString('Suite #5, 123 Main St');
      expect(result).toBe('Suite #5, 123 Main St');
    });

    it('preserves email address', () => {
      const result = sanitizeString('user@example.com');
      expect(result).toBe('user@example.com');
    });

    it('preserves phone number', () => {
      const result = sanitizeString('+1-555-123-4567');
      expect(result).toBe('+1-555-123-4567');
    });

    it('preserves URL without protocol in text', () => {
      const result = sanitizeString('www.example.com');
      expect(result).toBe('www.example.com');
    });
  });
});
