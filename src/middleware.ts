// middleware-intl.js
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported locales
  locales: ['en', 'vn'],
  // Default locale
  defaultLocale: 'vn'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|vn)/:path*'],
};
