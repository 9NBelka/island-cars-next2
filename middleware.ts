import { NextRequest, NextResponse } from 'next/server';
import { LANGS } from './app/i18n/types';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Уже содержит язык — пропускаем
  const pathnameHasLang = LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );

  if (pathnameHasLang) {
    return NextResponse.next();
  }

  // Не трогаем служебные файлы
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
