// proxy.ts (or middleware.ts if you're on Next.js <= 15)

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/",
  "/home",
]);
const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware(async (auth, req) => {
  // ✅ auth() is async in current Clerk middleware
  const { userId, isAuthenticated } = await auth();

  const currentUrl = new URL(req.url);
  const isAccessingDashboard = currentUrl.pathname === "/home";
  const isApiRequest = currentUrl.pathname.startsWith("/api");

  // If logged in and trying to access public routes (except /home), redirect to /home
  if (isAuthenticated && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If NOT logged in:
  if (!isAuthenticated || !userId) {
    // Protect normal pages (non-API) that are not public
    if (!isApiRequest && !isPublicRoute(req)) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Protect API routes except the public API routes
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
