import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySession } from './lib/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  const staff = session && (session.role === 'ADMIN' || session.role === 'EDITOR');

  // Admin area
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (staff) return NextResponse.redirect(new URL('/admin', req.url));
      return NextResponse.next();
    }
    if (!staff) {
      const url = new URL('/admin/login', req.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Admin API
  if (pathname.startsWith('/api/admin') && !staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Customer portal
  if (pathname.startsWith('/account')) {
    if (!session) {
      const url = new URL('/login', req.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/api/account') && !session) {
    return NextResponse.json({ error: 'Please log in' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/api/admin/:path*', '/api/account/:path*'],
};
