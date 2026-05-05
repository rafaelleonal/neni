import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/productos",
  "/pedidos",
  "/tienda",
  "/onboarding",
];

const AUTH_ROUTES = ["/acceso", "/acceso/codigo"];

/**
 * API endpoints that require an authenticated session. Defense-in-depth: each
 * handler ya hace su propio `getCurrentStore()`, pero el proxy aborta antes
 * of touching the logic if there is no session cookie, and we cover if in the future
 * someone creates an endpoint without a guard.
 *
 * Public endpoints (NOT listing here):
 *   - /api/auth/*              (Better Auth handles its own checks)
 *   - /api/orders   POST       (checkout of the buyer, without auth)
 *   - /api/stores/check-slug   (public validation)
 */
const PROTECTED_API_PREFIXES = [
  "/api/onboarding",
  "/api/products",
  "/api/orders/", // /api/orders/[id] PATCH del seller (NO matchea /api/orders)
  "/api/stores/me",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = getSessionCookie(req);

  const isProtectedPage = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const isProtectedApi = PROTECTED_API_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p)
  );
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isProtectedPage && !session) {
    return NextResponse.redirect(new URL("/acceso", req.url));
  }

  if (isProtectedApi && !session) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  // With session + on /acceso* → /dashboard
  // (the (seller)/layout decides whether to redirect to /onboarding)
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/productos/:path*",
    "/pedidos/:path*",
    "/tienda/:path*",
    "/onboarding/:path*",
    "/acceso",
    "/acceso/codigo",
    "/api/onboarding/:path*",
    "/api/products/:path*",
    "/api/orders/:path+", // matchea /api/orders/<id> pero NO /api/orders
    "/api/stores/me",
  ],
};
