// // proxy.ts (or middleware.ts if you're on Next.js <= 15)

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isPublicRoute = createRouteMatcher([
//   "/sign-in",
//   "/sign-up",
//   "/",
//   "/home",
// ]);
// const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

// export default clerkMiddleware(async (auth, req) => {
//   // ✅ auth() is async in current Clerk middleware
//   const { userId, isAuthenticated } = await auth();

//   const currentUrl = new URL(req.url);
//   const isAccessingDashboard = currentUrl.pathname === "/home";
//   const isApiRequest = currentUrl.pathname.startsWith("/api");

//   // If logged in and trying to access public routes (except /home), redirect to /home
//   if (isAuthenticated && isPublicRoute(req) && !isAccessingDashboard) {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }

//   // If NOT logged in:
//   if (!isAuthenticated || !userId) {
//     // Protect normal pages (non-API) that are not public
//     if (!isApiRequest && !isPublicRoute(req)) {
//       return NextResponse.redirect(new URL("/signin", req.url));
//     }

//     // Protect API routes except the public API routes
//     if (isApiRequest && !isPublicApiRoute(req)) {
//       return NextResponse.redirect(new URL("/signin", req.url));
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

/////////////////
// // middleware.ts
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // ✅ Public routes (IMPORTANT: include (.*) so callback routes work)
// const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// // ✅ Public API routes (only if you REALLY want these public)
// const isPublicApiRoute = createRouteMatcher([
//   "/api/videos(.*)", // (optional) you can remove this if videos should be protected
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();

//   const path = req.nextUrl.pathname;
//   const isApi = path.startsWith("/api");

//   // ✅ If logged in, block access to auth pages (send to /home)
//   if (userId && isPublicRoute(req) && path !== "/") {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }

//   // ✅ Not logged in: protect non-public pages
//   if (!userId && !isPublicRoute(req)) {
//     // API: return 401 (do NOT redirect API calls)
//     if (isApi) {
//       // allow only explicitly public API
//       if (isPublicApiRoute(req)) return NextResponse.next();
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Pages: redirect to the REAL Clerk path
//     const signInUrl = new URL("/sign-in", req.url);
//     signInUrl.searchParams.set("redirect_url", req.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/sign-in",
//   "/sign-up",
//   "/sign-in/sso-callback",
//   "/sign-up/sso-callback",
// ]);

// const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();

//   const url = new URL(req.url);
//   const isApi = url.pathname.startsWith("/api");

//   // Logged-in users should not see auth pages
//   if (userId && isPublicRoute(req) && !url.pathname.startsWith("/home")) {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }

//   // Not logged in → protect private routes
//   if (!userId) {
//     if (!isApi && !isPublicRoute(req)) {
//       return NextResponse.redirect(new URL("/sign-in", req.url));
//     }

//     if (isApi && !isPublicApiRoute(req)) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)"],
// };

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
