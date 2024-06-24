import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ['en', 'vn'],
  defaultLocale: 'en'
});
 
const isPublicRoute = createRouteMatcher(['/:locale/sign-in(.*)', '/:locale/sign-up(.*)']);
 
export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;
  const locale = pathname.split('/')[1] || 'en';
  const {userId} = auth();
  if (!userId && !isPublicRoute(req)) {
    const redirectUrl = new URL(`/${locale}/sign-in`, req.url);
    return NextResponse.redirect(redirectUrl);
  }
  return intlMiddleware(req);
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vn|en)/:path*']
};