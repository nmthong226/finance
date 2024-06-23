// middleware-auth.js
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/en(.*)",  // Protect all routes under /en
  "/vn(.*)",  // Protect all routes under /vn
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/en(.*)", "/vn(.*)"],  // Match protected routes
};