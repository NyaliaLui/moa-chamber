import { ipAddress } from '@vercel/functions';
import { NextResponse, type NextRequest } from 'next/server';
import { globalLimiter, getClientIp } from '@app/rate-limit';

export async function proxy(request: NextRequest) {
  const ip = ipAddress(request) || getClientIp(request.headers);

  try {
    await globalLimiter.consume(ip);
    return NextResponse.next();
  } catch (error) {
    console.warn('Rate limit exceeded for IP:', ip, error);
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
      },
    });
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
