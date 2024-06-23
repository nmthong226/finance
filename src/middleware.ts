import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
 
const intlMiddleware = createMiddleware({
  locales: ['en', 'vn'],
  defaultLocale: 'en'
});
 
const isProtectedRoute = createRouteMatcher(['/:locale/(.*)']);
 
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
 
  return intlMiddleware(req);
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vn|en)/:path*']
};