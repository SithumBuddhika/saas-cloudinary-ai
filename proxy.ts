import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Public pages:
 * - landing page
 * - auth pages
 * - Clerk OAuth callback pages (VERY IMPORTANT)
 */
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

/**
 * Public API routes (if any)
 * (you can remove this if you don't want any public API)
 */
const isPublicApiRoute = createRouteMatcher([
  "/api/videos(.*)", // optional
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const url = new URL(req.url);
  const isApiRequest = url.pathname.startsWith("/api");

  // ✅ If user is NOT logged in:
  if (!userId) {
    // allow public pages
    if (isPublicRoute(req)) return NextResponse.next();

    // allow public API (optional)
    if (isApiRequest && isPublicApiRoute(req)) return NextResponse.next();

    // everything else -> go sign-in (CORRECT route)
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // ✅ If user IS logged in:
  // prevent going back to sign-in/up pages
  if (isPublicRoute(req) && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
