import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
 
const intlMiddleware = createMiddleware({
  locales: ['en', 'vn'],
  defaultLocale: 'en'
});
 
const isPublicRoute = createRouteMatcher(['/:locale/sign-in(.*)', '/:locale/sign-up(.*)']);
 
export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
  return intlMiddleware(req);
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vn|en)/:path*']
};