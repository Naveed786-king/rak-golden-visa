import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySession } from './lib/jwt';
import { splitLocale, DEFAULT_LOCALE } from './lib/i18n/config';

export async function middleware(req: NextRequest) {
  // 1) Language prefix: /ar/about-us -> render /about-us in Arabic
  const { locale, path } = splitLocale(req.nextUrl.pathname);
  const pathname = path;

  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  const staff = session && (session.role === 'ADMIN' || session.role === 'EDITOR');

  // Admin area (never translated)
  if (pathname.startsWith('/admin')) {
    if (locale !== DEFAULT_LOCALE) return NextResponse.redirect(new URL(pathname, req.url));
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
  if (pathname.startsWith('/account') && !session) {
    const url = new URL(locale === DEFAULT_LOCALE ? '/login' : `/${locale}/login`, req.url);
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/api/account') && !session) {
    return NextResponse.json({ error: 'Please log in' }, { status: 401 });
  }

  const headers = new Headers(req.headers);
  headers.set('x-locale', locale);
  headers.set('x-pathname', pathname);

  if (locale !== DEFAULT_LOCALE) {
    const url = req.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Run on everything except static files
  matcher: ['/((?!api/admin/backup|_next/static|_next/image|uploads/|icon.svg|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?)$).*)'],
};
