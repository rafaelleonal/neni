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

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = getSessionCookie(req);

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // No session + trying to access a protected route → /access
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/acceso", req.url));
  }

  // With session + in /access or /access/code → /dashboard
  // (the (seller)/layout will decide if it redirects to /onboarding for lack of store)
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
  ],
};
