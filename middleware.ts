import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    return auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Matches all routes except static files and Next.js internals
    "/", // Root route
    "/home", // Home route is protected
    "/(api|trpc)(.*)", // API and TRPC routes are protected
  ],
};
