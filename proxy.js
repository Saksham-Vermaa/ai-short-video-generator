import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// List of pages that need login
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // If someone visits a protected page, make sure they're logged in
  if (isProtectedRoute(req)) await auth.protect();
});

// Which requests this guard should check
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};