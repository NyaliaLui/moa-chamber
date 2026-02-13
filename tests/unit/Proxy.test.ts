/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

jest.mock('@vercel/functions', () => ({
  ipAddress: jest.fn(),
}));

jest.mock('../../app/rate-limit', () => ({
  globalLimiter: { consume: jest.fn() },
  getClientIp: jest.fn(),
}));

import { proxy } from '../../proxy';
import { ipAddress } from '@vercel/functions';
import { globalLimiter, getClientIp } from '../../app/rate-limit';

describe('proxy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes through when rate limit is not exceeded', async () => {
    (ipAddress as jest.Mock).mockReturnValue('192.168.1.1');
    (globalLimiter.consume as jest.Mock).mockResolvedValue({});

    const request = new NextRequest('http://localhost:3000/');
    const response = await proxy(request);

    expect(globalLimiter.consume).toHaveBeenCalledWith('192.168.1.1');
    expect(response.status).not.toBe(429);
  });

  it('returns 429 when rate limit is exceeded', async () => {
    (ipAddress as jest.Mock).mockReturnValue('192.168.1.1');
    (globalLimiter.consume as jest.Mock).mockRejectedValue(
      new Error('rate limited'),
    );

    const request = new NextRequest('http://localhost:3000/');
    const response = await proxy(request);

    expect(response.status).toBe(429);
  });

  it('includes Retry-After header in 429 response', async () => {
    (ipAddress as jest.Mock).mockReturnValue('192.168.1.1');
    (globalLimiter.consume as jest.Mock).mockRejectedValue(
      new Error('rate limited'),
    );

    const request = new NextRequest('http://localhost:3000/');
    const response = await proxy(request);

    expect(response.headers.get('Retry-After')).toBe('60');
  });

  it('returns "Too Many Requests" body in 429 response', async () => {
    (ipAddress as jest.Mock).mockReturnValue('192.168.1.1');
    (globalLimiter.consume as jest.Mock).mockRejectedValue(
      new Error('rate limited'),
    );

    const request = new NextRequest('http://localhost:3000/');
    const response = await proxy(request);

    const body = await response.text();
    expect(body).toBe('Too Many Requests');
  });

  it('falls back to getClientIp when ipAddress returns null', async () => {
    (ipAddress as jest.Mock).mockReturnValue(null);
    (getClientIp as jest.Mock).mockReturnValue('10.0.0.1');
    (globalLimiter.consume as jest.Mock).mockResolvedValue({});

    const request = new NextRequest('http://localhost:3000/');
    await proxy(request);

    expect(getClientIp).toHaveBeenCalledWith(request.headers);
    expect(globalLimiter.consume).toHaveBeenCalledWith('10.0.0.1');
  });

  it('falls back to getClientIp when ipAddress returns undefined', async () => {
    (ipAddress as jest.Mock).mockReturnValue(undefined);
    (getClientIp as jest.Mock).mockReturnValue('10.0.0.2');
    (globalLimiter.consume as jest.Mock).mockResolvedValue({});

    const request = new NextRequest('http://localhost:3000/');
    await proxy(request);

    expect(globalLimiter.consume).toHaveBeenCalledWith('10.0.0.2');
  });
});
