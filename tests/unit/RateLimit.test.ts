import {
  globalLimiter,
  formSubmissionLimiter,
  getClientIp,
} from '@app/rate-limit';

describe('getClientIp', () => {
  it('extracts IP from x-forwarded-for header', () => {
    const headers = new Headers({ 'x-forwarded-for': '192.168.1.1' });
    expect(getClientIp(headers)).toBe('192.168.1.1');
  });

  it('takes the first IP from a comma-separated list', () => {
    const headers = new Headers({
      'x-forwarded-for': '192.168.1.1, 10.0.0.1, 172.16.0.1',
    });
    expect(getClientIp(headers)).toBe('192.168.1.1');
  });

  it('trims whitespace from the IP', () => {
    const headers = new Headers({ 'x-forwarded-for': '  192.168.1.1  ' });
    expect(getClientIp(headers)).toBe('192.168.1.1');
  });

  it('returns "unknown" when x-forwarded-for header is missing', () => {
    const headers = new Headers();
    expect(getClientIp(headers)).toBe('unknown');
  });

  it('returns "unknown" when x-forwarded-for is empty', () => {
    const headers = new Headers({ 'x-forwarded-for': '' });
    expect(getClientIp(headers)).toBe('unknown');
  });
});

describe('globalLimiter', () => {
  it('allows requests within the limit', async () => {
    await expect(
      globalLimiter.consume('global-allow-test'),
    ).resolves.toBeDefined();
  });

  it('rejects requests exceeding the 100 request limit', async () => {
    const ip = 'global-exceed-test';
    for (let i = 0; i < 100; i++) {
      await globalLimiter.consume(ip);
    }
    await expect(globalLimiter.consume(ip)).rejects.toBeDefined();
  });
});

describe('formSubmissionLimiter', () => {
  it('allows requests within the limit', async () => {
    await expect(
      formSubmissionLimiter.consume('form-allow-test'),
    ).resolves.toBeDefined();
  });

  it('rejects requests exceeding the 5 submission limit', async () => {
    const ip = 'form-exceed-test';
    for (let i = 0; i < 5; i++) {
      await formSubmissionLimiter.consume(ip);
    }
    await expect(formSubmissionLimiter.consume(ip)).rejects.toBeDefined();
  });
});
